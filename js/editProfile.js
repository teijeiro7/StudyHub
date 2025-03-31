document.addEventListener("DOMContentLoaded", function () {
    const avatarImage = document.getElementById("avatarImage");
    const avatarUpload = document.getElementById("avatarUpload");

    // Cargar imagen desde LocalStorage si existe
    const savedImage = localStorage.getItem("avatarImage");
    if (savedImage) {
        avatarImage.src = savedImage;
    }

    avatarUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarImage.src = e.target.result;
                // Guardar imagen en LocalStorage
                localStorage.setItem("avatarImage", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("banner");
    const bannerUpload = document.getElementById("bannerUpload");

    // Cargar imagen del banner desde LocalStorage si existe
    const savedBanner = localStorage.getItem("bannerImage");
    if (savedBanner) {
        banner.style.backgroundImage = `url(${savedBanner})`; // Aplica la imagen de banner guardada
    }

    // Escuchar el evento de cambio para cuando el usuario suba una nueva imagen
    bannerUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                banner.style.backgroundImage = `url(${e.target.result})`; // Aplica la nueva imagen de fondo
                // Guardar la nueva imagen del banner en LocalStorage
                localStorage.setItem("bannerImage", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});


