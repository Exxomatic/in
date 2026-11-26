/**
 * Exxomatic - Shared Site Header, Mobile Drawer, Footer, and Demo Modal
 * Single source of truth rendered across all pages.
 */

(function () {
  const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/technology', label: 'Technology' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' }
  ];

  function createHeaderMarkup() {
    const desktopLinks = NAV_ITEMS.map(
      (item) => `<li><a href="${item.href}" class="nav-link">${item.label}</a></li>`
    ).join('\n          ');

    const mobileLinks = NAV_ITEMS.map(
      (item) => `<li><a href="${item.href}" class="mobile-nav-link">${item.label} <span>&rarr;</span></a></li>`
    ).join('\n      ');

    return `
  <!-- Site Header -->
  <header class="site-header">
    <div class="container header-container">
      <a href="/" class="brand-logo" aria-label="Exxomatic Home">
        <img src="images/mainlogo.png" alt="Exxomatic Logo" width="38" height="38">
        <span class="brand-logo-text">Exxomatic</span>
      </a>

      <!-- Desktop Nav -->
      <nav aria-label="Main Navigation">
        <ul class="nav-menu">
          ${desktopLinks}
        </ul>
      </nav>

      <div class="header-actions">
        <button class="btn btn-primary btn-sm header-cta" data-open-modal="demoModal">Book Live Demo</button>
        <button class="mobile-toggle" id="mobileToggleBtn" aria-label="Open navigation menu" aria-expanded="false">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div class="mobile-drawer" id="mobileDrawer" aria-label="Mobile Navigation">
    <ul class="mobile-nav-list">
      ${mobileLinks}
    </ul>
    <button class="btn btn-primary btn-lg" style="width: 100%;" data-open-modal="demoModal">Request Platform Demo</button>
  </div>`;
  }

  function createFooterMarkup() {
    return `
  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="brand-logo" aria-label="Exxomatic Home">
            <img src="images/mainlogo.png" alt="Exxomatic Logo" width="38" height="38">
            <span class="brand-logo-text">Exxomatic</span>
          </a>
          <p>Next-generation IoT engineering, AI-driven automotive telematics, and enterprise mobility operating systems.</p>
          <div style="margin-top: 1.2rem; display: flex; gap: 0.8rem; flex-wrap: wrap;">
            <span class="badge badge-cyan" style="margin-bottom: 0;">AIS-140 CERTIFIED</span>
            <span class="badge badge-purple" style="margin-bottom: 0;">ISO 9001:2015</span>
          </div>
        </div>

        <div class="footer-col">
          <h4>Products</h4>
          <ul class="footer-links">
            <li><a href="/products#navedge">NavEdge 2.0 Fleet OS</a></li>
            <li><a href="/products#ev">EV Telematics</a></li>
            <li><a href="/products#hardware">ExxoEdge Hardware</a></li>
            <li><a href="/products#cloud">ExxoCloud API Engine</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Industries</h4>
          <ul class="footer-links">
            <li><a href="/solutions#logistics">Logistics &amp; Freight</a></li>
            <li><a href="/solutions#transit">Public EV Bus Transit</a></li>
            <li><a href="/solutions#coldchain">Cold Chain &amp; Pharma</a></li>
            <li><a href="/solutions#heavy">Heavy Machinery &amp; Mining</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Company &amp; Legal</h4>
          <ul class="footer-links">
            <li><a href="/about">About Exxomatic</a></li>
            <li><a href="/technology">Architecture &amp; Security</a></li>
            <li><a href="/privacy">Privacy &amp; Data Policy</a></li>
            <li><a href="/terms">Terms &amp; Conditions</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>&copy; 2026 Exxomatic IoT Systems &amp; Software Solutions Pvt Ltd. All rights reserved.</div>
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/technology">Security Protocol</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>`;
  }

  function createModalMarkup() {
    return `
  <!-- Book Demo Modal -->
  <div class="modal-overlay" id="demoModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-card">
      <button class="modal-close-btn modal-close-trigger" aria-label="Close modal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="badge badge-cyan">Exxomatic Platform Preview</div>
      <h3 id="modalTitle" style="margin-bottom: 0.5rem;">Schedule a Live Demonstration</h3>
      <p style="font-size: 0.92rem; margin-bottom: 1.5rem;">Experience real-time vehicle CAN telemetry, driver scorecards, and live route optimization with our solution architect.</p>

      <form class="validated-form" id="demoForm">
        <div class="form-group">
          <label class="form-label" for="demoName">Full Name</label>
          <input type="text" class="form-control" id="demoName" name="name" placeholder="e.g. Rajesh Kumar" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="demoEmail">Business Email</label>
            <input type="email" class="form-control" id="demoEmail" name="email" placeholder="name@company.com" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="demoPhone">Contact Phone (Optional)</label>
            <input type="tel" class="form-control" id="demoPhone" name="phone" placeholder="Optional contact number">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="demoFleet">Fleet Size</label>
          <select class="form-control" id="demoFleet" name="fleet">
            <option value="1-20">1 - 20 Vehicles</option>
            <option value="21-100" selected>21 - 100 Vehicles</option>
            <option value="101-500">101 - 500 Vehicles</option>
            <option value="500+">500+ Vehicles (Enterprise)</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Confirm Demo Reservation</button>
        <div class="form-feedback" role="alert"></div>
      </form>
    </div>
  </div>`;
  }

  function renderLayout() {
    const headerPlaceholder = document.getElementById('site-header');
    if (headerPlaceholder && !document.querySelector('.site-header')) {
      headerPlaceholder.outerHTML = createHeaderMarkup();
    }

    const footerPlaceholder = document.getElementById('site-footer');
    if (footerPlaceholder && !document.querySelector('.site-footer')) {
      const modalHtml = document.getElementById('demoModal') ? '' : createModalMarkup();
      footerPlaceholder.outerHTML = createFooterMarkup() + modalHtml;
    }
  }

  window.ExxomaticLayout = {
    render: renderLayout
  };

  renderLayout();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderLayout);
  }
})();
