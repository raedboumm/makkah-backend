// server.js (✅ كامل وجاهز)

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import db from "./database/db.js";
import articlesRouter from "./routes/articles.js";
import videosRouter from "./routes/videos.js";

const app = express();
app.use(cors({
  origin: ["https://smart-ai.store", "https://smart-ai.store/tv", "http://localhost:5173/tv/"],
  credentials: true,
}));
app.use(express.json());

// 📌 لـ ES Modules باش نخدمو __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve React Frontend (build)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Test endpoint
app.get("/api", (req, res) => {
  res.send("✅ Makkah API running...");
});

// ✅ Get all articles
app.get("/api/articles", (req, res) => {
  try {
    const { featured, category, page = 1, limit = 12 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10));
    const lim = Math.max(1, parseInt(limit, 10));
    const offset = (pageNum - 1) * lim;

    const where = [];
    const params = {};

    if (featured === "true") {
      where.push("a.is_featured = 1");
    }
    if (category) {
      where.push("c.slug = @category");
      params.category = category;
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    // ✅ Count for pagination
    const countStmt = db.prepare(
      `SELECT COUNT(*) AS cnt
       FROM articles a
       LEFT JOIN categories c ON c.id = a.category_id
       ${whereSql}`
    );
    const { cnt: total } = countStmt.get(params);

    // ✅ Fetch Data
    const dataStmt = db.prepare(
      `SELECT a.*, c.name_ar AS category_name
       FROM articles a
       LEFT JOIN categories c ON c.id = a.category_id
       ${whereSql}
       ORDER BY a.publish_date DESC
       LIMIT @lim OFFSET @offset`
    );
    const data = dataStmt.all({ ...params, lim, offset });

    res.json({
      success: true,
      data,
      pagination: {
        page: pageNum,
        perPage: lim,
        total,
        totalPages: Math.max(1, Math.ceil(total / lim)),
      },
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// ✅ MOST VIEWED
app.get("/api/articles/trending/most-viewed", (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const lim = Math.max(1, parseInt(limit, 10));
    const stmt = db.prepare(
      `SELECT a.id, a.title_ar, a.view_count
       FROM articles a
       ORDER BY a.view_count DESC, a.publish_date DESC
       LIMIT ?`
    );
    const data = stmt.all(lim);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.use("/api/articles", articlesRouter);
app.use("/api/videos", videosRouter);

// ✅ Videos with category info
app.get("/api/videos", (req, res) => {
  try {
    const { limit = 12, category } = req.query;
    const lim = Math.max(1, parseInt(limit, 10));

    const where = [];
    const params = {};
    if (category) {
      where.push("c.slug = @category");
      params.category = category;
    }
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const stmt = db.prepare(
      `SELECT v.*, c.name_ar AS category_name
       FROM videos v
       LEFT JOIN categories c ON c.id = v.category_id
       ${whereSql}
       ORDER BY v.publish_date DESC
       LIMIT @lim`
    );

    const data = stmt.all({ ...params, lim });
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// ✅ Programs
app.get("/api/programs", (req, res) => {
  try {
    const programs = db
      .prepare(
        `SELECT * FROM programs
         WHERE is_active = 1
         ORDER BY created_at DESC`
      )
      .all();
    res.json({ success: true, data: programs });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// ✅ Prayer Times
app.get("/api/prayer-times", (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const prayer = db.prepare("SELECT * FROM prayer_times WHERE date = ?").get(today);
    res.json({ success: true, data: prayer });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// ✅ Serve React frontend for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
