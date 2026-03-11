// update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// replace with your Roblox user ID (not used anymore since profile removed)
const ROBLOX_USER_ID = "1795023834";

// placeholder games list
const games = [
    {
        name: "Game One",
        description: "A fun adventure game I helped build.",
        image: "https://via.placeholder.com/300x150",
        link: "#"
    },
    {
        name: "Game Two",
        description: "Another project showcasing scripting skills.",
        image: "https://via.placeholder.com/300x150",
        link: "#"
    }
];

// placeholder video demos
// video data
const videos = [
    {
        "title": "Pathfinding System Demo",
        "description": "Shows the custom pathfinding logic and AI behavior.",
        "src": "demos/pathfinding.mp4"
    },
    {
        "title": "Inventory & UI",
        "description": "Clean modular inventory system with hotkeys.",
        "src": "demos/inventory.mp4"
    }
];

function renderGames() {
    const container = document.querySelector('.games-grid');
    container.innerHTML = '';
    games.forEach(g => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${g.image}" alt="${g.name}">
            <h3>${g.name}</h3>
            <p>${g.description}</p>
            <a href="${g.link}" target="_blank">View Game</a>
        `;
        container.appendChild(card);
    });
}

// profile section removed; function retained in case it's needed later
async function fetchProfile() {
    // function no longer invoked
}

function renderVideos() {
    const container = document.querySelector('.videos-grid');
    if (!container) return;
    container.innerHTML = '';
    videos.forEach(v => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <video controls width="100%" height="200">
                <source src="${v.src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <h3>${v.title}</h3>
            <p>${v.description}</p>
        `;
        container.appendChild(card);
    });
}

// initialize page
renderGames();
// fetchProfile(); // profile removed
renderVideos();

