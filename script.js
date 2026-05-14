/* ============================================
   BFMS Law Firm - JavaScript
   Minimal vanilla JS for interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Navigation - Scroll Effect
    // ============================================
    const nav = document.getElementById('nav');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ============================================
    // Smooth Scroll for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // Intersection Observer for Fade-in Animations
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections and elements for animations
    const animatedElements = document.querySelectorAll('.team-member, .practice-item, .contact-item');
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add visible styles
    const style = document.createElement('style');
    style.textContent = `
        .team-member.visible,
        .practice-item.visible,
        .contact-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // Active Navigation Link Highlighting
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(function(link) {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    // ============================================
    // Footer Year
    // ============================================
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    

    // ============================================
    // Interactive Hero Logo Profiles
    // ============================================
    const logoStage = document.querySelector('.hero-logo-stage');
    const logoHotspots = document.querySelectorAll('.logo-hotspot');
    const logoProfileCards = document.querySelectorAll('.logo-profile');

    function closeLogoProfiles() {
        logoProfileCards.forEach(function(card) {
            card.classList.remove('active');
        });
        logoHotspots.forEach(function(button) {
            button.setAttribute('aria-expanded', 'false');
        });
    }

    logoHotspots.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            const profile = button.getAttribute('data-profile');
            const card = document.querySelector('[data-profile-card="' + profile + '"]');
            const isActive = card && card.classList.contains('active');

            closeLogoProfiles();

            if (card && !isActive) {
                card.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    if (logoStage) {
        document.addEventListener('click', function(event) {
            if (!logoStage.contains(event.target)) {
                closeLogoProfiles();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeLogoProfiles();
            }
        });
    }

    // Add active link styles
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeStyle);
    
});
