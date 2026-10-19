/**
 * Exxomatic - Core Interactive JavaScript
 * Vanilla ES6+ - Robust, Accessible, High Performance
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initActiveNavLink();
  initTelemetrySimulator();
  initRoiCalculator();
  initTabs();
  initAccordion();
  initForms();
  initModal();
});

/**
 * 1. Sticky Header Scroll Effect
 */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggleBtn');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggleBtn || !drawer) return;

  const toggleDrawer = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open navigation menu');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close navigation menu');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggleDrawer);

  // Close when clicking mobile links
  const mobileLinks = drawer.querySelectorAll('.mobile-nav-link, .btn');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleDrawer();
    }
  });
}

/**
 * 3. Set Active Navigation Link
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * 4. Real-time Telemetry Simulator
 */
function initTelemetrySimulator() {
  const speedEl = document.getElementById('simSpeed');
  const rpmEl = document.getElementById('simRpm');
  const fuelEl = document.getElementById('simFuel');
  const feedEl = document.getElementById('simLiveFeed');
  
  if (!speedEl && !rpmEl && !fuelEl) return;

  let speed = 64;
  let rpm = 1850;
  let fuel = 84.5;
  let packetCount = 1420;

  const events = [
    'CAN-J1939: Engine Coolant Temp Nominal [88°C]',
    'GPS-UBLOX: Fix Acquired (12 Sats, Lat 17.4948, Lng 78.3429)',
    'BATTERY: Pack Voltage 392.4V | Current Draw 42A',
    'CAN-BUS: Zero DTC Diagnostic Trouble Codes Reported',
    'TELEMATICS: Edge Buffer Flushed (48 bytes) -> ExxoCloud',
    'SAFETY-AI: Driver Fatigue Index: Optimal (98/100)'
  ];

  setInterval(() => {
    // Subtle jitter for realistic simulation
    speed = Math.max(45, Math.min(88, speed + (Math.floor(Math.random() * 7) - 3)));
    rpm = Math.max(1500, Math.min(2400, rpm + (Math.floor(Math.random() * 80) - 40)));
    fuel = Math.max(10, +(fuel - 0.02).toFixed(2));
    packetCount++;

    if (speedEl) speedEl.textContent = `${speed} km/h`;
    if (rpmEl) rpmEl.textContent = `${rpm} RPM`;
    if (fuelEl) fuelEl.textContent = `${fuel}%`;

    const packetCounterEl = document.getElementById('simPackets');
    if (packetCounterEl) packetCounterEl.textContent = packetCount.toLocaleString();

    // Append occasional live log
    if (feedEl && Math.random() > 0.45) {
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      
      const line = document.createElement('div');
      line.className = 'live-feed-line';
      line.innerHTML = `<span class="live-feed-time">[${timeStr}]</span> <span>${randomEvent}</span>`;
      
      feedEl.prepend(line);
      while (feedEl.children.length > 5) {
        feedEl.removeChild(feedEl.lastChild);
      }
    }
  }, 2200);
}

/**
 * 5. Interactive ROI Fleet Savings Calculator
 */
