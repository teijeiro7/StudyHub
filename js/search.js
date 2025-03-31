document.addEventListener("DOMContentLoaded", function () {
    let element = document.querySelector(".overlap-2");
    element.style.backgroundColor = "#36659e";
});


function filterByCategory() {
    const selectedCategory = document.getElementById('category').value;
    const documents = document.querySelectorAll('.document-card');

    documents.forEach(doc => {
        const docCategory = doc.getAttribute('data-category');

        if (selectedCategory === "all" || docCategory === selectedCategory) {
            doc.style.display = 'flex';
        } else {
            doc.style.display = 'none';
        }
    });
}




// Manejar la entrada de búsqueda
function handleSearchInput() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    // Si el campo está vacío, mostrar todos los documentos
    if (searchInput.length > 0) {
        autocompleteSearch(searchInput);
        filterDocuments(searchInput);  // Filtra los documentos a medida que escribes
    } else {
        filterDocuments();  // Muestra todos los documentos si no hay texto
    }
}

// Autocompletar el campo de búsqueda con el título del documento más relevante
function autocompleteSearch(searchText) {
    const documents = document.querySelectorAll('.document-card');
    let bestMatch = '';

    documents.forEach(doc => {
        const docTitle = doc.querySelector('.doc-title').textContent.toLowerCase();
        
        // Encontrar el primer título de documento que coincida
        if (docTitle.includes(searchText) && docTitle.indexOf(searchText) < docTitle.indexOf(bestMatch)) {
            bestMatch = docTitle;
        }
    });

    // Si encontramos una coincidencia, actualizar el valor del campo de búsqueda
    if (bestMatch) {
        document.getElementById('search-input').value = bestMatch;
    }
}

// Filtrar los documentos basados en la entrada de búsqueda
function filterDocuments(searchText = '') {
    const documents = document.querySelectorAll('.document-card');
    
    documents.forEach(doc => {
        const docTitle = doc.querySelector('.doc-title').textContent.toLowerCase();

        if (docTitle.includes(searchText)) {
            doc.style.display = 'flex'; // Muestra el documento si coincide
        } else {
            doc.style.display = 'none'; // Oculta el documento si no coincide
        }
    });
}

// Agregar el evento al campo de búsqueda para capturar las entradas
document.getElementById('search-input').addEventListener('input', handleSearchInput);

