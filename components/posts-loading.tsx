import { Skeleton } from "@/components/ui/skeleton"

export default function PostsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3 border rounded-lg p-4">
          <Skeleton className="h-[200px] w-full rounded-md" />
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </div>
      ))}
    </div>
  )
}

