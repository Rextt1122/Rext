const toggleBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

const desainList = [
  { img: "img/Waguri.png"},
  { img: "img/Dream Journey.png"},
  { img: "img/Tenka.png"},
  { img: "img/Miyabi.png"},
  { img: "img/Cartethiya.png"},
  { img: "img/Jane Doe.png"},
  { img: "img/YoRHa No.2 Type B.png"},
];

const gallery = document.getElementById("desain-gallery");

desainList.forEach((d, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.setAttribute("data-aos", "fade-up");
    item.setAttribute("data-aos-duration", "500");
    item.setAttribute("data-aos-delay", index * 50);
    item.innerHTML = `<img src="${d.img}" alt="design">`;
    item.addEventListener("click", () => openLightbox(d.img));
    gallery.appendChild(item);
});

// Lightbox
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <div class="lightbox-overlay"></div>
  <div class="lightbox-content">
    <button class="lightbox-close">&times;</button>
    <img class="lightbox-img" src="" alt="preview">
  </div>
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxOverlay = lightbox.querySelector(".lightbox-overlay");
const lightboxClose = lightbox.querySelector(".lightbox-close");

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

lightboxOverlay.addEventListener("click", closeLightbox);
lightboxClose.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});
