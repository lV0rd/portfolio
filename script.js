// Load configuration and initialize the page
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        return config;
    } catch (error) {
        console.error('Failed to load config:', error);
        return null;
    }
}

function populateHero(config) {
    document.getElementById('hero-eyebrow').textContent = config.personal.eyebrow;
    document.getElementById('hero-name').textContent = config.personal.name;
    document.getElementById('hero-description').innerHTML = config.personal.description;
    document.getElementById('nav-name').textContent = config.personal.name;
    document.getElementById('footer-name').textContent = config.personal.name;
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function populateAbout(config) {
    const aboutContent = document.getElementById('about-content');
    const skills = document.getElementById('about-skills');

    skills.textContent = config.personal.skills;

    aboutContent.innerHTML = config.personal.bio.map(paragraph =>
        `<p style="text-align:center; color:#eaeaea; max-width:900px; margin: 0 auto;">${paragraph}</p>`
    ).join('');
}

function populateProjects(config) {
    const projectsGrid = document.getElementById('projects-grid');
    const projectsDesc = document.getElementById('projects-description');

    projectsDesc.textContent = config.projects.description;

    // Regular projects
    const loadProjects = () => {
        const projectsHTML = config.projects.list.map((project) => {
            const thumbnailUrl = project.image || 'https://via.placeholder.com/300x150/00d4ff/ffffff?text=Game';

            return `
                <article class="card" role="listitem" aria-label="${project.title} project">
                    <div class="thumb">
                        <img src="${thumbnailUrl}" alt="${project.title} thumbnail" />
                    </div>
                    <div class="featured-role">${project.role}</div>
                    <h4>${project.title}</h4>
                    <p class="desc">${project.description}</p>
                    <div class="actions">
                        <a class="btn" href="${project.playUrl}" target="_blank" rel="noopener">Play</a>
                        <a class="btn secondary" href="${project.contactUrl}">Contact Me</a>
                    </div>
                </article>
            `;
        });

        projectsGrid.innerHTML = projectsHTML.join('');
    };

    loadProjects();
}

function populateShowcase(config) {
    const showcaseWrapper = document.getElementById('showcase-wrapper');
    const showcaseDesc = document.getElementById('showcase-description');

    showcaseDesc.textContent = config.showcase.description;

    const videosHTML = config.showcase.videos.map(video => `
        <div class="clip" role="listitem">
            <video controls preload="metadata" playsinline>
                <source src="${video.src}" />
                Your browser cannot play this video.
            </video>
            <h4>${video.title}</h4>
            <p>${video.description}</p>
        </div>
    `).join('');

    showcaseWrapper.innerHTML = videosHTML;
}

function populateTerms(config) {
    const tosContent = document.getElementById('tos-content');
    const tosDesc = document.getElementById('tos-description');

    tosDesc.textContent = config.terms.description;

    tosContent.innerHTML = `
        <div style="max-width:840px;margin:0 auto;color:var(--muted);">
            <ul style="line-height:1.8; padding-left:1rem;">
                ${config.terms.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
}

function populateReviews(config) {
    const reviewsContent = document.getElementById('reviews-content');
    const reviewsDesc = document.getElementById('reviews-description');

    reviewsDesc.textContent = config.reviews.description;

    const reviewsHTML = config.reviews.images.map(image => `
        <div class="review-card" role="region" aria-label="Client review">
            <img src="${image}" alt="Client review" />
        </div>
    `).join('');

    reviewsContent.innerHTML = reviewsHTML;
}

function populateContact(config) {
    const contactGrid = document.getElementById('contact-grid');
    const contactDesc = document.getElementById('contact-description');

    contactDesc.textContent = config.contact.description;

    const socialHTML = Object.entries(config.personal.social).map(([key, social]) => `
        <a href="${social.url}" target="_blank" rel="noopener">
            <img src="${social.icon}" alt="${key}" />
        </a>
    `).join('');

    contactGrid.innerHTML = socialHTML;
}

function applyTheme(config) {
    const root = document.documentElement;
    const theme = config.theme;

    root.style.setProperty('--bg-1', theme.colors.bg1);
    root.style.setProperty('--bg-2', theme.colors.bg2);
    root.style.setProperty('--card', theme.colors.card);
    root.style.setProperty('--muted', theme.colors.muted);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--accent-2', theme.colors.accent2);
    root.style.setProperty('--glass', theme.colors.glass);
    root.style.setProperty('--max-width', theme.maxWidth);
    root.style.setProperty('--radius', theme.radius);
    root.style.setProperty('--gap', theme.gap);
    root.style.setProperty('--nav-height', theme.navHeight);
}

function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('main section, header.hero'));
    
    function updateActiveLink() {
        const navHeight = 70;
        const scrollPos = window.scrollY + navHeight + 100;
        
        let activeSection = sections[0];
        
        for (let section of sections) {
            if (section.offsetTop <= scrollPos) {
                activeSection = section;
            } else {
                break;
            }
        }
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + activeSection.id);
        });
    }
    
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
}

function initFadeIn() {
    // Fade-in on load
    const elems = document.querySelectorAll('header.hero, section');
    elems.forEach((el, i) => setTimeout(() => el.classList.add('visible'), 100 * i));
}

function initParticleConnections() {
    const particlesContainer = document.querySelector('.particles');
    const particles = document.querySelectorAll('.particle');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('particle-lines');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '1';
    particlesContainer.appendChild(svg);

    function updateConnections() {
        // Clear existing lines
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        const particlePositions = Array.from(particles).map(particle => {
            const rect = particle.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                element: particle
            };
        });

        // Draw lines between close particles
        for (let i = 0; i < particlePositions.length; i++) {
            for (let j = i + 1; j < particlePositions.length; j++) {
                const p1 = particlePositions[i];
                const p2 = particlePositions[j];
                const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

                if (distance < 250) { // Connection distance threshold
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', p1.x);
                    line.setAttribute('y1', p1.y);
                    line.setAttribute('x2', p2.x);
                    line.setAttribute('y2', p2.y);
                    line.setAttribute('stroke', 'var(--accent)');
                    line.setAttribute('stroke-width', '2');
                    line.setAttribute('opacity', Math.max(0.3, 1 - distance / 250));
                    svg.appendChild(line);
                }
            }
        }
    }

    // Update connections initially and on scroll/resize
    updateConnections();
    window.addEventListener('scroll', updateConnections);
    window.addEventListener('resize', updateConnections);

    // Update periodically for smooth animation
    setInterval(updateConnections, 100);
}

async function init() {
    const config = await loadConfig();
    if (!config) return;

    // Apply theme first
    applyTheme(config);

    // Populate all sections
    populateHero(config);
    populateAbout(config);
    populateProjects(config);
    populateShowcase(config);
    populateTerms(config);
    populateReviews(config);
    populateContact(config);

    // Initialize interactions
    initNavigation();
    initFadeIn();
    initParticleConnections();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}