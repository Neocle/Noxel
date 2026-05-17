const loginform = document.getElementById("login-form");
const error = document.getElementById("error");

loginform.addEventListener("submit", (e) => {
    e.preventDefault();
    error.style.display = "none"
    error.innerHTML = "Erreur lors de la connexion: <br>";

    let success = true;

    const email = document.getElementById("username-email").value.trim();
    const password = document.getElementById("password").value.trim();
    const stayLogged = document.getElementById("rester-connecte").checked;

    if (!email || email === "" || !email.includes("@")) {
        error.style.display = "block";
        error.innerHTML += "  - L'email entré n'est pas valide!<br>";
        success = false;
    }

    if (!password || password === "") {
        error.style.display = "block";
        error.innerHTML += "  - Le mot de passe ne peut pas être nul<br>";
        success = false
    }

    for (let i = 0; i < users.length; i++) {
        console.log(users[i].email + " " + users[i].password);
        if (users[i].email === email && users[i].password === password) {
            break;
        }

        error.style.display = "block";
        error.innerHTML += "  - Aucun utilisateur correspondant trouvé...<br>";
        success = false;
    }

    if (!success) {
        return;
    }
    
    const user = getUser(email);
    saveCurrentUser(user);

    loginform.reset()
    feed();
});