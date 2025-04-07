import { Suspense } from "react"
import Header from "@/components/header"
import PostCarousel from "@/components/post-carousel"
import CreatePostButton from "@/components/create-post-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostsLoading from "@/components/posts-loading"
import PWARegister from './components/pwa-register';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <PWARegister />
      <Header />
      <div className="container max-w-5xl mx-auto px-4 py-6 flex-1">
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="trending">🔥 Trending</TabsTrigger>
            <TabsTrigger value="recent">✨ Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="trending" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Popular Posts</h2>
            <p className="text-muted-foreground">Check out what's trending on NoBS right now.</p>
            <Suspense fallback={<PostsLoading />}>
              <PostCarousel type="trending" />
            </Suspense>
          </TabsContent>
          <TabsContent value="recent" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Latest Posts</h2>
            <p className="text-muted-foreground">See what people are sharing right now.</p>
            <Suspense fallback={<PostsLoading />}>
              <PostCarousel type="recent" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
      <CreatePostButton />
    </main>
  )
}

