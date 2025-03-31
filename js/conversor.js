document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.getElementById('drop_zone');
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('file-info');
    const selectedFilename = document.getElementById('selected-filename');
    const convertBtn = document.getElementById('convert-btn');
    const formatSelect = document.getElementById('format-select');
    const conversionMessage = document.getElementById('conversion-message');

    dropZone.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function (e) {
        handleFiles(e.target.files);
    });

    dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropZone.classList.add('highlight');
    });

    dropZone.addEventListener('dragleave', function () {
        dropZone.classList.remove('highlight');
    });

    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('highlight');
        handleFiles(e.dataTransfer.files);
    });

    convertBtn.addEventListener('click', function () {
        convertFile();
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            selectedFilename.textContent = file.name;
            fileInfo.style.display = 'block';
            dropZone.innerHTML = `
                <p>Archivo seleccionado:</p>
                <p class="selected-file">${file.name}</p>
            `;
        }
    }

    function convertFile() {
        const format = formatSelect.value;
        const fileName = selectedFilename.textContent;
        const now = new Date();
        const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-name">Nombre archivo: ${fileName}</span>
            <span class="file-date">Día conversión: ${dateStr}</span>
            <span class="file-conversion">Cambio de extensión: ${format.toUpperCase()}</span>
        `;

        document.querySelector('.subtitle').after(fileItem);

        // Mostrar mensaje de conversión exitosa
        conversionMessage.style.display = 'block';

        setTimeout(() => {
            conversionMessage.style.display = 'none';
        }, 3000);

        fileInfo.style.display = 'none';
        dropZone.innerHTML = `<p>Selecciona un archivo o<br />suéltalo aquí</p>`;
    }
});
