import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

// In a real app, you would use a database
const posts = [
  {
    id: "1",
    content: "Just had the most amazing coffee! ☕",
    imageUrl: null,
    likes: 42,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    content: null,
    imageUrl: "/placeholder.svg?height=400&width=400",
    likes: 128,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "recent"

  const sortedPosts = [...posts]

  if (type === "trending") {
    sortedPosts.sort((a, b) => b.likes - a.likes)
  } else {
    sortedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return NextResponse.json(sortedPosts)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const content = formData.get("content") as string | null
    const image = formData.get("image") as File | null

    if (!content && !image) {
      return NextResponse.json({ error: "Post must contain text or an image" }, { status: 400 })
    }

    let imageUrl = null

    if (image) {
      const filename = `${Date.now()}-${image.name}`
      const blob = await put(filename, image, {
        access: "public",
      })
      imageUrl = blob.url
    }

    const newPost = {
      id: Math.random().toString(36).substring(2, 9),
      content,
      imageUrl,
      likes: 0,
      createdAt: new Date().toISOString(),
    }

    // In a real app, you would save to a database
    posts.unshift(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

