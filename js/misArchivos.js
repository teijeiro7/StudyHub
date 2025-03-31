document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', () => {
        const viewType = button.getAttribute('data-view');
        const filesContainer = document.querySelector('.files-container');

        // Alterna las clases de vista
        if (viewType === 'grid') {
            filesContainer.classList.remove('list-view');
            filesContainer.classList.add('grid-view');
            document.querySelector('.view-btn.active').classList.remove('active');
            button.classList.add('active');
        } else {
            filesContainer.classList.remove('grid-view');
            filesContainer.classList.add('list-view');
            document.querySelector('.view-btn.active').classList.remove('active');
            button.classList.add('active');
        }
    });
});


document.getElementById('sort-by').addEventListener('change', sortFiles);
document.getElementById('filter-type').addEventListener('change', filterFiles);

function sortFiles() {
    const sortBy = document.getElementById('sort-by').value;
    const files = Array.from(document.querySelectorAll('.file-card'));

    // Ordenar por fecha o nombre
    if (sortBy === 'date-desc') {
        files.sort((a, b) => new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date')));
    } else if (sortBy === 'date-asc') {
        files.sort((a, b) => new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date')));
    } else if (sortBy === 'name-asc') {
        files.sort((a, b) => a.querySelector('.file-name').textContent.localeCompare(b.querySelector('.file-name').textContent));
    } else if (sortBy === 'name-desc') {
        files.sort((a, b) => b.querySelector('.file-name').textContent.localeCompare(a.querySelector('.file-name').textContent));
    }

    // Añadir los archivos ordenados de vuelta
    const container = document.querySelector('.files-container');
    files.forEach(file => container.appendChild(file));
}


function filterFiles() {
    const filterType = document.getElementById('filter-type').value;
    const files = document.querySelectorAll('.file-card');

    files.forEach(file => {
        const fileType = file.getAttribute('data-type');
        if (filterType === 'all' || fileType === filterType) {
            file.style.display = 'block';
        } else {
            file.style.display = 'none';
        }
    });
}
