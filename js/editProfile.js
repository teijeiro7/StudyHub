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


document.addEventListener("DOMContentLoaded", function () {
    // Valores predeterminados
    const defaultFullName = "Hola";
    const defaultUsername = "hola123";
    const defaultEmail = "hola@gmail.com";

    // Obtener los datos de localStorage o usar los valores predeterminados
    let fullName = localStorage.getItem("fullName") || defaultFullName;
    let username = localStorage.getItem("username") || defaultUsername;
    let email = localStorage.getItem("email") || defaultEmail;

    // Insertar los datos en la página del perfil
    const profileInfo = document.querySelector(".profile-info");
    if (profileInfo) {
        profileInfo.innerHTML = `
            <p><span>Nombre completo:</span> ${fullName}</p>
            <p><span>Nombre de usuario:</span> ${username}</p>
            <p><span>Correo Electrónico:</span> ${email}</p>
        `;
    }

    // Asignar los valores a los campos del formulario
    document.getElementById("fullName").value = fullName;
    document.getElementById("username").value = username;
    document.getElementById("email").value = email;

    const form = document.getElementById("profileForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío del formulario

        // Obtener los valores de los campos después de intentar enviarlos
        fullName = document.getElementById("fullName").value.trim();
        username = document.getElementById("username").value.trim();
        email = document.getElementById("email").value.trim();

        // Mensaje de error
        const errorMessage = document.getElementById('profileErrorMessage');
        const errorMessage2 = document.getElementById('profileErrorMessageEmail');
        
        // Verifica si los campos están vacíos o si los valores son los predeterminados
        if (fullName === "" || username === "" || email === "") {
            errorMessage.style.display = "block"; // Mostrar el mensaje de error
            return; // No enviar el formulario
        }

        // Validación de correo electrónico (simple)
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            errorMessage2.style.display = "block";
            return;
        }

        // Si todo está bien, guardar los datos en localStorage
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        // Actualizar el perfil directamente sin necesidad de redirigir
        if (profileInfo) {
            profileInfo.innerHTML = `
                <p><span>Nombre completo:</span> ${fullName}</p>
                <p><span>Nombre de usuario:</span> ${username}</p>
                <p><span>Correo Electrónico:</span> ${email}</p>
            `;
        }


        // Opcional: Redirigir a otra página (descomentado si lo necesitas)
        window.location.href = "aviso.html"; // Redirigir al perfil
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const interestsContainer = document.getElementById("interestsContainer");
    const interestsInput = document.getElementById("interests");

    // Cargar etiquetas desde localStorage si existen
    const savedTags = JSON.parse(localStorage.getItem("interests")) || [];

    // Mostrar las etiquetas guardadas
    savedTags.forEach(tag => {
        createTag(tag);
    });

    // Función para crear una nueva etiqueta
    function createTag(text) {
        const tag = document.createElement("span");
        tag.classList.add("tag");
        tag.innerHTML = `${text}<span class="tag-close">&times;</span>`;
        
        // Añadir el evento de eliminar etiqueta
        tag.querySelector(".tag-close").addEventListener("click", function() {
            interestsContainer.removeChild(tag);
            saveTags(); // Guardar los cambios en localStorage
        });

        interestsContainer.insertBefore(tag, interestsInput); // Insertar antes del input
    }

    // Función para guardar las etiquetas en localStorage
    function saveTags() {
        const tags = [];
        document.querySelectorAll(".tag").forEach(tag => {
            tags.push(tag.textContent.replace('×', '').trim());
        });
        localStorage.setItem("interests", JSON.stringify(tags));
    }

    // Evento para añadir una nueva etiqueta cuando se presiona Enter
    interestsInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && interestsInput.value.trim() !== "") {
            event.preventDefault(); // Prevenir el envío del formulario al presionar Enter
            const newTag = interestsInput.value.trim();
            createTag(newTag); // Crear la etiqueta
            interestsInput.value = ""; // Limpiar el input
            saveTags(); // Guardar las etiquetas en localStorage
        }
    });
});
