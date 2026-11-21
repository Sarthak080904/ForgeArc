// ForgeArc — page behaviour (runs after layout.js has injected header/footer)
(function () {
  "use strict";
  // ---- Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  function closeNav() {
    if (!links) return;
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
  }

  // ---- Whole-card links (industries): the inner <a> stays the real link for keyboard users
  document.querySelectorAll("[data-href]").forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      window.location.href = card.getAttribute("data-href");
    });
  });

  // ---- Tabs (home: starting point)
  var tabs = document.querySelectorAll('[role="tab"]');
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      var next = tabs[(i + d + tabs.length) % tabs.length];
      selectTab(next);
      next.focus();
    });
  });

  // ---- Reveal on scroll
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- Contact form: static site, no backend — hand off to the visitor's mail app
  var form = document.getElementById("contact-form");
  if (form) {
    var industry = (new URLSearchParams(window.location.search).get("industry") || "").trim();
    var msg = document.getElementById("message");
    if (industry && msg && !msg.value) {
      msg.value = "Hi ForgeArc,\n\nI'm exploring a " + industry + " project.\n\n" +
        "Where we're based:\nWhat's slowing us down:\nWhat we want to build:\nTimeline:\n";
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var email = String(data.get("email") || "").trim();
      var message = String(data.get("message") || "").trim();
      if (!name || !email || !message) {
        status.textContent = "Add your name, email and a short message, then send again.";
        status.className = "form-status show err";
        return;
      }
      var subject = "New enquiry from " + name + (industry ? " (" + industry + ")" : "") + " via forgearc.co.in";
      var body = "Name: " + name + "\nEmail: " + email +
        "\nCompany: " + (data.get("company") || "-") +
        "\nBudget: " + (data.get("budget") || "-") +
        "\nIndustry: " + (industry || "-") + "\n\n" + message;
      status.textContent = "Opening your email app with this message filled in.";
      status.className = "form-status show ok";
      window.location.href = "mailto:contact@forgearc.co.in?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
})();
