// ForgeArc Technologies — shared footer, injected so every page stays in sync
(function () {
  "use strict";
  var el = document.getElementById("site-footer");
  if (!el) return;

  el.innerHTML =
    '<div class="container">' +
      '<div class="footer-grid">' +
        '<div>' +
          '<div class="footer-brand">' +
            '<img class="icon-img" src="assets/mark.png" alt="" loading="lazy">' +
            '<img class="word-img" src="assets/wordmark.png" alt="ForgeArc Technologies" loading="lazy">' +
            '<img class="sub-img" src="assets/subtitle.png" alt="Pvt. Ltd." loading="lazy">' +
          '</div>' +
          '<p style="max-width:320px;margin-bottom:16px;">Global enterprise digital engineering, applied AI and cloud architecture. Engineering resilient systems for high-growth innovators and multinational enterprises.</p>' +
          '<div style="margin-bottom:20px;">' +
            '<span class="nav-badge-pill"><span class="live-pulse-dot"></span> All Global Services Operational (99.99% SLA)</span>' +
          '</div>' +
          '<div class="footer-social" aria-label="Social links">' +
            '<a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>' +
            '<a href="https://github.com/Sarthak080904/ForgeArc" target="_blank" rel="noopener" aria-label="GitHub">GitHub</a>' +
            '<a href="https://x.com" target="_blank" rel="noopener" aria-label="X / Twitter">X (Twitter)</a>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<h4>Enterprise Practices</h4>' +
          '<ul>' +
            '<li><a href="services.html#custom-software">Enterprise Cloud Systems</a></li>' +
            '<li><a href="services.html#ai">Applied AI &amp; Autonomous Agents</a></li>' +
            '<li><a href="services.html#apps">Web &amp; Native Mobile Platforms</a></li>' +
            '<li><a href="services.html#digitalization">Core Modernization &amp; DevOps</a></li>' +
            '<li><a href="services.html#ecommerce">High-Throughput Commerce</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h4>Global Governance</h4>' +
          '<ul>' +
            '<li><a href="about.html">About ForgeArc</a></li>' +
            '<li><a href="about.html#mission">Leadership &amp; Advisory Board</a></li>' +
            '<li><a href="industries.html">Industry Verticals (12 Sectors)</a></li>' +
            '<li><a href="portfolio.html">Case Studies &amp; Benchmarks</a></li>' +
            '<li><a href="about.html#compliance">Security &amp; ISO 27001 Compliance</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h4>Global Delivery Hubs</h4>' +
          '<ul>' +
            '<li><strong>India Tech HQ:</strong> Cybercity &amp; WTC, Pune &amp; Outer Ring Rd, Bengaluru</li>' +
            '<li><strong>Asia-Pacific:</strong> Marina Bay Financial Centre, Singapore</li>' +
            '<li><strong>Americas Delivery:</strong> Wilmington, Delaware, USA</li>' +
            '<li><a href="mailto:enterprise@forgearc.co.in" style="color:var(--ember-soft);font-weight:600;">enterprise@forgearc.co.in</a></li>' +
            '<li><a href="tel:+919860606140">+91 98606 06140 (Global Desk)</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>&copy; <span id="year"></span> ForgeArc Technologies Pvt. Ltd. Global rights reserved. ISO 27001 Certified Practices • SOC 2 Type II Aligned • Zero-Trust L7 Security.</span>' +
        '<span>Architect. Engineer. Scale Globally.</span>' +
      '</div>' +
    '</div>';

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
