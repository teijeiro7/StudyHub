document.addEventListener("DOMContentLoaded", function () {
    const avatarImage = document.getElementById("avatarImage");
    const savedImage = localStorage.getItem("avatarImage");
    if (savedImage) {
        avatarImage.src = savedImage;
    }
});
