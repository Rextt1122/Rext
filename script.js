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
    item.setAttribute("data-aos-duration", "1000"); 
    item.setAttribute("data-aos-delay", index * 200); 
    item.innerHTML = `<img src="${d.img}">`;
    gallery.appendChild(item);
});
