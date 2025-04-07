"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import type { PostWithMetrics } from "@/lib/database.types"
import { likePost, sharePost, unlikePost } from "@/lib/api"
import { formatDistanceToNow } from "date-fns"
import { toast } from "@/hooks/use-toast"

interface PostCardProps {
  post: PostWithMetrics
}

export default function PostCard({ post }: PostCardProps) {
  const [likes, setLikes] = useState(post.likes_count)
  const [shares, setShares] = useState(post.shares_count)
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
    setIsLiked(likedPosts.includes(post.id))
  }, [post.id])

  const handleLike = async () => {
    if (!isLiked) {
      setIsAnimating(true)
      try {
        const success = await likePost(post.id)
        if (success) {
          setLikes(likes + 1)
          setIsLiked(true)
          
          // Update localStorage with liked post
          const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
          localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, post.id]))
        }
      } catch (error) {
        console.error("Failed to like post:", error)
      } finally {
        setTimeout(() => setIsAnimating(false), 500)
      }
    } else {
      try {
        const success = await unlikePost(post.id)
        if (success) {
          setLikes(likes - 1)
          setIsLiked(false)
          
          // Remove post from localStorage
          const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts.filter((id: string) => id !== post.id)))
        }
      } catch (error) {
        console.error("Failed to unlike post:", error)
      }
    }
  }

  const handleShare = async () => {
    try {
      await sharePost(post.id)
      setShares(shares + 1)
      if (navigator.share) {
        await navigator.share({
          title: "Check out this post",
          text: post.content || "Shared from NoBS",
          url: `${window.location.origin}/post/${post.id}`,
        })
      } else {
        navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`)
        toast({ title: "Link copied!", description: "Post link copied to clipboard" })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error(`Error sharing post #${post.id}:`, errorMessage);
      toast({ 
        title: "Failed to share post", 
        description: "There was an error sharing this post. Please try again.",
        variant: "destructive"
      });
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full"
    >
      <Card className="overflow-hidden h-full w-full flex flex-col shadow-lg border-2 hover:border-primary/20">
        <CardContent className="p-0 flex-1">
          {post.image_url ? (
            <div className="relative aspect-square w-full">
              <Image src={post.image_url} alt="Post image" fill className="object-cover" />
            </div>
          ) : (
            <div className="p-6 bg-muted/30 flex items-center justify-center aspect-square w-full">
              <p className="font-medium text-center line-clamp-6 text-base">
                {post.content}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-card">
          <div className="flex items-center gap-1">
            <motion.div animate={isAnimating ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.5 }}>
              <Button variant="ghost" size="icon" className={isLiked ? "text-red-500" : ""} onClick={handleLike}>
                <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
              </Button>
            </motion.div>
            <span className="text-sm">{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
            <span className="text-sm">{shares}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </span>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
