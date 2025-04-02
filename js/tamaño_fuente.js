document.addEventListener('DOMContentLoaded', function () {
    const changesButton = document.querySelector('.changes-button');
    const fontSizeInput = document.getElementById('font-size-input');
    const body = document.body;

    // Verifica si el tamaño de fuente está guardado en localStorage
    const savedFontSize = localStorage.getItem('font-size');
    
    if (savedFontSize) {
        // Aplica el tamaño de fuente almacenado al body y a los elementos relevantes
        body.style.fontSize = savedFontSize + 'px';
        
        // Aplica el tamaño de fuente a los elementos de texto específicos
        document.querySelectorAll('.setting-label, .changes-button, .text-wrapper-2, .setting-item, .click-connect, .text-wrapper, .username_title, .div, .text-wrapper-3, .text-wrapper-4',).forEach((element) => {
            element.style.fontSize = savedFontSize + 'px';
        });

        fontSizeInput.value = savedFontSize; // Actualiza el valor del input
    } else {
        // Si no hay tamaño guardado, usa el tamaño predeterminado definido en el CSS
        body.style.fontSize = '';  // No sobrescribir el tamaño predeterminado
        fontSizeInput.value = '';  // Deja el input vacío o con el valor predeterminado
    }

    // Cuando el usuario haga clic en el botón "Guardar"
    changesButton.addEventListener('click', function () {
        const fontSize = fontSizeInput.value;

        // Cambia el tamaño de la fuente de la aplicación
        body.style.fontSize = fontSize + 'px';
        
        // Cambia el tamaño de fuente de los elementos específicos
        document.querySelectorAll('.setting-label, .changes-button, .text-wrapper-2, .setting-item, .click-connect, .text-wrapper, .username_title, .div, .text-wrapper-3, .text-wrapper-4').forEach((element) => {
            element.style.fontSize = fontSize + 'px';
        });

        localStorage.setItem('font-size', fontSize); // Guarda el tamaño de fuente en localStorage

        this.classList.add('active');
        this.textContent = '¡Guardado!';

        setTimeout(() => {
            this.classList.remove('active');
            this.textContent = 'Guardar';
        }, 2000);
    });
});
