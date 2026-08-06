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
    mobileMenuBtn.addEventListener("click", () => {
      const isClosed = mobileMenu.classList.contains("-translate-y-full");
      if (isClosed) {
        mobileMenu.classList.remove("-translate-y-full");
        mobileMenuBtn.innerHTML = '<span class="text-[9px] tracking-widest font-bold">CLOSE ↑</span>';
      } else {
        mobileMenu.classList.add("-translate-y-full");
        mobileMenuBtn.innerHTML = '<span class="text-[9px] tracking-widest font-bold">MENU ↓</span>';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        mobileMenu.classList.add("-translate-y-full");
        mobileMenuBtn.innerHTML = '<span class="text-[9px] tracking-widest font-bold">MENU ↓</span>';
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
          }, 300); // Wait for menu to slide up before scrolling
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

  const lbImg     = document.getElementById("lb-img");
  const lbName    = document.getElementById("lb-name");
  const lbCounter = document.getElementById("lb-counter");
  const lbPrev    = document.getElementById("lb-prev");
  const lbNext    = document.getElementById("lb-next");
  const lbClose   = lightbox.querySelector(".lightbox-close");

  function updateNav() {
    lbCounter.textContent = `${currentIndex + 1} / ${desainList.length}`;
    lbName.textContent    = desainList[currentIndex].toUpperCase();
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

  lbImg.addEventListener("load",  () => lbImg.classList.remove("loading"));
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
  lbPrev.addEventListener("click",  () => showImage(currentIndex - 1));
  lbNext.addEventListener("click",  () => showImage(currentIndex + 1));

  // Backdrop click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation (active only when lightbox is open)
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape")      closeLightbox();
    if (e.key === "ArrowLeft")  { e.preventDefault(); showImage(currentIndex - 1); }
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
      else        showImage(currentIndex - 1); // swipe right → prev
    }
  }, { passive: true });

  if (gallery) {
    desainList.forEach((name, idx) => {
      const imgPath = `img/${name}.webp`;
      const item = document.createElement("div");
      item.className = "gallery-item";
      item.innerHTML = `<img src="${imgPath}" alt="${name}" loading="lazy" decoding="async">`;
      item.addEventListener("click", () => openLightbox(idx));
      gallery.appendChild(item);
    });

    function updateEmptyCells() {
      gallery.querySelectorAll('.empty-cell').forEach(e => e.remove());

      const cols = window.innerWidth >= 768 ? 6 : 2;
      const totalItems = desainList.length;
      const remainder = totalItems % cols;

      if (remainder !== 0) {
        const emptyCount = cols - remainder;
        for (let i = 0; i < emptyCount; i++) {
          const emptyItem = document.createElement("div");
          emptyItem.className = "gallery-item empty-cell";
          gallery.appendChild(emptyItem);
        }
      }
    }

    updateEmptyCells();
    window.addEventListener('resize', updateEmptyCells);
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

    setTimeout(typeSys, 500); // Start typing immediately
  }

  // --- CLI Terminal Easter Egg (Obfuscated) ---
  const statusIndicator = document.querySelector(".status-indicator");
  let tInit = false;
  let tOverlay, tInput, tOutput, tClose;

  function initT() {
    if (tInit) return;
    const tHtml = atob("PGRpdiBpZD0idGVybWluYWwtb3ZlcmxheSIgY2xhc3M9ImhpZGRlbiI+PGRpdiBjbGFzcz0idGVybWluYWwtaGVhZGVyIj48c3BhbiBjbGFzcz0idGVybWluYWwtdGl0bGUiPmZhYmlhbkBzeXN0ZW06fjwvc3Bhbj48YnV0dG9uIGlkPSJ0ZXJtaW5hbC1jbG9zZSIgYXJpYS1sYWJlbD0iQ2xvc2UgdGVybWluYWwiPlg8L2J1dHRvbj48L2Rpdj48ZGl2IGlkPSJ0ZXJtaW5hbC1vdXRwdXQiPjxwPkZhYmlhbk9TIChjKSAyMDI1LiBBbGwgcmlnaHRzIHJlc2VydmVkLjwvcD48cD5UeXBlIDxzcGFuIHN0eWxlPSJjb2xvcjp2YXIoLS1hY2NlbnQtY29sb3IpOyI+aGVscDwvc3Bhbj4gZm9yIGEgbGlzdCBvZiBhdmFpbGFibGUgY29tbWFuZHMuPC9wPjwvZGl2PjxkaXYgY2xhc3M9InRlcm1pbmFsLWlucHV0LWxpbmUiPjxzcGFuIGNsYXNzPSJ0ZXJtaW5hbC1wcm9tcHQiPmd1ZXN0QGZhYmlhbjp+JDwvc3Bhbj48aW5wdXQgdHlwZT0idGV4dCIgaWQ9InRlcm1pbmFsLWlucHV0IiBhdXRvY29tcGxldGU9Im9mZiIgc3BlbGxjaGVjaz0iZmFsc2UiIGF1dG9mb2N1cz48L2Rpdj48L2Rpdj4=");
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

        // Obfuscated commands evaluation
        const cmds = {
          [atob("aGVscA==")]: () => [atob("QXZhaWxhYmxlIGNvbW1hbmRzOg=="), atob("ICB3aG9hbWkgICAtIERpc3BsYXkgaW5mb3JtYXRpb24gYWJvdXQgbWU="), atob("ICBza2lsbHMgICAtIExpc3QgbXkgdGVjaG5pY2FsIHNraWxscw=="), atob("ICBwcm9qZWN0cyAtIFNlZSB3aGF0IEkndmUgYmVlbiB3b3JraW5nIG9u"), atob("ICBjbGVhciAgICAtIENsZWFyIHRlcm1pbmFsIG91dHB1dA=="), atob("ICBleGl0ICAgICAtIENsb3NlIHRoZSB0ZXJtaW5hbA==")],
          [atob("d2hvYW1p")]: () => [atob("RmFiaWFuIEhlbmRyaXlhbnNhaC4="), atob("Q29tcHV0ZXIgRW5naW5lZXJpbmcgc3R1ZGVudCwgRnJvbnRlbmQgRGV2ZWxvcGVyLCBhbmQgVUkvVVggRGVzaWduZXIu")],
          [atob("c2tpbGxz")]: () => [atob("UHl0aG9uLCBQSFAsIExhcmF2ZWwsIEphdmFzY3JpcHQsIFRhaWx3aW5kQ1NTLCBGYXN0QVBJLCBEb2NrZXIsIEdpdCwgTXlTUUwsIEZpZ21hLCBBcmR1aW5vLCBGbHV0dGVyLg==")],
          [atob("cHJvamVjdHM=")]: () => [atob("Q2hlY2sgb3V0IHRoZSBXRUIgUFJPSkVDVFMgc2VjdGlvbiBvbiB0aGlzIHBhZ2Uh"), atob("LSBXZWF0aGVyIEFwcA=="), atob("LSBTaWduIExhbmd1YWdlIFJlY29nbml0aW9u"), atob("LSBJbWFnZSBVcHNjYWxlcg=="), atob("LSBKYW1rb3Q=")],
          [atob("c3Vkbw==")]: () => [atob("TmljZSB0cnkuIFlvdSBhcmUgbm90IGluIHRoZSBzdWRvZXJzIGZpbGUuIFRoaXMgaW5jaWRlbnQgd2lsbCBiZSByZXBvcnRlZC4=")],
          [atob("Y2xlYXI=")]: () => { tOutput.innerHTML = ""; return null; },
          [atob("ZXhpdA==")]: () => { tOverlay.classList.add("hidden"); return null; }
        };

        if (cmds[cmd]) {
          const res = cmds[cmd]();
          if (res) res.forEach(r => pLine(r));
        } else {
          pLine(atob("YmFzaDog") + cmd + atob("OiBjb21tYW5kIG5vdCBmb3VuZA=="));
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

  if (statusIndicator) statusIndicator.addEventListener("click", togT);
  document.addEventListener("keydown", (e) => {
    if (e.key === "`" || e.key === "~" || (e.ctrlKey && e.key === "`")) {
      e.preventDefault();
      togT();
    }
  });
});