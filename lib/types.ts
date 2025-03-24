export interface Post {
  id: string
  content?: string
  imageUrl?: string
  likes: number
  createdAt: string
}

export interface CreatePostData {
  content?: string
  image?: File | null
}

