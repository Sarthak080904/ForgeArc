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
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
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
    document.addEventListener("click", function (e) {
      if (links.classList.contains("open") && !links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Sticky nav: shrinks + deepens on scroll
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      var scrolled = window.scrollY > 8;
      nav.classList.toggle("scrolled", scrolled);
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

  // ==========================================================================
  // Theme Toggle Controller (Dark / Light mode)
  // ==========================================================================
  var themeToggleBtns = document.querySelectorAll(".theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function getStoredTheme() {
    try {
      return localStorage.getItem("forgearc-theme");
    } catch (e) {
      return null;
    }
  }

  function getEffectiveTheme() {
    var stored = getStoredTheme();
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  }

  function updateToggleUI(theme) {
    var isLight = theme === "light";
    var label = isLight ? "Switch to dark mode" : "Switch to light mode";
    themeToggleBtns.forEach(function (btn) {
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
      btn.setAttribute("aria-pressed", isLight ? "true" : "false");
    });
    if (themeMeta) {
      themeMeta.setAttribute("content", isLight ? "#F8FAFC" : "#0A0F1E");
    }
  }

  function setTheme(theme, animate) {
    if (animate) {
      document.documentElement.classList.add("theme-transition");
      window.clearTimeout(window.__themeTransitionTimeout);
      window.__themeTransitionTimeout = window.setTimeout(function () {
        document.documentElement.classList.remove("theme-transition");
      }, 350);
    }
    document.documentElement.setAttribute("data-theme", theme);
    updateToggleUI(theme);
  }

  // Initialize theme from current attribute or preference
  var initialTheme = document.documentElement.getAttribute("data-theme") || getEffectiveTheme();
  setTheme(initialTheme, false);

  if (themeToggleBtns.length) {
    themeToggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") || "dark";
        var next = current === "light" ? "dark" : "light";
        try {
          localStorage.setItem("forgearc-theme", next);
        } catch (e) {}
        setTheme(next, true);
      });
    });

    if (window.matchMedia) {
      var colorSchemeQuery = window.matchMedia("(prefers-color-scheme: light)");
      var onSystemThemeChange = function (e) {
        if (!getStoredTheme()) {
          setTheme(e.matches ? "light" : "dark", true);
        }
      };
      if (colorSchemeQuery.addEventListener) {
        colorSchemeQuery.addEventListener("change", onSystemThemeChange);
      } else if (colorSchemeQuery.addListener) {
        colorSchemeQuery.addListener(onSystemThemeChange);
      }
    }
  }

  // ==========================================================================
  // Reading Progress Bar
  // ==========================================================================
  var progressBar = document.querySelector('.progress-bar-top');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      progressBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }, { passive: true });
  }

  // ==========================================================================
  // Card Cursor Spotlight (Desktop)
  // ==========================================================================
  if (window.matchMedia('(min-width: 900px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.card, .estimator-box, .forge-demo-box').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      });
    });
  }

  // ==========================================================================
  // Floating Action Hub & Back to Top
  // ==========================================================================
  var backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // FAQ Accordion
  // ==========================================================================
  var faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach(function (item) {
      var header = item.querySelector('.faq-header');
      if (!header) return;
      header.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        faqItems.forEach(function (other) { other.classList.remove('open'); });
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  // ==========================================================================
  // Interactive Project Estimator
  // ==========================================================================
  var estimatorContainer = document.querySelector('.estimator-box');
  if (estimatorContainer) {
    var basePrices = {
      'web': 45000,
      'mobile': 75000,
      'ai': 60000,
      'ecommerce': 55000,
      'enterprise': 120000
    };
    var baseWeeks = {
      'web': 3,
      'mobile': 5,
      'ai': 4,
      'ecommerce': 4,
      'enterprise': 8
    };

    var featureCosts = {
      'auth': 10000,
      'crm': 25000,
      'chatbot': 30000,
      'payment': 15000,
      'scale': 35000
    };

    var currentType = 'web';
    var selectedFeatures = ['auth', 'crm'];
    var currentSpeed = 'standard';

    function updateEstimator() {
      var base = basePrices[currentType] || 45000;
      var weeks = baseWeeks[currentType] || 3;

      selectedFeatures.forEach(function (f) {
        base += (featureCosts[f] || 0);
        weeks += 0.8;
      });

      if (currentSpeed === 'fast') {
        base *= 1.25;
        weeks = Math.max(2, Math.round(weeks * 0.65));
      } else {
        weeks = Math.round(weeks);
      }

      var minPrice = Math.round(base * 0.9 / 1000) * 1000;
      var maxPrice = Math.round(base * 1.2 / 1000) * 1000;

      var priceEl = document.getElementById('est-price');
      var timeEl = document.getElementById('est-time');
      var ctaEl = document.getElementById('est-cta');

      if (priceEl) priceEl.textContent = '₹' + minPrice.toLocaleString('en-IN') + ' – ₹' + maxPrice.toLocaleString('en-IN');
      if (timeEl) timeEl.textContent = '~ ' + weeks + ' to ' + (weeks + 2) + ' weeks to MVP launch';
      if (ctaEl) {
        var query = encodeURIComponent('Estimated scope: ' + currentType.toUpperCase() + ' with ' + selectedFeatures.join(', ') + ' (' + currentSpeed + ')');
        ctaEl.href = 'contact.html?estimate=' + query;
      }
    }

    document.querySelectorAll('.chip-type').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.chip-type').forEach(function (c) { c.classList.remove('selected'); });
        chip.classList.add('selected');
        currentType = chip.getAttribute('data-val');
        updateEstimator();
      });
    });

    document.querySelectorAll('.chip-feature').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var val = chip.getAttribute('data-val');
        chip.classList.toggle('selected');
        var idx = selectedFeatures.indexOf(val);
        if (idx > -1) {
          selectedFeatures.splice(idx, 1);
        } else {
          selectedFeatures.push(val);
        }
        updateEstimator();
      });
    });

    document.querySelectorAll('.chip-speed').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.chip-speed').forEach(function (c) { c.classList.remove('selected'); });
        chip.classList.add('selected');
        currentSpeed = chip.getAttribute('data-val');
        updateEstimator();
      });
    });

    updateEstimator();
  }

  // ==========================================================================
  // Generative UI / AI App Builder Interactive Demo
  // ==========================================================================
  var demoContainer = document.querySelector('.forge-demo-box');
  if (demoContainer) {
    var demoBlueprints = {
      'erp': {
        name: 'Enterprise ERP & Inventory Engine',
        routes: ['GET /api/v1/inventory/telemetry', 'POST /api/v1/orders/dispatch', 'WS /stream/warehouse-sync'],
        stack: 'Next.js 15, FastAPI, PostgreSQL, Redis',
        metrics: { speed: '+4.2x', latency: '14ms', automation: '85%' }
      },
      'agent': {
        name: 'Autonomous AI Support & Operations Agent',
        routes: ['POST /agent/orchestrate/intent', 'GET /vector/knowledge/query', 'POST /actions/ticket/resolve'],
        stack: 'Python GenAI SDK, Vector Store, WebSocket live stream',
        metrics: { speed: '+6.8x', latency: '22ms', automation: '94%' }
      },
      'market': {
        name: 'B2B Marketplace & Automated Escrow',
        routes: ['POST /api/v1/b2b/quote/request', 'POST /payments/razorpay/webhook', 'GET /analytics/buyer-demand'],
        stack: 'React, Node.js Microservices, MongoDB, S3',
        metrics: { speed: '+3.5x', latency: '18ms', automation: '78%' }
      }
    };

    var currentBlueprint = 'erp';
    var enabledAiModules = ['ocr', 'rag'];

    function updateDemoSimulation() {
      var bp = demoBlueprints[currentBlueprint] || demoBlueprints.erp;
      var terminalEl = document.getElementById('demo-terminal-code');
      var statSpeed = document.getElementById('demo-stat-speed');
      var statLatency = document.getElementById('demo-stat-latency');
      var statAuto = document.getElementById('demo-stat-auto');

      if (statSpeed) statSpeed.textContent = bp.metrics.speed;
      if (statLatency) statLatency.textContent = bp.metrics.latency;
      if (statAuto) statAuto.textContent = bp.metrics.automation;

      if (terminalEl) {
        var modulesText = enabledAiModules.map(function(m){ return '  ├── [Active] module.' + m + ' (Autonomous Worker Node)'; }).join('
');
        var routesText = bp.routes.map(function(r){ return '  ├── route: ' + r; }).join('
');

        terminalEl.textContent = 
          '// ForgeArc Architecture Blueprint: ' + bp.name + '
' +
          '// Target Stack: ' + bp.stack + '

' +
          'SystemTopology {
' +
          '  status: ACTIVE_STABLE,
' +
          '  runtime: 'Edge-distributed Docker Cluster',
' +
          '  modules: [
' + (modulesText || '  ├── [None]') + '
  ],
' +
          '  endpoints: [
' + routesText + '
  ]
' +
          '}

' +
          '>> Ready for production staging mirror to GitHub main.';
      }
    }

    document.querySelectorAll('.chip-demo-type').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.chip-demo-type').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        currentBlueprint = chip.getAttribute('data-bp');
        updateDemoSimulation();
      });
    });

    document.querySelectorAll('.chip-demo-ai').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var mod = chip.getAttribute('data-module');
        chip.classList.toggle('active');
        var idx = enabledAiModules.indexOf(mod);
        if (idx > -1) {
          enabledAiModules.splice(idx, 1);
        } else {
          enabledAiModules.push(mod);
        }
        updateDemoSimulation();
      });
    });

    updateDemoSimulation();
  }

})();
