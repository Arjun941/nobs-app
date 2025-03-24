import express from 'express';
// ...existing code...
const userLikes = new Set<string>();
const router = express.Router();

router.post('/like', (req, res) => {
  const userIp = req.ip;
  if (userLikes.has(userIp)) {
    return res.status(403).json({ message: 'Like already registered from this IP' });
  }
  userLikes.add(userIp);
  return res.json({ message: 'Like accepted' });
});

export default router;
