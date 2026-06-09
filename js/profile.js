addEventListener("DOMContentLoaded", (e) => { 
    const me = JSON.parse(localStorage.getItem("me"));

    if(!me) {
        window.location.href = "../index.html";
    }

    addProfileData();
})

function addProfileData() {
    const profileDiv = document.getElementById("profile-section");
    const me = getCurrentUser();

    const stats = {
        publications: 42,
        likes: 1280,
        commentaires: 314,
        activiteRecente: [
            "A publié une nouvelle photo",
            "A reçu 24 likes aujourd’hui",
            "A commenté une publication",
            "Profil mis à jour récemment"
        ]
    };

    profileDiv.innerHTML = `
        <div class="profile-header">
            <img class="profile-pfp-large" src="${me.pfp}">

            <div class="profile-info-large">
                <div class="profile-name-large">${me.surname} ${me.name}</div>
                <div class="profile-username-large">@${me.username}</div>
            </div>
        </div>

        <div class="profile-stats">
            <div class="profile-stat">
                <span class="profile-stat-number">${stats.publications}</span>
                <span class="profile-stat-label">Publications</span>
            </div>

            <div class="profile-stat">
                <span class="profile-stat-number">${stats.likes}</span>
                <span class="profile-stat-label">Likes reçus</span>
            </div>

            <div class="profile-stat">
                <span class="profile-stat-number">${stats.commentaires}</span>
                <span class="profile-stat-label">Commentaires</span>
            </div>
        </div>

        <div class="profile-activity">
            <h2>Activité récente</h2>

            <ul class="profile-activity-liste">
                ${stats.activiteRecente.map(activity => `
                    <li>${activity}</li>
                `).join("")}
            </ul>
        </div>
    `;
}