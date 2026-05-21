/* ==========================================================================
   ☁️ SKY DENTAL CLINIC — FORM VALIDATION & SUCCESS FEEDBACK
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingLabels();
  initFormValidation();
});

/* --------------------------------------------------------------------------
   1. FLOATING LABELS STATUS CHECKS
   -------------------------------------------------------------------------- */
function initFloatingLabels() {
  const inputs = document.querySelectorAll('.form-control');

  inputs.forEach(input => {
    // Check initial state (e.g. if autocomplete filled it)
    if (input.value.trim() !== '') {
      input.placeholder = ''; // Clear placeholder to trigger label float
    }

    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') {
        input.placeholder = '';
      } else {
        input.placeholder = ' '; // Standard placeholder dummy to trigger CSS sibling check
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. FORM VALIDATION & CINEMATIC SVG SUCCESS FEEDBACK
   -------------------------------------------------------------------------- */
function initFormValidation() {
  const form = document.getElementById('appointment-form');
  const appointmentCard = document.querySelector('.appointment-card');

  if (!form || !appointmentCard) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous error styles
    const formControls = form.querySelectorAll('.form-control');
    formControls.forEach(ctrl => ctrl.classList.remove('anim-shake'));
    formControls.forEach(ctrl => ctrl.style.borderColor = 'var(--border)');

    let hasErrors = false;

    // Validate inputs
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const serviceInput = document.getElementById('service');
    const dateInput = document.getElementById('date');

    // 1. Validate Name (Not Empty, Minimum 3 characters)
    if (!nameInput || nameInput.value.trim().length < 3) {
      triggerError(nameInput);
      hasErrors = true;
    }

    // 2. Validate Phone (Not Empty, Minimum 10 digits numeric)
    const phoneRegex = /^[6-9]\d{9}$/; // Standard Indian phone pattern
    if (!phoneInput || !phoneRegex.test(phoneInput.value.trim())) {
      triggerError(phoneInput);
      hasErrors = true;
    }

    // 3. Validate Email (Valid email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
      triggerError(emailInput);
      hasErrors = true;
    }

    // 4. Validate Service (Selected)
    if (!serviceInput || serviceInput.value === '') {
      triggerError(serviceInput);
      hasErrors = true;
    }

    // 5. Validate Date (Selected & in the future)
    if (!dateInput || dateInput.value === '') {
      triggerError(dateInput);
      hasErrors = true;
    } else {
      const selectedDate = new Date(dateInput.value);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        triggerError(dateInput);
        hasErrors = true;
      }
    }

    // Stop submit if validation errors exist
    if (hasErrors) return;

    // 3. Trigger cinematic SVG checkmark drawing success state
    triggerSuccessAnimation();
  });

  // Error trigger visual feedback
  function triggerError(inputElement) {
    if (!inputElement) return;
    
    // Set border to red error color
    inputElement.style.borderColor = 'var(--error)';
    
    // Trigger shake animation
    inputElement.classList.add('anim-shake');
    
    // Reset shake after animation duration
    setTimeout(() => {
      inputElement.classList.remove('anim-shake');
    }, 450);
  }

  // Cinematic success card replace animation
  function triggerSuccessAnimation() {
    // 1. Hide form wrapper with fade-out
    if (typeof gsap !== 'undefined') {
      gsap.to(form, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          form.style.display = 'none';
          showSuccessMessage();
        }
      });
    } else {
      form.style.display = 'none';
      showSuccessMessage();
    }
  }

  function showSuccessMessage() {
    // 2. Build dynamic success container inside the card
    const successDiv = document.createElement('div');
    successDiv.className = 'text-center anim-scale-in';
    successDiv.style.padding = '40px 0';
    successDiv.innerHTML = `
      <div class="success-checkmark">
        <svg viewBox="0 0 52 52">
          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <h3 class="section-title text-serif text-primary-color" style="font-size: 2rem; margin-bottom: 10px;">Appointment Requested!</h3>
      <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 20px; max-width: 480px; margin-left: auto; margin-right: auto;">
        Thank you! Our dedicated patient care coordinator will call you back within 15 minutes to finalize your preferred time block.
      </p>
      <button class="btn btn-primary" onclick="window.location.reload();">Request Another Slot</button>
    `;

    appointmentCard.appendChild(successDiv);

    // Bounce button entry
    if (typeof gsap !== 'undefined') {
      gsap.from('.success-checkmark', { scale: 0, rotation: -45, duration: 0.8, ease: 'back.out(1.7)' });
      gsap.from(successDiv.querySelectorAll('h3, p, button'), {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        delay: 0.4
      });
    }
  }
}
