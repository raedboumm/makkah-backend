import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ✅ حل مشكلة المسار في ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ المجلد الحقيقي للـ database/
const DB_DIR = path.join(__dirname); // هذا يشير إلى backend/database مباشرة
const DB_PATH = path.join(DB_DIR, "makkah.db");

// ✅ تأكد أن المجلد موجود
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// ✅ تأكد من وجود schema.sql و seed.sql بشكل صحيح
const SCHEMA_PATH = path.join(DB_DIR, "schema.sql");
const SEED_PATH = path.join(DB_DIR, "seed.sql");

if (!fs.existsSync(SCHEMA_PATH)) {
  console.error("❌ File missing:", SCHEMA_PATH);
  process.exit(1);
}

// ✅ افتح أو أنشئ قاعدة البيانات
const db = new Database(DB_PATH);
const dbExists = fs.existsSync(DB_PATH);

if (!dbExists || db.prepare("SELECT name FROM sqlite_master WHERE type='table';").all().length === 0) {
  console.log("⚙ Creating and seeding database...");

  const schema = fs.readFileSync(SCHEMA_PATH, "utf8");
  db.exec(schema);
  console.log("✅ Schema loaded.");

  if (fs.existsSync(SEED_PATH)) {
    const seed = fs.readFileSync(SEED_PATH, "utf8");
    db.exec(seed);
    console.log("✅ Seed data inserted.");
  }
} else {
  console.log("✅ Database already exists, skipping initialization.");
}

export default db;
