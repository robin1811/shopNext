import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Explicitly load .env.local
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: './server/schema.ts',
  out: './server/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
});