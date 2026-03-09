// update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// replace with your Roblox user ID
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

async function fetchProfile() {
    if (!ROBLOX_USER_ID) return;
    try {
        const userResp = await fetch(`https://users.roblox.com/v1/users/${ROBLOX_USER_ID}`);
        const userData = await userResp.json();
        const thumbResp = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${ROBLOX_USER_ID}&size=150x150&format=Png&isCircular=true`);
        const thumbData = await thumbResp.json();
        const avatarUrl = thumbData.data[0]?.imageUrl;

        const container = document.querySelector('.profile-container');
        container.innerHTML = `
            <img src="${avatarUrl}" alt="${userData.name} avatar">
            <div>
                <h3><a href="https://www.roblox.com/users/${ROBLOX_USER_ID}/profile" target="_blank">${userData.name}</a></h3>
                <p>Roblox ID: ${ROBLOX_USER_ID}</p>
            </div>
        `;
    } catch (err) {
        console.error('Failed to load profile', err);
    }
}

// initialize page
renderGames();
fetchProfile();
