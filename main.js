// ============================================================
// NAVIGATION
// ============================================================
const navbar   = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu  = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// ============================================================
// TYPEWRITER EFFECT
// ============================================================
const typewriterTexts = [
    'I build dashboards that tell a clear story.',
    'I turn data into decisions leaders can act on.',
    'I automate workflows and give teams their time back.'
];

let textIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    if (!typewriterElement) return;

    const currentText = typewriterTexts[textIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, 1800);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        setTimeout(typeWriter, 500);
    } else {
        setTimeout(typeWriter, isDeleting ? 40 : 80);
    }
}

typeWriter();


// ============================================================
// PARTICLE CANVAS
// ============================================================
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const PARTICLE_COUNT = 80;

    class Particle {
        constructor() { this.reset(); }

        reset() {
            this.x       = Math.random() * canvas.width;
            this.y       = Math.random() * canvas.height;
            this.size    = Math.random() * 2.5 + 0.5;
            this.speedX  = Math.random() * 2 - 1;
            this.speedY  = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.4 + 0.05;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width  || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            // Blue to match Ododoade's theme
            ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}


// ============================================================
// SKILL METERS — animate on scroll
// ============================================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const level = fill.style.getPropertyValue('--skill-level');
            fill.style.width = '0';
            setTimeout(() => { fill.style.width = level; }, 200);
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-fill').forEach(meter => {
    meter.style.width = '0';
    skillObserver.observe(meter);
});


// ============================================================
// REVEAL ON SCROLL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ============================================================
// FAQS ACCORDION
// ============================================================
document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});


// ============================================================
// BACK TO TOP
// ============================================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.scrollY > 500);
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ============================================================
// MAGNETIC BUTTONS
// ============================================================
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect    = btn.getBoundingClientRect();
        const deltaX  = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
        const deltaY  = ((e.clientY - rect.top)  / rect.height - 0.5) * 20;
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});


// ============================================================
// PARALLAX FLOATING SHAPES
// ============================================================
const parallaxShapes = document.querySelectorAll('.floating-shape');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    parallaxShapes.forEach((el, i) => {
        el.style.transform = `translateY(${scrolled * (0.3 + i * 0.08)}px)`;
    });
});


// ============================================================
// NAVBAR HERO SCROLL STATE
// ============================================================
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (heroSection) {
        document.body.classList.toggle(
            'scrolled-past-hero',
            window.scrollY > heroSection.offsetHeight
        );
    }
});