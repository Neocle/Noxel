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

function getFollowers(user) {
    let count = 0;

    for (let i = 0; i < users.length; i++) {
        if (users[i].follows.includes(user.email)) {
            count++;
        }
    }

    return count;
}

// user1 va suivre user
function follow(emailUser1, emailUser2) {
    if (emailUser1 === emailUser2)
        return;

    const user1 = getUser(emailUser1);
    if (user1.follows.includes(emailUser2))
        return;

    user1.follows.push(emailUser2);
    currentUser.follows.push(emailUser2);

    saveUsers();
    saveCurrentUser();

    addPosts();
}

function unfollow(emailUser1, emailUser2) {
    if (emailUser1 === emailUser2)
        return;

    const user1 = getUser(emailUser1);
    if (!user1.follows.includes(emailUser2))
        return;

    user1.follows = user1.follows.filter(email => email !== emailUser2);

    saveUsers();
    saveCurrentUser();

    if (window.location.href.includes("relations")) {
        addPosts("", false, false, true);
        return;
    }

    addPosts();
}

// retourne true si user1 suit user2
// currentUser suis author?
function follows(user1, user2) {
    if (user1 === user2)
        return false;

    return user1.follows.includes(user2.email);
}

function getNbFollowers(user) {
    let f = 0;

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === user.email)
            continue;

        if (follows(users[i], user)) {
            f++;
        }
    }

    return f;
}