import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    const postId = params.postId;

    // Check if the user already liked the post
    const existingLike = await db.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    // If the user already liked the post, unlike it
    if (existingLike) {
      await db.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      // Update the post's likes count
      const post = await db.post.update({
        where: {
          id: postId,
        },
        data: {
          likesCount: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({ liked: false, likesCount: post.likesCount });
    }

    // If the user hasn't liked the post, create a like
    // ...existing code...
  } catch (error) {
    // ...existing code...
  }
}
