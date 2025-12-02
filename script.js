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

const desainList = [
  { img: "img/Miyabi.png" },
  { img: "img/Waguri.png" },
  { img: "img/Dream Journey.png" },
  { img: "img/Tenka.png" },
  { img: "img/Jane Doe.png" },
  { img: "img/Cartethiya.png" },
];

function loadDesain() {
    const gallery = document.getElementById("desain-gallery");

    if (!gallery) return;

    gallery.innerHTML = desainList.map((d) => `
        <div class="gallery-item">
            <img src="${d.img}" alt="">
        </div>
    `).join("");

    startAppearAnimation();
}
loadDesain();

function startAppearAnimation() {
    const items = document.querySelectorAll(".gallery-item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
            } else {
                entry.target.classList.remove("appear"); 
            }

        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
}
