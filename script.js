document.addEventListener("DOMContentLoaded", () => {
  const demoToggle = document.getElementById("demoToggle");
  const typingEl = document.getElementById("typingText");
  const gallery = document.getElementById("desain-gallery");
  const backToTop = document.getElementById("backToTop");

  const demoIcon = document.getElementById("demoIcon");
  const sunPath = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
  const moonPath = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

  function syncTheme() {
    const isDark = localStorage.getItem("theme") === "dark";
    document.body.classList.toggle("dark", isDark);
    if (demoIcon) demoIcon.innerHTML = isDark ? sunPath : moonPath;
  }

  if (demoToggle) {
    demoToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      if (demoIcon) demoIcon.innerHTML = isDark ? sunPath : moonPath;
    });
  }

  syncTheme();

  const roles = [
    "IT Student",
    "Frontend Developer",
    "Graphic Designer",
    "Open to Collaborations",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    if (!typingEl) return;

    const current = roles[roleIndex];
    if (!isDeleting) {
      typingEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      typingEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeLoop, 350);
        return;
      }
    }

    setTimeout(typeLoop, isDeleting ? 45 : 70);
  }

  if (typingEl) {
    setTimeout(typeLoop, 1200);
  }

  const desainList = [
    { img: "img/Waguri.png" },
    { img: "img/Dream Journey.png" },
    { img: "img/Tenka.png" },
    { img: "img/Miyabi.png" },
    { img: "img/Cartethiya.png" },
    { img: "img/Jane Doe.png" },
    { img: "img/YoRHa No.2 Type B.png" },
  ];

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close preview">&times;</button>
      <img class="lightbox-img" src="" alt="preview">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxOverlay = lightbox.querySelector(".lightbox-overlay");
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

  if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  if (gallery) {
    desainList.forEach((d, index) => {
      const item = document.createElement("div");
      item.className = "gallery-item";
      item.innerHTML = `<img src="${d.img}" alt="design ${index + 1}">`;
      item.addEventListener("click", () => openLightbox(d.img));
      gallery.appendChild(item);
    });

    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const items = gallery.querySelectorAll(".gallery-item");
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            item.style.transitionDelay = `${i * 80}ms`;
            item.classList.add("visible");
          });
        } else {
          items.forEach((item) => {
            item.style.transitionDelay = "0ms";
            item.classList.remove("visible");
          });
        }
      });
    }, { threshold: 0.05 });
    galleryObserver.observe(gallery);
  }

  const socialCards = document.querySelectorAll(".social-card");
  if (socialCards.length) {
    const socialGrid = document.querySelector(".socials-grid");
    const socialObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          socialCards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 100}ms`;
            card.classList.add("visible");
          });
        } else {
          socialCards.forEach((card) => {
            card.style.transitionDelay = "0ms";
            card.classList.remove("visible");
          });
        }
      });
    }, { threshold: 0.15 });
    socialObserver.observe(socialGrid || socialCards[0]);
  }

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 300);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (dot && ring && window.matchMedia("(pointer: fine)").matches) {
    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    (function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        dot.classList.add("hover");
        ring.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        dot.classList.remove("hover");
        ring.classList.remove("hover");
      });
    });
  }
});
