/* ==========================================================================
   ☁️ SKY DENTAL CLINIC — GSAP ANIMATIONS & INTERACTIVE ELEMENTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Wait until preloader finishes or load directly if already seen
  const hasSeenPreloader = sessionStorage.getItem('seen_preloader');
  
  if (hasSeenPreloader === 'true') {
    initAnimations();
  } else {
    // Wait 2.2 seconds for preloader before executing GSAP entrances
    setTimeout(initAnimations, 2200);
  }
  
  // Register simple sliders & interactions regardless of preloader timing
  initDraggableSliders();
});

/* --------------------------------------------------------------------------
   1. REGULAR & SCROLL-TRIGGERED GSAP ANIMATIONS
   -------------------------------------------------------------------------- */
function initAnimations() {
  // Verify GSAP is loaded via CDN in index.html
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not loaded. Falling back to native CSS animations.');
    initScrollIntersectionFallback();
    return;
  }

  // Register ScrollTrigger Plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1.1 Home Hero Entrance Sequence
  const heroTl = gsap.timeline();
  
  // Split hero heading text by words using SplitType if loaded
  if (typeof SplitType !== 'undefined') {
    const heroTitle = new SplitType('.home-hero-title', { types: 'words,chars' });
    
    heroTl.from('.home-hero-tag', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' })
          .from(heroTitle.words, { opacity: 0, y: 30, stagger: 0.05, duration: 0.8, ease: 'power3.out' }, '-=0.3')
          .from('.home-hero-desc', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '-=0.4')
          .from('.home-hero-ctas .btn', { opacity: 0, scale: 0.8, stagger: 0.15, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.4')
          .from('.floating-icon-item', { opacity: 0, scale: 0, stagger: 0.2, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, '-=0.3');
  } else {
    // Fallback if SplitType isn't active
    heroTl.from('.home-hero-tag', { opacity: 0, y: -20, duration: 0.6 })
          .from('.home-hero-title', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
          .from('.home-hero-desc', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
          .from('.home-hero-ctas .btn', { opacity: 0, y: 15, stagger: 0.15, duration: 0.6 }, '-=0.4');
  }

  // 1.2 General Section Headings Scroll Trigger
  const animatedHeadings = document.querySelectorAll('.trigger-heading');
  animatedHeadings.forEach(heading => {
    let animTarget = heading;
    
    if (typeof SplitType !== 'undefined') {
      const split = new SplitType(heading, { types: 'words' });
      animTarget = split.words;
    }
    
    gsap.from(animTarget, {
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // 1.3 Service Grid Cards Staggered Entry
  if (document.querySelector('.service-card')) {
    gsap.from('.services-grid .service-card', {
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  // 1.4 About Preview Split Scroll Entrances
  if (document.querySelector('.about-preview-img-container')) {
    // Image Curtain Clip-Path Reveal
    gsap.from('.about-preview-img-container', {
      scrollTrigger: {
        trigger: '.about-preview-img-container',
        start: 'top 80%'
      },
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.2,
      ease: 'power4.inOut'
    });

    // Image Parallax inside wrapper
    gsap.from('.about-preview-img', {
      scrollTrigger: {
        trigger: '.about-preview-img-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      yPercent: -15,
      ease: 'none'
    });

    // Badge Stagger Pop
    gsap.from('.about-preview-decor', {
      scrollTrigger: {
        trigger: '.about-preview-decor',
        start: 'top 85%'
      },
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    });
  }

  // 1.5 Numbers Counter Animation
  const counterNums = document.querySelectorAll('.counter-num');
  counterNums.forEach(counter => {
    const targetVal = parseInt(counter.getAttribute('data-target'), 10) || 0;
    const isSuffixPlus = counter.textContent.includes('+');
    
    gsap.fromTo(counter, 
      { textContent: 0 }, 
      {
        scrollTrigger: {
          trigger: counter,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        textContent: targetVal,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 }, // Round to whole numbers
        onUpdate: function() {
          // Re-append the plus sign if it originally existed
          if (isSuffixPlus) {
            counter.textContent = Math.floor(counter.textContent) + '+';
          }
        }
      }
    );
  });

  // 1.6 Blog Staggered Card Entry
  if (document.querySelector('.blog-card')) {
    gsap.from('.blog-grid .blog-card', {
      scrollTrigger: {
        trigger: '.blog-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  // 1.7 Contact Form Elements Entrance
  if (document.querySelector('.appointment-card')) {
    gsap.from('.appointment-card', {
      scrollTrigger: {
        trigger: '.appointment-card',
        start: 'top 80%'
      },
      opacity: 0,
      y: 80,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.appointment-card .form-group', {
      scrollTrigger: {
        trigger: '.appointment-card',
        start: 'top 75%'
      },
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    });
  }
  
  // 1.8 Interactive Card 3D mouse tracking tilt effect
  initMouseTiltEffect();
}

/* --------------------------------------------------------------------------
   2. DRAGGABLE BEFORE / AFTER IMAGE SLIDER
   -------------------------------------------------------------------------- */
function initDraggableSliders() {
  const baSliders = document.querySelectorAll('.ba-slider');

  baSliders.forEach(slider => {
    const afterImage = slider.querySelector('.ba-image-after');
    const handle = slider.querySelector('.ba-handle');
    let isDragging = false;

    if (!afterImage || !handle) return;

    // Helper function to update divider split position
    function updatePosition(xCoord) {
      const rect = slider.getBoundingClientRect();
      let offsetX = xCoord - rect.left;

      // Restrict offset within bounds
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      afterImage.style.width = percentage + '%';
      handle.style.left = percentage + '%';
    }

    // Touch and mouse drag events
    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    
    slider.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    });

    // Touch support for mobiles
    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    
    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    });

    // Set height appropriately on load
    window.addEventListener('resize', () => {
      handle.style.marginTop = (slider.offsetHeight / 2 - 20) + 'px';
    });
    // Trigger initial adjustment
    handle.style.marginTop = (slider.offsetHeight / 2 - 20) + 'px';
  });
}

/* --------------------------------------------------------------------------
   3. 3D MOUSE-TRACKING TILT HOVER EFFECT
   -------------------------------------------------------------------------- */
function initMouseTiltEffect() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within card
      const y = e.clientY - rect.top;  // y position within card
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate tilt angles (max tilt ~8 degrees)
      const rotateX = ((centerY - y) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      // Smooth reset back to identity transform
      card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
    });
  });
}

/* --------------------------------------------------------------------------
   4. FALLBACK SCROLL-TRIGGER (VANILLA JS INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollIntersectionFallback() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-fade-up');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, observerOptions);

  // Apply fallback classes to items requiring trigger triggers
  const sectionsToObserve = document.querySelectorAll('.services-grid .service-card, .blog-grid .blog-card, .appointment-card, .counter-box');
  sectionsToObserve.forEach(sec => {
    sec.style.opacity = '0'; // hide first
    observer.observe(sec);
  });
}
