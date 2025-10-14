document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('nimfresh-user'));

    if (userData) {
        // General User Info
        document.getElementById('user-name').textContent = userData.username || 'N/A';
        document.getElementById('user-email').textContent = userData.email || 'N/A';
        document.getElementById('user-location').textContent = userData.address || 'N/A'; // updated
        const joinedDate = new Date(userData.joinedDate);
        document.getElementById('user-joined').textContent = joinedDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });

        // Device Info
        document.getElementById('device-number').textContent = userData.deviceId || 'N/A';
        document.getElementById('device-status').innerHTML = '<i class="fas fa-circle"></i> Connected';
    } else {
        console.warn('No user data found. Please register first.');
    }

    // Contribution stats (optional)
    const contribution = JSON.parse(localStorage.getItem('nimfresh-contribution')) || {};
    document.getElementById('food-donated').textContent = contribution.foodDonated || '0 kg';
    document.getElementById('waste-reduced').textContent = contribution.wasteReduced || '0 kg';
    document.getElementById('people-helped').textContent = contribution.peopleHelped || '0+';
});
