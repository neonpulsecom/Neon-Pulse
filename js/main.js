// Custom cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step, .store-button').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Game preview hover effect
const gamePreview = document.querySelector('.game-preview');
if (gamePreview) {
    gamePreview.addEventListener('mousemove', (e) => {
        const rect = gamePreview.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        gamePreview.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    gamePreview.addEventListener('mouseleave', () => {
        gamePreview.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.5};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s linear infinite;
        `;
        hero.appendChild(particle);
    }
}

createParticles();

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// --- NEON GAME PREVIEW ANIMATION ---
(function neonGamePreview() {
    const canvas = document.getElementById('game-preview-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Ball properties
    let ball = {
        x: w / 2,
        y: h - 120,
        radius: 22,
        vy: 0,
        gravity: 0.7,
        jumpPower: -15,
        color: '#00ffff',
        glow: '#00ffff',
        jumping: false
    };

    // Lines properties
    const lineCount = 4;
    let lines = [];
    for (let i = 0; i < lineCount; i++) {
        lines.push({
            x: 60 + i * 70,
            y: h - 80 - i * 120,
            width: 280,
            height: 10,
            speed: (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random()),
            color: i % 2 === 0 ? '#ff00ff' : '#00ffea',
            glow: i % 2 === 0 ? '#ff00ff' : '#00ffea'
        });
    }

    // Animation loop
    function draw() {
        ctx.clearRect(0, 0, w, h);

        // Draw lines
        lines.forEach(line => {
            ctx.save();
            ctx.shadowColor = line.glow;
            ctx.shadowBlur = 18;
            ctx.fillStyle = line.color;
            ctx.fillRect(line.x, line.y, line.width, line.height);
            ctx.restore();
        });

        // Draw ball
        ctx.save();
        ctx.shadowColor = ball.glow;
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.restore();
    }

    function update() {
        // Ball physics
        ball.vy += ball.gravity;
        ball.y += ball.vy;

        // Collision with lines
        for (let line of lines) {
            if (
                ball.y + ball.radius > line.y &&
                ball.y + ball.radius < line.y + line.height + 10 &&
                ball.x > line.x &&
                ball.x < line.x + line.width &&
                ball.vy > 0
            ) {
                ball.y = line.y - ball.radius;
                ball.vy = ball.jumpPower;
                ball.jumping = true;
                break;
            }
        }

        // Floor
        if (ball.y + ball.radius > h) {
            ball.y = h - ball.radius;
            ball.vy = ball.jumpPower;
        }

        // Move lines
        lines.forEach(line => {
            line.x += line.speed;
            if (line.x < 0 || line.x + line.width > w) {
                line.speed *= -1;
            }
        });
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    loop();
})(); 