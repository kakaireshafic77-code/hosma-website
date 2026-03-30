// ===== HOMSA WEBSITE - COMPLETE JAVASCRIPT =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const bars = this.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }
    
    // ===== ACTIVE LINK HIGHLIGHT =====
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active');
        }
    });
    
    // ===== COUNTDOWN TIMER (if on homepage) =====
    function updateCountdown() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        
        if (daysEl && hoursEl && minutesEl) {
            // Set Ramadan 2026 date (approximate)
            const ramadanDate = new Date('February 18, 2026 00:00:00').getTime();
            const now = new Date().getTime();
            const distance = ramadanDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                
                daysEl.textContent = days;
                hoursEl.textContent = hours;
                minutesEl.textContent = minutes;
            }
        }
    }
    
    // Update countdown every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
    
    // ===== PROJECT TABS (if on projects page) =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectSections = {
        completed: document.getElementById('completed'),
        ongoing: document.getElementById('ongoing'),
        planned: document.getElementById('planned')
    };
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all sections
                Object.values(projectSections).forEach(section => {
                    if (section) section.style.display = 'none';
                });
                
                // Show selected section
                const tabId = this.getAttribute('data-tab');
                if (projectSections[tabId]) {
                    projectSections[tabId].style.display = 'block';
                }
            });
        });
    }
    
    // ===== GALLERY FUNCTIONALITY =====
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (galleryGrid) {
        // Sample gallery data (replace with your actual images)
        const galleryImages = [
            { src: 'images/gallery/gallery1.jpg', category: 'events', title: 'Community Iftar 2024' },
            { src: 'images/gallery/gallery2.jpg', category: 'events', title: 'Quran Competition' },
            { src: 'images/gallery/gallery3.jpg', category: 'programs', title: 'Youth Workshop' },
            { src: 'images/gallery/gallery4.jpg', category: 'projects', title: 'Mosque Renovation' },
            { src: 'images/gallery/gallery5.jpg', category: 'ramadan', title: 'Taraweeh Prayers' },
            { src: 'images/gallery/gallery6.jpg', category: 'programs', title: 'Sisters Circle' },
            { src: 'images/gallery/gallery7.jpg', category: 'events', title: 'Eid Celebration' },
            { src: 'images/gallery/gallery8.jpg', category: 'projects', title: 'Water Well Project' },
            { src: 'images/gallery/gallery9.jpg', category: 'ramadan', title: 'Iftar Preparation' },
            { src: 'images/gallery/gallery10.jpg', category: 'events', title: 'Hospital Visit' },
            { src: 'images/gallery/gallery11.jpg', category: 'programs', title: 'Quran Class' },
            { src: 'images/gallery/gallery12.jpg', category: 'projects', title: 'Food Distribution' }
        ];
        
        // Render gallery
        function renderGallery(filter = 'all') {
            if (!galleryGrid) return;
            
            galleryGrid.innerHTML = '';
            
            const filtered = filter === 'all' 
                ? galleryImages 
                : galleryImages.filter(img => img.category === filter);
            
            filtered.forEach((img, index) => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.setAttribute('data-index', index);
                item.setAttribute('data-category', img.category);
                
                // Use placeholder if image doesn't exist
                const imgSrc = img.src;
                
                item.innerHTML = `
                    <img src="${imgSrc}" alt="${img.title}" onerror="this.src='https://via.placeholder.com/400x400?text=${encodeURIComponent(img.title)}'">
                    <div class="gallery-overlay">
                        <h4>${img.title}</h4>
                    </div>
                `;
                
                item.addEventListener('click', () => openLightbox(index, filtered));
                galleryGrid.appendChild(item);
            });
        }
        
        // Lightbox functionality
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        let currentIndex = 0;
        let currentImages = [];
        
        window.openLightbox = function(index, images) {
            currentIndex = index;
            currentImages = images;
            
            if (lightbox && lightboxImg) {
                lightboxImg.src = images[index].src;
                lightboxImg.onerror = function() {
                    this.src = `https://via.placeholder.com/800x600?text=${encodeURIComponent(images[index].title)}`;
                };
                
                if (lightboxCaption) {
                    lightboxCaption.textContent = images[index].title;
                }
                
                lightbox.style.display = 'block';
            }
        };
        
        // Close lightbox
        const closeBtn = document.querySelector('.close-lightbox');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (lightbox) lightbox.style.display = 'none';
            });
        }
        
        // Navigate lightbox
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                if (lightboxImg) {
                    lightboxImg.src = currentImages[currentIndex].src;
                    lightboxImg.onerror = function() {
                        this.src = `https://via.placeholder.com/800x600?text=${encodeURIComponent(currentImages[currentIndex].title)}`;
                    };
                }
                if (lightboxCaption) {
                    lightboxCaption.textContent = currentImages[currentIndex].title;
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % currentImages.length;
                if (lightboxImg) {
                    lightboxImg.src = currentImages[currentIndex].src;
                    lightboxImg.onerror = function() {
                        this.src = `https://via.placeholder.com/800x600?text=${encodeURIComponent(currentImages[currentIndex].title)}`;
                    };
                }
                if (lightboxCaption) {
                    lightboxCaption.textContent = currentImages[currentIndex].title;
                }
            });
        }
        
        // Close lightbox with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
                lightbox.style.display = 'none';
            }
            
            if (lightbox && lightbox.style.display === 'block') {
                if (e.key === 'ArrowLeft') {
                    if (prevBtn) prevBtn.click();
                }
                if (e.key === 'ArrowRight') {
                    if (nextBtn) nextBtn.click();
                }
            }
        });
        
        // Gallery filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns.length > 0) {
            renderGallery('all');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    renderGallery(filter);
                });
            });
        }
    }
    
    // ===== ZAKAT CALCULATOR =====
    window.calculateZakat = function() {
        const cash = parseFloat(document.getElementById('cash')?.value) || 0;
        const gold = parseFloat(document.getElementById('gold')?.value) || 0;
        const business = parseFloat(document.getElementById('business')?.value) || 0;
        const receivables = parseFloat(document.getElementById('receivables')?.value) || 0;
        const debts = parseFloat(document.getElementById('debts')?.value) || 0;
        
        const totalAssets = cash + gold + business + receivables;
        const zakatableAmount = totalAssets - debts;
        const zakatDue = zakatableAmount * 0.025; // 2.5%
        
        const totalEl = document.getElementById('total-assets');
        const zakatEl = document.getElementById('zakat-due');
        
        if (totalEl) totalEl.textContent = zakatableAmount.toLocaleString();
        if (zakatEl) zakatEl.textContent = zakatDue.toLocaleString();
    };
    
    // ===== FORM SUBMISSIONS (demo) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will respond within 24 hours. (Demo - form not connected to backend)');
            this.reset();
        });
    }
    
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your generous donation! JazakAllah Khair. (Demo - form not connected to payment)');
            this.reset();
        });
    }
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== CURRENT YEAR IN FOOTER =====
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== CALENDAR EVENT TOOLTIPS =====
    const calendarDays = document.querySelectorAll('.calendar-day.has-event');
    calendarDays.forEach(day => {
        const eventName = day.getAttribute('data-event');
        if (eventName) {
            day.setAttribute('title', eventName);
        }
    });
});