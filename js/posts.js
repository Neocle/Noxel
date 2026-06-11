let posts = [];

document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
});

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
    const data = localStorage.getItem("posts");

    if (data) {
        posts = JSON.parse(data);
    }
}

function getLikes(post) {
    return post.likes.length;
}

function getFavorites(post) {
    return post.favorites.length;
}

function like(post, likeauthor) {
    if (post.likes.includes(likeauthor)) {
        unlike(post, likeauthor);
        return;
    }

    post.likes.push(likeauthor);
    savePosts();
    loadPosts()

    if (window.location.href.includes("profile")) {
        addPosts("", true);
        return;
    }

    if (window.location.href.includes("favorites")) {
        addPosts("", false, true);
        return;
    }

    if (window.location.href.includes("relations")) {
        addPosts("", false, false, true);
        return;
    }

    addPosts();
}

function favorite(post, favoriteauthor) {
    if (post.favorites.includes(favoriteauthor)) {
        unfavorite(post, favoriteauthor);
        return;
    }

    post.favorites.push(favoriteauthor);
    savePosts();
    loadPosts();

    if (window.location.href.includes("profile")) {
        addPosts("", true);
        return;
    }

    if (window.location.href.includes("favorites")) {
        addPosts("", false, true);
        return;
    }

    if (window.location.href.includes("relations")) {
        addPosts("", false, false, true);
        return;
    }

    addPosts();
}

function unlike(post, likeauthor) {
    if (!post.likes.includes(likeauthor)) {
        like(post, likeauthor);
        return;
    }

    post.likes = post.likes.filter(author => author !== likeauthor);
    savePosts();
    loadPosts();

    if (window.location.href.includes("profile")) {
        addPosts("", true);
        return;
    }

    if (window.location.href.includes("favorites")) {
        addPosts("", false, true);
        return;
    }

    if (window.location.href.includes("relations")) {
        addPosts("", false, false, true);
        return;
    }

    addPosts();
}

function unfavorite(post, favoriteauthor) {
    if (!post.favorites.includes(favoriteauthor)) {
        favorite(post, favoriteauthor);
        return;
    }

    post.favorites = post.favorites.filter(author => author !== favoriteauthor);
    savePosts();
    loadPosts()

    if (window.location.href.includes("profile")) {
        addPosts("", true);
        return;
    }

    if (window.location.href.includes("favorites")) {
        addPosts("", false, true);
        return;
    }

    if (window.location.href.includes("relations")) {
        addPosts("", false, false, true);
        return;
    }

    addPosts();
}

function deletePost(post) {
    const index = posts.indexOf(post);
    if (index > -1) {
        posts.splice(index, 1);
    }

    savePosts();
    loadPosts()

    if (window.location.href.includes("profile")) {
        addPosts("", true);
        return;
    }

    if (window.location.href.includes("favorites")) {
        addPosts("", false, true);
        return;
    }

    if (window.location.href.includes("relations")) {
        addPosts("", false, false, true);
        return;
    }

    addPosts();
}

function getNbPosts(user) {
    let c = 0;

    for(let i =0; i < posts.length; i++) {
        if (posts[i].author === user.email) {
            c++;
        }
    }

    return c;
}

function getNbLikes(user) {
    let l = 0;

    for(let i =0; i < posts.length; i++) {
        if (posts[i].author === user.email) {
            l+= posts[i].likes.length;
        }
    }

    return l;
}