// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    const userData = JSON.parse(localStorage.getItem('nimfresh-user'));
    if (userData && userData.username) {
        document.getElementById('welcome-text').textContent = `Welcome, ${userData.username}`;
    }
    
    // Sample food data
    const foodItems = [
        {
            id: 1,
            name: "Carrots",
            icon: "fas fa-carrot",
            quantity: "450g",
            status: "fresh",
            expiry: "Fresh • 12 days remaining",
            category: "vegetables"
        },
        {
            id: 2,
            name: "Cheese Block",
            icon: "fas fa-cheese",
            quantity: "200g",
            status: "fresh",
            expiry: "Fresh • 15 days remaining",
            category: "dairy"
        },
        {
            id: 3,
            name: "Chicken Breast",
            icon: "fas fa-drumstick-bite",
            quantity: "600g",
            status: "warning",
            expiry: "Use in 2 days",
            category: "meat"
        },
        {
            id: 4,
            name: "Apples",
            icon: "fas fa-apple-alt",
            quantity: "800g",
            status: "warning",
            expiry: "Use in 3 days",
            category: "fruits"
        },
        {
            id: 5,
            name: "Fish Fillets",
            icon: "fas fa-fish",
            quantity: "350g",
            status: "danger",
            expiry: "SPOILED - Discard Immediately",
            category: "seafood"
        },
        {
            id: 6,
            name: "Milk",
            icon: "fas fa-wine-bottle",
            quantity: "1L",
            status: "warning",
            expiry: "Use in 1 day",
            category: "dairy"
        }
    ];

    // Initialize food items
    renderFoodItems(foodItems);
    updateItemCounts();

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterFoodItems(filter);
            updateItemCounts();
        });
    });

    // Action buttons functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn')) {
            const button = e.target.closest('.action-btn');
            const item = button.closest('.food-item');
            const itemName = item.querySelector('h3').textContent;
            
            if (button.classList.contains('consume-btn')) {
                if (confirm(`Mark "${itemName}" as consumed?`)) {
                    item.style.opacity = '0.5';
                    setTimeout(() => {
                        item.remove();
                        updateItemCounts();
                    }, 300);
                }
            } else if (button.classList.contains('discard-btn')) {
                if (confirm(`Discard "${itemName}"? This action cannot be undone.`)) {
                    addToWasteAnalytics(itemName);
                    item.style.opacity = '0.5';
                    setTimeout(() => {
                        item.remove();
                        updateItemCounts();
                    }, 300);
                }
            }
        }
    });

    // Initialize sensor readings
    updateSensorReadings();
    
    // Update sensor readings every 5 seconds
    setInterval(updateSensorReadings, 5000);

    // Simulate real-time food updates
    setInterval(simulateFoodUpdates, 30000);
});

// Function to render food items
function renderFoodItems(items) {
    const container = document.getElementById('food-items-container');
    container.innerHTML = '';

    items.forEach(item => {
        const foodItem = document.createElement('div');
        foodItem.className = `food-item ${item.status}`;
        foodItem.setAttribute('data-category', item.status);
        
        foodItem.innerHTML = `
            <div class="item-image">
                <i class="${item.icon}"></i>
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-quantity">Weight: ${item.quantity}</p>
                <p class="item-expiry ${item.status === 'danger' ? 'spoilage-alert' : ''}">
                    ${item.status === 'danger' ? '<i class="fas fa-exclamation-circle"></i> ' : ''}
                    ${item.expiry}
                </p>
            </div>
            <div class="item-actions">
                <button class="action-btn ${item.status === 'fresh' ? 'consume-btn' : item.status === 'warning' ? 'urgent-btn' : 'discard-btn'}">
                    <i class="fas fa-${item.status === 'fresh' ? 'utensils' : item.status === 'warning' ? 'fire' : 'trash'}"></i>
                    ${item.status === 'fresh' ? 'Use' : item.status === 'warning' ? 'Use Now' : 'Discard'}
                </button>
            </div>
        `;
        
        container.appendChild(foodItem);
    });
}

