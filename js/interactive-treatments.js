/* ==========================================================================
   ☁️ SKY DENTAL CLINIC — SPECIALISED CLINICAL TREATMENTS JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initShadeSimulator();
  initOrthoTimeline();
  initImplantExplorer();
  initKidsComfortPanel();
  initEmergencyTriage();
});

/* --------------------------------------------------------------------------
   1. TEETH WHITENING SHADE SIMULATOR
   -------------------------------------------------------------------------- */
function initShadeSimulator() {
  const slider = document.getElementById('shade-slider');
  const shadeNameDisp = document.getElementById('shade-name');
  const shadeDescDisp = document.getElementById('shade-desc');
  const teethImageOverlay = document.querySelector('.shade-img-overlay');
  
  if (!slider) return;

  // Shades map from natural yellowish to bright cosmetic bleach
  const shades = [
    { name: 'A3 (Deep Natural)', desc: 'Standard natural shade. Contains warm amber tones common in adult dentin.', opacity: 1.0 },
    { name: 'A2 (Natural Warm)', desc: 'Slightly brightened natural shade. Amber undertones are slightly softened.', opacity: 0.75 },
    { name: 'A1 (Bright Natural)', desc: 'The highest natural white shade. Fresh, clean, and beautifully natural.', opacity: 0.5 },
    { name: 'B1 (Premium White)', desc: 'Super-premium natural brightness. A highly popular choice for a fresh smile.', opacity: 0.25 },
    { name: 'BL1 (Radiant Bleached)', desc: 'The ultimate dental bleach shade. Brilliant, dazzling, and celebrity-bright.', opacity: 0.0 }
  ];

  slider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value, 10);
    const selected = shades[value];
    
    if (!selected) return;

    shadeNameDisp.textContent = selected.name;
    shadeDescDisp.textContent = selected.desc;
    
    // Animate the image overlay opacity smoothly (A3 overlay fades out to reveal the bright layer below)
    if (teethImageOverlay) {
      if (typeof gsap !== 'undefined') {
        gsap.to(teethImageOverlay, { opacity: selected.opacity, duration: 0.4, ease: 'power2.out' });
      } else {
        teethImageOverlay.style.opacity = selected.opacity;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   2. INVISALIGN 3D ALIGNMENT TIMELINE
   -------------------------------------------------------------------------- */
function initOrthoTimeline() {
  const steps = document.querySelectorAll('.ortho-step-btn');
  const alignImage = document.querySelector('.align-sim-img');
  const weekTitle = document.getElementById('ortho-week-title');
  const weekDesc = document.getElementById('ortho-week-desc');
  const progressPercent = document.getElementById('ortho-progress-pct');
  const progressBar = document.querySelector('.ortho-progress-bar-fill');

  if (steps.length === 0) return;

  const timelineData = {
    1: { title: 'Week 1: Custom Aligner Fitting', desc: 'Precision attachment elements are placed. Aligner Tray 1 goes in. Light pressure begins targeting front teeth.', progress: '5%', teethOffset: 12 },
    12: { title: 'Week 12: Broadening the Arch', desc: 'Pre-molars shift outward to create a wider, luxury-smile frame. Spaces begin to close rapidly.', progress: '35%', teethOffset: 8 },
    24: { title: 'Week 24: Correcting Crowding', desc: 'Lower incisors rotate into absolute alignment. Bite occlusion coordinates align perfectly.', progress: '70%', teethOffset: 4 },
    36: { title: 'Week 36: Final Micro-Settling', desc: 'Perfect spacing is locked in. The clinical retention plan begins, revealing your dream celebrity smile.', progress: '100%', teethOffset: 0 }
  };

  steps.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active buttons
      steps.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');

      const weekKey = btn.getAttribute('data-week');
      const data = timelineData[weekKey];

      if (!data) return;

      // Update text
      weekTitle.textContent = data.title;
      weekDesc.textContent = data.desc;
      progressPercent.textContent = data.progress;

      // Animating align progress bar
      if (progressBar) {
        progressBar.style.width = data.progress;
      }

      // Simulate alignment movement by adjusting CSS transform filters or switching images
      if (alignImage) {
        if (typeof gsap !== 'undefined') {
          // Micro rotate and translation to simulate straightening teeth
          gsap.to(alignImage, { 
            skewX: data.teethOffset * 0.4, 
            scale: 1 + (10 - data.teethOffset) * 0.005,
            x: data.teethOffset * 0.5,
            duration: 0.6,
            ease: 'power3.out' 
          });
        } else {
          alignImage.style.transform = `skewX(${data.teethOffset * 0.4}deg) x(${data.teethOffset * 0.5}px)`;
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. DENTAL IMPLANT ANATOMY EXPLORER
   -------------------------------------------------------------------------- */
function initImplantExplorer() {
  const parts = document.querySelectorAll('.implant-part-btn');
  const detailsTitle = document.getElementById('implant-part-name');
  const detailsBody = document.getElementById('implant-part-desc');
  const detailsMat = document.getElementById('implant-part-material');
  const detailsLife = document.getElementById('implant-part-lifespan');

  if (parts.length === 0) return;

  const implantData = {
    post: {
      name: '1. Titanium Fixture (Post)',
      desc: 'The surgical screw replacing the tooth root. Integrates directly into your jawbone through osseointegration, forming a permanent, unbreakable anchor.',
      material: 'Surgical Titanium Alloy (Grade 5 Bio-compatible)',
      lifespan: 'Lifetime Permanent (with proper hygiene)'
    },
    abutment: {
      name: '2. Precision Connector (Abutment)',
      desc: 'The vital linking collar that screws onto the titanium post. It emerges through the gums to serve as the structural base for your final aesthetic crown.',
      material: 'Titanium or Zirconia Ceramic',
      lifespan: '20+ Years'
    },
    crown: {
      name: '3. Aesthetic Prosthesis (Crown)',
      desc: 'The custom, laboratory-milled tooth matching your surrounding natural enamel shades. Milled to support high chewing pressures and reflect light beautifully.',
      material: 'Solid Zirconia or IPS e.max Lithium Disilicate Ceramic',
      lifespan: '15 - 25 Years (easily replaceable if chipped)'
    }
  };

  parts.forEach(btn => {
    btn.addEventListener('click', () => {
      parts.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');

      const partKey = btn.getAttribute('data-part');
      const data = implantData[partKey];

      if (!data) return;

      // Animate text swap
      if (typeof gsap !== 'undefined') {
        const detailsContainer = document.querySelector('.implant-explorer-details');
        gsap.fromTo(detailsContainer, { opacity: 0, y: 15 }, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          onStart: () => {
            detailsTitle.textContent = data.name;
            detailsBody.textContent = data.desc;
            detailsMat.textContent = data.material;
            detailsLife.textContent = data.lifespan;
          }
        });
      } else {
        detailsTitle.textContent = data.name;
        detailsBody.textContent = data.desc;
        detailsMat.textContent = data.material;
        detailsLife.textContent = data.lifespan;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. KIDS FRIENDLY COMFORT PANEL
   -------------------------------------------------------------------------- */
function initKidsComfortPanel() {
  const comfortItems = document.querySelectorAll('.comfort-toggle-btn');
  const comfortDisplayTitle = document.getElementById('comfort-title');
  const comfortDisplayDesc = document.getElementById('comfort-desc');
  const comfortDisplayImg = document.getElementById('comfort-display-img');

  if (comfortItems.length === 0) return;

  const comfortData = {
    screen: {
      title: 'Ceiling-Mounted Entertainment Screens',
      desc: 'Kids wear lightweight wireless headphones and watch their favorite cartoon channels while lying back, entirely distracting them from the clinical setting.',
      img: 'assets/images/service_pediatric_lounge.jpg'
    },
    painless: {
      title: 'Comfort-Flow Painless Anesthesia',
      desc: 'No scary needles! We use advanced computer-controlled dynamic delivery systems which measure tissue resistance to make numbing 100% painless.',
      img: 'assets/images/service_preventative_clean.jpg'
    },
    chest: {
      title: 'The Magic Sky Prize Chest',
      desc: 'Every brave child earns a golden key to unlock our premium prize chest loaded with educational toys, reinforcing a positive association with dentist visits.',
      img: 'assets/images/office_reception.jpg'
    }
  };

  comfortItems.forEach(btn => {
    btn.addEventListener('click', () => {
      comfortItems.forEach(i => i.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-comfort');
      const data = comfortData[key];

      if (!data) return;

      if (typeof gsap !== 'undefined') {
        gsap.fromTo('.comfort-card-showcase', { opacity: 0, scale: 0.95 }, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          onStart: () => {
            comfortDisplayTitle.textContent = data.title;
            comfortDisplayDesc.textContent = data.desc;
            if (comfortDisplayImg && data.img) {
              comfortDisplayImg.src = data.img;
            }
          }
        });
      } else {
        comfortDisplayTitle.textContent = data.title;
        comfortDisplayDesc.textContent = data.desc;
        if (comfortDisplayImg && data.img) {
          comfortDisplayImg.src = data.img;
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. EMERGENCY CLINICAL TRIAGE QUIZ
   -------------------------------------------------------------------------- */
function initEmergencyTriage() {
  const quizForm = document.getElementById('triage-quiz-form');
  const triageResult = document.getElementById('triage-result');
  const triageAlertBox = document.getElementById('triage-alert-box');
  const triageAlertTitle = document.getElementById('triage-alert-title');
  const triageAlertBody = document.getElementById('triage-alert-body');

  if (!quizForm) return;

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const q1 = quizForm.elements['q1'].value === 'yes';
    const q2 = quizForm.elements['q2'].value === 'yes';
    const q3 = quizForm.elements['q3'].value === 'yes';

    // Show result
    triageResult.style.display = 'block';

    const isEmergency = q1 || q2 || q3;

    if (isEmergency) {
      triageAlertBox.className = 'triage-alert-panel alert-urgent';
      triageAlertTitle.textContent = '🚨 IMMEDIATE DENTAL EMERGENCY DETECTED';
      triageAlertBody.innerHTML = `
        <p><strong>Your symptoms require immediate professional clinical care:</strong></p>
        <ul style="margin: 15px 0; padding-left: 20px; line-height: 1.6;">
          <li>Severe dental trauma or acute unmanageable pain.</li>
          <li>Uncontrolled bleeding or expanding facial swelling.</li>
        </ul>
        <p style="margin-bottom: 20px;"><strong>Action Steps:</strong> Keep any tooth pieces in cold milk. Do not apply hot compresses. Press a clean gauze on bleeding regions.</p>
        <a href="tel:+91851899999" class="btn btn-accent btn-sm animate-pulse" style="display: inline-block;">Call Emergency Hotline: +91 85189 99999</a>
      `;
    } else {
      triageAlertBox.className = 'triage-alert-panel alert-stable';
      triageAlertTitle.textContent = '📅 ROUTINE PRIORITY CARE RECOMMENDED';
      triageAlertBody.innerHTML = `
        <p>Your condition appears stable and does not indicate immediate severe risk, but requires prompt examination.</p>
        <p style="margin: 10px 0 20px 0;">We recommend booking an appointment slot for the next 24-48 hours to prevent future infection or pain development.</p>
        <a href="contact.html#appointment" class="btn btn-primary btn-sm">Schedule Appointment</a>
      `;
    }

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(triageResult, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' });
    }
  });
}
