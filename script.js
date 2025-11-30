// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");

    if (!toggleBtn) return;

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        toggleBtn.textContent = "☀️";
    } else {
        toggleBtn.textContent = "🌙";
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            toggleBtn.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            toggleBtn.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
});

// DESAIN LIST
const desainList = [
    { img: "img/Waguri.png" },
    { img: "img/Dream Journey.png" }
];

function loadDesain() {
    const gallery = document.getElementById("desain-gallery");

    if (!gallery) return;

    gallery.innerHTML = desainList.map(d => `
        <div class="gallery-item">
            <img src="${d.img}" alt="">
        </div>
    `).join("");
}

loadDesain();
