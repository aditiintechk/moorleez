import { defineConfig } from '@playwright/test'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.test file FIRST
const envTestPath = resolve(process.cwd(), '.env.test')
config({ path: envTestPath })

// Get the DATABASE_URL from .env.test (now loaded)
const testDatabaseUrl =
	process.env.DATABASE_URL || process.env.TEST_DATABASE_URL

if (!testDatabaseUrl) {
	throw new Error(
		'DATABASE_URL not found! ' +
			'Locally: create .env.test file. ' +
			'In CI: set TEST_DATABASE_URL secret in GitHub.'
	)
}

export default defineConfig({
	testDir: './e2e',
	use: {
		baseURL: 'http://localhost:3000',
	},
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
		env: {
			DATABASE_URL: testDatabaseUrl,
		},
	},
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
})
