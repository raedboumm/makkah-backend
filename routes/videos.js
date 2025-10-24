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

export default router;
