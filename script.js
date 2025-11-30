const toggleBtn = document.getElementById("themeToggle");
const menuToggle = document.querySelector('.menu-toggle');
const headerPill = document.querySelector('.header-pill');

// 1. Inisialisasi Dark Mode
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";	
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


// 2. Fungsionalitas Hamburger Menu
if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        headerPill.classList.toggle('active');
    });
}


// 3. Tutup menu saat link diklik
document.querySelectorAll('.pill-nav a').forEach(link => {
    link.addEventListener('click', () => {
        headerPill.classList.remove('active');
    });
});
// (Kode AOS Dihapus karena konflik yang sering terjadi)
