const PROJECTS = {
  expense: {
    title: "My Expense Tracker",
    subtitle: "Offline-First Indian Bank & UPI SMS Expense Ledger (Android)",
    image: "assets/expense-showcase.png",
    summary:
      "Built in Kotlin with Jetpack Compose (Material 3) and Room 2.7.2. Automatically detects and parses debit SMS alerts via SmsReceiver and custom date-range inbox scanning with zero INTERNET permission.",
    highlights: [
      "SmsParser regex engine extracts amount, payee/VPA, and available balance while filtering out OTPs and declined alerts.",
      "Remembered merchant rules automatically classify future SMS and prompt for month-wise batch updates.",
      "Includes editable purchased item names, raw SMS clipboard copy, Canvas donut chart, daily spend bars, and 6-month trend diagram.",
      "Dedicated Settings screen with 30 selectable Material icons, preset category colors, and configurable monthly spending target."
    ]
  },
  docpix: {
    title: "DocPix Studio Bot",
    subtitle: "All-in-One Telegram Document, OCR & Exam-Prep Studio (Python)",
    image: "assets/docpix-showcase.png",
    summary:
      "Asynchronous Python Telegram bot built with python-telegram-bot 22.8, Pillow 13.0.0, PyPDF 6.21.4, and Tesseract OCR—tailored for exam candidates and document automation.",
    highlights: [
      "Exact-KB binary-search compressor targeting 20 KB signatures, 50 KB photos, or custom sizes.",
      "300 DPI standard (3.5x4.5 cm) and US (2x2 in) passport photo maker plus 8-in-1 4x6 printable sheets.",
      "Bilingual OCR (English + Hindi) running local Tesseract with automatic OCR.space fallback and contrast preprocessing.",
      "Debounced 1.3s batch album/PDF merger with one-tap A->Z / Z->A reversal, PDF compression, and page range splitting."
    ]
  },
  mithila: {
    title: "Mithila Local",
    subtitle: "Hyperlocal City Discovery Platform (Django + Android + Telegram Bot)",
    image: "assets/mithila-hero.png",
    summary:
      "Multi-tier city directory uniting a Django 4.2 web platform, Supabase PostgreSQL database, Bearer-protected cursor mobile API, native Android client, and safe Add/Modify Telegram admin automation.",
    highlights: [
      "Structured Django models across 20 migrations covering Place, FoodListing, HospitalListing, PharmacyListing, ShoppingListing, and EducationListing.",
      "Bounded /api/places/ REST endpoints enforcing category, search, or area filters with 20-record cursor pagination.",
      "Native Android companion in android-app/ reading API access tokens cleanly from untracked local.properties.",
      "Production Telegram admin bot enforcing strict ADD/MODIFY-only directory governance with taxonomy and coordinate helpers."
    ]
  },
  test1: {
    title: "Web IPv4 & CIDR Calculator",
    subtitle: "Flask Subnetting API & Firewall Dashboard Starter",
    image: "assets/test1-hero.png",
    summary:
      "Full-stack Python Flask + vanilla JavaScript subnet utility providing instant IPv4 subnetting alongside starter firewall dashboard scaffolding.",
    highlights: [
      "POST /api/calculate backend built with Flask, Flask-CORS, and Python's standard ipaddress library.",
      "Accepts both dotted subnet masks (255.255.255.0) and CIDR notation (/24) to return network, broadcast, usable IP range, and host count.",
      "Includes starter firewall_dashboard_app utilities (validate_ip, log_event, format_date) and template layout."
    ]
  }
};

// Category Filter Logic
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = filter === "all" || tags.includes(filter);
      card.classList.toggle("hidden", !show);
    });
  });
});

// Modal Preview Logic
const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

function openProjectModal(key) {
  const data = PROJECTS[key];
  if (!data) return;

  const listItems = data.highlights.map((item) => `<li>${item}</li>`).join("");
  modalBody.innerHTML = `
    <span class="section-eyebrow">Architecture &amp; Showcase</span>
    <h2 id="modal-title" style="font-size:26px;font-weight:800;margin-bottom:4px;">${data.title}</h2>
    <p style="color:var(--cyan);font-size:14px;font-weight:600;">${data.subtitle}</p>
    <img src="${data.image}" alt="${data.title} showcase" class="modal-img" />
    <p style="color:var(--text);font-size:15px;">${data.summary}</p>
    <ul class="modal-list">${listItems}</ul>
  `;
  modal.hidden = false;
}

function closeProjectModal() {
  modal.hidden = true;
}

document.querySelectorAll(".preview-trigger").forEach((btn) => {
  btn.addEventListener("click", () => openProjectModal(btn.dataset.project));
});

modalClose.addEventListener("click", closeProjectModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeProjectModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeProjectModal();
});
