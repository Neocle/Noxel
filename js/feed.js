addEventListener("DOMContentLoaded", (e) => { 
    const me = JSON.parse(localStorage.getItem("me"));

    if(!me) {
        window.location.href = "../index.html";
    }

    addProfileButton();

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
})

function addProfileButton() {
    const profileDiv = document.getElementById("profile");
    const me = getCurrentUser();

    profileDiv.innerHTML = '';

    const profileLink = document.createElement('a');
    profileLink.href = "../profile/index.html";

    const profileImg = document.createElement('img');
    profileImg.className = "profile-pfp";
    profileImg.src = me.pfp;
    profileImg.alt = "Profile picture";
    profileLink.appendChild(profileImg);

    const profileInfo = document.createElement('div');
    profileInfo.className = "profile-info";

    const profileName = document.createElement('div');
    profileName.className = "profile-name";
    profileName.textContent = `${me.surname} ${me.name}`;
    profileInfo.appendChild(profileName);

    const profileUsername = document.createElement('div');
    profileUsername.className = "profile-username";
    profileUsername.textContent = `@${me.username}`;
    profileInfo.appendChild(profileUsername);

    profileLink.appendChild(profileInfo);
    profileDiv.appendChild(profileLink);
}

const searchInput = document.getElementById("searchinput");

if (searchInput) {
    searchInput.addEventListener("input", () => {
        addPosts(searchInput.value);
    });
}

