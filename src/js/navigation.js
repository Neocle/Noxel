function login() {
    window.location.href="./login.html"
}

function signup() {
    window.location.href="./signup.html"
}

function back() {
    window.location.href="./index.html"
}

function feed() {
    const me = localStorage.getItem("me");
    if (!me) {
        window.location.href="./index.html"
        return;
    }

    window.location.href="./feed.html"
}

function newpost() {
    const me = localStorage.getItem("me");
    if (!me) {
        window.location.href="./index.html"
        return;
    }

    window.location.href="./newpost.html"
}

function profile() {
    const me = localStorage.getItem("me");
    if (!me) {
        window.location.href="./index.html"
        return;
    }

    window.location.href="./profile.html"
}