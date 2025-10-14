// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    const userData = JSON.parse(localStorage.getItem('nimfresh-user'));
    if (userData && userData.username) {
        document.getElementById('welcome-text').textContent = `Welcome, ${userData.username}`;
    }
    
    // Sample food data with icons, purchased date, and days remaining
    const foodItems = [
        { id: 1, name: "Carrots", icon: "fas fa-carrot", status: "fresh", purchasedDate: "12-10-2025", daysRemaining: 12 },
        { id: 2, name: "Cheese Block", icon: "fas fa-cheese", status: "fresh", purchasedDate: "10-10-2025", daysRemaining: 15 },
        { id: 3, name: "Chicken Breast", icon: "fas fa-drumstick-bite", status: "warning", purchasedDate: "11-10-2025", daysRemaining: 2 },
        { id: 4, name: "Apples", icon: "fas fa-apple-alt", status: "warning", purchasedDate: "09-10-2025", daysRemaining: 3 },
        { id: 5, name: "Fish Fillets", icon: "fas fa-fish", status: "danger", purchasedDate: "05-10-2025", daysRemaining: 0 },
        { id: 6, name: "Milk", icon: "fas fa-wine-bottle", status: "warning", purchasedDate: "10-10-2025", daysRemaining: 1 }
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

    // Initialize sensor readings
    updateSensorReadings();
    
    // Update sensor readings every 5 seconds
    setInterval(updateSensorReadings, 5000);

    // Simulate real-time food updates
    setInterval(simulateFoodUpdates, 30000);
});

// Function to render food items WITH logo, highlighted status, purchased date, and days remaining
function renderFoodItems(items) {
    const container = document.getElementById('food-items-container');
    container.innerHTML = '';

    items.forEach(item => {
        const foodItem = document.createElement('div');
        foodItem.className = `food-item ${item.status}`;
        foodItem.setAttribute('data-category', item.status);

        // Determine status text
        let statusText = '';
        if (item.status === 'fresh') statusText = `Fresh • ${item.daysRemaining} days remaining`;
        else if (item.status === 'warning') statusText = `Use Soon • ${item.daysRemaining} days remaining`;
        else statusText = `Discard • Expired`;

        foodItem.innerHTML = `
            <div class="item-image">
                <i class="${item.icon}"></i>
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-status ${
                    item.status === 'fresh' ? 'status-fresh' :
                    item.status === 'warning' ? 'status-warning' :
                    'status-danger'
                }">${statusText}</p>
                <p>Purchased: ${item.purchasedDate}</p>
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
    
    if(document.getElementById('fresh-count')) document.getElementById('fresh-count').textContent = freshCount;
    if(document.getElementById('warning-count')) document.getElementById('warning-count').textContent = warningCount;
    if(document.getElementById('danger-count')) document.getElementById('danger-count').textContent = dangerCount;
}

// Function to update sensor readings
function updateSensorReadings() {
    const temperature = 4 + (Math.random() * 2 - 1);
    const humidity = 65 + (Math.random() * 10 - 5);
    const weight = 8.2 + (Math.random() * 0.4 - 0.2);
    
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
    
    const tempFill = ((temperature + 10) / 35) * 100;
    const tempRangeFill = document.querySelector('.sensor-card:nth-child(1) .range-fill');
    if (tempRangeFill) tempRangeFill.style.width = `${tempFill}%`;
    
    const humidityFill = humidity;
    const humidityRangeFill = document.querySelector('.sensor-card:nth-child(2) .range-fill');
    if (humidityRangeFill) humidityRangeFill.style.width = `${humidityFill}%`;
    
    const capacity = 45 + (Math.random() * 10 - 5);
    const capacityFill = document.querySelector('.capacity-fill');
    const capacityText = document.querySelector('.capacity-info span');
    if (capacityFill) capacityFill.style.width = `${capacity}%`;
    if (capacityText) capacityText.textContent = `${capacity.toFixed(0)}% storage used`;
    
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
        const statusPara = randomItem.querySelector('.item-status');

        if (statusPara) {
            let text = statusPara.textContent;
            // Decrease days remaining if applicable
            let daysMatch = text.match(/\d+/);
            if (daysMatch) {
                let days = parseInt(daysMatch[0]);
                if (days > 0) days--;
                if (days === 0) {
                    randomItem.className = 'food-item danger';
                    randomItem.setAttribute('data-category', 'danger');
                    statusPara.className = 'item-status status-danger';
                    statusPara.textContent = 'Discard • Expired';
                } else if (days <= 3) {
                    randomItem.className = 'food-item warning';
                    randomItem.setAttribute('data-category', 'warning');
                    statusPara.className = 'item-status status-warning';
                    statusPara.textContent = `Use Soon • ${days} days remaining`;
                } else {
                    randomItem.className = 'food-item fresh';
                    randomItem.setAttribute('data-category', 'fresh');
                    statusPara.className = 'item-status status-fresh';
                    statusPara.textContent = `Fresh • ${days} days remaining`;
                }
            }
        }
    }
    updateItemCounts();
}