function addPosts(search = "", onlyAuthor = false, onlyFavorites = false, onlyRelations = false) {
    // recuperation et suppression de tous les posts deja present
    // pour eviter qu'ils se dupliquent
    const postsdiv = document.getElementById("posts");
    postsdiv.innerHTML = "";

    const searchedText = search.toLowerCase().trim();

    //nombres de posts qui correspondent au texte recherche
    let found = 0;

    // boucle sur tous les postss
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const author = getUser(post.author);
        const currentUser = getCurrentUser();

        if (!post.favorites.includes(currentUser.email) && onlyFavorites)
            continue;

        if (post.author !== currentUser.email && onlyAuthor)
            continue;

        if (!currentUser.follows.includes(post.author) && onlyRelations)
            continue;

        const postcontnent = `
            ${post.title}
            ${post.description}
            ${author.username}
            ${author.surname}
            ${author.name}
        `.toLowerCase();

        // si le post ne correspond pas alors on ne l'affiche pas et on passe a la prochaine iter
        if (searchedText !== "" && !postcontnent.includes(searchedText)) {
            continue;
        }

        // trouvé donc on augmente le nb de posts qui matchent
        found++;

        // icones différentes si liké/mis en favoris/abonné ou non
        const likeImage = post.likes.includes(currentUser.email) ? "like.svg" : "like_not_liked.svg";
        const favImage = post.favorites.includes(currentUser.email) ? "favorite_selected.svg" : "favorite.svg";
        const isfollowing = follows(currentUser, author);

        // création du post
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        const postAuthorDiv = document.createElement('div');
        postAuthorDiv.className = 'post-author';

        const authorPfp = document.createElement('img');
        authorPfp.className = 'author-pfp';
        authorPfp.src = author.pfp;
        postAuthorDiv.appendChild(authorPfp);

        const authorNameHeader = document.createElement('h4');
        authorNameHeader.textContent = `@${author.username} (${author.surname} ${author.name})`;
        postAuthorDiv.appendChild(authorNameHeader);

        //si l'utilisateur connecté n'est pas le créateur du poste, alors on affiche le bouton
        // follow/unfollow et l'icone qui va avec
        if (post.author !== currentUser.email) {
            const followActionsDiv = document.createElement('div');
            followActionsDiv.className = 'follow-actions';

            if (isfollowing) {
                const followIcon = document.createElement('img');
                followIcon.className = 'follow-icon';
                followIcon.src = '../public/icons/user_followed.svg';
                followIcon.style.width = '24px';
                followActionsDiv.appendChild(followIcon);
            }

            const followButton = document.createElement('button');
            followButton.className = 'follow-button';
            followButton.textContent = isfollowing ? 'Unfollow' : 'Follow';
            followButton.addEventListener('click', () => {
                if (isfollowing) {
                    unfollow(currentUser.email, author.email);
                } else {
                    follow(currentUser.email, author.email);
                }
            });
            
            followActionsDiv.appendChild(followButton);
            postAuthorDiv.appendChild(followActionsDiv);
        }
        postDiv.appendChild(postAuthorDiv);

        // titre du post
        const postTitle = document.createElement('h3');
        postTitle.className = 'post-title';
        postTitle.textContent = post.title;
        postDiv.appendChild(postTitle);

        //description du post
        const postDescription = document.createElement('p');
        postDescription.className = 'post-description';
        postDescription.textContent = post.description;
        postDiv.appendChild(postDescription);

        // imahge du post, si existante 
        if (post.image) {
            const postImg = document.createElement('img');
            postImg.className = 'post-image';
            postImg.src = post.image;
            postImg.addEventListener('click', () => {
                showImg(post.image)
            });
            postDiv.appendChild(postImg);
        }

        // les boutons et icones de like/favoris
        const likeButton = document.createElement('button');
        likeButton.id = 'like-button';
        
        const likeIcon = document.createElement('img');
        likeIcon.src = `../public/icons/${likeImage}`;
        likeIcon.style.width = '24px';
        likeButton.appendChild(likeIcon);
        
        const nbLikes = document.createElement('p');
        nbLikes.textContent = getLikes(post);
        likeButton.appendChild(nbLikes);
        likeButton.addEventListener('click', () => {
            like(posts[i], currentUser.email)
        });
        postDiv.appendChild(likeButton);

        const favoriteButton = document.createElement('button');
        favoriteButton.id = 'favorite-button';
        
        const favIcon = document.createElement('img');
        favIcon.src = `../public/icons/${favImage}`;
        favIcon.style.width = '24px';
        favoriteButton.appendChild(favIcon);
        
        const nbFavorites = document.createElement('p');
        nbFavorites.textContent = getFavorites(post);
        favoriteButton.appendChild(nbFavorites);
        favoriteButton.addEventListener('click', () => {
            favorite(posts[i], currentUser.email)
        });
        postDiv.appendChild(favoriteButton);

        // si l'auteur EST la m^eme personne que celle connectée alors
        // on ajoute le bouton pour supprimr le post
        if (author.email === currentUser.email) {
            const deleteButton = document.createElement('button');
            deleteButton.id = 'delete-button';

            const imgNormal = document.createElement('img');
            imgNormal.className = 'normal';
            imgNormal.src = '../public/icons/delete.svg';
            imgNormal.style.width = '24px';
            deleteButton.appendChild(imgNormal);

            const imgHover = document.createElement('img');
            imgHover.className = 'hover';
            imgHover.src = '../public/icons/delete_selected.svg';
            imgHover.style.width = '24px';
            deleteButton.appendChild(imgHover);

            const deleteText = document.createElement("p");
            deleteText.textContent = ' Supprimer'
            deleteButton.appendChild(deleteText);
            deleteButton.addEventListener('click', () =>  {
                deletePost(posts[i])
            });
            postDiv.appendChild(deleteButton);
        }

        postsdiv.appendChild(postDiv);
    }

    if (found === 0) {
        const noPostsDiv = document.createElement('div');
        noPostsDiv.className = 'no-posts';

        const noPostsHeader = document.createElement('h3');
        noPostsHeader.textContent = "Rien n'a été trouvé...";
        noPostsDiv.appendChild(noPostsHeader);

        const noPostsText = document.createElement('p');
        noPostsText.textContent = "Essayez peut être de modifier vos critères de recherche...";
        noPostsDiv.appendChild(noPostsText);

        postsdiv.appendChild(noPostsDiv);
    }
}

function showImg(src) {
    document.getElementById("imgfull").src = src;
    document.getElementById("imgfulldiv").style.display = "grid";
}

function closeImg() {
    document.getElementById("imgfulldiv").style.display = "none";
}