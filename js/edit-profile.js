const profileEditForm = document.getElementById("edit-profile-form");
const error = document.getElementById("error");

addEventListener("DOMContentLoaded", () => {
    fillProfileEditForm();
});

function fillProfileEditForm() {
    const me = getCurrentUser();
    document.getElementById("pfp").src = me.pfp;
    document.getElementById("username").value = me.username;
    document.getElementById("name").value = me.name;
    document.getElementById("surname").value = me.surname;
    document.getElementById("email").value = me.email;
}

profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const me = getCurrentUser();
    let success = true;

    error.style.display = "none";
    error.innerHTML = "";

    const pfp = document.getElementById("pfp").src.trim();
    const username = document.getElementById("username").value.trim();
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const oldPassword = document.getElementById("old-password").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();

    if (!name) {
        error.style.display = "block";
        error.innerHTML += "  - Le nom entré n'est pas valide!<br>";
        success = false;
    }

    if (!surname) {
        error.style.display = "block";
        error.innerHTML += "  - Le prénom entré n'est pas valide!<br>";
        success = false;
    }

    if (!email || !email.includes("@")) {
        error.style.display = "block";
        error.innerHTML += "  - L'email entré n'est pas valide!<br>";
        success = false;
    }

    if (email !== me.email && userExists(email)) {
        error.style.display = "block";
        error.innerHTML += "  - Un utilisateur avec cette email existe déjà<br>";
        success = false;
    }

    const editpassword = newPassword !== "";

    if (editpassword) {
        if (!oldPassword || oldPassword !== me.password) {
            error.style.display = "block";
            error.innerHTML += "  - Le mot de passe actuel est incorrect<br>";
            success = false;
        }

        if (newPassword.length < 8) {
            error.style.display = "block";
            error.innerHTML += "  - Le mot de passe doit contenir 8 caractères ou plus<br>";
            success = false;
        }

        if (!hasNumbers(newPassword)) {
            error.style.display = "block";
            error.innerHTML += "  - Le mot de passe doit contenir au moins un chiffre<br>";
            success = false;
        }

        if (!hasSpecialChars(newPassword)) {
            error.style.display = "block";
            error.innerHTML += "  - Le mot de passe doit contenir au moins un caractère spécial<br>";
            success = false;
        }
    }

    if (!success) return;

    me.pfp = pfp;
    me.username = username;
    me.name = name;
    me.surname = surname;

    if (me.email !== email) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].author === me.email) {
                posts[i].author = email;
            }
        }
        
        savePosts();
        me.email = email;
    }

    if (editpassword) {
        me.password = newPassword;
    }

    saveCurrentUser(me);
    saveUsers();

    window.location.href="../profile/index.html"
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