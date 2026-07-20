// ForgeArc Technologies — shared footer, injected so every page stays in sync
(function () {
  "use strict";
  var el = document.getElementById("site-footer");
  if (!el) return;

  el.innerHTML =
    '<div class="container">' +
      '<div class="footer-grid">' +
        '<div>' +
          '<div class="footer-brand"><img src="assets/mark.png" alt="ForgeArc Technologies mark"><span>ForgeArc Technologies</span></div>' +
          '<p style="max-width:280px;">Technology that moves business forward. Custom software, apps and AI automation for growing businesses.</p>' +
          '<div class="footer-social" aria-label="Social links">' +
            '<a href="#" aria-label="LinkedIn">LinkedIn</a>' +
            '<a href="#" aria-label="GitHub">GitHub</a>' +
            '<a href="#" aria-label="Instagram">Instagram</a>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<h4>Company</h4>' +
          '<ul>' +
            '<li><a href="about.html">About us</a></li>' +
            '<li><a href="about.html#mission">Mission &amp; vision</a></li>' +
            '<li><a href="portfolio.html">Portfolio</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h4>Services</h4>' +
          '<ul>' +
            '<li><a href="services.html#web">Website Development</a></li>' +
            '<li><a href="services.html#apps">Web &amp; Mobile Apps</a></li>' +
            '<li><a href="services.html#ai">AI Integration</a></li>' +
            '<li><a href="services.html#ecommerce">Online Selling</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h4>Contact</h4>' +
          '<ul>' +
            '<li><a href="mailto:hello@forgearc.tech">hello@forgearc.tech</a></li>' +
            '<li><a href="tel:+910000000000">+91 00000 00000</a></li>' +
            '<li>India</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>&copy; <span id="year"></span> ForgeArc Technologies Pvt. Ltd. All rights reserved.</span>' +
        '<span>Innovate. Build. Scale.</span>' +
      '</div>' +
    '</div>';

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
