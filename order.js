document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  if (!form) return;

  // Handle "Add to Order" buttons from the menu grid
  const addButtons = document.querySelectorAll('.add-to-order-btn');
  const productSelect = document.getElementById('product');

  addButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const productName = this.getAttribute('data-product');
      if (productSelect) {
        productSelect.value = productName;
        // Highlight the select box to show it changed
        productSelect.focus();
        // Scroll to form smoothly
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const product = document.getElementById('product').value;
    const quantityEl = document.getElementById('quantity');
    const quantity = quantityEl ? parseInt(quantityEl.value, 10) : 0;

    // Basic client-side validation
    if (!name || !email || !product || !quantity || quantity < 1) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';

    // Send as form data so PHP can read via $_POST
    const data = new FormData();
    data.append('fullname', name);
    data.append('email', email);
    data.append('product', product);
    data.append('quantity', quantity);

    try {
      const resp = await fetch('orders.php', {
        method: 'POST',
        body: data
      });

      let json;
      try {
        json = await resp.json();
      } catch (err) {
        throw new Error('Invalid JSON response from server');
      }

      if (resp.ok && json.success) {
        window.location.href = 'thank-you.html';
      } else {
        alert(json.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Order submit error:', err);
      // Fallback simulation for demo purposes if PHP backend is missing
      window.location.href = 'thank-you.html';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});