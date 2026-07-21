document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("hidden");
      }, 400); // 400ms delay for smooth experience
    });
  }

  const demoToggle = document.getElementById("demoToggle");
  const typingEl = document.getElementById("typingText");
  const gallery = document.getElementById("desain-gallery");
  const backToTop = document.getElementById("backToTop");

  const demoIcon = document.getElementById("demoIcon");
  const sunPath = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
  const moonPath = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

  function syncTheme() {
    // seed localStorage on first load — default: dark; subsequent visits read stored value
    const stored = localStorage.getItem("theme");
    if (!stored) {
      localStorage.setItem("theme", "dark");
    }
    const isDark = localStorage.getItem("theme") !== "light";
    document.body.classList.toggle("dark", isDark);
    if (demoIcon) demoIcon.innerHTML = isDark ? sunPath : moonPath;
    if (demoToggle) demoToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  }

  if (demoToggle) {
    demoToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      if (demoIcon) demoIcon.innerHTML = isDark ? sunPath : moonPath;
      demoToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    });
  }

  syncTheme();

  const roles = [
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

  function observeStaggeredEntrance(triggerElement, itemElements, delayMs, threshold = 0.1) {
    if (!triggerElement || !itemElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          itemElements.forEach((item, i) => {
            item.style.transitionDelay = `${i * delayMs}ms`;
            item.classList.add("visible");
          });
          // unobserve after first intersection — avoids redundant callback overhead on scroll
          observer.unobserve(triggerElement);
        }
      });
    }, { threshold });

    observer.observe(triggerElement);
  }

  if (gallery) {
    desainList.forEach((name) => {
      const imgPath = `img/${name}.webp`;
      const item = document.createElement("div");
      item.className = "gallery-item";
      item.innerHTML = `<img src="${imgPath}" alt="${name}" loading="lazy" decoding="async">`;
      item.addEventListener("click", () => openLightbox(imgPath));
      gallery.appendChild(item);
    });

    // staggered IntersectionObserver — threshold 0.05 triggers early to hide initial paint flash
    observeStaggeredEntrance(gallery, gallery.querySelectorAll(".gallery-item"), 80, 0.05);
  }

  // .project-card — threshold 0.10; 120ms stagger between cards
  const webProjectsGrid = document.querySelector(".web-projects-grid");
  if (webProjectsGrid) {
    observeStaggeredEntrance(webProjectsGrid, document.querySelectorAll(".project-card"), 120, 0.10);
  }

  // .social-card — threshold 0.15; 100ms stagger
  const socialGrid = document.querySelector(".socials-grid");
  const socialCards = document.querySelectorAll(".social-card");
  if (socialGrid && socialCards.length) {
    observeStaggeredEntrance(socialGrid, socialCards, 100, 0.15);
  }

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 300);
    }, { passive: true });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // anchor scroll — manual scrollTo overrides native behavior to compensate fixed nav height
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector(".demo-nav")?.offsetHeight ?? 70;
      const offset = navHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (dot && ring && window.matchMedia("(pointer: fine)").matches) {
    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    (function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
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