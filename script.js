// Always scroll to top on reload
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (mobileMenuBtn && mobileMenu) {
    const card = document.getElementById("mobile-menu-card");
    const backdrop = document.getElementById("mobile-menu-backdrop");

    function openMobileMenu() {
      // Show overlay first (display:flex), then animate card from scale-0 to scale-100
      mobileMenu.style.display = "flex";
      // Use rAF to ensure display:flex is applied before transition starts
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.transform = "scale(1)";
          card.style.opacity = "1";
        });
      });
    }

    function closeMobileMenu() {
      // Animate card back to scale-0
      card.style.transform = "scale(0)";
      card.style.opacity = "0";
      // Hide overlay after animation completes
      setTimeout(() => {
        mobileMenu.style.display = "none";
      }, 300);
    }

    // Set initial card state via inline style
    card.style.transform = "scale(0)";
    card.style.opacity = "0";

    mobileMenuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.style.display === "none" || mobileMenu.style.display === "";
      if (isHidden) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });

    const mobileMenuClose = document.getElementById("mobile-menu-close");
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", closeMobileMenu);
    }

    // Close on backdrop click
    if (backdrop) {
      backdrop.addEventListener("click", closeMobileMenu);
    }

    mobileLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        closeMobileMenu();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      });
    });
  }

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

  // ── Lightbox ──────────────────────────────────────────────────
  let currentIndex = 0;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = `
    <div class="lightbox-outer">
      <button class="lightbox-nav" id="lb-prev" aria-label="Previous image">&#8592;</button>
      <div class="lightbox-content">
        <div class="lightbox-topbar">
          <div class="lightbox-label">
            <span class="lb-prefix">IMG.PREVIEW_</span><span id="lb-name"></span>
          </div>
          <div class="lightbox-counter" id="lb-counter">1 / ${desainList.length}</div>
          <button class="lightbox-close" aria-label="Close preview">&times;</button>
        </div>
        <div class="lightbox-img-wrap">
          <img class="lightbox-img" id="lb-img" src="" alt="preview">
        </div>
        <div class="lightbox-bottombar">ESC / CLICK OUTSIDE TO CLOSE &nbsp;&bull;&nbsp; &#8592; &#8594; TO NAVIGATE</div>
        <div class="lightbox-swipe-hint">&#8592;&nbsp; SWIPE TO NAVIGATE &nbsp;&#8594;</div>
      </div>
      <button class="lightbox-nav" id="lb-next" aria-label="Next image">&#8594;</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lbImg = document.getElementById("lb-img");
  const lbName = document.getElementById("lb-name");
  const lbCounter = document.getElementById("lb-counter");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");
  const lbClose = lightbox.querySelector(".lightbox-close");

  function updateNav() {
    lbCounter.textContent = `${currentIndex + 1} / ${desainList.length}`;
    lbName.textContent = desainList[currentIndex].toUpperCase();
    lbPrev.disabled = currentIndex === 0;
    lbNext.disabled = currentIndex === desainList.length - 1;
  }

  function showImage(index) {
    currentIndex = Math.max(0, Math.min(index, desainList.length - 1));
    lbImg.classList.add("loading");
    lbImg.src = `img/${desainList[currentIndex]}.webp`;
    lbImg.alt = desainList[currentIndex];
    updateNav();
  }

  lbImg.addEventListener("load", () => lbImg.classList.remove("loading"));
  lbImg.addEventListener("error", () => lbImg.classList.remove("loading"));

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", () => showImage(currentIndex - 1));
  lbNext.addEventListener("click", () => showImage(currentIndex + 1));

  // Backdrop click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation (active only when lightbox is open)
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") { e.preventDefault(); showImage(currentIndex - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); showImage(currentIndex + 1); }
  });

  // Touch swipe for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  lightbox.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    const dy = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) showImage(currentIndex + 1); // swipe left → next
      else showImage(currentIndex - 1); // swipe right → prev
    }
  }, { passive: true });

  if (gallery) {
    desainList.forEach((name, idx) => {
      const imgPath = `img/${name}.webp`;
      const item = document.createElement("div");
      item.className = "gallery-item gallery-reveal";
      item.style.transitionDelay = `${idx * 60}ms`;
      item.innerHTML = `<img src="${imgPath}" alt="${name}" loading="lazy" decoding="async">`;
      item.addEventListener("click", () => openLightbox(idx));
      gallery.appendChild(item);
    });

    // Scroll-reveal with IntersectionObserver
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("gallery-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    gallery.querySelectorAll(".gallery-reveal").forEach(el => revealObserver.observe(el));
  }

  // --- Projects Scroll Reveal ---
  const projectCards = document.querySelectorAll("#projects .project-reveal");
  if (projectCards.length > 0) {
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("project-visible");
          projectObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    projectCards.forEach((card, idx) => {
      card.style.setProperty("--card-idx", idx);
      projectObserver.observe(card);
    });
  }

  // --- CLI Terminal Easter Egg (open with ` or ~) ---
  let tInit = false;
  let tOverlay, tInput, tOutput, tClose;

  function initT() {
    if (tInit) return;
    const tHtml = `
      <div id="terminal-overlay" class="hidden">
        <div class="terminal-header">
          <span class="terminal-title">fabian@system:~</span>
          <button id="terminal-close" aria-label="Close terminal">X</button>
        </div>
        <div id="terminal-output">
          <p>FabianOS (c) 2026. All rights reserved.</p>
          <p>Type <span style="color:var(--accent-color);">help</span> for a list of available commands.</p>
        </div>
        <div class="terminal-input-line">
          <span class="terminal-prompt">guest@fabian:~$</span>
          <input type="text" id="terminal-input" autocomplete="off" spellcheck="false" autofocus>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', tHtml);
    tOverlay = document.getElementById("terminal-overlay");
    tInput = document.getElementById("terminal-input");
    tOutput = document.getElementById("terminal-output");
    tClose = document.getElementById("terminal-close");

    tClose.addEventListener("click", () => tOverlay.classList.add("hidden"));

    tInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const cmd = this.value.trim().toLowerCase();
        this.value = "";
        if (cmd === "") return;

        const pLine = (t, c = "#fafafa") => {
          const p = document.createElement("p");
          p.style.color = c; p.textContent = t;
          tOutput.appendChild(p);
          tOutput.scrollTop = tOutput.scrollHeight;
        };

        pLine(`guest@fabian:~$ ${cmd}`, "var(--accent-color)");

        // Commands evaluation
        const cmds = {
          help: () => [
            "Available commands:",
            "  whoami   - Display information about me",
            "  skills   - List my technical skills",
            "  projects - See what I've been working on",
            "  clear    - Clear terminal output",
            "  exit     - Close the terminal"
          ],
          whoami: () => [
            "Fabian Hendriyansah.",
            "Computer Engineering student, Frontend Developer, and UI/UX Designer."
          ],
          skills: () => [
            "Python, PHP, Laravel, JavaScript, TailwindCSS, FastAPI, Docker, Git, MySQL, Figma, Arduino, Flutter."
          ],
          projects: () => [
            "Check out the WEB PROJECTS section on this page!",
            "- Weather App",
            "- Sign Language Recognition",
            "- Image Upscaler",
            "- Jamkot",
            "- Sticker",
            "- Dashboard"
          ],
          sudo: () => [
            "Nice try. You are not in the sudoers file. This incident will be reported."
          ],
          clear: () => { tOutput.innerHTML = ""; return null; },
          exit: () => { tOverlay.classList.add("hidden"); return null; }
        };

        if (cmds[cmd]) {
          const res = cmds[cmd]();
          if (res) res.forEach(r => pLine(r));
        } else {
          pLine(`bash: ${cmd}: command not found`);
        }
      }
    });
    tInit = true;
  }

  function togT() {
    if (!tInit) initT();
    if (tOverlay.classList.contains("hidden")) {
      tOverlay.classList.remove("hidden");
      setTimeout(() => tInput.focus(), 300);
    } else {
      tOverlay.classList.add("hidden");
      tInput.blur();
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "`" || e.key === "~" || (e.ctrlKey && e.key === "`")) {
      e.preventDefault();
      togT();
    }
  });

  // --- GitHub Repo Dates Sync ---
  // Unauthenticated api.github.com allows 60 req/hr per IP, and a shadowban or
  // offline visit turns every card into ERROR. So: cache in localStorage with a
  // 6h TTL, fall back to the stale cache when a fetch fails, then to the
  // hardcoded data-fallback date, and finally hide the badge rather than print
  // a fake value.
  const GH_CACHE_KEY = "rext.gh.pushdates";
  const GH_CACHE_TTL = 6 * 60 * 60 * 1000;

  const githubDateSpans = document.querySelectorAll(".github-date");
  if (githubDateSpans.length > 0) {
    const readCache = () => {
      try {
        return JSON.parse(localStorage.getItem(GH_CACHE_KEY)) || {};
      } catch {
        return {};
      }
    };
    const writeCache = (cache) => {
      try {
        localStorage.setItem(GH_CACHE_KEY, JSON.stringify(cache));
      } catch {
        /* private mode / quota — cache is optional, not required */
      }
    };
    const formatDate = (value) => {
      const d = new Date(value);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    const resolveRepoDate = async (repo, cache) => {
      const hit = cache[repo];
      if (hit && Date.now() - hit.t < GH_CACHE_TTL) {
        return { text: `LAST_PUSH: ${hit.d}`, stale: false };
      }

      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const d = formatDate(data.pushed_at || data.updated_at);
        cache[repo] = { d, t: Date.now() };
        return { text: `LAST_PUSH: ${d}`, stale: false };
      } catch {
        // rate limited, shadowbanned, or offline: a stale date beats no date
        if (hit) return { text: `LAST_PUSH: ${hit.d}`, stale: true };
        return null;
      }
    };

    const cache = readCache();

    Promise.all(
      [...githubDateSpans].map(async (span) => {
        const repo = span.getAttribute("data-repo");
        if (!repo) return;

        const resolved = await resolveRepoDate(repo, cache);
        if (resolved) {
          span.textContent = resolved.text;
          if (resolved.stale) span.title = "Cached date — GitHub API unreachable";
          return;
        }

        const fallback = span.getAttribute("data-fallback");
        if (fallback) {
          span.textContent = `LAST_PUSH: ${fallback}`;
          span.title = "Fallback date — GitHub API unreachable";
          return;
        }

        // no date of any kind: hide the badge instead of printing a lie
        span.hidden = true;
      })
    ).then(() => writeCache(cache));
  }
});