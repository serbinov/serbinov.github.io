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

  // Share button functionality
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Oleg Serbinov - Senior Hardware Engineer & PCB Designer',
        text: 'Check out this professional portfolio of a senior electronics engineer specializing in custom hardware development and PCB design.',
        url: window.location.href
      };

      // Check if Web Share API is supported
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log('Error sharing:', err);
        }
      } else {
        // Fallback: Copy URL to clipboard
        try {
          await navigator.clipboard.writeText(window.location.href);
          showShareFeedback('Link copied to clipboard!');
        } catch (err) {
          // Final fallback: Show share options
          showShareFallback(shareData);
        }
      }
    });
  }

  // Function to show share feedback
  function showShareFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent, #ffab6b);
      color: var(--bg, #0d1117);
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => feedback.remove(), 300);
    }, 2000);
  }

  // Function to show fallback share options
  function showShareFallback(shareData) {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`
    };

    const modal = document.createElement('div');
    modal.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      ">
        <div style="
          background: var(--surface, #161b22);
          padding: 2rem;
          border-radius: 12px;
          max-width: 400px;
          width: 90%;
          text-align: center;
        ">
          <h3 style="color: var(--text, #c9d1d9); margin-bottom: 1.5rem;">Share this website</h3>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="${shareUrls.twitter}" target="_blank" style="background: #1da1f2; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none;">Twitter</a>
            <a href="${shareUrls.linkedin}" target="_blank" style="background: #0077b5; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none;">LinkedIn</a>
            <a href="${shareUrls.facebook}" target="_blank" style="background: #1877f2; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none;">Facebook</a>
            <a href="${shareUrls.telegram}" target="_blank" style="background: #0088cc; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none;">Telegram</a>
          </div>
          <button onclick="this.closest('div').parentElement.remove()" style="
            margin-top: 1.5rem;
            background: var(--border-soft, #30363d);
            color: var(--text, #c9d1d9);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
          ">Close</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }
});