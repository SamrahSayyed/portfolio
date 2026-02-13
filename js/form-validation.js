/* ==========================================
   FORM VALIDATION
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
});

/* === FORM VALIDATION === */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Real-time validation
    nameInput.addEventListener('blur', () => validateName(nameInput));
    emailInput.addEventListener('blur', () => validateEmail(emailInput));
    messageInput.addEventListener('blur', () => validateMessage(messageInput));
    
    // Clear error on input
    nameInput.addEventListener('input', () => clearError(nameInput));
    emailInput.addEventListener('input', () => clearError(emailInput));
    messageInput.addEventListener('input', () => clearError(messageInput));
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);
}

/* === VALIDATE NAME === */
function validateName(input) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (value === '') {
        setError(formGroup, errorElement, 'Name is required');
        return false;
    }
    
    if (value.length < 2) {
        setError(formGroup, errorElement, 'Name must be at least 2 characters');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError(formGroup, errorElement, 'Name can only contain letters and spaces');
        return false;
    }
    
    setSuccess(formGroup);
    return true;
}

/* === VALIDATE EMAIL === */
function validateEmail(input) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (value === '') {
        setError(formGroup, errorElement, 'Email is required');
        return false;
    }
    
    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(value)) {
        setError(formGroup, errorElement, 'Please enter a valid email address');
        return false;
    }
    
    setSuccess(formGroup);
    return true;
}

/* === VALIDATE MESSAGE === */
function validateMessage(input) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (value === '') {
        setError(formGroup, errorElement, 'Message is required');
        return false;
    }
    
    if (value.length < 10) {
        setError(formGroup, errorElement, 'Message must be at least 10 characters');
        return false;
    }
    
    if (value.length > 1000) {
        setError(formGroup, errorElement, 'Message must not exceed 1000 characters');
        return false;
    }
    
    setSuccess(formGroup);
    return true;
}

/* === SET ERROR STATE === */
function setError(formGroup, errorElement, message) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    errorElement.textContent = message;
    
    // Add shake animation
    const input = formGroup.querySelector('input, textarea');
    input.classList.add('shake');
    setTimeout(() => {
        input.classList.remove('shake');
    }, 500);
}

/* === SET SUCCESS STATE === */
function setSuccess(formGroup) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    const errorElement = formGroup.querySelector('.error-message');
    errorElement.textContent = '';
}

/* === CLEAR ERROR === */
function clearError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    const errorElement = formGroup.querySelector('.error-message');
    errorElement.textContent = '';
}

/* === HANDLE FORM SUBMIT === */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = e.target.querySelector('.btn-submit');
    const formStatus = document.getElementById('form-status');
    
    // Validate all fields
    const isNameValid = validateName(nameInput);
    const isEmailValid = validateEmail(emailInput);
    const isMessageValid = validateMessage(messageInput);
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
        showFormStatus('error', 'Please fix the errors above');
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Prepare form data
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
    };
    
    try {
        // Simulate API call (replace with your actual API endpoint)
        await simulateFormSubmission(formData);
        
        // Success
        showFormStatus('success', 'Thank you! Your message has been sent successfully.');
        e.target.reset();
        
        // Clear success classes
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('success', 'error');
        });
        
        // Track form submission (optional - for analytics)
        trackFormSubmission(formData);
        
    } catch (error) {
        // Error
        showFormStatus('error', 'Oops! Something went wrong. Please try again.');
        console.error('Form submission error:', error);
    } finally {
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

/* === SIMULATE FORM SUBMISSION === */
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // For demo purposes, always succeed
            // In production, replace with actual API call
            console.log('Form data:', data);
            
            // Example API call:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(resolve)
            // .catch(reject);
            
            resolve({ success: true });
        }, 1500);
    });
}

/* === SHOW FORM STATUS === */
function showFormStatus(type, message) {
    const formStatus = document.getElementById('form-status');
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formStatus.style.opacity = '0';
        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.style.opacity = '1';
        }, 300);
    }, 5000);
}

/* === TRACK FORM SUBMISSION (Optional) === */
function trackFormSubmission(data) {
    // Add your analytics tracking here
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            event_category: 'Contact',
            event_label: 'Contact Form',
            value: 1
        });
    }
    
    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Contact');
    }
}

/* === SPAM PROTECTION === */
function isSpam(data) {
    // Basic spam detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'prize'];
    const message = data.message.toLowerCase();
    
    return spamKeywords.some(keyword => message.includes(keyword));
}

/* === HONEYPOT FIELD (Optional) === */
// Add this to your HTML form (hidden field):
// <input type="text" name="honeypot" style="display:none" tabindex="-1" autocomplete="off">

function checkHoneypot(form) {
    const honeypot = form.querySelector('[name="honeypot"]');
    return honeypot && honeypot.value !== '';
}

/* === RATE LIMITING === */
const formSubmissions = [];

function isRateLimited() {
    const now = Date.now();
    const timeWindow = 60000; // 1 minute
    const maxSubmissions = 3;
    
    // Remove old submissions
    formSubmissions.filter(timestamp => now - timestamp < timeWindow);
    
    if (formSubmissions.length >= maxSubmissions) {
        return true;
    }
    
    formSubmissions.push(now);
    return false;
}

/* === ACCESSIBILITY ENHANCEMENTS === */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

/* === EXPORT FOR TESTING === */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateName,
        validateEmail,
        validateMessage,
        isSpam,
        checkHoneypot,
        isRateLimited
    };
}
