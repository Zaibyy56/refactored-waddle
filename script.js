// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Emergency Banner
document.addEventListener('DOMContentLoaded', function() {
    const closeBanner = document.querySelector('.close-banner');
    const emergencyBanner = document.querySelector('.emergency-banner');

    if (closeBanner && emergencyBanner) {
        closeBanner.addEventListener('click', function() {
            emergencyBanner.style.display = 'none';
            // Adjust header margin
            document.querySelector('.hero').style.marginTop = '0';
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const bannerHeight = document.querySelector('.emergency-banner') ? 
                document.querySelector('.emergency-banner').offsetHeight : 0;
            
            window.scrollTo({
                top: target.offsetTop - headerHeight - bannerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// File Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    let uploadedFiles = [];

    if (uploadArea && fileInput) {
        // Click to upload
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = Array.from(e.dataTransfer.files);
            handleFiles(files);
        });

        // File input change
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            handleFiles(files);
        });

        function handleFiles(files) {
            uploadedFiles = files;
            updateUploadArea();
        }

        function updateUploadArea() {
            if (uploadedFiles.length > 0) {
                const fileNames = uploadedFiles.map(file => file.name).join(', ');
                uploadArea.innerHTML = `
                    <i class="fas fa-check-circle" style="color: #16a34a;"></i>
                    <h3>Files Ready for Analysis</h3>
                    <p>${fileNames}</p>
                    <small>Click to change files</small>
                `;
                analyzeBtn.disabled = false;
                analyzeBtn.style.opacity = '1';
            } else {
                uploadArea.innerHTML = `
                    <i class="fas fa-cloud-upload-alt"></i>
                    <h3>Drop files here or click to upload</h3>
                    <p>Upload ransom note (.txt, .html) or encrypted file sample</p>
                `;
                analyzeBtn.disabled = true;
                analyzeBtn.style.opacity = '0.6';
            }
        }

        // Analyze button functionality
        analyzeBtn.addEventListener('click', function() {
            if (uploadedFiles.length === 0) {
                showNotification('Please upload files first', 'error');
                return;
            }

            // Show loading state
            analyzeBtn.innerHTML = '<span class="loading"></span> Analyzing...';
            analyzeBtn.disabled = true;

            // Simulate analysis (replace with actual API call)
            setTimeout(() => {
                showRansomwareResults();
                analyzeBtn.innerHTML = 'Analyze Files';
                analyzeBtn.disabled = false;
            }, 3000);
        });

        function showRansomwareResults() {
            // This would normally be replaced with actual analysis results
            const results = {
                ransomware: 'LockBit 3.0',
                severity: 'High',
                recovery: 'Possible',
                recommendation: 'Immediate professional assistance required'
            };

            const resultHTML = `
                <div class="analysis-results">
                    <h3>Analysis Complete</h3>
                    <div class="result-item">
                        <strong>Ransomware Type:</strong> ${results.ransomware}
                    </div>
                    <div class="result-item">
                        <strong>Severity:</strong> <span class="severity-${results.severity.toLowerCase()}">${results.severity}</span>
                    </div>
                    <div class="result-item">
                        <strong>Recovery Outlook:</strong> ${results.recovery}
                    </div>
                    <div class="result-item">
                        <strong>Recommendation:</strong> ${results.recommendation}
                    </div>
                    <div class="result-actions">
                        <a href="#contact" class="btn btn-primary">Get Help Now</a>
                        <button onclick="resetAnalysis()" class="btn btn-secondary">Analyze Another</button>
                    </div>
                </div>
            `;

            uploadArea.innerHTML = resultHTML;
            showNotification('Analysis complete! Scroll down for emergency contact options.', 'success');
        }

        // Reset analysis function (global scope)
        window.resetAnalysis = function() {
            uploadedFiles = [];
            fileInput.value = '';
            updateUploadArea();
        };
    }
});

// Emergency Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const emergencyForm = document.getElementById('emergencyForm');
    
    if (emergencyForm) {
        emergencyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(emergencyForm);
            const urgency = formData.get('urgency');
            
            // Show loading state
            const submitBtn = emergencyForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                if (urgency === 'critical') {
                    showNotification('CRITICAL ALERT: Our emergency team will contact you within 5 minutes!', 'success');
                    // Show emergency contact popup
                    showEmergencyPopup();
                } else {
                    showNotification('Form submitted successfully! We will contact you shortly.', 'success');
                }
                
                // Reset form
                emergencyForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Chat Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chatWidget');
    const chatButton = document.getElementById('chatButton');

    if (chatButton) {
        chatButton.addEventListener('click', function() {
            // In a real implementation, this would open a chat interface
            showNotification('Live chat is starting... Please wait for an agent.', 'info');
            
            // Simulate chat connection
            setTimeout(() => {
                showNotification('Connected to emergency support! How can we help?', 'success');
            }, 2000);
        });
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-triangle';
        case 'warning': return 'exclamation-circle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#16a34a';
        case 'error': return '#dc2626';
        case 'warning': return '#d97706';
        default: return '#3b82f6';
    }
}

// Emergency Popup
function showEmergencyPopup() {
    const popup = document.createElement('div');
    popup.className = 'emergency-popup';
    popup.innerHTML = `
        <div class="popup-overlay"></div>
        <div class="popup-content">
            <div class="popup-header">
                <h2><i class="fas fa-exclamation-triangle"></i> CRITICAL SUPPORT ACTIVATED</h2>
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-body">
                <p><strong>Our emergency response team has been notified.</strong></p>
                <p>While you wait for our call:</p>
                <ul>
                    <li>Do NOT restart any infected computers</li>
                    <li>Disconnect systems from the network immediately</li>
                    <li>Document any ransom messages</li>
                    <li>Keep this number ready: <strong>+1 (555) 123-CYBER</strong></li>
                </ul>
                <div class="popup-actions">
                    <a href="tel:+15551234567" class="btn btn-primary">
                        <i class="fas fa-phone"></i> Call Now
                    </a>
                    <button onclick="closeEmergencyPopup()" class="btn btn-secondary">I Understand</button>
                </div>
            </div>
        </div>
    `;

    // Add styles
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 20000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(popup);

    // Close functionality
    const closeBtn = popup.querySelector('.popup-close');
    const overlay = popup.querySelector('.popup-overlay');
    
    closeBtn.addEventListener('click', () => closeEmergencyPopup());
    overlay.addEventListener('click', () => closeEmergencyPopup());

    // Global close function
    window.closeEmergencyPopup = function() {
        if (popup.parentNode) {
            popup.remove();
        }
    };
}

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial, .step, .about-stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter Animation for Statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .about-stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        if (target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 20);
        }
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    }

    .popup-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
    }

    .popup-content {
        background: white;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        z-index: 1;
    }

    .popup-header {
        background: #dc2626;
        color: white;
        padding: 1.5rem;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .popup-header h2 {
        margin: 0;
        font-size: 1.25rem;
    }

    .popup-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .popup-body {
        padding: 2rem;
    }

    .popup-body ul {
        margin: 1rem 0;
        padding-left: 1.5rem;
    }

    .popup-body li {
        margin-bottom: 0.5rem;
    }

    .popup-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }

    .analysis-results {
        text-align: left;
        color: white;
    }

    .analysis-results h3 {
        color: #3b82f6;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .result-item {
        margin-bottom: 1rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .severity-high {
        color: #dc2626;
        font-weight: bold;
    }

    .severity-medium {
        color: #d97706;
        font-weight: bold;
    }

    .severity-low {
        color: #16a34a;
        font-weight: bold;
    }

    .result-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    .upload-area.dragover {
        border-color: #3b82f6;
        background: rgba(59, 130, 246, 0.1);
        transform: scale(1.02);
    }
`;

document.head.appendChild(style);