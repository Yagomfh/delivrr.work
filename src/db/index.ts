import { config } from "dotenv";

import { drizzle } from 'drizzle-orm/bun-sql';

import * as schema from "./schema.ts";
import * as authSchema from "./auth-schema.ts";

config();

export const db = drizzle(process.env.DATABASE_URL!, { schema: { ...schema, ...authSchema } });
