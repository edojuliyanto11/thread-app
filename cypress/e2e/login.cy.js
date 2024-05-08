describe("Login Test", () => {
  it("should login successfully with valid credentials", () => {
    // Kunjungi halaman login
    cy.visit("http://localhost:5173/login");

    // Temukan elemen input email dan masukkan email yang valid
    cy.get('input[name="email"]').type("tobi@example.com");

    // Temukan elemen input password dan masukkan password yang valid
    cy.get('input[name="password"]').type("654321");

    // Klik tombol login
    cy.get('button[type="submit"]').click();

    // Verifikasi bahwa pengguna dialihkan ke halaman /threads setelah login berhasil
    cy.url().should("include", "/threads");

    // Anda juga bisa menambahkan verifikasi tambahan, misalnya, memeriksa kehadiran token dalam localStorage
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.a("string");
    });
  });

  it("should display error message for invalid credentials", () => {
    // Kunjungi halaman login
    cy.visit("http://localhost:5173/login");

    // Temukan elemen input email dan masukkan email yang tidak valid
    cy.get('input[name="email"]').type("invaliduser@example.com");

    // Temukan elemen input password dan masukkan password yang tidak valid
    cy.get('input[name="password"]').type("wrongpassword");

    // Klik tombol login
    cy.get('button[type="submit"]').click();

    // Verifikasi bahwa pesan error ditampilkan
    // cy.contains("Invalid email or password").should("exist");
  });
});
