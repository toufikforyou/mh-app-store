const apps = [
    {
        id: 1,
        name: "Mind Color Challenge",
        category: "Games",
        rating: 4.5,
        icon: "icons/color-matching-game.jpg",
        screenshots: [
            "screenshots/mcc/1.jpg",
            "screenshots/mcc/2.jpg",
            "screenshots/mcc/3.jpg",
            "screenshots/mcc/4.jpg",
            "screenshots/mcc/5.jpg",
            "screenshots/mcc/6.jpg",
            "screenshots/mcc/7.jpg",
            "screenshots/mcc/8.jpg"
        ],
        description: "Challenge your mind with vibrant colors and engaging gameplay. Test your reflexes and color matching skills in this addictive puzzle game. A fun experience for all ages!",
        link: "https://github.com/toufikforyou/mind-color-challenge-game/releases/latest/download/app-release-signed.apk",
        downloads: "500K+",
        ageRating: "Everyone",
        developer: "Toufik Studios",
        whatsNew: "Enhanced graphics, fixed minor bugs, and added 10 new challenging levels. Improved performance on older devices.",
        reviews: [
            { user: "GamerPro123", avatar: "https://placehold.co/32x32/00C9FF/FFFFFF/png", rating: 5, comment: "Absolutely love the new levels! So addictive and visually stunning." },
            { user: "CasualPlayer", avatar: "https://placehold.co/32x32/F53349/FFFFFF/png", rating: 4, comment: "Great for quick brain teasers. Runs smoothly on my phone." }
        ],
        featured: true,
        trending: true
    },
    {
        id: 2,
        name: "হে মুসলিম দাম্পত্য",
        category: "Lifestyle",
        rating: 4.7,
        icon: "icons/hea_moslim_dampanto.png",
        screenshots: [
            "screenshots/dampattya_ss1.png",
            "screenshots/dampattya_ss2.png",
            "screenshots/dampattya_banner.jpg"
        ],
        description: "A comprehensive guide for Muslim couples, offering advice and teachings for a harmonious marital life based on Islamic principles. Includes Q&A and practical tips.",
        link: "downloads/hea_moslim_dampanto.apk",
        downloads: "100K+",
        ageRating: "Everyone",
        developer: "Toufik Islamic Apps",
        whatsNew: "Added new articles on communication. Improved UI for easier navigation. Fixed typos reported by users.",
        reviews: [
            { user: "AishaK", avatar: "https://placehold.co/32x32/00F076/FFFFFF/png", rating: 5, comment: "Very beneficial and well-organized. A must-have for newly-weds." },
            { user: "OmarF", avatar: "https://placehold.co/32x32/FFCC00/FFFFFF/png", rating: 4, comment: "Informative content, though I wish there were more audio lectures." }
        ],
        featured: true,
        recommended: true
    },
    {
        id: 3,
        name: "হে মুসলিম অভিভাবক",
        category: "Education",
        rating: 4.8,
        icon: "icons/hea_moslim_ovivabok.png",
        screenshots: [
            "screenshots/ovivabok_ss1.png",
            "screenshots/ovivabok_ss2.jpg",
            "screenshots/ovivabok_banner.jpg"
        ],
        description: "Essential guidance for Muslim parents and guardians on raising children according to Islamic teachings. Covers various aspects of upbringing, education, and character development.",
        link: "downloads/hea_moslim_ovivabok.apk",
        downloads: "150K+",
        ageRating: "Everyone",
        developer: "Toufik Islamic Apps",
        whatsNew: "New chapter on digital age parenting. Added interactive checklists. Enhanced user interface.",
        reviews: [
            { user: "FatimaZ", avatar: "https://placehold.co/32x32/F53349/FFFFFF/png", rating: 5, comment: "Excellent and practical advice. The new chapter is very relevant!" },
            { user: "AhmedY", avatar: "https://placehold.co/32x32/00C9FF/FFFFFF/png", rating: 5, comment: "A wonderful resource for any Muslim parent. JazakAllah Khair for this app." }
        ],
        trending: true
    },
    {
        id: 4,
        name: "Super Editor",
        category: "Creativity",
        rating: 4.5,
        icon: "https://placehold.co/64x64/00F076/FFFFFF/png?text=SE",
        screenshots: [
            "https://placehold.co/800x450/00F076/FFFFFF/png?text=Screenshot+1",
            "https://placehold.co/800x450/00F076/FFFFFF/png?text=Screenshot+2",
            "https://placehold.co/800x450/00F076/FFFFFF/png?text=Screenshot+3"
        ],
        description: "Super Editor is the ultimate tool for all your creative needs. Edit photos, videos, and more with a powerful and intuitive interface.",
        link: "https://toufikhasan.com/apps/1.apk",
        downloads: "1M+",
        ageRating: "Everyone",
        developer: "Creative Inc.",
        whatsNew: "Bug fixes and performance improvements.",
        reviews: [
            { user: "Alice", avatar: "https://placehold.co/32x32/F53349/FFFFFF/png", rating: 5, comment: "The best editor I have ever used!" },
            { user: "Bob", avatar: "https://placehold.co/32x32/00C9FF/FFFFFF/png", rating: 4, comment: "Great app, but could use more features." }
        ],
        featured: false
    },
    {
        id: 5,
        name: "Office Suite",
        category: "Productivity",
        rating: 4.8,
        icon: "https://placehold.co/64x64/00C9FF/FFFFFF/png?text=OS",
        screenshots: [
            "https://placehold.co/800x450/00C9FF/FFFFFF/png?text=Screenshot+1",
            "https://placehold.co/800x450/00C9FF/FFFFFF/png?text=Screenshot+2"
        ],
        description: "A complete office suite for all your productivity needs. Create documents, spreadsheets, and presentations with ease.",
        link: "https://toufikhasan.com/apps/2.apk",
        downloads: "5M+",
        ageRating: "Everyone",
        developer: "Productivity Pro",
        whatsNew: "Added new templates.",
        reviews: [],
        featured: false
    },
    {
        id: 6,
        name: "Music Stream",
        category: "Music",
        rating: 4.7,
        icon: "https://placehold.co/64x64/F53349/FFFFFF/png?text=MS",
        screenshots: [
            "https://placehold.co/800x450/F53349/FFFFFF/png?text=Screenshot+1"
        ],
        description: "Stream your favorite music from a huge library of songs. Create playlists and discover new artists.",
        link: "https://toufikhasan.com/apps/3.apk",
        downloads: "10M+",
        ageRating: "Teen",
        developer: "Music Lovers",
        whatsNew: "Improved recommendations.",
        reviews: [],
        featured: true
    },
    {
        id: 7,
        name: "Another App",
        category: "Social",
        rating: 4.2,
        icon: "https://placehold.co/64x64/FFCC00/FFFFFF/png?text=AA",
        screenshots: [],
        description: "A social app to connect with friends and family.",
        link: "https://toufikhasan.com/apps/4.apk",
        downloads: "500K+",
        ageRating: "Everyone",
        developer: "Socially",
        whatsNew: "UI improvements.",
        reviews: [],
        featured: false
    },
    {
        id: 8,
        name: "Finance App",
        category: "Finance",
        rating: 4.8,
        icon: "https://placehold.co/64x64/808285/FFFFFF/png?text=FA",
        screenshots: [],
        description: "Manage your finances with this powerful and easy-to-use app.",
        link: "https://toufikhasan.com/apps/5.apk",
        downloads: "1M+",
        ageRating: "Everyone",
        developer: "Money Matters",
        whatsNew: "Added support for more banks.",
        reviews: [],
        featured: false
    },
    {
        id: 9,
        name: "Creative Suite",
        category: "Creativity",
        rating: 4.6,
        icon: "https://placehold.co/64x64/00F076/FFFFFF/png?text=CS",
        screenshots: [],
        description: "Unleash your creativity with this amazing suite of tools.",
        link: "https://toufikhasan.com/apps/6.apk",
        downloads: "2M+",
        ageRating: "Everyone",
        developer: "Creative Inc.",
        whatsNew: "New brushes and filters.",
        reviews: [],
        featured: false
    },
    {
        id: 10,
        name: "Gaming Hub",
        category: "Games",
        rating: 4.7,
        icon: "https://placehold.co/64x64/00C9FF/FFFFFF/png?text=GH",
        screenshots: [],
        description: "The central hub for all your gaming needs.",
        link: "https://toufikhasan.com/apps/7.apk",
        downloads: "3M+",
        ageRating: "Teen",
        developer: "Game On",
        whatsNew: "New games added.",
        reviews: [],
        featured: false
    },
    {
        id: 11,
        name: "Music Player",
        category: "Music",
        rating: 4.4,
        icon: "https://placehold.co/64x64/F53349/FFFFFF/png?text=MP",
        screenshots: [],
        description: "A simple and elegant music player for your local music library.",
        link: "https://toufikhasan.com/apps/8.apk",
        downloads: "1M+",
        ageRating: "Everyone",
        developer: "Music Lovers",
        whatsNew: "Fixed a bug with playlists.",
        reviews: [],
        featured: false
    },
    {
        id: 12,
        name: "Photo Editor",
        category: "Photography",
        rating: 4.9,
        icon: "https://placehold.co/64x64/FFCC00/FFFFFF/png?text=PE",
        screenshots: [],
        description: "Edit your photos like a pro with this powerful photo editor.",
        link: "https://toufikhasan.com/apps/9.apk",
        downloads: "5M+",
        ageRating: "Everyone",
        developer: "Photo Pros",
        whatsNew: "Performance improvements.",
        reviews: [],
        featured: false
    }
];
