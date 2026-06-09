addEventListener("DOMContentLoaded", (e) => { 
    const me = JSON.parse(localStorage.getItem("me"));

    if(!me) {
        window.location.href = "../index.html";
    }
})

const imageInput = document.getElementById("post-image");
const image = document.getElementById("image");
const imageElement = document.getElementById("image");
const imageAddButton = document.getElementById("image-add");
const imageRemoveButton = document.getElementById("image-remove");

function addImage() {
  imageInput.click();
}

function removeImage() {
    imageElement.src = null;
    imageAddButton.style.display = '';
    image.style.display = 'none';
    imageRemoveButton.style.display = 'none';
}

// aide: https://stackoverflow.com/questions/75479585/how-to-save-an-image-input-type-file-into-the-local-storage-and-display-it-b
imageInput.addEventListener("change", () => {
    const img = imageInput.files[0];

    const reader = new FileReader();

    reader.onload = function () {
        imageElement.src = reader.result;
    };

    reader.readAsDataURL(img);
    imageAddButton.style.display = 'none';
    image.style.display = '';
    imageRemoveButton.style.display = '';
});

const postform = document.getElementById("newpost-form");
const error = document.getElementById("error");

postform.addEventListener("submit", (e) => {
    e.preventDefault();
    error.style.display = "none"
    error.innerHTML = "Erreur lors de la publication: <br>";

    let success = true;

    const title = document.getElementById("post-title").value.trim();
    const description = document.getElementById("post-description").value.trim();
    const image = document.getElementById("image").src.trim();

    if (!title || title === "" || title.length < 10) {
        error.style.display = "block";
        error.innerHTML += "  - Le titre ne peux pas etre vide / moins de 10 characteres<br>";
        success = false;
    }

    if (!description || description === "") {
        error.style.display = "block";
        error.innerHTML += "  - La description doit etre remplie<br>";
        success = false
    }

    if (!success) {
        return;
    }
    
    const currentUser = getCurrentUser();
    
    const post = {
        title: title,
        description: description,
        author: currentUser.email,
        likes: [],
        favorites: [],
        image: image
    }

    posts.push(post);
    savePosts();

    postform.reset()
    window.location.href="../feed/index.html"
});