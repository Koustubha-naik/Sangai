// theme.js
// ===============================
// Global theme + UI interactions
// ===============================

/* -------------------------------
   THEME (Light / Dark)
--------------------------------*/

// Apply saved theme on page load
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

// Toggle theme manually
function toggleTheme() {
    const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";

    const nextTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
}

/* -------------------------------
   FULLSCREEN MENU
--------------------------------*/

function openMenu() {
    const menu = document.getElementById("overlayMenu");
    if (!menu) return;

    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
}

function closeMenu() {
    const menu = document.getElementById("overlayMenu");
    if (!menu) return;

    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
}


