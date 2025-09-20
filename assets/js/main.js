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

  // Store global click handler reference to enable/disable it
  let globalClickHandler = null;

  // Create global click handler function
  const createGlobalClickHandler = () => {
    return (e) => {
      // Close expanded QR codes
      if (!e.target.closest('.qr-grid img') && !e.target.closest('.qr-overlay')) {
        const expandedQr = document.querySelector('.qr-grid img.expanded');
        if (expandedQr) {
          expandedQr.classList.remove('expanded');
          document.body.classList.remove('qr-expanded');
        }
      }
    };
  };

  // Initialize global click handler
  globalClickHandler = createGlobalClickHandler();
  document.addEventListener('click', globalClickHandler);

  // QR Code expansion functionality
  const qrImages = document.querySelectorAll('.qr-grid img');
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
      document.body.classList.toggle('qr-expanded', !!hasExpanded);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Otherwise close expanded QR codes
      const expandedQr = document.querySelector('.qr-grid img.expanded');
      if (expandedQr) {
        expandedQr.classList.remove('expanded');
        document.body.classList.remove('qr-expanded');
      }
    }
  });

  // --- Инициализация particles.js ---
  console.log('typeof particlesJS:', typeof particlesJS);
  if (document.getElementById('particles-js')) {
    console.log('Particles.js container found, initializing...');
    try {
      particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 120,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.8,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.6,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.0,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
    console.log('Particles.js initialized successfully');
    } catch (error) {
      console.error('Error initializing particles.js:', error);
    }
  }
});