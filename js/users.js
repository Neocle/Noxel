class User {
    constructor(name, surname, email, password, stayLogged) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.stayLogged = stayLogged;
        this.username = null;
        this.pfp = null;
    }

    setUsername(username) {
        this.username = username;
    }

    setPfp(pfp) {
        this.pfp = pfp;
    }

    setStayLogged(bool) {
        this.stayLogged = bool;
    }
}

let users = [];
let currentUser = {};

document.addEventListener("DOMContentLoaded", () => {
    loadUsers();

    const me = localStorage.getItem("me");
});

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function loadUsers() {
    const data = localStorage.getItem("users");
    const current = localStorage.getItem("me");

    if (data) {
        users = JSON.parse(data);
        currentUser = JSON.parse(current);
    }
}

function userExists(email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return true;
        }
    }

    return false;
}

function getUser(email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return users[i];
        }
    }

    return null;
}

function saveCurrentUser(user) {
    if (user) {
        currentUser = user;
        localStorage.setItem("me", JSON.stringify(user));
    }
}

function getCurrentUser() {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === currentUser.email) {
            return users[i];
        }
    }

    return null;
}