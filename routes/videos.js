import express from "express";
import db from "../database/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  // Pagination: support ?page=1&limit=8 and optional ?category=slug
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 8);
  const offset = (page - 1) * limit;

  const where = [];
  const params = {};
  if (req.query.category) {
    where.push("c.slug = @category");
    params.category = req.query.category;
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const sql = `
    SELECT v.*, 
           c.name_ar AS category_name, 
           c.icon AS category_icon
    FROM videos v
    LEFT JOIN categories c ON v.category_id = c.id
    ${whereSql}
    ORDER BY v.publish_date DESC, v.id DESC
    LIMIT @lim OFFSET @offset
  `;

  const countSql = `SELECT COUNT(*) AS cnt FROM videos v LEFT JOIN categories c ON v.category_id = c.id ${whereSql}`;

  try {
    const total = db.prepare(countSql).get(params).cnt;
    const data = db.prepare(sql).all({ ...params, lim: limit, offset });
    res.json({ success: true, data, pagination: { page, perPage: limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) } });
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
