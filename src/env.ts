import { z } from 'zod'

const envSchema = z.object({
	VITE_SCANNER_API_KEY: z.string(),
	VITE_SCANNER_AUTH_DOMAIN: z.string(),
	VITE_SCANNER_PROJECT_ID: z.string(),
	VITE_SCANNER_STORAGE_BUCKET: z.string(),
	VITE_SCANNER_MESSAGING_SENDER_ID: z.string(),
	VITE_SCANNER_APP_ID: z.string()
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
	console.error('❌ Invalid environment variable', _env.error.format())

	throw new Error('❌ Invalid environment variable')
}

export const env = _env.data
