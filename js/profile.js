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

    const nbPosts = getNbPosts(me);
    const nbLikes = getNbLikes(me);
    const nbFollowers = getNbFollowers(me);

    profileDiv.innerHTML = `
        <div class="profile-header">
            <img class="profile-pfp-large" src="${me.pfp}" width="30%">

            <div class="profile-info-large">
                <div class="profile-name-large">${me.surname} ${me.name}</div>
                <div class="profile-username-large">@${me.username}</div>
            </div>
        </div>

        <div class="profile-stats">
            <div class="profile-stat">
                <span class="profile-stat-number">${nbPosts}</span>
                <span class="profile-stat-label">Publications</span>
            </div>

            <div class="profile-stat">
                <span class="profile-stat-number">${nbLikes}</span>
                <span class="profile-stat-label">Likes reçus</span>
            </div>

            <div class="profile-stat">
                <span class="profile-stat-number">${nbFollowers}</span>
                <span class="profile-stat-label">Followers</span>
            </div>
        </div>
    `;
}

function logout() {
    localStorage.removeItem("me");
    window.location.href = "../index.html";
}