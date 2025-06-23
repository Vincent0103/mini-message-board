import 'dotenv/config';
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_URL,
  ssl: { rejectUnauthorized: false },
});

export default pool;
