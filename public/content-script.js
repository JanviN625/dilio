// Content script to detect checkout pages
console.log('Dilio: Content script loaded on', window.location.href);

// Detect if we're on a checkout/cart page
function isCheckoutPage() {
  const url = window.location.href.toLowerCase();
  const title = document.title.toLowerCase();
  
  const checkoutPatterns = [
    'checkout', 'cart', 'basket', 'payment', 
    'order', 'review', 'shipping'
  ];
  
  return checkoutPatterns.some(pattern => 
    url.includes(pattern) || title.includes(pattern)
  );
}

// Extract purchase amount from common e-commerce patterns
function extractAmount() {
  // Common selectors for total amount
  const selectors = [
    '[class*=\"total\"]',
    '[class*=\"grand-total\"]',
    '[id*=\"total\"]',
    '[data-test*=\"total\"]',
    '.order-total',
    '#order-total'
  ];
  
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
      const text = el.textContent;
      const match = text.match(/\$\([0-9,]+\.?[0-9]*)/);
      if (match) {
        return parseFloat(match[1].replace(',', ''));
      }
    }
  }
  
  return null;
}

// Notify background script when checkout is detected
if (isCheckoutPage()) {
  console.log('Dilio: Checkout page detected!');
  
  // Look for place order / complete purchase buttons
  const observer = new MutationObserver(() => {
    const buttons = document.querySelectorAll('button, input[type=\"submit\"]');
    buttons.forEach(button => {
      const text = button.textContent.toLowerCase();
      if (text.includes('place order') || 
          text.includes('complete purchase') ||
          text.includes('pay now') ||
          text.includes('submit order')) {
        
        button.addEventListener('click', () => {
          const amount = extractAmount();
          console.log('Dilio: Purchase button clicked, amount:', amount);
          
          chrome.runtime.sendMessage({
            type: 'CHECKOUT_DETECTED',
            amount: amount,
            url: window.location.href
          });
        }, { once: true });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
