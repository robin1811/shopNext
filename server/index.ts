import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/server/schema';

//Importing schema from the server 

const sql = neon(process.env.POSTGRES_URL!);
console.log("POSTGRES_URL:", process.env.POSTGRES_URL);
if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not set in the environment variables.");
}
export const db = drizzle(sql, { schema, logger: true });