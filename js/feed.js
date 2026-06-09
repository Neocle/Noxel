addEventListener("DOMContentLoaded", (e) => { 
    const me = JSON.parse(localStorage.getItem("me"));

    if(!me) {
        back();
    }

    addProfileButton();
    addPosts();
})

function addProfileButton() {
    const profileDiv = document.getElementById("profile");
    const me = getCurrentUser();

    profileDiv.innerHTML = `
        <img class="profile-pfp" src="${me.pfp}" alt="Profile picture">
        <div class="profile-info">
            <div class="profile-name">${me.surname} ${me.name}</div>
            <div class="profile-username">@${me.username}</div>
        </div>
    `;
}

const searchInput = document.getElementById("searchinput");

searchInput.addEventListener("input", () => {
    addPosts(searchInput.value);
});

function addPosts(search = "") {
    const postsdiv = document.getElementById("posts");
    postsdiv.innerHTML = "";

    const searchedText = search.toLowerCase().trim();
    let found =0;

    for(let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const author = getUser(post.author);
        const currentUser = getCurrentUser();

        const postcontnent = `
            ${post.title}
            ${post.description}
            ${author.username}
            ${author.surname}
            ${author.name}
        `.toLowerCase();

        if (searchedText !== "" && !postcontnent.includes(searchedText)) {
            continue;
        }

        found++;

        const likeImage = post.likes.includes(currentUser.email) ? "like.svg" : "like_not_liked.svg"
        const favImage = post.favorites.includes(currentUser.email) ? "favorite_selected.svg" : "favorite.svg"
        const isfollowing = follows(currentUser, author);

        postsdiv.innerHTML += `
            <div class='post'>
                <div class='post-author'>
                    <img class='author-pfp' src='${author.pfp}'>
                    <h4>@${author.username} (${author.surname} ${author.name})</h4>
                            
                    ${post.author !== currentUser.email ?
                        `<div class="follow-actions">
                            ${isfollowing ? "<img class='follow-icon' src='./public/user_followed.svg' width='24px'>" : ""}
                                <button
                                    class='follow-button'
                                    onclick="${isfollowing
                                        ? `unfollow('${currentUser.email}', '${author.email}')`
                                        : `follow('${currentUser.email}', '${author.email}')`}"
                                >
                                    ${isfollowing ? 'Unfollow' : 'Follow'}
                                </button>
                        </div>` : ''
                    }
                </div>
                <h3 class='post-title'>${post.title}</h3>
                <p class='post-description'>${post.description}</p>

                ${post.image ? `
                    <img class="post-image" src="${post.image}" onclick="showImg('${post.image}')">
                ` : ''}

                <button id='like-button' onclick="like(posts[${i}], '${currentUser.email}')">
                    <img src='./public/${likeImage}' width='24px'>
                    ${getLikes(post)}
                </button>

                <button id='favorite-button' onclick="favorite(posts[${i}], '${currentUser.email}')">
                    <img src='./public/${favImage}' width='24px'>
                    ${getFavorites(post)}
                </button>

                ${author.email === currentUser.email ?
                    `<button id='delete-button' onclick="deletePost(posts[${i}])">
                        <img class="normal" src='./public/delete.svg' width='24px'>
                        <img class="hover" src="./public/delete_selected.svg" width='24px'>
                        Supprimer
                     </button>
                ` : ''}
            </div>
        `
    }

    if (found === 0) {
        postsdiv.innerHTML += `
            <div class="no-posts">
                <h3>Rien n'a été trouvé...</h3>
                <p>Essayez peut être de modifier vos critères de recherche...</p>
            </div>
        `;
    }
}   

function showImg(src) {
    document.getElementById("imgfull").src = src;
    document.getElementById("imgfulldiv").style.display = "grid";
}

function closeImg() {
    document.getElementById("imgfulldiv").style.display = "none";
}