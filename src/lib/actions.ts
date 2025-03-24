// ...existing code...

export async function likePost(postId: string) {
  try {
    const response = await fetch(`/api/posts/like/${postId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to like post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
}

// ...existing code...
