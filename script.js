const themeToggle = document.getElementById("themeToggle");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileNav = document.getElementById("mobileNav");

hamburgerBtn.addEventListener("click", () => {
    mobileNav.style.display =
        mobileNav.style.display === "flex" ? "none" : "flex";
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
