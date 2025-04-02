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


document.addEventListener("DOMContentLoaded", function () {
    // Valores predeterminados
    const defaultFullName = "Hola";
    const defaultUsername = "hola123";
    const defaultEmail = "hola@gmail.com";

    // Obtener datos de localStorage o usar los valores predeterminados
    const fullName = localStorage.getItem("fullName") || defaultFullName;
    const username = localStorage.getItem("username") || defaultUsername;
    const email = localStorage.getItem("email") || defaultEmail;

    // Insertar los datos en la página del perfil
    document.querySelector(".profile-info").innerHTML = `
        <p><span>Nombre completo:</span> ${fullName}</p>
        <p><span>Nombre de usuario:</span> ${username}</p>
        <p><span>Correo Electrónico:</span> ${email}</p>
    `;
});





