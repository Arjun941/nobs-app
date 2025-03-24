"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImagePlus, Loader2 } from "lucide-react"
import { createPost, uploadImage } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

interface CreatePostFormProps {
  onSuccess: () => void
}

export default function CreatePostForm({ onSuccess }: CreatePostFormProps) {
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setImage(file)
    setUploadError(null)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content && !image) {
      toast({
        title: "Empty post",
        description: "Please add some text or an image",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setUploadError(null)

    try {
      let imageUrl = null

      if (image) {
        imageUrl = await uploadImage(image)
        if (!imageUrl) {
          setUploadError("Failed to upload image. Please try again or post without an image.")
          setIsSubmitting(false)
          return
        }
      }

      const post = await createPost(content, imageUrl)

      if (!post) {
        throw new Error("Failed to create post")
      }

      toast({
        title: "Post created!",
        description: "Your post has been shared anonymously",
      })

      router.refresh()
      onSuccess()
    } catch (error) {
      console.error("Failed to create post:", error)
      toast({
        title: "Failed to create post",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image" className="cursor-pointer flex items-center gap-2">
          <ImagePlus className="h-4 w-4" />
          <span>Add an image</span>
        </Label>
        <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-video w-full overflow-hidden rounded-md border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                setImage(null)
                setImagePreview(null)
                setUploadError(null)
              }}
            >
              Remove
            </Button>
          </motion.div>
        )}

        {uploadError && <p className="text-sm text-destructive mt-2">{uploadError}</p>}
      </div>

      <div className="flex justify-end">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post Anonymously
          </Button>
        </motion.div>
      </div>
    </form>
  )
}

