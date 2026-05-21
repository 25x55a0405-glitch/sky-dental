/* ==========================================================================
   ☁️ SKY DENTAL CLINIC — SERVICES FILTER & GALLERY CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initServiceFilters();
  initServiceExpansion();
  initBeforeAfterShowcase();
});

/* --------------------------------------------------------------------------
   1. SERVICES HUB FILTERING (WITH LAYOUT ANIMATIONS)
   -------------------------------------------------------------------------- */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');

  if (filterBtns.length === 0 || serviceCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Remove active class from previous active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // 2. Animate cards based on filter selection
      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          // Show Card
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 50);
        } else {
          // Hide Card
          card.style.opacity = '0';
          card.style.transform = 'scale(0.85) translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350); // wait for scale down transition
        }
      });
      
      // Close detail expansion panel if visible on filter change
      const detailPanel = document.getElementById('service-detail-panel');
      if (detailPanel) {
        detailPanel.style.display = 'none';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. CLICK TO EXPAND DETAILS PANEL (SERVICES HUB DETAILS)
   -------------------------------------------------------------------------- */
function initServiceExpansion() {
  const learnMoreBtns = document.querySelectorAll('.service-expand-trigger');
  const detailPanel = document.getElementById('service-detail-panel');

  if (!detailPanel) return;

  // Detail panel elements to update dynamically
  const dTitle = detailPanel.querySelector('.service-detail-title');
  const dDesc = detailPanel.querySelector('.service-detail-desc');
  const dImg = detailPanel.querySelector('.service-detail-img img');
  const dBenefitsList = detailPanel.querySelector('.service-benefits');

  // Full detailed service content mapped
  const serviceData = {
    general: {
      title: "Preventative & General Dentistry",
      desc: "Our general dental care focuses on helping you maintain healthy teeth and gums for life. Through regular exams, cleanings, and digital diagnostic X-rays, we identify issues early to save you time and discomfort later. We emphasize prevention and hygiene patient education, ensuring your natural smile stays functional and brilliant.",
      img: "assets/images/service_general.jpg",
      benefits: ["Professional Scale & Polish", "High-Resolution Digital X-Rays", "Comprehensive Oral Cancer Screenings", "Fluoride & Sealant Protection"]
    },
    cosmetic: {
      title: "Cosmetic & Veneer Makeovers",
      desc: "Transform your smile and elevate your confidence with our high-end cosmetic dentistry procedures. From professional in-chair teeth whitening systems that brighten your smile up to 8 shades, to handcrafted porcelain veneers that fix alignment, chips, and spaces, we craft a radiant smile customized just for your unique facial profile.",
      img: "assets/images/service_cosmetic.jpg",
      benefits: ["Laser Teeth Whitening (8+ Shades)", "Handcrafted Custom Porcelain Veneers", "Composite Resin Bonding Treatments", "Digital Smile Design Consultation"]
    },
    ortho: {
      title: "Orthodontics & Invisalign Clear Aligners",
      desc: "Achieve the straight smile you have always desired without the hassle and look of metal brackets. As certified Invisalign providers, we offer custom-molded clear aligners that gently slide your teeth into alignment over time. Virtually invisible and completely removable, they fit into your active lifestyle smoothly.",
      img: "assets/images/service_orthodontics.jpg",
      benefits: ["Virtually Invisible Clear Aligners", "Removable Trays for Easy Oral Hygiene", "Custom 3D Digital Simulation of Results", "Shorter Treatment Times (Avg. 6–12 months)"]
    },
    implants: {
      title: "Premium Dental Implants & Restorations",
      desc: "Missing teeth can impact your speech, dietary health, and self-confidence. Dental implants are the gold standard for replacing missing teeth, functioning exactly like your natural tooth roots. Crafted from surgical-grade titanium, they fuse permanently with your jawbone to provide secure backing for life-like crowns.",
      img: "assets/images/service_implants.jpg",
      benefits: ["Lifetime Structural Tooth Replacement", "Prevents Bone Loss & Facial Structure Changes", "Life-like Custom Porcelain Crowns", "Restores Full Chewing Power (100%)"]
    },
    emergency: {
      title: "24/7 Rapid Emergency Dental Care",
      desc: "Dental emergencies can be frightening and require immediate professional attention. Whether you are experiencing severe toothaches, a broken crown, a knocked-out tooth, or facial swelling, our dedicated emergency team is here to relieve your pain and protect your oral health. Call us immediately for priority bookings.",
      img: "assets/images/service_emergency.jpg",
      benefits: ["Immediate Pain Relief Treatments", "Same-Day Emergency Appointments", "Emergency Root Canal & Extractions", "Gentle, Reassuring Dental Care"]
    },
    pediatric: {
      title: "Gentle Pediatric & Kids Care",
      desc: "Building positive dental experiences at an early age sets the foundation for a lifetime of healthy smiles. Our warm, child-friendly team takes special care to ensure your little ones feel secure and comfortable during their visits. We use playful language, offer gentle cleanings, and provide cavity-prevention sealants.",
      img: "assets/images/service_pediatric.jpg",
      benefits: ["Child-Friendly Treatment Rooms", "Fun, Educational Oral Hygiene Coaching", "Cavity-Prevention Dental Sealants", "Custom Athletic Sports Mouthguards"]
    }
  };

  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service');
      const data = serviceData[serviceId];

      if (!data) return;

      // 1. Update expansion panel contents
      dTitle.textContent = data.title;
      dDesc.textContent = data.desc;
      dImg.src = data.img;
      dImg.alt = data.title;

      // 2. Rebuild benefits list with staggered checkmarks
      dBenefitsList.innerHTML = '';
      data.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.className = 'service-benefit-item';
        li.innerHTML = `
          <span class="service-benefit-icon">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </span>
          ${benefit}
        `;
        dBenefitsList.appendChild(li);
      });

      // 3. Reveal and scroll to the expansion panel
      detailPanel.style.display = 'grid';
      
      // Smooth fade-in overlay using GSAP if loaded
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(detailPanel, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
        
        // Stagger fade benefits
        gsap.from('.service-benefit-item', {
          opacity: 0,
          x: -15,
          stagger: 0.1,
          duration: 0.4,
          delay: 0.2
        });
      }

      // Scroll smoothly to detail viewport
      detailPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // Close Detail Panel trigger
  const closeBtn = detailPanel.querySelector('.close-panel-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(detailPanel, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          onComplete: () => {
            detailPanel.style.display = 'none';
          }
        });
      } else {
        detailPanel.style.display = 'none';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. BEFORE / AFTER IMAGES SWITCH ACCORDING TO FILTER TABS
   -------------------------------------------------------------------------- */
function initBeforeAfterShowcase() {
  const baTabs = document.querySelectorAll('.ba-tab-btn');
  const beforeImg = document.querySelector('.ba-image-before');
  const afterImg = document.querySelector('.ba-image-after');

  if (baTabs.length === 0 || !beforeImg || !afterImg) return;

  // Before/after image assets data mapped
  const baData = {
    whitening: {
      before: "assets/images/ba_whitening_before.jpg",
      after: "assets/images/ba_whitening_after.jpg"
    },
    veneers: {
      before: "assets/images/ba_veneers_before.jpg",
      after: "assets/images/ba_veneers_after.jpg"
    },
    implants: {
      before: "assets/images/ba_implants_before.jpg",
      after: "assets/images/ba_implants_after.jpg"
    },
    ortho: {
      before: "assets/images/ba_ortho_before.jpg",
      after: "assets/images/ba_ortho_after.jpg"
    }
  };

  baTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active states on tabs
      baTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const showcaseId = tab.getAttribute('data-showcase');
      const assets = baData[showcaseId];

      if (!assets) return;

      // Smooth opacity cross-fade on images
      beforeImg.style.opacity = '0.5';
      afterImg.style.opacity = '0.5';
      
      setTimeout(() => {
        beforeImg.style.backgroundImage = `url(${assets.before})`;
        afterImg.style.backgroundImage = `url(${assets.after})`;
        
        beforeImg.style.opacity = '1';
        afterImg.style.opacity = '1';
        
        // Reset slider split handle to 50% midpoint
        const slider = beforeImg.closest('.ba-slider');
        if (slider) {
          const handle = slider.querySelector('.ba-handle');
          const afterImgDiv = slider.querySelector('.ba-image-after');
          if (handle && afterImgDiv) {
            handle.style.left = '50%';
            afterImgDiv.style.width = '50%';
          }
        }
      }, 300);
    });
  });
}
