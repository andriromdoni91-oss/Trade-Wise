/* TradeWise — shared behaviour (loaded on every page) */
(function () {
  "use strict";
  var TG = "https://telegram.me/TradesWise";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Ensure every CTA / contact / join opens Telegram in a new tab */
  $$(".js-tg").forEach(function (el) {
    el.setAttribute("href", TG);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* Current year */
  var yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Theme toggle (persisted) */
  var root = document.documentElement;
  var saved = (function () { try { return localStorage.getItem("tw-theme"); } catch (e) { return null; } })();
  if (saved) root.setAttribute("data-theme", saved);
  var toggle = $("#themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("tw-theme", next); } catch (e) {}
    });
  }

  /* Sticky nav shadow on scroll */
  var nav = $("#nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 20); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile menu */
  var mm = $("#mobileMenu");
  var burger = $("#hamburger");
  if (mm && burger) {
    burger.addEventListener("click", function () { mm.classList.toggle("open"); });
    $$("#mobileMenu a").forEach(function (a) {
      a.addEventListener("click", function () { mm.classList.remove("open"); });
    });
  }
})();
