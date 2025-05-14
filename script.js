// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const contactForm = document.querySelector('.contact-form');
const heroVideo = document.getElementById('hero-video');
const heroContent = document.querySelector('.hero-content');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate hamburger
    hamburger.classList.toggle('active');

    // Animate links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');

            navLinksItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        header.style.background = 'rgba(10, 10, 10, 0.9)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.boxShadow = 'none';
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
    }
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(item => {
        item.querySelector('a').classList.remove('active');
        if (item.querySelector(`a[href="#${current}"]`)) {
            item.querySelector(`a[href="#${current}"]`).classList.add('active');
        }
    });
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple form validation
        if (name && email && subject && message) {
            // In a real application, you would send this data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add CSS animation for nav links
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .nav-links a.active {
        color: var(--accent-color);
        font-weight: 500;
    }

    .nav-links a.active::after {
        width: 100%;
        height: 2px;
    }
`;
document.head.appendChild(style);

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .about-content > div');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

// Add CSS for scroll animations
const scrollAnimationStyle = document.createElement('style');
scrollAnimationStyle.textContent = `
    .project-card, .skill-category, .about-content > div {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .project-card.animate, .skill-category.animate, .about-content > div.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(scrollAnimationStyle);

// Call animation function on scroll
window.addEventListener('scroll', animateOnScroll);
// Call once on load to check for elements already in view
window.addEventListener('load', animateOnScroll);

// Video background enhancements
if (heroVideo) {
    // Add parallax effect to video on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroVideo.style.transform = `translateY(${scrollPosition * 0.15}px)`;
        }
    });

    // Ensure video is loaded and playing
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.play();
        console.log('Video loaded and playing');
    });

    // Fallback if video fails to load
    heroVideo.addEventListener('error', () => {
        const videoBackground = document.querySelector('.video-background');
        if (videoBackground) {
            videoBackground.style.backgroundColor = '#333';
            console.log('Video failed to load, fallback background applied');
        }
    });
}
