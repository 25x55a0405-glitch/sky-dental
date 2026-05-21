/* ==========================================================================
   ☁️ SKY DENTAL CLINIC — REAL-TIME FAQ SEARCH JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFaqSearch();
});

function initFaqSearch() {
  const searchInput = document.getElementById('faq-search');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const noResultsCard = document.getElementById('faq-no-results');
  
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let matchCount = 0;

    accordionItems.forEach(item => {
      const headerText = item.querySelector('.accordion-header').textContent.toLowerCase();
      const contentText = item.querySelector('.accordion-content').textContent.toLowerCase();
      
      // Match query in either header or content
      if (headerText.includes(query) || contentText.includes(query)) {
        item.style.display = 'block';
        matchCount++;
        
        // Remove highlighting if query is empty, else add simple highlight wrap if desired
        // For simplicity and solid reliability, we filter display block/none smoothly
        if (query.length > 0) {
          item.classList.add('search-match');
        } else {
          item.classList.remove('search-match');
        }
      } else {
        item.style.display = 'none';
        item.classList.remove('search-match');
        
        // Ensure collapsed accordion if hidden
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = '0';
      }
    });

    // Toggle No Results Card
    if (noResultsCard) {
      if (matchCount === 0 && query.length > 0) {
        noResultsCard.style.display = 'block';
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(noResultsCard, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
        }
      } else {
        noResultsCard.style.display = 'none';
      }
    }
  });
}
