// Netlify Forms integration
document.addEventListener('DOMContentLoaded', function() {
  // Handle Netlify form submissions
  const forms = document.querySelectorAll('form[data-netlify="true"]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = new URLSearchParams(formData);
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
      })
      .then(() => {
        // Show success message
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
      })
      .catch(() => {
        // Show error message
        showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
      })
      .finally(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  });
  
  function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
      padding: 15px;
      margin: 15px 0;
      border-radius: 5px;
      font-weight: bold;
      ${type === 'success' ? 'background-color: #d1fae5; color: #065f46; border: 1px solid #10b981;' : ''}
      ${type === 'error' ? 'background-color: #fee2e2; color: #991b1b; border: 1px solid #ef4444;' : ''}
    `;
    
    // Insert message after the form
    const form = document.querySelector('form[data-netlify="true"]');
    if (form) {
      form.parentNode.insertBefore(messageEl, form.nextSibling);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl);
        }
      }, 5000);
    }
  }
});