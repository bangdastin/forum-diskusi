/**
 * E2E Test Scenario for Login Flow
 *
 * - Login flow scenario
 * - should display login page correctly
 * - should display alert when email is empty
 * - should display alert when password is empty
 * - should display alert when email and password are wrong
 * - should display homepage when login is successful
 */
describe('Login flow', () => {
  beforeEach(() => {
    // Cypress akan secara otomatis mengunjungi baseUrl yang dikonfigurasi
    // atau Anda bisa secara eksplisit mengunjungi halaman login di setiap test
    cy.visit('/login'); // Asumsikan halaman login ada di /login
  });

  it('should display login page correctly', () => {
    // Memastikan elemen-elemen penting di halaman login ada
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Login').should('be.visible');
    cy.contains('Belum punya akun? Daftar di sini').should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // Stub window.alert
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').contains('Login').click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('Email dan password harus diisi!');
      });
  });

  it('should display alert when password is empty', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button[type="submit"]').contains('Login').click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('Email dan password harus diisi!');
      });
  });

  it('should display alert when email and password are wrong', () => {
    // Anda perlu memastikan ada user yang tidak terdaftar untuk tes ini
    // atau API mengembalikan pesan error yang sesuai
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').contains('Login').click()
      .then(() => {
        // Sesuaikan pesan alert dengan yang ditampilkan aplikasi Anda
        // Contoh: 'email or password is wrong' atau pesan spesifik lainnya dari API
        expect(alertStub).to.be.calledWithMatch(/email or password is wrong|user not found/i);
      });
  });

  it('should display homepage when login is successful', () => {
    // Ganti dengan kredensial pengguna yang valid dari API Anda
    // Penting: Jangan hardcode kredensial sensitif jika repo publik. Gunakan environment variables.
    // Untuk contoh ini, kita asumsikan ada user test@example.com dengan password password123
    cy.get('input[type="email"]').type('test@example.com'); // Ganti dengan email valid
    cy.get('input[type="password"]').type('password123'); // Ganti dengan password valid
    cy.get('button[type="submit"]').contains('Login').click();

    // Verifikasi bahwa navigasi ke homepage berhasil
    // Ini bisa dengan mengecek URL atau keberadaan elemen khas homepage
    cy.url().should('not.include', '/login');
    cy.contains('Threads').should('be.visible'); // Contoh elemen di Header setelah login
    cy.contains('Leaderboard').should('be.visible');
    // cy.contains('+ Buat Thread').should('be.visible'); // Tombol buat thread jika user sudah login
  });
});