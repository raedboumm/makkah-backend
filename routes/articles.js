import express from "express";
import db from "../database/db.js";

const router = express.Router();

// ✅ Get articles with category data
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit) || 12;
  const featured = req.query.featured === "true";

  let query = `
    SELECT 
      a.*, 
      c.name_ar AS category_name,
      c.icon AS category_icon
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
  `;

  if (featured) query += " WHERE a.is_featured = 1";

  query += " ORDER BY a.id DESC LIMIT ?";

  try {
    const data = db.prepare(query).all(limit);
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});

export default router;
