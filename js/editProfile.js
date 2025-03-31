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