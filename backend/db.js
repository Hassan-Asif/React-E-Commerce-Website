import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Export this function as openDb
export async function openDb() {
  return open({
    filename: "./ecom.db",
    driver: sqlite3.Database,
  });
}

// Optional: If you want getDb for legacy code
export const getDb = openDb;
