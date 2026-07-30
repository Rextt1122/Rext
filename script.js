document.addEventListener("DOMContentLoaded", () => {
  // Boot Sequence Overlay
  const bootOverlay = document.getElementById("boot-overlay");
  const bootText1 = document.getElementById("boot-text-1");
  const bootText2 = document.getElementById("boot-text-2");

  if (bootOverlay) {
    const t1 = "[ INITIALIZING CORE SYSTEM_ ]";
    const t2 = "ACCESS GRANTED.";
    let i1 = 0, i2 = 0;

    function typeBoot1() {
      if (i1 < t1.length) {
        bootText1.innerHTML = t1.substring(0, i1 + 1);
        i1++;
        setTimeout(typeBoot1, 30);
      } else {
        setTimeout(typeBoot2, 300);
      }
    }

    function typeBoot2() {
      if (i2 < t2.length) {
        bootText2.innerHTML = t2.substring(0, i2 + 1);
        i2++;
        setTimeout(typeBoot2, 30);
      } else {
        setTimeout(() => {
          bootOverlay.classList.add("hidden");
        }, 600);
      }
    }

    setTimeout(typeBoot1, 200);
  }

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

    setTimeout(typeSys, 2400); // Wait for boot sequence to finish
  }

  // Custom Cursor Logic
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorBox = document.querySelector('.custom-cursor-box');
  
  if (cursorDot && cursorBox && matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let boxX = mouseX;
    let boxY = mouseY;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });
    
    function animateCursorBox() {
      boxX += (mouseX - boxX) * 0.2;
      boxY += (mouseY - boxY) * 0.2;
      cursorBox.style.transform = `translate3d(${boxX}px, ${boxY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursorBox);
    }
    animateCursorBox();
    
    const hoverElements = document.querySelectorAll('a, button, .gallery-item');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorBox.classList.add('hover-active'));
      el.addEventListener('mouseleave', () => cursorBox.classList.remove('hover-active'));
    });
  }
});