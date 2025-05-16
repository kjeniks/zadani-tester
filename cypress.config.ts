import { defineConfig } from 'cypress'
import { readFileSync } from 'fs'
require('dotenv').config()

const domain = process.env.DOMAIN || 'cz'
const rawData = readFileSync(`./cypress/fixtures/testData.${domain}.json`, 'utf-8')
const data = JSON.parse(rawData)
const env = process.env.ENV || 'stag'

export default defineConfig({
  defaultCommandTimeout: 15000,
  requestTimeout: 30000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  video: false,
  env: {
    ...process.env,
    DOMAIN: domain,
  },
  e2e: {
    baseUrl: data.baseUrl[env],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/_edit/**'],
    experimentalRunAllSpecs: true,
  },
})
