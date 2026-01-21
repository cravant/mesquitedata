// Smooth scroll helper
function scrollToSection(id) {
  var el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Handle buttons with data-scroll-target
document.querySelectorAll("[data-scroll-target]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var target = btn.getAttribute("data-scroll-target");
    if (target) {
      scrollToSection(target);
    }
  });
});

// Set current year in footer
var yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Use‑case tabs logic

var tabs = document.querySelectorAll(".usecase-tab");
var copy = document.getElementById("usecase-copy");
var metrics = document.getElementById("usecase-metrics");

var usecaseContent = {
  plumber: {
    text: [
      "A homeowner with a leak is not browsing for long—they tap the first few results that look credible and call. Your site needs to win that moment.",
      "Mesquite Data structures plumber sites around urgent issues, service areas, and fast paths to a call or request."
    ],
    bullets: [
      "Emergency service buttons that stay visible on mobile.",
      "Service‑area pages that match “plumber near me” searches.",
      "Before‑and‑after photos and reviews that build instant trust.",
      "Clear, friendly copy that makes it easy to call or request a visit."
    ],
    cards: [
      {
        title: "Visitor",
        body: "Searches “emergency plumber near me” on their phone and taps your result."
      },
      {
        title: "Website",
        body: "Loads quickly, shows services, areas, and a big “Call now for urgent repair” button."
      },
      {
        title: "Outcome",
        body: "Call connects directly to your preferred number, tracked as a lead."
      }
    ]
  },
  contractor: {
    text: [
      "Project‑based work often involves comparison, so your site needs to clearly show the types of jobs you take and the quality you deliver.",
      "Mesquite Data sites for contractors emphasize portfolios, locations, and straightforward next steps to request a quote."
    ],
    bullets: [
      "Project galleries organized by service type and location.",
      "Clear breakdowns of services like remodels, additions, and repairs.",
      "Quote request forms that capture the details you need without overwhelming visitors.",
      "Trust‑building elements like licenses, insurance, and guarantees."
    ],
    cards: [
      {
        title: "Visitor",
        body: "Searches for contractors and compares a few websites."
      },
      {
        title: "Website",
        body: "Highlights past projects, locations served, and a simple quote form."
      },
      {
        title: "Outcome",
        body: "Lead arrives with enough detail for you to quickly respond with next steps."
      }
    ]
  },
  services: {
    text: [
      "Cleaning, lawn care, pest control, and similar services rely on recurring work and word‑of‑mouth. Your site should support both.",
      "Mesquite Data structures these sites around clear services, plans, and easy ways to book recurring visits."
    ],
    bullets: [
      "Service menus that make it obvious what is included.",
      "Scheduling paths that let customers request their preferred days and times.",
      "Review highlights and simple referral prompts.",
      "Clear coverage maps so people know you serve their neighborhood."
    ],
    cards: [
      {
        title: "Visitor",
        body: "Searches for a reliable local service and wants quick answers."
      },
      {
        title: "Website",
        body: "Shows services, pricing ranges, and a quick way to request recurring visits."
      },
      {
        title: "Outcome",
        body: "New customer enters your pipeline with contact details and service preferences."
      }
    ]
  }
};

function renderUsecase(type) {
  var data = usecaseContent[type];
  if (!data || !copy || !metrics) return;

  copy.innerHTML = "";
  data.text.forEach(function (t) {
    var p = document.createElement("p");
    p.textContent = t;
    copy.appendChild(p);
  });

  var ul = document.createElement("ul");
  data.bullets.forEach(function (b) {
    var li = document.createElement("li");
    li.textContent = b;
    ul.appendChild(li);
  });
  copy.appendChild(ul);

  metrics.innerHTML = "";
  data.cards.forEach(function (c) {
    var card = document.createElement("div");
    card.className = "usecase-lead-card";
    var strong = document.createElement("strong");
    strong.textContent = c.title;
    var p = document.createElement("p");
    p.textContent = c.body;
    card.appendChild(strong);
    card.appendChild(p);
    metrics.appendChild(card);
  });
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (t) {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    var type = tab.getAttribute("data-usecase");
    renderUsecase(type);
  });
});
