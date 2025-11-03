import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname);
const DB_PATH = path.join(DB_DIR, "makkah.db");
const SCHEMA_PATH = path.join(DB_DIR, "schema.sql");
const SEED_PATH = path.join(DB_DIR, "seed.sql");

// Remove existing database if it exists
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log("Removed existing database");
}

// Create new database
const db = new Database(DB_PATH);
console.log("Created new database");

// Read and execute schema
const schema = fs.readFileSync(SCHEMA_PATH, "utf8");
db.exec(schema);
console.log("Applied schema");

// Read and execute seed data
const seed = fs.readFileSync(SEED_PATH, "utf8");
db.exec(seed);
console.log("Applied seed data");

db.close();
console.log("Database initialization complete!");