const imageInput = document.getElementById("image-input");
const pfp = document.getElementById("pfp");

function edit() {
  imageInput.click();
}

// aide: https://stackoverflow.com/questions/75479585/how-to-save-an-image-input-type-file-into-the-local-storage-and-display-it-b
imageInput.addEventListener("change", () => {
    const img = imageInput.files[0];

    const reader = new FileReader();

    reader.onload = function () {
        pfp.src = reader.result;

        console.log(reader.result);
    };

    reader.readAsDataURL(img);
});