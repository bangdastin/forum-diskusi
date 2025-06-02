// cypress/support/e2e.js
//
// Ini adalah tempat yang baik untuk meletakkan konfigurasi global
// dan perilaku yang memodifikasi Cypress.
//
// Anda dapat mengubah lokasi file ini atau menonaktifkan
// pemuatan file pendukung secara otomatis dengan opsi konfigurasi 'supportFile'.
//
// Anda dapat membaca lebih lanjut di sini:
// https://on.cypress.io/configuration
// ***********************************************************

// Contoh: Impor commands.js menggunakan sintaks ES2015:
// import './commands'

// Anda juga bisa require() file pendukung gaya ES5:
// require('./commands')

// HAPUS ATAU KOMENTARI BARIS-BARIS BERMASALAH DARI VERSI ANDA SEBELUMNYA:
// const { defineConfig } = require('cypress') // <-- HAPUS/KOMENTARI INI
// module.exports = defineConfig({           // <-- HAPUS/KOMENTARI BLOK INI
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//     baseUrl: 'http://localhost:3000',
//     supportFile: false,
//   },
// })