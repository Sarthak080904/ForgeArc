// ForgeArc — shared header and footer, injected so all pages stay in sync.
// The active link comes from <body data-page="...">.
(function () {
  "use strict";
  var page = document.body.getAttribute("data-page") || "";

  var links = [
    ["home", "index.html", "Home"],
    ["services", "services.html", "Services"],
    ["industries", "industries.html", "Industries"],
    ["portfolio", "portfolio.html", "Portfolio"],
    ["pricing", "pricing.html", "Pricing"],
    ["about", "about.html", "About"],
    ["contact", "contact.html", "Contact"]
  ];
  var nav = links.map(function (l) {
    return '<a href="' + l[1] + '"' + (l[0] === page ? ' aria-current="page"' : "") + ">" + l[2] + "</a>";
  }).join("");

  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<div class="container header-inner">' +
        '<a class="brand" href="index.html" aria-label="ForgeArc Technologies, home">' +
          '<img class="mark" src="assets/mark.png" alt="" width="28" height="28">' +
          '<img class="word" src="assets/wordmark.png" alt="ForgeArc Technologies" height="15">' +
        "</a>" +
        '<nav class="nav-links" id="nav-links" aria-label="Main">' + nav +
          '<a class="btn btn-forge" href="contact.html">Start a project <span class="arr" aria-hidden="true">→</span></a>' +
        "</nav>" +
        '<div class="header-actions">' +
          '<a class="btn btn-forge btn-sm" href="contact.html">Start a project <span class="arr" aria-hidden="true">→</span></a>' +
          '<button class="icon-btn nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
          "</button>" +
        "</div>" +
      "</div>";
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          "<div>" +
            '<div class="footer-brand"><img class="mark" src="assets/mark.png" alt="" loading="lazy"><img class="word" src="assets/wordmark.png" alt="ForgeArc Technologies" loading="lazy"></div>' +
            "<p>A Pune studio that maps how your business runs, then builds the software, apps and automation to run it.</p>" +
          "</div>" +
          "<div><h4>Company</h4><ul>" +
            '<li><a href="about.html">About</a></li>' +
            '<li><a href="industries.html">Industries</a></li>' +
            '<li><a href="portfolio.html">Portfolio</a></li>' +
            '<li><a href="pricing.html">Pricing</a></li>' +
          "</ul></div>" +
          "<div><h4>Services</h4><ul>" +
            '<li><a href="services.html#custom-software">Custom software</a></li>' +
            '<li><a href="services.html#apps">Web &amp; mobile apps</a></li>' +
            '<li><a href="services.html#ai">AI integration</a></li>' +
            '<li><a href="tableflow.html">TableFlow POS</a></li>' +
            '<li><a href="mohalla-mart.html">MohallaMart</a></li>' +
          "</ul></div>" +
          "<div><h4>Contact</h4><ul>" +
            '<li><a href="mailto:contact@forgearc.co.in">contact@forgearc.co.in</a></li>' +
            '<li><a href="tel:+919860606140">+91 98606 06140</a></li>' +
            "<li>Sanaswadi, Pune 412208, Maharashtra</li>" +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom"><span>&copy; ' + new Date().getFullYear() + " ForgeArc Technologies Pvt. Ltd.</span><span>Innovate. Build. Scale.</span></div>" +
      "</div>";
  }
})();
