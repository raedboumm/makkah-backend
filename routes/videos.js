import express from "express";
import db from "../database/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit) || 8;

  const sql = `
    SELECT v.*, 
           c.name_ar AS category_name, 
           c.icon AS category_icon
    FROM videos v
    LEFT JOIN categories c ON v.category_id = c.id
    ORDER BY v.id DESC
    LIMIT ?
  `;

  try {
    const data = db.prepare(sql).all(limit);
    res.json({ success: true, data });
  } catch (error) {
    console.error("Video API Error:", error);
    res.json({ success: false, error: error.message });
  }
});

// Increment view count for a video
router.post('/:id/view', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ success: false, error: 'Invalid video id' });

  try {
    const update = db.prepare('UPDATE videos SET view_count = COALESCE(view_count, 0) + 1 WHERE id = ?');
    const info = update.run(id);

    if (info.changes === 0) {
      return res.status(404).json({ success: false, error: 'Video not found' });
    }

    const row = db.prepare('SELECT id, view_count FROM videos WHERE id = ?').get(id);
    return res.json({ success: true, data: row });
  } catch (err) {
    console.error('Error incrementing video view:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
