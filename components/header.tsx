import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { MessageSquare } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-40">
      <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md group-hover:scale-110 transition-transform">
            <MessageSquare className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl">NoBS</span>
        </Link>
        <ModeToggle />
      </div>
    </header>
  )
}

