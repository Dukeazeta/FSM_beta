// Component loader
document.addEventListener('DOMContentLoaded', function() {
    // Load footer
    const footerPlaceholder = document.querySelector('#footer-placeholder');
    if (footerPlaceholder) {
        fetch('/components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }

    // Function to update possession bars
    function updatePossession(teamAValue, teamBValue) {
        // Get the possession bar elements
        const teamABar = document.querySelector('.team-a-bar');
        const teamBBar = document.querySelector('.team-b-bar');
        const teamAPercentage = document.querySelector('.team-stats:first-child .value');
        const teamBPercentage = document.querySelector('.team-stats:last-child .value');

        if (!teamABar || !teamBBar || !teamAPercentage || !teamBPercentage) return;

        // Ensure values are valid percentages (0-100)
        teamAValue = Math.max(0, Math.min(100, teamAValue));
        teamBValue = Math.max(0, Math.min(100, teamBValue));

        // Update the width of the bars with smooth transition
        teamABar.style.width = `${teamAValue}%`;
        teamBBar.style.width = `${teamBValue}%`;

        // Update the percentage text
        teamAPercentage.textContent = `${teamAValue}%`;
        teamBPercentage.textContent = `${teamBValue}%`;
    }
});
