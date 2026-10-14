// ===== Theme: apply saved theme immediately (no flash) =====
(function () {
  var saved = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
})();

document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle button
  var btn = document.getElementById("themeBtn");
  function updateIcon() {
    var t = document.documentElement.getAttribute("data-theme");
    btn.textContent = t === "dark" ? "☀️" : "🌙";
  }
  updateIcon();
  btn.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon();
  });

  // Mobile menu (closes after clicking a link)
  var menu = document.getElementById("menuBtn");
  var links = document.getElementById("navLinks");
  menu.addEventListener("click", function () { links.classList.toggle("open"); });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { links.classList.remove("open"); });
  });

  // Reveal cards on scroll + animate skill bars
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        e.target.querySelectorAll(".bar span").forEach(function (b) {
          b.style.width = b.dataset.level + "%";
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // Highlight the navbar link of the section you are currently viewing
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { spy.observe(s); });
});