import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function setupDatabase() {
  try {
    const db = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });

    // Create users table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        is_verified BOOLEAN DEFAULT 0,
        verification_token TEXT,
        reset_token TEXT
      )
    `);

    // Create contacts table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        email TEXT,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    console.log("Database and tables created successfully!");
    await db.close();
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
}

// Call setupDatabase when the server starts
if (process.env.NODE_ENV === "development") {
  setupDatabase();
}
