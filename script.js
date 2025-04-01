// Enhanced script for wedding invitation website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Preview Card Interactions
    const previewCards = document.querySelectorAll('.preview-card');
    
    previewCards.forEach(card => {
        // Add hover sound effect
        card.addEventListener('mouseenter', function() {
            // Create subtle hover sound if needed
            // const hoverSound = new Audio('hover-sound.mp3');
            // hoverSound.volume = 0.2;
            // hoverSound.play();
            
            // Add pulse effect on hover
            this.classList.add('pulse');
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove pulse effect
            this.classList.remove('pulse');
        });
        
        // Add click effect
        card.addEventListener('click', function(e) {
            // Only trigger if the card itself is clicked (not the link)
            if (e.target.tagName !== 'A' && !e.target.closest('a')) {
                const link = this.querySelector('.preview-link');
                if (link) {
                    // Create ripple effect
                    const ripple = document.createElement('div');
                    ripple.className = 'ripple';
                    
                    // Position the ripple at click coordinates
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    
                    this.appendChild(ripple);
                    
                    // Remove ripple after animation completes
                    setTimeout(() => {
                        ripple.remove();
                        window.location.href = link.getAttribute('href');
                    }, 300);
                }
            }
        });
    });
    
    // RSVP Form Validation and Submission
    const rsvpForm = document.getElementById('rsvp-form');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const guestNames = document.getElementById('guest-names').value.trim();
            const attending = document.querySelector('input[name="attending"]:checked');
            const dietary = document.getElementById('dietary').value.trim();
            const songRequest = document.getElementById('song-request').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Validate required fields
            if (!guestNames) {
                showError('Please enter guest names');
                return;
            }
            
            if (!attending) {
                showError('Please select whether you are attending');
                return;
            }
            
            if (!email) {
                showError('Please enter your email address');
                return;
            }
            
            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Collect form data
            const formData = {
                guestNames: guestNames,
                attending: attending.value,
                dietary: dietary,
                songRequest: songRequest,
                email: email,
                additionalGuests: document.getElementById('additional-guests').value,
                message: document.getElementById('message') ? document.getElementById('message').value.trim() : ''
            };
            
            // Show loading state
            const submitBtn = rsvpForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate sending email (in a real application, this would send data to a server)
            setTimeout(() => {
                submitForm(formData);
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }, 1500);
        });
    }
    
    // Function to validate email format
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Function to show error message
    function showError(message) {
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and append error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff0000';
        errorDiv.style.marginBottom = '20px';
        errorDiv.style.textAlign = 'center';
        errorDiv.textContent = message;
        
        rsvpForm.insertBefore(errorDiv, rsvpForm.firstChild);
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add shake animation to form
        rsvpForm.classList.add('shake');
        setTimeout(() => {
            rsvpForm.classList.remove('shake');
        }, 500);
    }
    
    // Function to submit form (simulated)
    function submitForm(formData) {
        // Hide the form
        rsvpForm.style.display = 'none';
        
        // Create success message container
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.textAlign = 'center';
        successDiv.style.padding = '40px';
        successDiv.style.backgroundColor = 'rgba(163, 191, 217, 0.2)';
        successDiv.style.border = '1px solid #A3BFD9';
        successDiv.style.borderRadius = '10px';
        successDiv.style.animation = 'fadeIn 1s ease-in-out';
        
        // Create success message content
        const heading = document.createElement('h3');
        heading.textContent = formData.attending === 'yes' ? 'Thank You for Your RSVP!' : 'We Will Miss You!';
        heading.style.marginBottom = '20px';
        heading.style.color = '#1F2A44';
        
        const message = document.createElement('p');
        if (formData.attending === 'yes') {
            message.textContent = `We're excited to celebrate with you, ${formData.guestNames}! Your RSVP has been received and an email confirmation has been sent to ${formData.email}.`;
        } else {
            message.textContent = `We're sorry you can't make it, ${formData.guestNames}. Thank you for letting us know. A confirmation has been sent to ${formData.email}.`;
        }
        message.style.marginBottom = '30px';
        
        // Add elements to success div
        successDiv.appendChild(heading);
        successDiv.appendChild(message);
        
        // Add a "back" button to reset the form (for demo purposes)
        const backButton = document.createElement('button');
        backButton.textContent = 'Back to Form';
        backButton.className = 'submit-btn';
        backButton.addEventListener('click', function() {
            // Reset and show the form again
            rsvpForm.reset();
            rsvpForm.style.display = 'block';
            successDiv.remove();
        });
        
        successDiv.appendChild(backButton);
        
        // Insert success message where the form was
        rsvpForm.parentNode.insertBefore(successDiv, rsvpForm.nextSibling);
        
        // Log the form data (in a real application, this would be sent to a server)
        console.log('Form submitted with data:', formData);
        
        // In a real application, this is where you would send the data to your email service
        console.log('Email would be sent to wedding organizer with the following data:');
        console.log(`Guest Names: ${formData.guestNames}`);
        console.log(`Attending: ${formData.attending}`);
        console.log(`Email: ${formData.email}`);
        console.log(`Additional Guests: ${formData.additionalGuests}`);
        console.log(`Dietary Restrictions: ${formData.dietary}`);
        console.log(`Song Request: ${formData.songRequest}`);
        console.log(`Message: ${formData.message}`);
    }
    
    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') || 
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});
