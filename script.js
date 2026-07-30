document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for header links
  document.querySelectorAll('.header-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Populate Design Gallery
  const gallery = document.getElementById("desain-gallery");
  const desainList = [
    "Waguri",
    "Dream Journey",
    "Tenka",
    "Miyabi",
    "Cartethiya",
    "Jane Doe",
    "YoRHa No.2 Type B",
  ];

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close preview">×</button>
      <img class="lightbox-img" src="" alt="preview">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  function openLightbox(src) {
    if (!lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  if (gallery) {
    desainList.forEach((name) => {
      const imgPath = `img/${name}.webp`;
      const item = document.createElement("div");
      item.className = "gallery-item";
      item.innerHTML = `<img src="${imgPath}" alt="${name}" loading="lazy" decoding="async">`;
      item.addEventListener("click", () => openLightbox(imgPath));
      gallery.appendChild(item);
    });
  }

  // Typing animation for system ready texts
  const sysText = "[ SYSTEM_READY ]";
  const intText = "INT.001";
  const sysElement = document.getElementById("type-sys");
  const intElement = document.getElementById("type-int");
  
  if (sysElement && intElement) {
    let sysIndex = 0;
    let intIndex = 0;
    const typeDelay = 40; // fast typing
    
    function typeInt() {
      if (intIndex < intText.length) {
        intElement.innerHTML = intText.substring(0, intIndex + 1) + '<span class="cursor-blink">_</span>';
        intIndex++;
        setTimeout(typeInt, typeDelay);
      } else {
        intElement.innerHTML = intText + '<span class="cursor-blink">_</span>';
      }
    }
    
    function typeSys() {
      if (sysIndex < sysText.length) {
        sysElement.innerHTML = sysText.substring(0, sysIndex + 1) + '<span class="cursor-blink">_</span>';
        sysIndex++;
        setTimeout(typeSys, typeDelay);
      } else {
        sysElement.innerHTML = sysText; 
        setTimeout(typeInt, typeDelay * 5); // pause before second line
      }
    }
    
    setTimeout(typeSys, 400); // initial boot delay
  }
});