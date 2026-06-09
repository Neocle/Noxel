const firstProfileForm = document.getElementById("first-profile-form");

firstProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const pfp = document.getElementById("pfp").src.trim();
    
    currentUser.username = username;
    currentUser.pfp = pfp;

    const user = getCurrentUser();

    if (user) {
        user.username = username;
        user.pfp = pfp;
    }

    saveUsers();
    saveCurrentUser(currentUser);

    window.location.href="../feed/index.html";
});