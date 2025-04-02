document.addEventListener('DOMContentLoaded', function () {
    const toggleDaltonic = document.querySelector('#daltonic-toggle'); // Asegúrate de que el selector sea correcto
    const body = document.body;
    const changesButton = document.querySelector('.changes-button'); // Botón de "Guardar"

    // Verifica si el modo daltónico está habilitado previamente en localStorage
    if (localStorage.getItem('daltonic-mode') === 'enabled') {
        body.classList.add('daltonic-mode');
        toggleDaltonic.checked = true;
    }

    // Cuando el usuario haga clic en el botón de guardar
    changesButton.addEventListener('click', function () {
        // Si el checkbox de daltonismo está marcado, activamos el modo daltónico
        if (toggleDaltonic.checked) {
            body.classList.add('daltonic-mode');
            localStorage.setItem('daltonic-mode', 'enabled'); // Guardamos la preferencia en localStorage
        } else {
            body.classList.remove('daltonic-mode');
            localStorage.setItem('daltonic-mode', 'disabled'); // Guardamos la preferencia en localStorage
        }

        // El botón "Guardar" cambia su texto
        this.classList.add('active');
        this.textContent = '¡Guardado!';

        setTimeout(() => {
            this.classList.remove('active');
            this.textContent = 'Guardar';
        }, 2000);
    });
});
