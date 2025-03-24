// ...existing code...
const likedImages = new Map<string, Set<string>>(); 
// ...existing code...

export function handleLike(req, res) {
  const imageId = req.body.imageId;
  const userToken = req.cookies.likeToken; // or req.headers['x-like-token'], etc.

  if (!imageId || !userToken) {
    return res.status(400).send("Missing image or token");
  }

  if (!likedImages.has(imageId)) {
    likedImages.set(imageId, new Set());
  }

  if (likedImages.get(imageId).has(userToken)) {
    return res.status(200).send("Already liked");
  } else {
    likedImages.get(imageId).add(userToken);
    // ...existing code to increment or persist the like count...
    return res.status(200).send("Liked");
  }
}
// ...existing code...
