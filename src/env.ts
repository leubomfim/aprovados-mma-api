import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CLOUDFLARE_ENDPOINT: z.string().url(),
  CLOUDFLARE_ACCESS_KEY: z.string(),
  CLOUDFLARE_SECRET_KEY: z.string(),
  ORIGIN_CORS_BACKEND: z.string().url(),
  ORIGIN_CORS_LOCAL: z.string().url(),
  ORIGIN_CORS_LOCAL_NEXT: z.string().url(),
  FRONTEND_URL: z.string().url(),
  NODE_ENV: z.string()
})

export const env = envSchema.parse(process.env)