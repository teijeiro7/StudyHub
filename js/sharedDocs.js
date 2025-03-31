// Ordenar archivos
document.getElementById('sort-by').addEventListener('change', sortFiles);
document.getElementById('filter-type').addEventListener('change', filterFiles);

function sortFiles() {
    const sortBy = document.getElementById('sort-by').value;
    const documents = Array.from(document.querySelectorAll('.document-card'));

    // Ordenar por fecha o nombre
    if (sortBy === 'date-desc') {
        documents.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return dateB - dateA; // Fecha más reciente primero
        });
    } else if (sortBy === 'date-asc') {
        documents.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return dateA - dateB; // Fecha más antigua primero
        });
    } else if (sortBy === 'name-asc') {
        documents.sort((a, b) => a.querySelector('.doc-title').textContent.localeCompare(b.querySelector('.doc-title').textContent));
    } else if (sortBy === 'name-desc') {
        documents.sort((a, b) => b.querySelector('.doc-title').textContent.localeCompare(a.querySelector('.doc-title').textContent));
    }

    // Añadir los documentos ordenados de vuelta
    const container = document.querySelector('.documents-container');
    documents.forEach(doc => container.appendChild(doc));
}

// Filtrar archivos por tipo
function filterFiles() {
    const filterType = document.getElementById('filter-type').value;
    const documents = document.querySelectorAll('.document-card');

    documents.forEach(doc => {
        const fileType = doc.getAttribute('data-type');
        if (filterType === 'all' || fileType === filterType) {
            doc.style.display = 'flex'; // Muestra el documento
        } else {
            doc.style.display = 'none'; // Oculta el documento sin dejar espacio
        }
    });
}


