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

    const profileHeader = document.createElement("div");
    profileHeader.className = "profile-header";

    const img = document.createElement("img");
    img.className = "profile-pfp-large";
    img.src = me.pfp;
    img.style.width = "30%";

    const info = document.createElement("div");
    info.className = "profile-info-large";

    const name = document.createElement("div");
    name.className = "profile-name-large";
    name.textContent = `${me.surname} ${me.name}`;

    const username = document.createElement("div");
    username.className = "profile-username-large";
    username.textContent = `@${me.username}`;

    info.appendChild(name);
    info.appendChild(username);

    profileHeader.appendChild(img);
    profileHeader.appendChild(info);

    const stats = document.createElement("div");
    stats.className = "profile-stats";

    const stat1 = document.createElement("div");
    stat1.className = "profile-stat";

    const stat1Number = document.createElement("span");
    stat1Number.className = "profile-stat-number";
    stat1Number.textContent = nbPosts;

    const stat1Label = document.createElement("span");
    stat1Label.className = "profile-stat-label";
    stat1Label.textContent = "Publications";

    stat1.appendChild(stat1Number);
    stat1.appendChild(stat1Label);

    const stat2 = document.createElement("div");
    stat2.className = "profile-stat";

    const stat2Number = document.createElement("span");
    stat2Number.className = "profile-stat-number";
    stat2Number.textContent = nbLikes;

    const stat2Label = document.createElement("span");
    stat2Label.className = "profile-stat-label";
    stat2Label.textContent = "Likes reçus";

    stat2.appendChild(stat2Number);
    stat2.appendChild(stat2Label);

    const stat3 = document.createElement("div");
    stat3.className = "profile-stat";

    const stat3Number = document.createElement("span");
    stat3Number.className = "profile-stat-number";
    stat3Number.textContent = nbFollowers;

    const stat3Label = document.createElement("span");
    stat3Label.className = "profile-stat-label";
    stat3Label.textContent = "Followers";

    stat3.appendChild(stat3Number);
    stat3.appendChild(stat3Label);

    stats.appendChild(stat1);
    stats.appendChild(stat2);
    stats.appendChild(stat3);

    profileDiv.appendChild(profileHeader);
    profileDiv.appendChild(stats);
}

function logout() {
    localStorage.removeItem("me");
    window.location.href = "../index.html";
}