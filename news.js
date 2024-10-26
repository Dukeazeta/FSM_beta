document.addEventListener('DOMContentLoaded', function() {
    const newsGrid = document.getElementById('newsGrid');
    const articleTitle = document.getElementById('articleTitle');
    const articleAuthor = document.getElementById('articleAuthor');
    const articleDate = document.getElementById('articleDate');
    const articleImage = document.getElementById('articleImage');
    const articleContent = document.getElementById('articleContent');

    // Demo news data
    const newsData = [
        {
            id: 1,
            title: "FUPRE Super League Final: Team A vs Team B",
            excerpt: "The highly anticipated FUPRE Super League final is set to take place this weekend...",
            author: "John Doe",
            date: "May 15, 2023",
            image: "assets/news-image1.jpg",
            content: "The highly anticipated FUPRE Super League final is set to take place this weekend, featuring a showdown between Team A and Team B. Both teams have shown exceptional skill and determination throughout the season, making this match a must-watch for all football enthusiasts on campus. The game will be held at the main stadium, with kick-off scheduled for 3 PM. Students and faculty are encouraged to come out and support their favorite team in what promises to be an exciting conclusion to this year's Super League."
        },
        {
            id: 2,
            title: "FUPRE Athletes Shine at Inter-University Track Meet",
            excerpt: "FUPRE's track and field team made a strong showing at the recent inter-university competition...",
            author: "Jane Smith",
            date: "May 20, 2023",
            image: "assets/news-image2.jpg",
            content: "FUPRE's track and field team made a strong showing at the recent inter-university competition, bringing home several medals and setting new personal records. Standout performances included gold medals in the 100m sprint and long jump events. The team's success is a testament to their hard work and dedication, as well as the quality of coaching and facilities at FUPRE. The university community celebrates these achievements and looks forward to more success in future competitions."
        },
        {
            id: 3,
            title: "New Basketball Court Opens on FUPRE Campus",
            excerpt: "Students and faculty gathered to celebrate the opening of a state-of-the-art basketball court...",
            author: "Mike Johnson",
            date: "May 25, 2023",
            image: "assets/news-image3.jpg",
            content: "Students and faculty gathered to celebrate the opening of a state-of-the-art basketball court on the FUPRE campus. The new facility features high-quality flooring, adjustable hoops, and ample seating for spectators. This addition to the university's sports infrastructure is expected to boost interest in basketball and provide a top-notch training ground for the FUPRE basketball team. The court will be open for recreational use during designated hours, promoting physical activity and community bonding among students."
        }
    ];

    // Function to create news cards
    function createNewsCards() {
        newsGrid.innerHTML = '';
        newsData.forEach(news => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <img src="${news.image}" alt="${news.title}">
                <div class="news-content">
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <div class="news-meta">
                        <span>${news.date}</span>
                        <a href="readmore.html?id=${news.id}" class="read-more">Read More</a>
                    </div>
                </div>
            `;
            newsGrid.appendChild(card);
        });
    }

    // Function to display full article
    function displayArticle() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        const article = newsData.find(news => news.id === parseInt(articleId));

        if (article) {
            articleTitle.textContent = article.title;
            articleAuthor.textContent = `By ${article.author}`;
            articleDate.textContent = article.date;
            articleImage.src = article.image;
            articleImage.alt = article.title;
            articleContent.innerHTML = article.content;
        }
    }

    // Check which page we're on and call the appropriate function
    if (window.location.pathname.includes('news.html')) {
        createNewsCards();
    } else if (window.location.pathname.includes('readmore.html')) {
        displayArticle();
    }
});
