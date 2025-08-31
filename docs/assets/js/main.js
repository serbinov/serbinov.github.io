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
    shareBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

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
          // If Web Share fails, show fallback
          showShareFallback(shareData);
        }
      } else {
        // Fallback: Try to copy URL to clipboard first
        try {
          await navigator.clipboard.writeText(window.location.href);
          showShareFeedback('Link copied to clipboard!');
        } catch (err) {
          // If clipboard fails, show share options
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
    // Remove any existing share modal
    const existingModal = document.querySelector('.share-modal');
    if (existingModal) {
      existingModal.remove();
    }

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`
    };

    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
      <div class="share-modal-overlay">
        <div class="share-modal-content">
          <h3>Share this website</h3>
          <div class="share-links">
            <a href="${shareUrls.twitter}" target="_blank" class="share-link twitter">Twitter</a>
            <a href="${shareUrls.linkedin}" target="_blank" class="share-link linkedin">LinkedIn</a>
            <a href="${shareUrls.facebook}" target="_blank" class="share-link facebook">Facebook</a>
            <a href="${shareUrls.telegram}" target="_blank" class="share-link telegram">Telegram</a>
          </div>
          <button class="share-modal-close">Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners after modal is added to DOM
    const closeBtn = modal.querySelector('.share-modal-close');
    const overlay = modal.querySelector('.share-modal-overlay');

    const closeModal = () => {
      modal.remove();
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Prevent modal from closing immediately
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);
  }
});