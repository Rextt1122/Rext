// ==============================
// DARK MODE TOGGLE
// ==============================
const toggleBtn = document.getElementById("themeToggle");

// Cek simpanan tema di memori browser
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️"; // Ikon Matahari
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️"; // Ganti jadi Matahari saat gelap
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.textContent = "🌙"; // Ganti jadi Bulan saat terang
        localStorage.setItem("theme", "light");
    }
});

// ==============================
// GALLERY LIST
// ==============================
const desainList = [
  { img: "img/Waguri.png"},
  { img: "img/Dream Journey.png"},
  { img: "img/Tenka.png"},
];

const gallery = document.getElementById("desain-gallery");

desainList.forEach((d, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";

    // --- ANIMASI AOS ---
    item.setAttribute("data-aos", "fade-up");       
    item.setAttribute("data-aos-duration", "1000"); 
    // Delay biar munculnya bergantian (wave effect)
    item.setAttribute("data-aos-delay", index * 200); 
    // -------------------

    item.innerHTML = `<img src="${d.img}">`;
    gallery.appendChild(item);
});

// BAGIAN CONTACT FORM SUDAH SAYA HAPUS
// KARENA DI HTML SUDAH TIDAK ADA FORM LAGI