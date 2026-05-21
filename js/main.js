/* ==========================================================================
   ☁️ SKY DENTAL CLINIC — CORE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all core functions
  initPreloader();
  initNavigation();
  initThemeToggle();
  initScrollEffects();
  initAccordions();
});

/* --------------------------------------------------------------------------
   1. PAGE PRELOADER (SHOW ONCE PER SESSION)
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Check if user has already seen preloader in this session
  const hasSeenPreloader = sessionStorage.getItem('seen_preloader');
  
  if (hasSeenPreloader === 'true') {
    // Skip preloader if already seen in current session
    preloader.style.display = 'none';
  } else {
    // Listen for animation end or hide after 2.2 seconds
    setTimeout(() => {
      preloader.classList.add('fade-out');
      sessionStorage.setItem('seen_preloader', 'true');
      
      // Remove from DOM after transition completes
      setTimeout(() => {
        preloader.remove();
      }, 800);
    }, 2200);
  }
}

/* --------------------------------------------------------------------------
   2. NAVIGATION HEADER & MOBILE HAMBURGER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll past 50px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      
      // Hamburger lines morph to 'X' or back
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close mobile menu on clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        hamburger.click(); // Re-trigger click to toggle back to hamburger
      }
    });
  });

  // Active Link Highlighter based on current path
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath) || (currentPath === '/' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   3. DARK MODE TOGGLE & CINEMATIC CIRCULAR REVEAL (VIEW TRANSITIONS API)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Retrieve saved preference or check OS preference
  const savedTheme = localStorage.getItem('theme');
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  toggleBtn.addEventListener('click', (e) => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    // Check for View Transitions API and reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!document.startViewTransition || prefersReducedMotion) {
      // Instant switch fallback if transitions are not supported
      setTheme(newTheme);
      return;
    }

    // Capture click coordinates for circular center
    const x = e.clientX;
    const y = e.clientY;

    // View transition circular expand
    document.documentElement.style.setProperty('--clip-x', `${x}px`);
    document.documentElement.style.setProperty('--clip-y', `${y}px`);
    
    document.documentElement.classList.add('circular-transition-active');
    
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove('circular-transition-active');
    });
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}

/* --------------------------------------------------------------------------
   4. GLOBAL SCROLL EFFECTS (PROGRESS BAR & BACK-TO-TOP BUTTON)
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // 1. Scroll Progress Bar
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (height > 0 && progressBar) {
      const scrolled = (windowScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }

    // 2. Back to Top Button visibility
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to top scroll logic
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. REUSABLE COLLAPSIBLE ACCORDIONS (FAQ)
   -------------------------------------------------------------------------- */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isActive = item.classList.contains('active');

      // Close all other accordions first (Single-expanded mode)
      const activeItems = document.querySelectorAll('.accordion-item.active');
      activeItems.forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
          activeItem.querySelector('.accordion-content').style.maxHeight = '0';
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}
