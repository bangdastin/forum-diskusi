// File: cypress.config.js (di root proyek)
const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

dotenv.config(); // Ini akan memuat variabel dari .env di root

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Implementasikan node event listeners di sini jika perlu

      // Teruskan variabel lingkungan yang relevan ke Cypress tests
      config.env = config.env || {}; // Pastikan config.env ada
      config.env.TEST_USER_EMAIL = process.env.CYPRESS_TEST_USER_EMAIL;
      config.env.TEST_USER_PASSWORD = process.env.CYPRESS_TEST_USER_PASSWORD;
      // contoh: config.env.API_URL = process.env.API_URL;

      return config;
    },
    // Opsi supportFile defaultnya adalah 'cypress/support/e2e.js'.
    // Jika Anda ingin menonaktifkannya, set menjadi false di sini.
    // Jika Anda ingin menggunakannya (umumnya iya), biarkan atau pastikan path-nya benar.
    // supportFile: 'cypress/support/e2e.js', // Ini adalah default jika tidak diatur
  },
});