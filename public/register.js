document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const fullname = document.getElementById("fullname").value.trim();
    const email    = document.getElementById("email").value.trim();
    const address  = document.getElementById("address").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const terms = document.getElementById("terms");

    if (!username || !fullname || !email || !address || !password || !confirmPassword) {
      return alert("❗ Please fill out all fields.");
    }
    if (!terms.checked) {
      return alert("❗ Please accept the Terms & Condition.");
    }
    if (password !== confirmPassword) {
      return alert("❗ Passwords do not match.");
    }

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, fullname, email, address, password }),
      });

      const msg = await response.text();

      if (response.ok) {
        alert("✅ Registration successful!\n" + msg);
        form.reset();
      } else {
        alert("❌ Registration failed.\n" + msg);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error.");
    }
  });
});
s