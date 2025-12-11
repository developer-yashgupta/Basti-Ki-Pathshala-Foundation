// Client-side JavaScript for Netlify deployment
class BastikiPathshalaApp {
  constructor() {
    this.apiBase = '/.netlify/functions/api';
    this.init();
  }

  init() {
    // Initialize contact form
    this.initContactForm();
    // Load dynamic content
    this.loadPrograms();
    this.loadEvents();
    this.loadPartners();
  }

  async apiCall(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.apiBase}/${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      return null;
    }
  }

  initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message')
        };

        const result = await this.apiCall('contact', {
          method: 'POST',
          body: JSON.stringify(data)
        });

        if (result && result.success) {
          this.showMessage('Thank you! Your message has been sent successfully.', 'success');
          contactForm.reset();
        } else {
          this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        }
      });
    }
  }

  async loadPrograms() {
    const programsContainer = document.getElementById('programs-container');
    if (programsContainer) {
      const programs = await this.apiCall('programs');
      if (programs && programs.length > 0) {
        programsContainer.innerHTML = programs.map(program => `
          <div class="program-card">
            <img src="${program.image || '/public/images/default-program.jpg'}" alt="${program.title}">
            <div class="program-content">
              <h3>${program.title}</h3>
              <p>${program.description}</p>
            </div>
          </div>
        `).join('');
      }
    }
  }

  async loadEvents() {
    const eventsContainer = document.getElementById('events-container');
    if (eventsContainer) {
      const events = await this.apiCall('events');
      if (events && events.length > 0) {
        eventsContainer.innerHTML = events.map(event => `
          <div class="event-card">
            <div class="event-date">
              <span class="day">${new Date(event.date).getDate()}</span>
              <span class="month">${new Date(event.date).toLocaleDateString('en', { month: 'short' })}</span>
            </div>
            <div class="event-content">
              <h3>${event.title}</h3>
              <p>${event.description}</p>
              <p class="event-location">📍 ${event.location}</p>
            </div>
          </div>
        `).join('');
      }
    }
  }

  async loadPartners() {
    const partnersContainer = document.getElementById('partners-container');
    if (partnersContainer) {
      const partners = await this.apiCall('partners');
      if (partners && partners.length > 0) {
        partnersContainer.innerHTML = partners.map(partner => `
          <div class="partner-card">
            <img src="${partner.logo || '/public/images/default-partner.jpg'}" alt="${partner.name}">
            <h4>${partner.name}</h4>
            <span class="partner-type">${partner.type}</span>
          </div>
        `).join('');
      }
    }
  }

  showMessage(message, type = 'info') {
    // Create or update message element
    let messageEl = document.getElementById('app-message');
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.id = 'app-message';
      messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        max-width: 300px;
      `;
      document.body.appendChild(messageEl);
    }

    messageEl.textContent = message;
    messageEl.className = `message-${type}`;
    
    // Style based on type
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6'
    };
    messageEl.style.backgroundColor = colors[type] || colors.info;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 5000);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BastikiPathshalaApp();
});