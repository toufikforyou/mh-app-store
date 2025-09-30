// MH Store - Modern App Store JavaScript
class MHStore {
    constructor() {
        this.apps = apps; // From data.js
        this.filteredApps = [...this.apps];
        this.categories = this.getCategories();
        this.init();
    }

    init() {
        this.renderFeaturedApps();
        this.renderCategories();
        this.renderAllApps();
        this.setupEventListeners();
        this.setupFilters();
        this.setupSearch();
        this.setupModal();
    }

    getCategories() {
        const categoryMap = {};
        this.apps.forEach(app => {
            if (!categoryMap[app.category]) {
                categoryMap[app.category] = {
                    name: app.category,
                    count: 0,
                    icon: this.getCategoryIcon(app.category)
                };
            }
            categoryMap[app.category].count++;
        });
        return Object.values(categoryMap);
    }

    getCategoryIcon(category) {
        const icons = {
            'Creativity': 'fas fa-paint-brush',
            'Productivity': 'fas fa-briefcase',
            'Music': 'fas fa-music',
            'Social': 'fas fa-users',
            'Finance': 'fas fa-chart-line',
            'Games': 'fas fa-gamepad',
            'Photography': 'fas fa-camera'
        };
        return icons[category] || 'fas fa-mobile-alt';
    }

    renderFeaturedApps() {
        const container = document.getElementById('featured-apps');
        const featuredApps = this.apps.filter(app => app.featured);
        
        container.innerHTML = featuredApps.map(app => this.createFeaturedCard(app)).join('');
    }

