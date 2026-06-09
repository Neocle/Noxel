addEventListener("DOMContentLoaded", (e) => { 
    const me = JSON.parse(localStorage.getItem("me"));

    if(me) {
        window.location.href="./feed/index.html";
    }
})