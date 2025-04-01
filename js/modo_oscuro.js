document.addEventListener('DOMContentLoaded', function () {
    const changesButton = document.querySelector('.changes-button');
    const toggleSwitch = document.querySelector('#dark-mode-toggle'); // Acceso al toggle
    const body = document.body;

    // Verifica si el modo oscuro está habilitado previamente en localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        toggleSwitch.checked = true;
    }

    // Cuando el usuario haga clic en "Guardar"
    changesButton.addEventListener('click', function () {
        if (toggleSwitch.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled'); // Guarda la preferencia en localStorage
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled'); // Guarda la preferencia en localStorage
        }

        // Cambiar el texto del botón de guardar
        this.classList.add('active');
        this.textContent = '¡Guardado!';

        setTimeout(() => {
            this.classList.remove('active');
            this.textContent = 'Guardar';
        }, 2000);
    });
});
