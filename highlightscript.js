document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const body = document.body;
    function toggleNavbar(event) {
        event.stopPropagation();
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    navbarToggle.addEventListener('click', toggleNavbar);

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = navbarMenu.contains(event.target) || navbarToggle.contains(event.target);
        if (!isClickInside && navbarMenu.classList.contains('active')) {
            toggleNavbar(event);
        }
    });

    // Prevent clicks inside the menu from closing it
    navbarMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Close menu when clicking on a link
    const navbarLinks = document.querySelectorAll('.navbar-links a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (navbarMenu.classList.contains('active')) {
                toggleNavbar(event);
            }
        });
    });
});
//Highlights Football
const matches = [
    {
        thumbnail: '/api/placeholder/320/180',
        duration: '10:15',
        competition: 'Fupre Super League',
        homeTeam: 'Real Madrid',
        awayTeam: 'Manchester City',
        homeScore: 3,
        awayScore: 2,
        date: '2 hours ago',
        views: '120K views',
    },
    {
        thumbnail: '/api/placeholder/320/180',
        duration: '8:30',
        competition: 'VC Cup',
        homeTeam: 'Arsenal',
        awayTeam: 'Liverpool',
        homeScore: 2,
        awayScore: 2,
        date: '5 hours ago',
        views: '85K views',
        
    },
    {
        thumbnail: '/api/placeholder/320/180',
        duration: '7:45',
        competition: 'Hostel Cup',
        homeTeam: 'Barcelona',
        awayTeam: 'Atletico Madrid',
        homeScore: 1,
        awayScore: 0,
        date: '1 day ago',
        views: '95K views',
        
    },
    {
        thumbnail: '/api/placeholder/320/180',
        duration: '9:20',
        competition: 'Tribal Cup',
        homeTeam: 'Inter',
        awayTeam: 'Juventus',
        homeScore: 2,
        awayScore: 1,
        date: '2 days ago',
        views: '75K views',
        
    },
    {
        thumbnail: '/api/placeholder/320/180',
        duration: '6:15',
        competition: 'Nass Cup',
        homeTeam: 'Bayern Munich',
        awayTeam: 'Dortmund',
        homeScore: 4,
        awayScore: 2,
        date: '3 days ago',
        views: '110K views',
        
    },
    {
        thumbnail: '/api/placeholder/320/180',
        duration: '8:00',
        competition: 'VC Cup',
        homeTeam: 'PSG',
        awayTeam: 'Marseille',
        homeScore: 3,
        awayScore: 1,
        date: '4 days ago',
        views: '65K views',
    }
    ,
    {
        thumbnail: '/api/placeholder/320/180',
        duration: '8:00',
        competition: 'VC Cup',
        homeTeam: 'PSG',
        awayTeam: 'Marseille',
        homeScore: 3,
        awayScore: 1,
        date: '4 days ago',
        views: '65K views',
    }
    ,
    {
        thumbnail: '/api/placeholder/320/180',
        duration: '8:00',
        competition: 'VC Cup',
        homeTeam: 'PSG',
        awayTeam: 'Marseille',
        homeScore: 3,
        awayScore: 1,
        date: '4 days ago',
        views: '65K views',
    }
];

function createMatchCard(match) {
    return `
        <div class="match-card">
            <div class="thumbnail-container">
                <img class="thumbnail" src="${match.thumbnail}" alt="${match.homeTeam} vs ${match.awayTeam}">
                <div class="duration">${match.duration}</div>
                <div class="competition-badge">${match.competition}</div>
            </div>
            <div class="match-info">
                <div class="teams">
                    <div class="team home">
                        <span class="team-name">${match.homeTeam}</span>
                    </div>
                    <div class="score-container">
                        <span class="score">${match.homeScore} - ${match.awayScore}</span>
                    </div>
                    <div class="team away">
                        <span class="team-name">${match.awayTeam}</span>
                    </div>
                </div>
                <div class="match-meta">
                    <span>${match.views} • ${match.date}</span>
                    
                </div>
            </div>
        </div>
    `;
}

const highlightsGrid = document.getElementById('highlightsGrid');
highlightsGrid.innerHTML = matches.map(match => createMatchCard(match)).join('');
