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
  // Enterprise Contact & Architectural Briefing Form
  var form = document.getElementById("contact-form");
  if (form) {
    var params = new URLSearchParams(window.location.search);
    var industry = (params.get("industry") || "").trim();
    var messageField = document.getElementById("message");
    var practiceSelect = document.getElementById("practice");

    if (industry) {
      if (messageField && !messageField.value) {
        messageField.value =
          "Hello ForgeArc Architecture Team,\n\n" +
          "We are exploring an enterprise initiative within the " + industry + " domain.\n\n" +
          "Current Architectural Landscape:\n" +
          "Key Technical Bottlenecks / Modernization Goals:\n" +
          "Scale & Latency Target (e.g. req/sec, p99 target):\n" +
          "Target Timeline & Delivery Milestones:\n\n" +
          "We would like to request an introductory architecture review session.";
      }
      if (practiceSelect && !practiceSelect.value) {
        for (var i = 0; i < practiceSelect.options.length; i++) {
          if (practiceSelect.options[i].text.toLowerCase().indexOf(industry.toLowerCase()) !== -1) {
            practiceSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();
      var practice = (data.get("practice") || industry || "General Architecture").toString().trim();
      var model = (data.get("engagement_model") || "Standard Pod").toString().trim();
      var budget = (data.get("budget") || "To be scoped").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        status.textContent = "Please provide your name, corporate email, and project scope.";
        status.className = "form-status show err";
        return;
      }

      var subjectLine = "Enterprise Architectural Briefing: " + (company ? company + " — " : "") + name + " [" + practice + "]";
      var subject = encodeURIComponent(subjectLine);
      var body = encodeURIComponent(
        "EXECUTIVE BRIEFING REQUEST — FORGEARC TECHNOLOGIES\n" +
        "====================================================\n\n" +
        "Lead Name: " + name + "\n" +
        "Work Email: " + email + "\n" +
        "Organization: " + (company || "Confidential") + "\n" +
        "Practice Domain: " + practice + "\n" +
        "Engagement Model: " + model + "\n" +
        "Scope / Budget: " + budget + "\n\n" +
        "ARCHITECTURAL OBJECTIVE & SCOPE:\n" +
        "----------------------------------------------------\n" +
        message + "\n\n" +
        "====================================================\n" +
        "Sent via ForgeArc Enterprise Gateway"
      );

      status.textContent = "Launching secure email client to deliver briefing request…";
      status.className = "form-status show ok";
      window.location.href = "mailto:enterprise@forgearc.co.in?cc=contact@forgearc.co.in&subject=" + subject + "&body=" + body;
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
  // Enterprise Command Palette (Cmd+K / Ctrl+K)
  // ==========================================================================
  var searchIndex = [
    { title: "Enterprise Cloud Platforms", group: "Practices", desc: "Distributed architectures, microservices & multi-cloud", url: "services.html#custom-software" },
    { title: "Applied AI & Autonomous Agents", group: "Practices", desc: "LLMOps, RAG pipelines, fine-tuned models & workflow intelligence", url: "services.html#ai" },
    { title: "Web & Native Mobile Platforms", group: "Practices", desc: "High-concurrency React, iOS & Android platforms", url: "services.html#apps" },
    { title: "Legacy Core Modernization", group: "Practices", desc: "Monolith-to-cloud migration, DevSecOps & SRE governance", url: "services.html#digitalization" },
    { title: "High-Throughput Commerce", group: "Practices", desc: "Global multi-currency checkout & headless storefronts", url: "services.html#ecommerce" },
    { title: "Banking, Financial Services & Insurance (BFSI)", group: "Industries", desc: "Core banking, real-time ledgers & fraud intelligence", url: "industries.html" },
    { title: "Healthcare & Life Sciences", group: "Industries", desc: "HIPAA-compliant telemetry & clinical workflows", url: "industries.html" },
    { title: "Supply Chain & Autonomous Logistics", group: "Industries", desc: "Fleet telemetry, warehouse routing & cold-chain", url: "industries.html" },
    { title: "Advanced Manufacturing & IoT", group: "Industries", desc: "Industry 4.0 telemetry, edge nodes & predictive maintenance", url: "industries.html" },
    { title: "Global Fintech Settlement Engine Case Study", group: "Case Studies", desc: "Sub-10ms transaction ledger for financial enterprise", url: "portfolio.html" },
    { title: "Healthcare Telemetry Exchange Case Study", group: "Case Studies", desc: "HIPAA-compliant distributed data network", url: "portfolio.html" },
    { title: "Autonomous Fleet Intelligence Case Study", group: "Case Studies", desc: "Predictive cold-chain routing across 12 countries", url: "portfolio.html" },
    { title: "Global Delivery Hubs & Advisory Board", group: "Governance", desc: "Pune, Bengaluru, Singapore & Americas Delivery", url: "about.html" },
    { title: "ISO/IEC 27001 & SOC 2 Security Framework", group: "Governance", desc: "Zero-Trust architecture & data residency compliance", url: "about.html#compliance" },
    { title: "Submit Enterprise RFP / Request Briefing", group: "Engagement", desc: "Schedule a confidential architectural consultation", url: "contact.html" }
  ];

  function createCommandPalette() {
    if (document.getElementById("cmd-palette-backdrop")) return;

    var backdrop = document.createElement("div");
    backdrop.id = "cmd-palette-backdrop";
    backdrop.className = "cmd-modal-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.setAttribute("aria-label", "Global Enterprise Search");

    backdrop.innerHTML =
      '<div class="cmd-modal">' +
        '<div class="cmd-input-wrap">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
          '<input type="text" class="cmd-input" id="cmd-search-input" placeholder="Search enterprise practices, industries, case studies, compliance..." autocomplete="off">' +
          '<button type="button" id="cmd-close-btn" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:1.2rem;line-height:1;padding:4px 8px;" aria-label="Close search">&times;</button>' +
        '</div>' +
        '<div class="cmd-results" id="cmd-results-list"></div>' +
        '<div class="cmd-footer">' +
          '<span>Navigate with <kbd class="kbd-shortcut">&uarr;</kbd> <kbd class="kbd-shortcut">&darr;</kbd> &bull; Press <kbd class="kbd-shortcut">Enter</kbd> to select</span>' +
          '<span>Press <kbd class="kbd-shortcut">ESC</kbd> to exit</span>' +
        '</div>' +
      '</div>';

    document.body.appendChild(backdrop);

    var input = document.getElementById("cmd-search-input");
    var list = document.getElementById("cmd-results-list");
    var closeBtn = document.getElementById("cmd-close-btn");
    var selectedIndex = 0;

    function renderResults(query) {
      var q = (query || "").toLowerCase().trim();
      var filtered = searchIndex.filter(function (item) {
        return !q || item.title.toLowerCase().indexOf(q) !== -1 || item.desc.toLowerCase().indexOf(q) !== -1 || item.group.toLowerCase().indexOf(q) !== -1;
      });

      if (!filtered.length) {
        list.innerHTML = '<div style="padding:24px;text-align:center;color:var(--muted);font-size:0.9rem;">No matching enterprise capabilities found. Try "AI", "Fintech", "Cloud", or "Compliance".</div>';
        return;
      }

      var html = "";
      var currentGroup = "";
      filtered.forEach(function (item, idx) {
        if (item.group !== currentGroup) {
          currentGroup = item.group;
          html += '<div class="cmd-group-title">' + currentGroup + '</div>';
        }
        var isSel = idx === selectedIndex ? " selected" : "";
        html += '<a href="' + item.url + '" class="cmd-item' + isSel + '" data-idx="' + idx + '">' +
                  '<div>' +
                    '<div style="font-weight:600;">' + item.title + '</div>' +
                    '<div class="cmd-item-desc">' + item.desc + '</div>' +
                  '</div>' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
                '</a>';
      });
      list.innerHTML = html;
    }

    function openModal() {
      backdrop.classList.add("open");
      selectedIndex = 0;
      renderResults("");
      window.setTimeout(function () { input.focus(); }, 60);
    }

    function closeModal() {
      backdrop.classList.remove("open");
      input.value = "";
    }

    input.addEventListener("input", function () {
      selectedIndex = 0;
      renderResults(input.value);
    });

    input.addEventListener("keydown", function (e) {
      var items = list.querySelectorAll(".cmd-item");
      if (!items.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        items.forEach(function (el, i) { el.classList.toggle("selected", i === selectedIndex); });
        items[selectedIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        items.forEach(function (el, i) { el.classList.toggle("selected", i === selectedIndex); });
        items[selectedIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (items[selectedIndex]) items[selectedIndex].click();
      } else if (e.key === "Escape") {
        closeModal();
      }
    });

    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (backdrop.classList.contains("open")) closeModal();
        else openModal();
      } else if (e.key === "Escape" && backdrop.classList.contains("open")) {
        closeModal();
      }
    });

    document.querySelectorAll(".nav-search-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    });
  }
  createCommandPalette();

  // ==========================================================================
  // Real-Time Hero Telemetry Simulator
  // ==========================================================================
  var pingElements = document.querySelectorAll("[data-live-ping]");
  if (pingElements.length) {
    window.setInterval(function () {
      pingElements.forEach(function (el) {
        var base = parseInt(el.getAttribute("data-base") || "12", 10);
        var variation = Math.floor(Math.random() * 5) - 2;
        var latency = Math.max(7, base + variation);
        el.textContent = latency + "ms";
      });
    }, 2800);
  }

  // ==========================================================================
  // Interactive Enterprise ROI & Scale Estimator
  // ==========================================================================
  var teamSlider = document.getElementById("roi-team-size");
  var workloadSlider = document.getElementById("roi-workloads");
  if (teamSlider && workloadSlider) {
    var updateROI = function () {
      var team = parseInt(teamSlider.value, 10);
      var workloads = parseInt(workloadSlider.value, 10);

      var teamValEl = document.getElementById("roi-team-val");
      var workloadValEl = document.getElementById("roi-workload-val");
      var velocityEl = document.getElementById("roi-velocity-res");
      var savingsEl = document.getElementById("roi-savings-res");
      var opsEl = document.getElementById("roi-ops-res");

      if (teamValEl) teamValEl.textContent = team + " Engineers";
      if (workloadValEl) workloadValEl.textContent = workloads + " Microservices";

      var velocity = Math.min(68, 30 + Math.round((workloads / 50) * 35));
      var annualSavings = Math.round((team * 4500) + (workloads * 3200));
      var opsThroughput = ((workloads * 180) + (team * 40)).toLocaleString();

      if (velocityEl) velocityEl.textContent = "+" + velocity + "%";
      if (savingsEl) savingsEl.textContent = "$" + Math.round(annualSavings / 1000) + "k/yr";
      if (opsEl) opsEl.textContent = opsThroughput + "k/mo";
    };

    teamSlider.addEventListener("input", updateROI);
    workloadSlider.addEventListener("input", updateROI);
    updateROI();
  }
})();
