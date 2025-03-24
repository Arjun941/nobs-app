import { supabase, STORAGE_BUCKET } from "./supabase"
import type { PostWithMetrics } from "./database.types"
import { getLocalStorage, setLocalStorage } from "./local-storage"

export async function getPosts(type: "trending" | "recent"): Promise<PostWithMetrics[]> {
  let query = supabase.from("posts_with_metrics").select("*")

  if (type === "trending") {
    query = query.order("likes_count", { ascending: false })
  } else {
    query = query.order("created_at", { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data || []
}

export async function createPost(content?: string, imageUrl?: string): Promise<PostWithMetrics | null> {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ content, image_url: imageUrl }])
    .select()

  if (error) {
    console.error("Error creating post:", error)
    return null
  }

  // Return the post with zero metrics since it's new
  return {
    ...data[0],
    likes_count: 0,
    shares_count: 0,
  }
}

export async function likePost(postId: string): Promise<boolean> {
  // Check if already liked in localStorage
  const likedPosts = getLocalStorage('likedPosts', [])
  if (likedPosts.includes(postId)) {
    return false // Already liked
  }
  
  const { error } = await supabase.from("likes").insert([{ post_id: postId }])

  if (error) {
    console.error("Error liking post:", error)
    return false
  }

  // Store in localStorage to persist the like
  likedPosts.push(postId)
  setLocalStorage('likedPosts', likedPosts)
  
  return true
}

export async function unlikePost(postId: string): Promise<boolean> {
  // Check if liked in localStorage
  const likedPosts = getLocalStorage('likedPosts', [])
  if (!likedPosts.includes(postId)) {
    return false // Not liked
  }
    
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", postId)

  if (error) {
    console.error("Error unliking post:", error)
    return false
  }

  // Remove from localStorage
  const updatedLikedPosts = likedPosts.filter((id: string) => id !== postId)
  setLocalStorage('likedPosts', updatedLikedPosts)
  
  return true
}

export async function sharePost(postId: string): Promise<boolean> {
  const { error } = await supabase.from("shares").insert([{ post_id: postId }])

  if (error) {
    console.error("Error sharing post:", error)
    return false
  }

  return true
}

export async function uploadImage(file: File): Promise<string | null> {
  try {
    // Ensure the images bucket exists before uploading
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError, data } = await supabase.storage.from(STORAGE_BUCKET).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      return null
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error("Error in uploadImage:", error)
    return null
  }
}

