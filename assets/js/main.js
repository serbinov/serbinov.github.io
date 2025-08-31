// Main JS for basic functionality
document.addEventListener('DOMContentLoaded', () => {
  // Update year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-links');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
      // Close mobile menu after click
      if (navList.classList.contains('open')) {
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Scroll reveal animations - instant visibility for faster loading
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    el.classList.add('visible');
  });

  // QR Code expansion functionality
  const qrImages = document.querySelectorAll('.qr-grid img');
  const body = document.body;

  qrImages.forEach(img => {
    img.addEventListener('click', (e) => {
      e.preventDefault();

      // If another QR is expanded, close it first
      const expandedQr = document.querySelector('.qr-grid img.expanded');
      if (expandedQr && expandedQr !== img) {
        expandedQr.classList.remove('expanded');
      }

      // Toggle expanded state for clicked QR
      img.classList.toggle('expanded');

      // Toggle body class for overlay
      const hasExpanded = document.querySelector('.qr-grid img.expanded');
      body.classList.toggle('qr-expanded', !!hasExpanded);
    });
  });

  // Close expanded QR when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.qr-grid img') && !e.target.closest('.qr-overlay')) {
      const expandedQr = document.querySelector('.qr-grid img.expanded');
      if (expandedQr) {
        expandedQr.classList.remove('expanded');
        body.classList.remove('qr-expanded');
      }
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const expandedQr = document.querySelector('.qr-grid img.expanded');
      if (expandedQr) {
        expandedQr.classList.remove('expanded');
        body.classList.remove('qr-expanded');
      }
    }
  });
});