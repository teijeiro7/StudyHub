
document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.getElementById('drop_zone');
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('file-info');
    const selectedFilename = document.getElementById('selected-filename');
    const convertBtn = document.getElementById('convert-btn');

    // Permite hacer clic en la zona para seleccionar un archivo
    dropZone.addEventListener('click', function () {
        fileInput.click();
    });

    // Maneja la selección de archivos desde el explorador
    fileInput.addEventListener('change', function (e) {
        handleFiles(e.target.files);
    });

    // Evita que los eventos de arrastrar abran el archivo en una nueva pestaña
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Resalta la zona de soltar cuando se arrastra un archivo sobre ella
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    // Maneja el evento de soltar archivos
    dropZone.addEventListener('drop', handleDrop, false);

    // Maneja el botón de conversión
    convertBtn.addEventListener('click', convertFile);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropZone.classList.add('highlight');
    }

    function unhighlight() {
        dropZone.classList.remove('highlight');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            selectedFilename.textContent = file.name;
            fileInfo.style.display = 'block';

            // Cambia el aspecto de la zona de soltar
            dropZone.innerHTML = `
    <input type="file" id="fileInput" hidden>
        <p>Archivo seleccionado</p>
        <p class="selected-file">${file.name}</p>
        `;
        }
    }

    function convertFile() {
        // Simular una conversión agregando un nuevo elemento a la lista
        const now = new Date();
        const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        const fileName = selectedFilename.textContent;

        // Crear nuevo elemento para la lista de archivos convertidos
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
        <span class="file-name">Nombre archivo: ${fileName}</span>
        <span class="file-date">Día conversión: ${dateStr}</span>
        <span class="file-conversion">Cambio de extensión: Word a PDF</span>
        `;

        // Insertar el nuevo elemento al principio de la lista
        const subtitle = document.querySelector('.subtitle');
        subtitle.parentNode.insertBefore(fileItem, subtitle.nextSibling);

        // Restablecer la zona de soltar
        dropZone.innerHTML = `
        <input type="file" id="fileInput" hidden>
            <p>Selecciona un archivo o<br />suéltalo aquí</p>
            `;

        // Ocultar información del archivo
        fileInfo.style.display = 'none';

        // Actualizar los eventos después de cambiar el DOM
        document.getElementById('fileInput').addEventListener('change', function (e) {
            handleFiles(e.target.files);
        });
    }
});