    createFeaturedCard(app) {
        return `
            <div class="featured-card" onclick="store.openAppModal(${app.id})">
                <div class="featured-card-content">
                    <div class="featured-app-header">
                        <img src="${app.icon}" alt="${app.name}" class="featured-app-icon">
                        <div class="featured-app-info">
                            <h3>${app.name}</h3>
                            <p class="featured-app-category">${app.category}</p>
                        </div>
                    </div>
                    <p class="featured-app-description">${app.description}</p>
                    <div class="rating">
                        <div class="stars">${this.renderStars(app.rating)}</div>
                        <span>${app.rating}</span>
                        <span>(${app.downloads})</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderCategories() {
        const container = document.getElementById('categories-grid');
        
        container.innerHTML = this.categories.map(category => this.createCategoryCard(category)).join('');
    }

    createCategoryCard(category) {
        return `
            <div class="category-card" onclick="store.filterByCategory('${category.name}')">
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <h3 class="category-name">${category.name}</h3>
                <p class="category-count">${category.count} apps</p>
            </div>
        `;
    }

    renderAllApps() {
        const container = document.getElementById('apps-grid');
        
        if (this.filteredApps.length === 0) {
            container.innerHTML = '<div class="no-results">No apps found matching your criteria.</div>';
            return;
        }

        container.innerHTML = this.filteredApps.map(app => this.createAppCard(app)).join('');
    }

    createAppCard(app) {
        return `
            <div class="app-card" onclick="store.openAppModal(${app.id})">
                <div class="app-header">
                    <img src="${app.icon}" alt="${app.name}" class="app-icon">
                    <div class="app-info">
                        <h3 class="app-name">${app.name}</h3>
                        <p class="app-developer">${app.developer}</p>
                    </div>
                </div>
                <p class="app-description">${app.description}</p>
                <div class="app-stats">
                    <div class="app-rating">
                        ${this.renderStars(app.rating)}
                        <span>${app.rating}</span>
                    </div>
                    <span class="app-downloads">${app.downloads}</span>
                </div>
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    setupFilters() {
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');

        // Populate category filter
        categoryFilter.innerHTML = '<option value="">All Categories</option>' +
            this.categories.map(cat => '<option value="' + cat.name + '">' + cat.name + '</option>').join('');

        // Category filter event
        categoryFilter.addEventListener('change', () => {
            this.filterApps();
        });

        // Sort filter event
        sortFilter.addEventListener('change', () => {
            this.sortApps();
        });
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchApps(e.target.value);
            }, 300);
        });
    }

    setupModal() {
        const modal = document.getElementById('app-modal');
        const closeBtn = document.getElementById('modal-close');

        closeBtn.addEventListener('click', () => {
            this.closeAppModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeAppModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAppModal();
            }
        });
    }

    filterByCategory(category) {
        const categoryFilter = document.getElementById('category-filter');
        categoryFilter.value = category;
        this.filterApps();
        
        // Scroll to all apps section
        document.getElementById('top-apps').scrollIntoView({ behavior: 'smooth' });
    }

    filterApps() {
        const categoryFilter = document.getElementById('category-filter').value;
        const searchTerm = document.querySelector('.search-input').value.toLowerCase();

        this.filteredApps = this.apps.filter(app => {
            const matchesCategory = !categoryFilter || app.category === categoryFilter;
            const matchesSearch = !searchTerm || 
                app.name.toLowerCase().includes(searchTerm) ||
                app.description.toLowerCase().includes(searchTerm) ||
                app.developer.toLowerCase().includes(searchTerm);
            
            return matchesCategory && matchesSearch;
        });

        this.sortApps();
    }

    searchApps(searchTerm) {
        this.filterApps();
    }

    sortApps() {
        const sortBy = document.getElementById('sort-filter').value;

        this.filteredApps.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'downloads':
                    return this.parseDownloads(b.downloads) - this.parseDownloads(a.downloads);
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        this.renderAllApps();
    }

    parseDownloads(downloads) {
        const num = parseFloat(downloads);
        if (downloads.includes('K')) return num * 1000;
        if (downloads.includes('M')) return num * 1000000;
        return num;
    }

    openAppModal(appId) {
        const app = this.apps.find(a => a.id === appId);
        if (!app) return;

        const modal = document.getElementById('app-modal');
        const modalBody = document.getElementById('modal-body');

        modalBody.innerHTML = this.createModalContent(app);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    createModalContent(app) {
        return `
            <div class="modal-header">
                <div class="modal-app-header">
                    <div class="modal-app-info">
                        <img src="${app.icon}" alt="${app.name}" class="modal-app-icon">
                        <div class="modal-app-details">
                            <h2>${app.name}</h2>
                            <p class="modal-app-developer">${app.developer}</p>
                            <div class="rating">
                                <div class="stars">${this.renderStars(app.rating)}</div>
                                <span>${app.rating}</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-app-actions">
                        <button class="download-btn-header" onclick="store.downloadApp('${app.link}')">
                            <i class="fas fa-download"></i> Download App
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="modal-stats">
                <div class="stat-item">
                    <div class="stat-value">${app.rating}</div>
                    <div class="stat-label">Rating</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${app.downloads}</div>
                    <div class="stat-label">Downloads</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${app.ageRating}</div>
                    <div class="stat-label">Age Rating</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${app.category}</div>
                    <div class="stat-label">Category</div>
                </div>
            </div>

            <div class="modal-section">
                <h3>Description</h3>
                <p>${app.description}</p>
            </div>

            ${this.renderScreenshots(app)}
            ${this.renderWhatsNew(app)}
            ${this.renderReviews(app)}
        `;
    }

    renderScreenshots(app) {
        if (!app.screenshots || app.screenshots.length === 0) return '';
        
        return `
            <div class="modal-section">
                <h3>Screenshots</h3>
                <div class="screenshots-grid">
                    ${app.screenshots.map(screenshot => 
                        '<img src="' + screenshot + '" alt="Screenshot" class="screenshot">'
                    ).join('')}
                </div>
            </div>
        `;
    }

    renderWhatsNew(app) {
        if (!app.whatsNew) return '';
        
        return `
            <div class="modal-section">
                <h3>What's New</h3>
                <p>${app.whatsNew}</p>
            </div>
        `;
    }

    renderReviews(app) {
        if (!app.reviews || app.reviews.length === 0) return '';
        
        return `
            <div class="modal-section">
                <h3>Reviews</h3>
                <div class="reviews-list">
                    ${app.reviews.map(review => this.createReviewItem(review)).join('')}
                </div>
            </div>
        `;
    }

    createReviewItem(review) {
        return `
            <div class="review-item">
                <img src="${review.avatar}" alt="${review.user}" class="review-avatar">
                <div class="review-content">
                    <div class="review-header">
                        <span class="review-user">${review.user}</span>
                        <div class="rating">
                            ${this.renderStars(review.rating)}
                        </div>
                    </div>
                    <p>${review.comment}</p>
                </div>
            </div>
        `;
    }

    closeAppModal() {
        const modal = document.getElementById('app-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    downloadApp(link) {
        // In a real app store, this would handle the download process
        // For demo purposes, we'll just open the link
        window.open(link, '_blank');
    }
}

// Logo reload functionality
function handleLogoClick() {
    const logo = document.querySelector('.logo');
    
    // Add refreshing animation
    logo.classList.add('logo-refreshing');
    
    // Close any open modals first
    const modal = document.getElementById('app-modal');
    if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Clear search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reset filters
    setTimeout(() => {
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');
        if (categoryFilter) categoryFilter.value = '';
        if (sortFilter) sortFilter.value = 'rating';
        
        // Trigger filter update if store is initialized
        if (window.store) {
            window.store.filterApps();
        }
        
        // Reset active navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#featured') {
                link.classList.add('active');
            }
        });
    }, 300);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        logo.classList.remove('logo-refreshing');
    }, 800);
}

// Initialize the store when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.store = new MHStore();
});

// Add interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Fade in animation for sections
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
        }
    });

    // Add ripple effect to interactive elements
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('download-btn') || 
            e.target.classList.contains('app-card') ||
            e.target.classList.contains('featured-card') ||
            e.target.classList.contains('category-card')) {
            
            createRippleEffect(e);
        }
    });

    function createRippleEffect(e) {
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        if (!e.target.style.position || e.target.style.position === 'static') {
            e.target.style.position = 'relative';
        }
        
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
