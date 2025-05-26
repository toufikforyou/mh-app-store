// This is a placeholder for apps data. In a real application, this would come from a backend.
const apps = [
    {
        id: 1,
        name: "Mind Color Challenge",
        version: "v25.03.1.24",
        description: "This is an awesome game for Android users.",
        icon: "icons/color-matching-game.jpg",
        apk: "downloads/mind-color-challenge-game-v25.03.1.25.apk",
        category: "Games",
        rating: 4.5,
        price: "Free",
        screenshots: ["screenshots/game_ss1.jpg", "screenshots/game_ss2.jpg"],
        videos: ["videos/game_trailer.mp4"],
        changelog: "Bug fixes and performance improvements.",
        reviews: [
            { user: "User1", rating: 5, comment: "Great game!" },
            { user: "User2", rating: 4, comment: "Fun to play." },
        ],
        featured: true,
        trending: true,
    },
    {
        id: 2,
        name: "হে মুসলিম দাম্পত্য",
        version: "1.0.0",
        description: "This is an awesome app for Android users.",
        icon: "icons/hea_moslim_dampanto.png",
        apk: "downloads/hea_moslim_dampanto.apk",
        category: "Education",
        rating: 4.0,
        price: "Free",
        screenshots: [],
        videos: [],
        changelog: "Initial release.",
        reviews: [],
        recommended: true,
    },
    {
        id: 3,
        name: "হে মুসলিম অভিভাবক",
        version: "1.0.0",
        description: "This is an awesome app for Android users.",
        icon: "icons/hea_moslim_ovivabok.png",
        apk: "downloads/hea_moslim_ovivabok.apk",
        category: "Education",
        rating: 4.2,
        price: "$0.99",
        screenshots: [],
        videos: [],
        changelog: "Initial release.",
        reviews: [],
        trending: true,
    },
];

// Placeholder for user data - in a real app, this would be managed by a backend and authentication
let currentUser = {
    username: "DemoUser",
    email: "demouser@example.com",
    installedApps: [1], // IDs of installed apps
    reviews: [
        { appId: 1, rating: 5, comment: "Great game! Very addictive." }
    ]
};

function renderInstalledApps() {
    const installedAppGrid = document.getElementById("installedAppGrid");
    if (!installedAppGrid) return;
    installedAppGrid.innerHTML = "";

    const usersInstalledApps = apps.filter(app => currentUser.installedApps.includes(app.id));

    if (usersInstalledApps.length === 0) {
        installedAppGrid.innerHTML = "<p>No apps installed yet.</p>";
        return;
    }

    usersInstalledApps.forEach(app => {
        const appItem = document.createElement("div");
        appItem.classList.add("app-item");
        appItem.innerHTML = `
            <img src="${app.icon}" alt="${app.name} Icon" class="app-icon">
            <h3>${app.name}</h3>
            <p>Version: ${app.version}</p>
            <a href="app-details.html?id=${app.id}" class="details-btn">View Details</a>
            <button class="uninstall-btn" data-appid="${app.id}">Uninstall</button>
        `;
        installedAppGrid.appendChild(appItem);
    });

    // Add event listeners for uninstall buttons
    document.querySelectorAll(".uninstall-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const appIdToUninstall = parseInt(event.target.dataset.appid);
            uninstallApp(appIdToUninstall);
        });
    });
}

function uninstallApp(appId) {
    currentUser.installedApps = currentUser.installedApps.filter(id => id !== appId);
    // In a real app, you would also update the backend here
    alert("App uninstalled (simulated).");
    renderInstalledApps(); // Re-render the list of installed apps
}

function renderUserReviews() {
    const userReviewsList = document.getElementById("userReviewsList");
    if (!userReviewsList) return;
    userReviewsList.innerHTML = "";

    if (currentUser.reviews.length === 0) {
        userReviewsList.innerHTML = "<p>You haven't reviewed any apps yet.</p>";
        return;
    }

    currentUser.reviews.forEach(review => {
        const app = apps.find(a => a.id === review.appId);
        if (app) {
            // Star rating HTML for user's review
            let reviewStarsHTML = '';
            const rFullStars = Math.floor(review.rating);
            const rHalfStar = review.rating % 1 !== 0;
            const rEmptyStars = 5 - rFullStars - (rHalfStar ? 1 : 0);
            for (let i = 0; i < rFullStars; i++) reviewStarsHTML += '<span>&#9733;</span>';
            if (rHalfStar) reviewStarsHTML += '<span>&#9734;</span>'; // Placeholder for half star
            for (let i = 0; i < rEmptyStars; i++) reviewStarsHTML += '<span class="empty-star">&#9734;</span>';

            const reviewItem = document.createElement("div");
            reviewItem.classList.add("review-item");
            reviewItem.innerHTML = `
                <p><strong>${app.name}</strong> <span class="review-rating">(<span class="stars">${reviewStarsHTML}</span> ${review.rating}/5)</span></p>
                <p>${review.comment}</p>
            `;
            userReviewsList.appendChild(reviewItem);
        }
    });
}

function populateAppReviewDropdown() {
    const appToReviewSelect = document.getElementById("appToReview");
    if (!appToReviewSelect) return;

    apps.forEach(app => {
        const option = document.createElement("option");
        option.value = app.id;
        option.textContent = app.name;
        appToReviewSelect.appendChild(option);
    });
}

function handleReviewSubmission(event) {
    event.preventDefault();
    const appId = parseInt(document.getElementById("appToReview").value);
    const rating = parseInt(document.getElementById("rating").value);
    const comment = document.getElementById("reviewComment").value;

    if (!appId || !rating || !comment) {
        alert("Please fill in all fields.");
        return;
    }

    // Add review to the app (in a real app, this would go to a backend)
    const app = apps.find(a => a.id === appId);
    if (app) {
        // Check if user already reviewed this app, if so, update it (optional)
        const existingReviewIndex = app.reviews.findIndex(r => r.user === currentUser.username);
        if (existingReviewIndex > -1) {
            app.reviews[existingReviewIndex] = { user: currentUser.username, rating, comment };
        } else {
            app.reviews.push({ user: currentUser.username, rating, comment });
        }

        // Add review to user's profile reviews
        const existingUserReviewIndex = currentUser.reviews.findIndex(r => r.appId === appId);
        if (existingUserReviewIndex > -1) {
            currentUser.reviews[existingUserReviewIndex] = { appId, rating, comment };
        } else {
            currentUser.reviews.push({ appId, rating, comment });
        }
        
        alert("Review submitted!");
        renderUserReviews();
        document.getElementById("reviewForm").reset();
    } else {
        alert("Selected app not found.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("username").textContent = currentUser.username;
    document.getElementById("userEmail").textContent = currentUser.email;

    renderInstalledApps();
    renderUserReviews();
    populateAppReviewDropdown();

    const reviewForm = document.getElementById("reviewForm");
    if (reviewForm) {
        reviewForm.addEventListener("submit", handleReviewSubmission);
    }
});
