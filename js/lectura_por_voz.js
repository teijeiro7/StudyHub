document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('save-btn'); // Botón de guardar
    const voiceReadingToggle = document.getElementById('voice-reading-toggle'); // Interruptor de lectura por voz
    const headerTexts = document.querySelectorAll('.overlap-group a, .user-controls a'); // Links y iconos de la cabecera
    const textsToRead = document.querySelectorAll('.text-wrapper-2, .setting-label'); // Textos generales

    // Función para leer el texto
    function readText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }

    // Función para obtener una descripción de los iconos
    function getIconDescription(iconElement) {
        const altText = iconElement.querySelector('img') ? iconElement.querySelector('img').alt : ''; // Obtener texto alternativo de la imagen
        const titleText = iconElement.title || ''; // Obtener texto del atributo title

        // Descripción personalizada para los iconos
        if (altText) {
            return `${altText}`;
        } else if (titleText) {
            return `${titleText}`;
        } else {
            return 'Icono no descrito';
        }
    }

    // Evento para el botón de guardar
    saveButton.addEventListener('click', function () {
        // Cambiar el estado del botón para indicar que se ha guardado
        this.classList.add('active');
        this.textContent = '¡Guardado!';

        setTimeout(() => {
            this.classList.remove('active');
            this.textContent = 'Guardar';
        }, 2000);

        // Si la lectura por voz está activada, leer el texto de la página
        if (voiceReadingToggle.checked) {
            // Leer los textos principales de la página
            textsToRead.forEach(function (element) {
                readText(element.textContent);
            });

            // Leer los textos de los enlaces y los iconos de la cabecera
            headerTexts.forEach(function (element) {
                const iconDescription = getIconDescription(element); // Obtener la descripción del icono
                const linkText = element.textContent.trim(); // Obtener el texto del enlace

                // Leer el texto del enlace seguido de la descripción del icono
                readText(linkText + '. ' + iconDescription);
            });

            // Añadir la frase cuando termine de leer los textos
            readText("Diga un comando para ejecutar, pulse la tecla r para activar el micrófono.");
        }
    });

    // Reconocimiento de voz para detectar el comando "Icono casa"
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES'; // Idioma en español

    recognition.onstart = function () {
        console.log("¡Escuchando...");
    };

    recognition.onresult = function (event) {
        const command = event.results[0][0].transcript.toLowerCase(); // Obtener lo que se dice

        console.log('Comando detectado:', command);

        
        // Detectar los comandos específicos
        if (command.includes("icono casa")) {
            readText("Redirigiendo a la página principa"); // Leer mensaje antes de redirigir
            setTimeout(function () {
                window.location.href = "index.html"; // Redirige a la página principal
            }, 1500); // Esperar un poco antes de redirigir
        } else if (command.includes("icono lupa")) {
            readText("Redirigiendo a la página de búsqueda");
            setTimeout(function () {
                window.location.href = "search.html"; // Redirige a la página de búsqueda
            }, 1500);
        } else if (command.includes("icono ajustes")) {
            readText("Redirigiendo a la página de ajustes");
            setTimeout(function () {
                window.location.href = "settings.html"; // Redirige a la página de ajustes
            }, 1500);
        } else if (command.includes("icono notificaciones")) {
            readText("Redirigiendo a la página de notificaciones");
            setTimeout(function () {
                window.location.href = "notifications.html"; // Redirige a la página de notificaciones
            }, 1500);
        } else if (command.includes("icono perfil")) {
            readText("Redirigiendo a la página de perfil");
            setTimeout(function () {
                window.location.href = "profile.html"; // Redirige a la página de perfil
            }, 1500);
        } else if (command.includes("studyhub")) {
            readText("Redirigiendo a la página principal de StudyHub");
            setTimeout(function () {
                window.location.href = "index.html"; // Redirige a la página principal de StudyHub
            }, 1500);
        }
    };

    recognition.onerror = function () {
        console.log("Error al escuchar el comando.");
    };

    // Iniciar el reconocimiento de voz cuando el usuario lo indique
    document.addEventListener('keydown', function (event) {
        if (event.key === 'r') { // Por ejemplo, al presionar la tecla 'r' se activa el reconocimiento de voz
            recognition.start();
            setTimeout(function () {
                readText("Comando no detectado. Intenta decir el comando correctamente.");
            }, 8000); // Si no se detecta un comando, después de 5 segundos se dice que no se detectó
        }
    });
});
