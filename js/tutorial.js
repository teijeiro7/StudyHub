document.addEventListener('DOMContentLoaded', function () {
    const tutorialStartButton = document.getElementById('tutorial-start'); // Botón para iniciar el tutorial
    const body = document.body;

    // Sección donde se define la información del tutorial
    const tutorialSteps = [
        {
            element: '.text-wrapper a[href="index.html"]', // "StudyHub"
            description: 'Si pulsas en "StudyHub", te llevará de nuevo a la página principal.',
            position: 'top',
        },
        {
            element: '.image-4', // Icono de búsqueda
            description: 'Este es el ícono de búsqueda. Haz clic aquí para buscar documentos.',
            position: 'top',
        },
        {
            element: '.image-3', // Icono de inicio
            description: 'Este es el ícono de inicio, que te llevará a la página principal.',
            position: 'top',
        },
        {
            element: '.image-2', // Icono de ajustes
            description: 'Aquí puedes acceder a los ajustes de tu cuenta y la aplicación.',
            position: 'top',
        },
        {
            element: '.image', // Icono de notificaciones
            description: 'Este ícono muestra tus notificaciones.',
            position: 'top',
        },
        {
            element: '.img', // Icono de perfil
            description: 'Aquí puedes acceder a tu perfil y editar tu información.',
            position: 'top',
        },
        {
            element: '.nav-menu', // Panel de funcionalidades
            description: 'Este es el panel de funcionalidades. Aquí podrás acceder a diferentes opciones de la plataforma.',
            position: 'top',
        },
        {
            element: '.text-wrapper-3 a[href="search.html"]', // Búsqueda
            description: 'En "Búsqueda", podrás buscar documentos en tu cuenta.',
            position: 'top',
        },
        {
            element: '.text-wrapper-4 a[href="myDocs.html"]', // Mis Archivos
            description: 'En "Mis Archivos", podrás ver y gestionar todos tus documentos guardados.',
            position: 'top',
        },
        {
            element: '.text-wrapper-4 a[href="sharedDocs.html"]', // Compartidos
            description: 'En "Compartidos", podrás acceder a los documentos que has compartido o te han compartido.',
            position: 'top',
        },
        {
            element: '.text-wrapper-5', // Mi Cuenta
            description: 'En "Mi Cuenta", podrás ver y modificar tu perfil.',
            position: 'top',
        },
        {
            element: '.text-wrapper-11', // Notas rápidas
            description: 'En "Notas Rápidas", podrás crear y ver notas rápidas.',
            position: 'top',
        },
        {
            element: '.feature-card img[alt="Conversor"]', // Conversor
            description: 'En "Conversor", puedes convertir tus archivos a diferentes formatos.',
            position: 'top',
        },
        {
            element: '.text-wrapper-10', // Añadir Documento
            description: 'En "Añadir Documento", podrás subir nuevos documentos a tu cuenta.',
            position: 'top',
        },
        {
            element: '.text-wrapper-9', // Ajustes
            description: 'En "Ajustes", podrás cambiar la configuración de tu cuenta y la aplicación.',
            position: 'top',
        },
        {
            element: '.text-wrapper-6', // Notificaciones
            description: 'En "Notificaciones", podrás ver alertas sobre tu cuenta y actividad.',
            position: 'top',
        },
        {
            element: '.text-wrapper-7', // Mis Archivos
            description: 'En "Mis Archivos", verás todos los documentos que has subido y organizado.',
            position: 'top',
        },
        {
            element: '.text-wrapper-8', // Ayuda
            description: 'En "Ayuda", podrás acceder a recursos de soporte y preguntas frecuentes.',
            position: 'top',
        },
    ];

    let currentStep = 0;

    function showStep(step) {
        const element = document.querySelector(step.element);
        if (!element) return;

        element.style.position = 'relative';
        element.style.zIndex = '9999';
        element.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.8)';

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('tutorial-description');
        descriptionElement.innerText = step.description;
        document.body.appendChild(descriptionElement);

        const rect = element.getBoundingClientRect();
        descriptionElement.style.left = `${rect.left + window.scrollX}px`;
        descriptionElement.style.top = `${rect.bottom + window.scrollY + 10}px`;

        // Crear el contenedor para los botones
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'tutorial-button-container';  // Le damos una ID para los estilos
        document.body.appendChild(buttonContainer);

        // Botón "Atrás"
        const backButton = document.createElement('button');
        backButton.id = 'tutorial-back-button';
        backButton.innerText = 'Atrás';
        backButton.style.display = currentStep > 0 ? 'inline-block' : 'none';
        buttonContainer.appendChild(backButton);

        // Botón "Siguiente"
        const nextButton = document.createElement('button');
        nextButton.id = 'tutorial-next-button';
        nextButton.innerText = 'Siguiente';
        buttonContainer.appendChild(nextButton);

        // Botón "Salir"
        const exitButton = document.createElement('button');
        exitButton.id = 'tutorial-exit-button';
        exitButton.innerText = 'Salir';
        buttonContainer.appendChild(exitButton);

        // Evento del botón "Siguiente"
        nextButton.addEventListener('click', function () {
            clearTutorialStep();
            currentStep++;
            if (currentStep < tutorialSteps.length) {
                showStep(tutorialSteps[currentStep]);
            } else {
                endTutorial();
            }
        });

        // Evento del botón "Atrás"
        backButton.addEventListener('click', function () {
            if (currentStep > 0) {
                clearTutorialStep();
                currentStep--;
                showStep(tutorialSteps[currentStep]);
            }
        });

        // Evento del botón "Salir"
        exitButton.addEventListener('click', endTutorial);
    }

    // Función para limpiar el paso del tutorial actual
    function clearTutorialStep() {
        document.querySelectorAll('.tutorial-description, #tutorial-next-button, #tutorial-back-button, #tutorial-exit-button')
            .forEach(el => el.remove());
        document.querySelectorAll('[style]').forEach(el => {
            el.style.boxShadow = '';
            el.style.zIndex = '';
        });
    }

    // Función para finalizar el tutorial
    function endTutorial() {
        clearTutorialStep();
        tutorialStartButton.style.display = 'block';
        alert('Tutorial finalizado');
    }

    // Función para reiniciar el tutorial
    function restartTutorial() {
        currentStep = 0;  // Reiniciar el tutorial desde el primer paso
        clearTutorialStep();
        showStep(tutorialSteps[currentStep]);
    }

    // Evento para iniciar el tutorial al hacer clic en el botón
    tutorialStartButton.addEventListener('click', function () {
        tutorialStartButton.style.display = 'none';
        showStep(tutorialSteps[currentStep]);
    });

     // Evento para reiniciar el tutorial al hacer clic en la imagen una vez terminado
     tutorialStartButton.addEventListener('click', restartTutorial);
});