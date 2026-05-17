addEventListener("DOMContentLoaded", (e) => { 
    const me = JSON.parse(localStorage.getItem("me"));

    if(!me) {
        back();
    }

    addProfileButton();
})

function addProfileButton() {
    const profileDiv = document.getElementById("profile");
    const me = getCurrentUser();

    console.log(me);

    profileDiv.innerHTML = `
        <img class="profile-pfp" src="${me.pfp}" alt="Profile picture">
        <div class="profile-info">
            <div class="profile-name">${me.surname} ${me.name}</div>
            <div class="profile-username">@${me.username}</div>
        </div>
    `;
}