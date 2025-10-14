// Stock Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    const userData = JSON.parse(localStorage.getItem('nimfresh-user'));
    if (userData && userData.username) {
        document.getElementById('welcome-text').textContent = `Welcome, ${userData.username}`;
    }

    // Update stock counts
    updateStockCounts();

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterStockItems(filter);
        });
    });

    // Action button event listeners
    document.getElementById('remove-item-btn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Remove item functionality will be implemented soon!');
    });

    document.getElementById('update-stock-btn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Update stock functionality will be implemented soon!');
    });

    document.getElementById('stock-report-btn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Stock report functionality will be implemented soon!');
    });

    // Table action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.closest('tr').querySelector('td:first-child span').textContent;
            alert(`Edit ${itemName} functionality will be implemented soon!`);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.closest('tr').querySelector('td:first-child span').textContent;
            if (confirm(`Are you sure you want to delete ${itemName}?`)) {
                this.closest('tr').remove();
                updateStockCounts();
            }
        });
    });
});

// Function to update stock counts
function updateStockCounts() {
    const freshCount = document.querySelectorAll('.stock-item.fresh').length;
    const warningCount = document.querySelectorAll('.stock-item.warning').length;
    const dangerCount = document.querySelectorAll('.stock-item.danger').length;
    const lowCount = document.querySelectorAll('.stock-item.low').length;
    const totalCount = freshCount + warningCount + dangerCount + lowCount;

    document.getElementById('fresh-count').textContent = freshCount;
    document.getElementById('warning-count').textContent = warningCount;
    document.getElementById('danger-count').textContent = dangerCount;
    
    // Update total count in the stat card
    document.querySelector('.stat-card.sensor .stat-info h3').textContent = totalCount;
}

// Function to filter stock items
function filterStockItems(filter) {
    const items = document.querySelectorAll('.stock-item');
    
    items.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'table-row';
        } else {
            item.style.display = 'none';
        }
    });
    
    updateStockCounts();
}