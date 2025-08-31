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
  // Global click handler for closing expanded elements
  document.addEventListener('click', (e) => {
    // CRITICAL: Check if share modal exists and is active
    const shareModal = document.querySelector('.share-modal');
    if (shareModal && shareModal.dataset.shareModalActive === 'true') {
      console.log('Share modal is active - ignoring global click');
      return;
    }

    // Don't close if clicking inside share modal
    if (e.target.closest('.share-modal')) {
      console.log('Click inside share modal - ignoring');
      return;
    }

    // Close expanded QR codes
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
      // Close share modal if it exists
      const shareModal = document.querySelector('.share-modal');
      if (shareModal) {
        shareModal.remove();
        return;
      }

      // Otherwise close expanded QR codes
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
    console.log('Creating share modal');

    // Remove any existing share modal
    const existingModal = document.querySelector('.share-modal');
    if (existingModal) {
      console.log('Removing existing modal');
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
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: auto;
    `;
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
    console.log('Modal added to DOM');

    // CRITICAL: Add a flag to prevent accidental closing
    modal.dataset.shareModalActive = 'true';

    // Add event listeners after modal is added to DOM
    const closeBtn = modal.querySelector('.share-modal-close');
    const overlay = modal.querySelector('.share-modal-overlay');

    const closeModal = (e) => {
      console.log('Closing modal');
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      modal.style.opacity = '0';
      modal.dataset.shareModalActive = 'false';
      setTimeout(() => {
        if (modal.parentNode) {
          modal.remove();
          console.log('Modal removed');
        }
      }, 300);
    };

    closeBtn.addEventListener('click', (e) => {
      console.log('Close button clicked');
      closeModal(e);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        console.log('Overlay clicked');
        closeModal(e);
      }
    });

    // Prevent clicks inside modal from bubbling up
    const modalContent = modal.querySelector('.share-modal-content');
    modalContent.addEventListener('click', (e) => {
      console.log('Modal content clicked - stopping propagation');
      e.stopPropagation();
    });

    // Animate modal appearance with delay to ensure it's fully set up
    setTimeout(() => {
      modal.style.opacity = '1';
      console.log('Modal opacity set to 1');
    }, 50);
  }
});