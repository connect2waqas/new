// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Mobile nav
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
});

// Close nav on link click
links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
    });
});

// Close nav on outside click (mobile)
document.addEventListener('click', (e) => {
    if (!links.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('active');
        links.classList.remove('open');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const el = document.querySelector(a.getAttribute('href'));
        if (el) {
            const offset = 70;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Counter animation
function countUp() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = +el.dataset.target;
        const start = performance.now();
        const duration = 1200;

        function tick(now) {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * ease);
            if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    });
}

// Observe stats
const stats = document.querySelector('.hero-stats');
if (stats) {
    let fired = false;
    new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !fired) {
            fired = true;
            countUp();
        }
    }, { threshold: 0.5 }).observe(stats);
}

// Fade in on scroll
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll(
        '.about-content, .about-card, .skill-group, .project-card, .contact-item'
    );
    targets.forEach(el => el.classList.add('fade-in'));

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger siblings slightly
                const parent = entry.target.parentElement;
                const siblings = [...parent.children].filter(c => c.classList.contains('fade-in'));
                const idx = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 60}ms`;
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    targets.forEach(el => obs.observe(el));
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) {
            current = s.id;
        }
    });
    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
    });
}, { passive: true });
