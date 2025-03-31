document.addEventListener("DOMContentLoaded", function () {
    const avatarImage = document.getElementById("avatarImage");
    const savedImage = localStorage.getItem("avatarImage");
    if (savedImage) {
        avatarImage.src = savedImage;
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("banner");
    const savedBanner = localStorage.getItem("bannerImage");

    if (savedBanner) {
        banner.style.backgroundImage = `url(${savedBanner})`;  // Aplica el banner guardado
    }
});