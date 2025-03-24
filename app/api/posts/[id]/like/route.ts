import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  // In a real app, you would update a database
  // This is just a mock implementation
  console.log(`Liked post ${id}`)

  return NextResponse.json({ success: true })
}

