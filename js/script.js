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
    screenshots: ["screenshots/game_ss1.jpg", "screenshots/game_ss2.jpg"],
    videos: ["videos/game_trailer.mp4"],
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
    screenshots: ["screenshots/dampattya_ss1.png", "screenshots/dampattya_ss2.png"],
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
    screenshots: ["screenshots/ovivabok_ss1.png", "screenshots/ovivabok_ss2.jpg"],
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

function renderApps(appsToRender, containerId) {
  const appGrid = document.getElementById(containerId);
  if (!appGrid) return;
  appGrid.innerHTML = "";

  appsToRender.forEach((app) => {
    const appItem = document.createElement("div");
    appItem.classList.add("app-item");
    appItem.addEventListener('click', () => {
        window.location.href = `details.html?id=${app.id}`;
    });

    let starsHTML = '';
    const fullStars = Math.floor(app.rating);
    const halfStar = app.rating % 1 !== 0; 
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) starsHTML += '<span>&#9733;</span>';
    if (halfStar) starsHTML += '<span class="half-star">&#9733;</span>'; 
    for (let i = 0; i < emptyStars; i++) starsHTML += '<span class="empty-star">&#9734;</span>';

    appItem.innerHTML = `
      <div class="app-item-content">
        <div class="app-item-header">
          <img src="${app.icon}" alt="${app.name} Icon" class="app-icon" />
          <div class="app-item-info">
            <h3>${app.name}</h3>
            <p class="app-category">${app.category}</p>
            <div class="star-rating">${starsHTML} (${app.rating.toFixed(1)})</div>
          </div>
        </div>
        <p class="app-description-preview">${app.description}</p>
      </div>
      <div class="app-item-actions">
        <span class="price">Free</span>
        <a href="${app.apk}" class="btn-install" download onclick="event.stopPropagation();">Install</a>
      </div>
    `;
    appGrid.appendChild(appItem);
  });
}

function filterAndRenderApps() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  
  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm)
  );

  renderApps(filteredApps, "allAppGrid");
  renderApps(apps.filter(app => app.featured && app.name.toLowerCase().includes(searchTerm)), "featuredAppGrid");
  renderApps(apps.filter(app => app.trending && app.name.toLowerCase().includes(searchTerm)), "trendingAppGrid");
  renderApps(apps.filter(app => app.recommended && app.name.toLowerCase().includes(searchTerm)), "recommendedAppGrid");
}

document.addEventListener("DOMContentLoaded", () => {
  renderApps(apps.filter(app => app.featured), "featuredAppGrid");
  renderApps(apps.filter(app => app.trending), "trendingAppGrid");
  renderApps(apps.filter(app => app.recommended), "recommendedAppGrid");
  renderApps(apps, "allAppGrid"); 

  const searchButton = document.getElementById("searchButton");
  if (searchButton) {
    searchButton.addEventListener("click", filterAndRenderApps);
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", filterAndRenderApps);
  }
});
