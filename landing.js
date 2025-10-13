// Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    
    // Generate random device ID
    function generateDeviceId() {
        const timestamp = Date.now().toString().slice(-4);
        const random = Math.floor(Math.random() * 9000) + 1000;
        return `NF-${timestamp}-${random}`;
    }
    
    // Set device ID
    document.getElementById('device-id').value = generateDeviceId();
    
    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const location = document.getElementById('location').value;
        const deviceId = document.getElementById('device-id').value;
        
        // Validate form
        if (!username || !location) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = registrationForm.querySelector('.connect-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        submitBtn.disabled = true;
        
        // Simulate connection process
        setTimeout(() => {
            // Store user data
            const userData = {
                username: username,
                location: location,
                deviceId: deviceId,
                joinedDate: new Date().toISOString()
            };
            localStorage.setItem('nimfresh-user', JSON.stringify(userData));
            
            // Show success message
            showNotification('Device connected successfully!', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        }, 2000);
    });
    
    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add input animations
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
`;
document.head.appendChild(notificationStyles);