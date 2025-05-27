const apps = [
  {
    id: 1,
    name: "Mind Color Challenge",
    version: "v25.03.1.24",
    description: "Challenge your mind with vibrant colors and engaging gameplay. Test your reflexes and color matching skills in this addictive puzzle game. A fun experience for all ages!",
    icon: "icons/color-matching-game.jpg",
    apk: "downloads/mind-color-challenge-game-v25.03.1.25.apk",
    category: "Puzzle Games",
    rating: 4.5,
    price: "Free",
    screenshots: ["screenshots/mcc/1.jpg", "screenshots/mcc/2.jpg", "screenshots/mcc/3.jpg", "screenshots/mcc/4.jpg", "screenshots/mcc/5.jpg", "screenshots/mcc/6.jpg", "screenshots/mcc/7.jpg", "screenshots/mcc/8.jpg"],
    videos: [],
    changelog: "v25.03.1.24: Enhanced graphics, fixed minor bugs, and added 10 new challenging levels. Improved performance on older devices.",
    reviews: [
      { user: "GamerPro123", rating: 5, comment: "Absolutely love the new levels! So addictive and visually stunning." },
      { user: "CasualPlayer", rating: 4, comment: "Great for quick brain teasers. Runs smoothly on my phone." },
    ],
    featured: true,
    trending: true,
    banner: "screenshots/game_banner.jpg" 
  },
  {
    id: 2,
    name: "হে মুসলিম দাম্পত্য",
    version: "1.0.2",
    description: "A comprehensive guide for Muslim couples, offering advice and teachings for a harmonious marital life based on Islamic principles. Includes Q&A and practical tips.",
    icon: "icons/hea_moslim_dampanto.png",
    apk: "downloads/hea_moslim_dampanto.apk",
    category: "Lifestyle & Education",
    rating: 4.7,
    price: "Free",
    screenshots: [],
    videos: [],
    changelog: "v1.0.2: Added new articles on communication. Improved UI for easier navigation. Fixed typos reported by users.",
    reviews: [
        { user: "AishaK", rating: 5, comment: "Very beneficial and well-organized. A must-have for newly-weds." },
        { user: "OmarF", rating: 4, comment: "Informative content, though I wish there were more audio lectures." }
    ],
    recommended: true,
    banner: "screenshots/dampattya_banner.jpg"
  },
  {
    id: 3,
    name: "হে মুসলিম অভিভাবক",
    version: "1.1.0",
    description: "Essential guidance for Muslim parents and guardians on raising children according to Islamic teachings. Covers various aspects of upbringing, education, and character development.",
    icon: "icons/hea_moslim_ovivabok.png",
    apk: "downloads/hea_moslim_ovivabok.apk",
    category: "Parenting & Education",
    rating: 4.8,
    price: "Free", 
    screenshots: [],
    videos: [],
    changelog: "v1.1.0: New chapter on digital age parenting. Added interactive checklists. Enhanced user interface.",
    reviews: [
        { user: "FatimaZ", rating: 5, comment: "Excellent and practical advice. The new chapter is very relevant!" },
        { user: "AhmedY", rating: 5, comment: "A wonderful resource for any Muslim parent. JazakAllah Khair for this app." }
    ],
    trending: true,
    banner: "screenshots/ovivabok_banner.jpg"
  },
  
];

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const appId = parseInt(params.get('id'));
    const app = apps.find(a => a.id === appId);

    const appDetailsContainer = document.getElementById("app-details-container");
    const appBannerPlaceholder = document.getElementById("app-banner-placeholder");

    if (app) {
        if (appBannerPlaceholder) {
            const bannerUrl = app.banner || app.screenshots?.[0] || 'https://via.placeholder.com/1200x300/6c757d/ffffff?text=' + encodeURIComponent(app.name);
            appBannerPlaceholder.style.backgroundImage = `url('${bannerUrl}')`;
        }

        let starsHTML = '';
        const fullStars = Math.floor(app.rating);
        const halfStar = app.rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        for (let i = 0; i < fullStars; i++) starsHTML += '<span>&#9733;</span>';
        if (halfStar) starsHTML += '<span class="half-star">&#9733;</span>';
        for (let i = 0; i < emptyStars; i++) starsHTML += '<span class="empty-star">&#9734;</span>';

        let reviewsHTML = '<p>No reviews yet.</p>';
        if (app.reviews && app.reviews.length > 0) {
            reviewsHTML = app.reviews.map(review => {
                let reviewStarsHTML = '';
                const rFullStars = Math.floor(review.rating);
                const rHalfStar = review.rating % 1 !== 0;
                const rEmptyStars = 5 - rFullStars - (rHalfStar ? 1 : 0);
                for (let i = 0; i < rFullStars; i++) reviewStarsHTML += '<span>&#9733;</span>';
                if (rHalfStar) reviewStarsHTML += '<span class="half-star">&#9733;</span>';
                for (let i = 0; i < rEmptyStars; i++) reviewStarsHTML += '<span class="empty-star">&#9734;</span>';

                return `
                    <div class="review-item">
                        <p><strong>${review.user}</strong> <span class="review-rating">(<span class="stars">${reviewStarsHTML}</span> ${review.rating}/5)</span></p>
                        <p>${review.comment}</p>
                    </div>
                `;
            }).join('');
        }

        appDetailsContainer.innerHTML = `
            <div class="app-detail-header">
                <div class="app-detail-header-content">
                    <img src="${app.icon}" alt="${app.name} Icon" class="app-detail-icon">
                    <div class="app-detail-main-info">
                        <h1>${app.name}</h1>
                        <div class="app-meta-row">
                            <span class="app-category">${app.category}</span>
                            <span class="app-version">Version: ${app.version}</span>
                        </div>
                        <div class="app-rating-row">
                            <div class="app-rating"><span class="stars">${starsHTML}</span> (${app.rating.toFixed(1)}/5)</div>
                            <span class="app-price-tag">Free</span>
                        </div>
                    </div>
                    <div class="app-detail-actions">
                        <a href="${app.apk}" class="main-download-btn" download>
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 12h5l-6 6-6-6h5V4h2v8zM5 18v2h14v-2H5z"/></svg>
                            <span>Download Now</span>
                        </a>
                    </div>
                </div>
            </div>

            <section class="app-media card-style-section">
                <h2>Media</h2>
                <div class="screenshots-grid">
                    ${app.screenshots && app.screenshots.length > 0 ? app.screenshots.map(ss => `<img src="${ss}" alt="Screenshot">`).join('') : '<p>No screenshots available.</p>'}
                </div>
                ${app.videos && app.videos.length > 0 ? `
                <h3>Videos</h3>
                <div class="videos-grid">
                    ${app.videos.map(vid => `<video controls width="100%"><source src="${vid}" type="video/mp4">Your browser does not support the video tag.</video>`).join('')}
                </div>` : ''}
            </section>

            <div class="tabs-container card-style-section">
                <ul class="tab-nav">
                    <li class="tab-link active" data-tab="description">Description</li>
                    <li class="tab-link" data-tab="changelog">Changelog</li>
                    <li class="tab-link" data-tab="reviews">Reviews</li>
                </ul>
                <div id="description" class="tab-pane active">
                    <h3>Description</h3>
                    <p>${app.description || "No description available."}</p>
                </div>
                <div id="changelog" class="tab-pane">
                    <h3>Changelog</h3>
                    <p>${app.changelog || "No changelog available."}</p>
                </div>
                <div id="reviews" class="tab-pane">
                    <h3>Reviews</h3>
                    <div class="reviews-list">
                        ${reviewsHTML}
                    </div>
                </div>
            </div>
        `;

        const tabLinks = appDetailsContainer.querySelectorAll('.tab-link');
        const tabPanes = appDetailsContainer.querySelectorAll('.tab-pane');

        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                tabLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                const targetTab = link.getAttribute('data-tab');
                tabPanes.forEach(pane => {
                    if (pane.id === targetTab) {
                        pane.classList.add('active');
                    } else {
                        pane.classList.remove('active');
                    }
                });
            });
        });

    } else {
        if (appBannerPlaceholder) appBannerPlaceholder.style.display = 'none';
        appDetailsContainer.innerHTML = "<p>App not found.</p>";
    }
});