function initRoiCalculator() {
  const fleetSlider = document.getElementById('calcFleetSize');
  const fuelSlider = document.getElementById('calcFuelCost');
  const fleetValDisplay = document.getElementById('calcFleetVal');
  const fuelValDisplay = document.getElementById('calcFuelVal');
  const totalSavingsDisplay = document.getElementById('calcTotalSavings');
  const idleReductionDisplay = document.getElementById('calcIdleHours');
  const co2Display = document.getElementById('calcCo2Saved');

  if (!fleetSlider || !fuelSlider) return;

  function recalculate() {
    const fleet = parseInt(fleetSlider.value, 10);
    const monthlyFuelPerVehicle = parseInt(fuelSlider.value, 10);

    // Update displays
    if (fleetValDisplay) fleetValDisplay.textContent = `${fleet} Vehicles`;
    if (fuelValDisplay) fuelValDisplay.textContent = `₹${monthlyFuelPerVehicle.toLocaleString()}/mo`;

    // Formula: average 22% fuel saving + 15% maintenance optimization
    const monthlySpendTotal = fleet * monthlyFuelPerVehicle;
    const annualSpend = monthlySpendTotal * 12;
    const estimatedAnnualSavings = Math.round(annualSpend * 0.22);
    const idleHoursSaved = Math.round(fleet * 26 * 12); // ~26 hrs per vehicle/month
    const co2ReductionTons = Math.round((estimatedAnnualSavings / 100) * 0.08);

    if (totalSavingsDisplay) {
      totalSavingsDisplay.textContent = `₹${estimatedAnnualSavings.toLocaleString()}`;
    }
    if (idleReductionDisplay) {
      idleReductionDisplay.textContent = `${idleHoursSaved.toLocaleString()} hrs/yr`;
    }
    if (co2Display) {
      co2Display.textContent = `${co2ReductionTons.toLocaleString()} Tons`;
    }
  }

  fleetSlider.addEventListener('input', recalculate);
  fuelSlider.addEventListener('input', recalculate);
  recalculate();
}

/**
 * 6. Accessible Tab Component
 */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');

  tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-content-panel');

    const activateTab = (targetId) => {
      // Allow mapping between short names ('navedge') and 'tabNavedge'
      let matchedBtn = null;
      tabButtons.forEach(b => {
        const dt = b.getAttribute('data-target');
        if (dt === targetId || dt.toLowerCase() === targetId.toLowerCase() || dt.toLowerCase() === ('tab' + targetId).toLowerCase() || ('tab' + dt).toLowerCase() === targetId.toLowerCase()) {
          matchedBtn = b;
        }
      });

      if (!matchedBtn) return;
      const finalTargetId = matchedBtn.getAttribute('data-target');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      matchedBtn.classList.add('active');
      matchedBtn.setAttribute('aria-selected', 'true');
      
      const targetPanel = container.querySelector(`#${finalTargetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    };

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        activateTab(targetId);
      });
    });

    // Check URL Hash on initial page load
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      activateTab(hash);
    }

    // Listen to hash changes
    window.addEventListener('hashchange', () => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash) {
        activateTab(currentHash);
      }
    });
  });
}

/**
 * 7. Accessible FAQ Accordion
 */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const btn = item.querySelector('.accordion-btn');
    const content = item.querySelector('.accordion-content');
    if (!btn || !content) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close siblings for accordion behavior
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.accordion-btn');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 30 + 'px';
      }
    });
  });
}

/**
 * 8. Forms & Client Validation
 */
function initForms() {
  const forms = document.querySelectorAll('.validated-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      const submitBtn = form.querySelector('button[type="submit"]');

      // Simple validation
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const phone = form.querySelector('[name="phone"]');

      if (!name || !name.value.trim()) {
        showFeedback(feedback, 'Please enter your full name.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.value.trim())) {
        showFeedback(feedback, 'Please provide a valid business email address.', 'error');
        return;
      }

      if (phone && phone.value.trim().length > 0 && phone.value.trim().length < 6) {
        showFeedback(feedback, 'Please enter a valid contact number or leave blank.', 'error');
        return;
      }

      // Show submitting state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting Request...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Request Submitted!';
        }
        showFeedback(feedback, 'Thank you! Your request has been received. An Exxomatic Fleet Specialist will reach out within 2 hours.', 'success');
        form.reset();
      }, 900);
    });
  });

  function showFeedback(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = `form-feedback ${type}`;
    el.style.display = 'block';
  }
}

/**
 * 9. Quick Demo Modal
 */
function initModal() {
  const modal = document.getElementById('demoModal');
  const openBtns = document.querySelectorAll('[data-open-modal="demoModal"]');
  const closeBtns = document.querySelectorAll('.modal-close-trigger');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
