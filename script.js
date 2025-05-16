// ==================== MAIN INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    setupMenuToggle();
    setupThemeToggle();
    setupSmoothScrolling();
    animateBlobs();
    setupProjectCards();
    setCurrentYear();
    initTechIcons();

    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ==================== MENU TOGGLE ====================
function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.textContent = '☰';
        });
    });
}

// ==================== THEME TOGGLE ====================
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const toggleCircle = document.querySelector('.toggle-circle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to apply theme
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggleCircle.style.transform = theme === 'dark' ? 'translateX(24px)' : 'translateX(0)';
    };

    // Initialize theme
    const currentTheme = localStorage.getItem('theme') || 
                       (prefersDarkScheme.matches ? 'dark' : 'light');
    applyTheme(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Watch for system theme changes
    prefersDarkScheme.addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Animate background blobs
function animateBlobs() {
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');
    
    function moveBlobs() {
        const x1 = Math.random() * 100 - 20;
        const y1 = Math.random() * 100 - 20;
        const x2 = Math.random() * 100 - 20;
        const y2 = Math.random() * 100 - 20;
        
        blob1.style.transform = `translate(${x1}px, ${y1}px)`;
        blob2.style.transform = `translate(${x2}px, ${y2}px)`;
    }
    
    // Move blobs every 20 seconds
    setInterval(moveBlobs, 20000);
    moveBlobs(); // Initial movement
}

// Project card hover effects
function setupProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Set current year in footer
function setCurrentYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Initialize floating tech icons
function initTechIcons() {
    const techIconsContainer = document.getElementById('tech-icons');
    const icons = [
        '⌨️', '💻', '🖥️', '📱', '🔌', '🖱️', '📊', '📈', '🔍', '🎨',
        '<i class="fab fa-html5"></i>',
        '<i class="fab fa-css3-alt"></i>',
        '<i class="fab fa-js"></i>',
        '<i class="fab fa-python"></i>',
        '<i class="fab fa-java"></i>',
        '<i class="fab fa-react"></i>',
        '<i class="fab fa-node-js"></i>',
        '<i class="fas fa-database"></i>',
        '<i class="fas fa-code"></i>',
        '<i class="fab fa-git-alt"></i>'
    ];

    // Create 30 icons for a nice distribution
    for (let i = 0; i < 30; i++) {
        const icon = document.createElement('div');
        icon.className = 'tech-icon';
        icon.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        
        // Random positioning
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        icon.style.fontSize = `${Math.random() * 1 + 1}rem`;
        icon.style.animationDuration = `${Math.random() * 15 + 15}s`;
        icon.style.animationDelay = `${Math.random() * 15}s`;
        icon.style.opacity = Math.random() * 0.5 + 0.1;
        
        techIconsContainer.appendChild(icon);
    }
}