// Function to filter food items
function filterFoodItems(filter) {
    const items = document.querySelectorAll('.food-item');
    
    items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Function to update item counts
function updateItemCounts() {
    const freshCount = document.querySelectorAll('.food-item[data-category="fresh"]:not([style*="display: none"])').length;
    const warningCount = document.querySelectorAll('.food-item[data-category="warning"]:not([style*="display: none"])').length;
    const dangerCount = document.querySelectorAll('.food-item[data-category="danger"]:not([style*="display: none"])').length;
    
    document.getElementById('fresh-count').textContent = freshCount;
    document.getElementById('warning-count').textContent = warningCount;
    document.getElementById('danger-count').textContent = dangerCount;
}

// Function to update sensor readings
function updateSensorReadings() {
    // Simulate real sensor data updates
    const temperature = 4 + (Math.random() * 2 - 1); // 3-5°C variation
    const humidity = 65 + (Math.random() * 10 - 5); // 60-70% variation
    const weight = 8.2 + (Math.random() * 0.4 - 0.2); // Small weight changes
    
    // Update display values
    const tempElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const weightElement = document.getElementById('total-weight');
    
    if (tempElement) tempElement.textContent = `${temperature.toFixed(1)}°C`;
    if (humidityElement) humidityElement.textContent = `${humidity.toFixed(0)}%`;
    if (weightElement) weightElement.textContent = `${weight.toFixed(1)}kg`;
    
    const liveTemp = document.getElementById('live-temperature');
    const liveHumidity = document.getElementById('live-humidity');
    const liveWeight = document.getElementById('live-weight');
    
    if (liveTemp) liveTemp.textContent = `${temperature.toFixed(1)}°C`;
    if (liveHumidity) liveHumidity.textContent = `${humidity.toFixed(0)}%`;
    if (liveWeight) liveWeight.textContent = `${weight.toFixed(1)}kg`;
    
    // Update range bars (simulated)
    const tempFill = ((temperature + 10) / 35) * 100; // Scale -10°C to 25°C
    const tempRangeFill = document.querySelector('.sensor-card:nth-child(1) .range-fill');
    if (tempRangeFill) tempRangeFill.style.width = `${tempFill}%`;
    
    const humidityFill = humidity; // Scale 0% to 100%
    const humidityRangeFill = document.querySelector('.sensor-card:nth-child(2) .range-fill');
    if (humidityRangeFill) humidityRangeFill.style.width = `${humidityFill}%`;
    
    // Update capacity (simulated)
    const capacity = 45 + (Math.random() * 10 - 5); // 40-50% variation
    const capacityFill = document.querySelector('.capacity-fill');
    const capacityText = document.querySelector('.capacity-info span');
    
    if (capacityFill) capacityFill.style.width = `${capacity}%`;
    if (capacityText) capacityText.textContent = `${capacity.toFixed(0)}% storage used`;
    
    // Update trend
    const trendElement = document.querySelector('.sensor-trend');
    if (trendElement) {
        const randomTrend = Math.random();
        if (randomTrend > 0.6) {
            trendElement.innerHTML = '<i class="fas fa-arrow-up trend-up"></i><span>Weight increasing</span>';
        } else if (randomTrend < 0.4) {
            trendElement.innerHTML = '<i class="fas fa-arrow-down trend-down"></i><span>Weight decreasing</span>';
        } else {
            trendElement.innerHTML = '<i class="fas fa-minus trend-stable"></i><span>Weight stable</span>';
        }
    }
}

// Function to simulate food updates
function simulateFoodUpdates() {
    const items = document.querySelectorAll('.food-item');
    if (items.length > 0) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        const expiryText = randomItem.querySelector('.item-expiry');
        
        if (expiryText && !expiryText.classList.contains('spoilage-alert')) {
            const currentText = expiryText.textContent;
            
            // Simulate time passing for fresh items
            if (currentText.includes('days') && !currentText.includes('SPOILED')) {
                const daysMatch = currentText.match(/\d+/);
                if (daysMatch) {
                    let days = parseInt(daysMatch[0]);
                    if (days > 1) {
                        days--;
                        expiryText.textContent = currentText.replace(/\d+/, days);
                        
                        // Change to warning if less than 3 days
                        if (days <= 3 && days > 0) {
                            randomItem.className = 'food-item warning';
                            randomItem.setAttribute('data-category', 'warning');
                            const actionBtn = randomItem.querySelector('.action-btn');
                            actionBtn.className = 'action-btn urgent-btn';
                            actionBtn.innerHTML = '<i class="fas fa-fire"></i> Use Now';
                        }
                        
                        // Change to danger if expired
                        if (days === 0) {
                            randomItem.className = 'food-item danger';
                            randomItem.setAttribute('data-category', 'danger');
                            const actionBtn = randomItem.querySelector('.action-btn');
                            actionBtn.className = 'action-btn discard-btn';
                            actionBtn.innerHTML = '<i class="fas fa-trash"></i> Discard';
                            expiryText.className = 'item-expiry spoilage-alert';
                            expiryText.innerHTML = '<i class="fas fa-exclamation-circle"></i> SPOILED - Discard Immediately';
                        }
                    }
                }
            }
        }
    }
    updateItemCounts();
}

// Waste analytics tracking
function addToWasteAnalytics(itemName) {
    let wasteData = JSON.parse(localStorage.getItem('nimfresh-waste') || '[]');
    wasteData.push({
        item: itemName,
        timestamp: new Date().toISOString(),
        type: 'discarded'
    });
    localStorage.setItem('nimfresh-waste', JSON.stringify(wasteData));
}