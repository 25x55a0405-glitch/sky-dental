/* ==========================================================================
   ☁️ SKY DENTAL CLINIC — EMI COST CALCULATOR JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEmiCalculator();
});

function initEmiCalculator() {
  const treatmentSelect = document.getElementById('calc-treatment');
  const downPaymentSlider = document.getElementById('calc-downpayment');
  const downPaymentVal = document.getElementById('calc-downpayment-val');
  const tenureSelect = document.getElementById('calc-tenure');
  
  // Output display fields
  const totalCostDisp = document.getElementById('calc-total-cost');
  const downPaymentDisp = document.getElementById('calc-downpayment-amt');
  const balanceDisp = document.getElementById('calc-balance');
  const monthlyEmiDisp = document.getElementById('calc-monthly-emi');
  
  if (!treatmentSelect || !downPaymentSlider || !tenureSelect) return;

  // Treatment base prices in INR (aligned with premium clinic scope)
  const treatmentPrices = {
    cosmetic: 120000,
    implants: 85000,
    invisalign: 150000,
    preventative: 25000,
    emergency: 35000,
    whitening: 45000
  };

  function calculateEMI() {
    const selectedTreatment = treatmentSelect.value;
    const basePrice = treatmentPrices[selectedTreatment] || 0;
    
    // Get downpayment percentage and value
    const pct = parseInt(downPaymentSlider.value, 10);
    downPaymentVal.textContent = `${pct}%`;
    
    const downpaymentAmount = Math.round((basePrice * pct) / 100);
    const balanceAmount = basePrice - downpaymentAmount;
    
    // Tenure selection
    const tenureMonths = parseInt(tenureSelect.value, 10) || 12;
    
    // Calculate EMI (Interest free - standard modern portfolio feature)
    const monthlyEmi = tenureMonths > 0 ? Math.round(balanceAmount / tenureMonths) : 0;
    
    // Format to Indian currency style (e.g. ₹ 1,50,000)
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
    
    // Update DOM with smooth count-up logic using GSAP if available, or normal innerText
    updateNumericDisplay(totalCostDisp, basePrice, formatter);
    updateNumericDisplay(downPaymentDisp, downpaymentAmount, formatter);
    updateNumericDisplay(balanceDisp, balanceAmount, formatter);
    updateNumericDisplay(monthlyEmiDisp, monthlyEmi, formatter);
  }

  // Update numbers smoothly using transition
  function updateNumericDisplay(element, targetValue, formatter) {
    if (!element) return;
    
    if (typeof gsap !== 'undefined') {
      const currentValObj = { val: parseFloat(element.innerText.replace(/[^0-9]/g, '')) || 0 };
      
      gsap.to(currentValObj, {
        val: targetValue,
        duration: 0.5,
        ease: 'power2.out',
        snap: { val: 1 },
        onUpdate: () => {
          element.textContent = formatter.format(currentValObj.val);
        }
      });
    } else {
      element.textContent = formatter.format(targetValue);
    }
  }

  // Listeners
  treatmentSelect.addEventListener('change', calculateEMI);
  downPaymentSlider.addEventListener('input', calculateEMI);
  tenureSelect.addEventListener('change', calculateEMI);
  
  // Initial run
  calculateEMI();
}
