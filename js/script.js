// ForgeArc Technologies — shared site behaviour
(function () {
  "use strict";

  // Mouse-tracking spotlight on hero (desktop only, respects reduced motion)
  var spotlight = document.querySelector(".hero-spotlight");
  var heroForSpotlight = document.querySelector(".hero");
  if (spotlight && heroForSpotlight && window.matchMedia("(min-width: 900px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroForSpotlight.addEventListener("mousemove", function (e) {
      var rect = heroForSpotlight.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      spotlight.style.setProperty("--sx", x + "%");
      spotlight.style.setProperty("--sy", y + "%");
    });
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Sticky nav: shrinks + deepens on scroll
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      var scrolled = window.scrollY > 8;
      nav.classList.toggle("scrolled", scrolled);
      nav.style.boxShadow = scrolled ? "0 8px 24px rgba(3,10,22,0.25)" : "none";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Clickable industry cards route visitors into a contextual enquiry.
  document.querySelectorAll(".industry-card[data-href]").forEach(function (card) {
    var href = card.getAttribute("data-href");
    if (!href) return;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "link");
    card.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      window.location.href = href;
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = href;
      }
    });
  });

  // Count-up for numeric hero/stat figures marked with data-count
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    var animateCount = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1100;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(target * eased);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      var cio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(function (el) { el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || ""); });
    }
  }

  // Subtle parallax drift for hero orbs, following the cursor (desktop only)
  var heroOrbs = document.querySelectorAll(".hero-orb");
  var heroSection = document.querySelector(".hero");
  if (heroOrbs.length && heroSection && window.matchMedia("(min-width: 900px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroSection.addEventListener("mousemove", function (e) {
      var rect = heroSection.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      heroOrbs.forEach(function (orb, i) {
        var depth = (i + 1) * 8;
        orb.style.animationPlayState = "paused";
        orb.style.transform = "translate(" + (x * depth) + "px, " + (y * depth) + "px)";
      });
    });
    heroSection.addEventListener("mouseleave", function () {
      heroOrbs.forEach(function (orb) {
        orb.style.transform = "";
        orb.style.animationPlayState = "running";
      });
    });
  }

  // Scroll reveal (fade-up and scale-in)
  var revealEls = document.querySelectorAll(".reveal, .scale-in");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  // Stage tabs (index: Small / Medium / Startup problems)
  var tabs = document.querySelectorAll(".stage-tab");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-target");
        document.querySelectorAll(".stage-tab").forEach(function (t) { t.classList.remove("active"); });
        document.querySelectorAll(".stage-panel").forEach(function (p) { p.classList.remove("active"); });
        tab.classList.add("active");
        var panel = document.querySelector('[data-panel="' + target + '"]');
        if (panel) panel.classList.add("active");
      });
    });
  }

  // Contact form — static site, no backend: confirm + mailto handoff
  var form = document.getElementById("contact-form");
  if (form) {
    var params = new URLSearchParams(window.location.search);
    var industry = (params.get("industry") || "").trim();
    var messageField = document.getElementById("message");
    if (industry && messageField && !messageField.value) {
      messageField.value =
        "Hi ForgeArc,\n\n" +
        "I am exploring a " + industry + " project for a Pune-based business.\n\n" +
        "Business location / area in Pune:\n" +
        "Current challenge:\n" +
        "What we want to build:\n" +
        "Timeline:\n\n" +
        "Please suggest the next steps.";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill in your name, email, and message.";
        status.className = "form-status show err";
        return;
      }

      var subjectLine = "New Pune enquiry from " + name;
      if (industry) subjectLine += " - " + industry;
      var subject = encodeURIComponent(subjectLine + " — ForgeArc website");
      var body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\nCompany: " + (data.get("company") || "-") +
        "\nBudget: " + (data.get("budget") || "-") +
        "\nIndustry: " + (industry || "-") +
        "\n\nMessage:\n" + message
      );

      status.textContent = "Opening your email client to send this to ForgeArc…";
      status.className = "form-status show ok";
      window.location.href = "mailto:contact@forgearc.co.in?subject=" + subject + "&body=" + body;
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
