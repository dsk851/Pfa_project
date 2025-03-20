import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_tqWY9ZAP4EOF@ep-fragrant-shadow-a50smzyn-pooler.us-east-2.aws.neon.tech/tuv_store_db?sslmode=require' ,
  },
});
