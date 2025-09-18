document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (!username || !password) {
      return alert("❗ Please fill in all fields.");
    }

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // ✅ save username from server response
        if (data.username) {
          localStorage.setItem("customerName", data.username);
        }

        // redirect depende sa role
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          window.location.href = "/home";
        }
      } else {
        const errData = await res.json().catch(() => null);
        alert((errData && errData.error) || "❌ Login failed.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error.");
    }
  });
});
