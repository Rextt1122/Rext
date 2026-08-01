// Always scroll to top on reload
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

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

    setTimeout(typeSys, 2400); // Wait for boot sequence to finish
  }

  // --- CLI Terminal Easter Egg (Obfuscated) ---
  const statusIndicator = document.querySelector(".status-indicator");
  let tInit = false;
  let tOverlay, tInput, tOutput, tClose;

  function initT() {
    if (tInit) return;
    const tHtml = atob("PGRpdiBpZD0idGVybWluYWwtb3ZlcmxheSIgY2xhc3M9ImhpZGRlbiI+PGRpdiBjbGFzcz0idGVybWluYWwtaGVhZGVyIj48c3BhbiBjbGFzcz0idGVybWluYWwtdGl0bGUiPmZhYmlhbkBzeXN0ZW06fjwvc3Bhbj48YnV0dG9uIGlkPSJ0ZXJtaW5hbC1jbG9zZSIgYXJpYS1sYWJlbD0iQ2xvc2UgdGVybWluYWwiPsOXPC9idXR0b24+PC9kaXY+PGRpdiBpZD0idGVybWluYWwtb3V0cHV0Ij48cD5GYWJpYW5PUyAoYykgMjAyNS4gQWxsIHJpZ2h0cyByZXNlcnZlZC48L3A+PHA+VHlwZSA8c3BhbiBzdHlsZT0iY29sb3I6dmFyKC0tYWNjZW50LWNvbG9yKTsiPmhlbHA8L3NwYW4+IGZvciBhIGxpc3Qgb2YgYXZhaWxhYmxlIGNvbW1hbmRzLjwvcD48L2Rpdj48ZGl2IGNsYXNzPSJ0ZXJtaW5hbC1pbnB1dC1saW5lIj48c3BhbiBjbGFzcz0idGVybWluYWwtcHJvbXB0Ij5ndWVzdEBmYWJpYW46fiQ8L3NwYW4+PGlucHV0IHR5cGU9InRleHQiIGlkPSJ0ZXJtaW5hbC1pbnB1dCIgYXV0b2NvbXBsZXRlPSJvZmYiIHNwZWxsY2hlY2s9ImZhbHNlIiBhdXRvZm9jdXM+PC9kaXY+PC9kaXY+");
    document.body.insertAdjacentHTML('beforeend', tHtml);
    tOverlay = document.getElementById("terminal-overlay");
    tInput = document.getElementById("terminal-input");
    tOutput = document.getElementById("terminal-output");
    tClose = document.getElementById("terminal-close");

    tClose.addEventListener("click", () => tOverlay.classList.add("hidden"));

    tInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        const cmd = this.value.trim().toLowerCase();
        this.value = "";
        if (cmd === "") return;
        
        const pLine = (t, c="#fafafa") => {
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