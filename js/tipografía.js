document.addEventListener('DOMContentLoaded', function () {
    const changesButton = document.querySelector('.changes-button');
    const fontSelect = document.querySelector('#font-style'); // Acceso al select de la tipografía
    const body = document.body;

    // Verifica si una tipografía fue guardada previamente en localStorage
    if (localStorage.getItem('font-family')) {
        body.style.fontFamily = localStorage.getItem('font-family'); // Aplica la tipografía guardada
        fontSelect.value = localStorage.getItem('font-family'); // Establece el valor seleccionado en el select
    }

    // Cuando el usuario haga clic en "Guardar"
    changesButton.addEventListener('click', function () {
        const selectedFont = fontSelect.value; // Obtiene la tipografía seleccionada
        body.style.fontFamily = selectedFont; // Aplica la tipografía a toda la página

        // Guarda la tipografía seleccionada en localStorage
        localStorage.setItem('font-family', selectedFont);

        // Cambiar el texto del botón de guardar
        this.classList.add('active');
        this.textContent = '¡Guardado!';

        setTimeout(() => {
            this.classList.remove('active');
            this.textContent = 'Guardar';
        }, 2000);
    });
});
