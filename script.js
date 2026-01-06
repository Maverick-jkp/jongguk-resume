// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 44; // Account for fixed navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 1px 10px rgba(10, 132, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// Observe timeline items for staggered animation
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Observe skill cards for staggered animation
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe achievement cards for staggered animation
document.querySelectorAll('.achievement-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.15}s`;
    observer.observe(card);
});

// Observe superpower cards for staggered animation
document.querySelectorAll('.superpower-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe philosophy cards for staggered animation
document.querySelectorAll('.philosophy-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.12}s`;
    observer.observe(card);
});

// Add interactive click effect to philosophy cards
document.querySelectorAll('.philosophy-card').forEach(card => {
    card.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'rgba(10, 132, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.zIndex = '0';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Animate achievement numbers on scroll
const animateNumbers = () => {
    const numberElements = document.querySelectorAll('.achievement-number');

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = entry.target;
                const text = target.textContent;

                // Skip animation for non-numeric values like "17→28%"
                if (text.includes('→') || text.includes('->') || /\d+.*→.*\d+/.test(text)) {
                    target.classList.add('animated');
                    return;
                }

                // Also skip if it's not a simple number format
                if (!/^\d+[%+]*$/.test(text.trim())) {
                    target.classList.add('animated');
                    return;
                }

                const number = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');

                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = number + suffix;
                        clearInterval(timer);
                        target.classList.add('animated');
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            }
        });
    }, { threshold: 0.5 });

    numberElements.forEach(el => numberObserver.observe(el));
};

animateNumbers();

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.opacity = '0.8';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.opacity = '1';
            link.style.fontWeight = '500';
        } else {
            link.style.fontWeight = '400';
        }
    });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    if (hero) {
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Add hover effect to timeline items
document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px)';
        this.style.borderColor = 'var(--color-primary)';
        const afterElement = this.querySelector('::after') || this;
        if (this.style) {
            this.style.setProperty('--after-opacity', '1');
        }
    });

    content.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
        this.style.borderColor = 'var(--color-border)';
    });
});

// Add particle effect on mouse move in hero section
hero.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) { // Only create particles occasionally
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';

        const colors = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-secondary)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        hero.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
});

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none';

    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
    }

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelector('.nav-container').prepend(menuButton);
};

// Initialize on load
window.addEventListener('load', () => {
    // Add loaded class to body for any additional animations
    document.body.classList.add('loaded');
});

// Add smooth transition to elements
document.querySelectorAll('.skill-card, .timeline-content, .contact-item').forEach(el => {
    el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});
