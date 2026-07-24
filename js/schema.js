(function () {
    const BASE_URL = "https://www.forgearc.co.in";
    const currentPath = window.location.pathname;
    const currentUrl = BASE_URL + currentPath;
    const pageName = document.title || "ForgeArc Technologies";
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            /* ==========================
               ORGANIZATION
            ========================== */
            {
                "@type": "Organization",
                "@id": BASE_URL + "/#organization",
                "name": "ForgeArc Technologies",
                "url": BASE_URL,
                "logo": BASE_URL + "/assets/icon-512.png",
                "image": BASE_URL + "/assets/icon-512.png",
                "email": "contact@forgearc.co.in",
                "telephone": "+91-9860606140",
                "sameAs": [
                    "https://github.com/Sarthak080904"
                ]
            },
            /* ==========================
               LOCAL BUSINESS
            ========================== */
            {
                "@type": "LocalBusiness",
                "@id": BASE_URL + "/#localbusiness",
                "name": "ForgeArc Technologies",
                "image": BASE_URL + "/assets/icon-512.png",
                "url": BASE_URL,
                "email": "contact@forgearc.co.in",
                "telephone": "+91-9860606140",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Pune",
                    "addressRegion": "Maharashtra",
                    "postalCode": "",
                    "addressCountry": "IN"
                },
                "areaServed": {
                    "@type": "Country",
                    "name": "India"
                },
                "founder": {
                    "@type": "Person",
                    "name": "Sarthak Bharat Bhujbal"
                }
            },
            /* ==========================
               WEBSITE
            ========================== */
            {
                "@type": "WebSite",
                "@id": BASE_URL + "/#website",
                "url": BASE_URL,
                "name": "ForgeArc Technologies",
                "publisher": {
                    "@id": BASE_URL + "/#organization"
                }
            },
            /* ==========================
               CURRENT WEBPAGE
            ========================== */
            {
                "@type": "WebPage",
                "@id": currentUrl + "#webpage",
                "url": currentUrl,
                "name": pageName,
                "isPartOf": {
                    "@id": BASE_URL + "/#website"
                },
                "about": {
                    "@id": BASE_URL + "/#organization"
                }
            }
        ]
    };
    /* ==========================
       SERVICE PAGE DETECTION
    ========================== */
    if (
        currentPath.includes("services") ||
        currentPath.includes("web-development") ||
        currentPath.includes("mobile") ||
        currentPath.includes("ai")
    ) {
        schema["@graph"].push({
            "@type": "Service",
            "name": pageName,
            "provider": {
                "@id": BASE_URL + "/#organization"
            },
            "areaServed": "India",
            "url": currentUrl
        });
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
})();
