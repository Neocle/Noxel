const signupform = document.getElementById("signup-form");
const error = document.getElementById("error");

signupform.addEventListener("submit", (e) => {
    e.preventDefault();
    error.style.display = "none"
    error.innerHTML = "Erreur lors de l'inscription: <br>";

    let success = true;

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("username-email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirme-password").value.trim();
    const stayLogged = document.getElementById("rester-connecte").checked;

    if (!name || name === "") {
        error.style.display = "block";
        error.innerHTML += "  - Le nom entré n'est pas valide!<br>";
        success = false;
    }
    
    if (!surname || surname === "") {
        error.style.display = "block";
        error.innerHTML += "  - Le prenom entré n'est pas valide!<br>";
        success = false;
    }

    if (!email || email === "" || !email.includes("@")) {
        error.style.display = "block";
        error.innerHTML += "  - L'email entré n'est pas valide!<br>";
        success = false;
    }

    if (!password || password === "") {
        error.style.display = "block";
        error.innerHTML += "  - Le mot de passe ne peut pas être nul<br>";
        success = false;
    }

    if (password.length < 8) {
        error.style.display = "block";
        error.innerHTML += "  - Le mot de passe doit contenir 8 charactères ou plus<br>";
        success = false;
    }

    if (!hasNumbers(password)) {
        error.style.display = "block";
        error.innerHTML += "  - Le mot de passe doit contenir au moins un chiffre<br>";
        success = false;
    }

    if (!hasSpecialChars(password)) {
        error.style.display = "block";
        error.innerHTML += "  - Le mot de passe doit contenir au moins un charactère spécial<br>";
        success = false;
    }

    if (password !== confirmPassword) {
        error.style.display = "block";
        error.innerHTML += "  - Les mot de passe ne correspondent pas<br>";
        success = false;
    }

    if (userExists(email)) {
        error.style.display = "block";
        error.innerHTML += "  - Un utilisateur avec cette email existe déjà<br>";  
        success = false;
    }

    if (!success) {
        return;
    }

    user = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        stayLogged: stayLogged,
        username: null,
        pfp: null,
        follows: []
    }

    users.push(user);

    saveUsers();
    saveCurrentUser(user);

    signupform.reset()
    window.location.href="./firstprofile.html"
});

function hasNumbers(str) {
    return str.includes("0") ||
            str.includes("1") ||
            str.includes("2") ||
            str.includes("3") ||
            str.includes("4") ||
            str.includes("5") ||
            str.includes("6") ||
            str.includes("7") ||
            str.includes("8") ||
            str.includes("9");
}

function hasSpecialChars(str) {
    return str.includes("@") ||
            str.includes("!") ||
            str.includes("?") ||
            str.includes(";") ||
            str.includes("#") ||
            str.includes(".") ||
            str.includes(",") ||
            str.includes("$") ||
            str.includes("*") ||
            str.includes("-") ||
            str.includes("_") ||
            str.includes(")") ||
            str.includes("(");
}