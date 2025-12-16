// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background opacity on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transform = 'scaleX(1)';
                    bar.style.transformOrigin = 'left';
                    bar.style.transition = 'transform 1s ease';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Initialize skill bar animations
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        // Initially hide skill progress
        const skillBars = skillsSection.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.transform = 'scaleX(0)';
            bar.style.transformOrigin = 'left';
        });

        skillsObserver.observe(skillsSection);
    }
});

// Animate project cards on scroll
const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card, .featured-project');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        projectsObserver.observe(card);
    });
});

// Terminal typing animation
function typeText(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function typeChar() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }

    typeChar();
}

// Initialize terminal animation
document.addEventListener('DOMContentLoaded', function() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    const typingLine = document.querySelector('.typing');

    if (typingLine) {
        // Clear the initial content
        typingLine.innerHTML = 'minishell$ <span class="cursor">|</span>';

        // Start typing animation after a delay
        setTimeout(() => {
            const commands = [
                'export PATH="/usr/bin:$PATH"',
                'cd /home/user/projects',
                'make clean && make',
                'echo "Ready for Digital Grid!"'
            ];

            let currentCommand = 0;

            function typeNextCommand() {
                if (currentCommand < commands.length) {
                    typingLine.innerHTML = 'minishell$ ';
                    typeText(typingLine, 'minishell$ ' + commands[currentCommand], 80);
                    currentCommand++;
                    setTimeout(typeNextCommand, 4000);
                } else {
                    // Reset to start
                    currentCommand = 0;
                    setTimeout(typeNextCommand, 2000);
                }
            }

            typeNextCommand();
        }, 2000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active state to navigation links
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Copy email functionality (if needed)
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(function() {
        // Show a temporary notification
        const notification = document.createElement('div');
        notification.textContent = 'Email copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #48bb78;
            color: white;
            padding: 1rem;
            border-radius: 6px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .nav-link.active {
        color: #3182ce !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);