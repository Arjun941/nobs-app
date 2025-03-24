"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getPosts } from "@/lib/api"
import PostCard from "./post-card"
import { Button } from "@/components/ui/button"
import type { PostWithMetrics } from "@/lib/database.types"
import { supabase } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

interface PostCarouselProps {
  type: "trending" | "recent"
}

function PostsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-40 w-full rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PostCarousel({ type }: PostCarouselProps) {
  const [posts, setPosts] = useState<PostWithMetrics[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const fetchedPosts = await getPosts(type)
      setPosts(fetchedPosts)
      setLoading(false)
    }

    fetchPosts()

    // Subscribe to changes in the posts table
    const postsSubscription = supabase
      .channel("posts-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        () => {
          fetchPosts()
        },
      )
      .subscribe()

    // Subscribe to changes in the likes table
    const likesSubscription = supabase
      .channel("likes-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "likes",
        },
        () => {
          if (type === "trending") {
            fetchPosts()
          }
        },
      )
      .subscribe()

    // Subscribe to changes in the shares table
    const sharesSubscription = supabase
      .channel("shares-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "shares",
        },
        () => {
          if (type === "trending") {
            fetchPosts()
          }
        },
      )
      .subscribe()

    return () => {
      postsSubscription.unsubscribe()
      likesSubscription.unsubscribe()
      sharesSubscription.unsubscribe()
    }
  }, [type])

  if (loading) {
    return <PostsLoading />
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-card">
        <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground mb-4">Be the first to share something!</p>
        <Button variant="outline" size="sm" onClick={() => document.getElementById("create-post-button")?.click()}>
          Create a post
        </Button>
      </div>
    )
  }

  return (
    <div className="overflow-y-auto flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

