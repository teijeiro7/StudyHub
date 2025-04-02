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



document.addEventListener("DOMContentLoaded", function () {
    const currentUser = "hola123"; // Aquí deberías obtener el usuario actual dinámicamente
    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(button => {
        const owner = button.getAttribute("data-owner");

        if (owner !== currentUser) {
            button.disabled = true; // Desactiva el botón
            button.style.opacity = "0.5"; // Cambia la apariencia
            button.style.cursor = "not-allowed"; // Indica que no se puede usar

            // Muestra una alerta si intentan hacer clic
            button.addEventListener("click", function (event) {
                event.preventDefault();
                alert("No tienes permiso para editar este archivo.");
            });
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".access-btn");

    buttons.forEach(btn => {
        const menu = btn.nextElementSibling; // Encuentra el menú asociado al botón
        const options = menu.querySelectorAll("li");

        // Mostrar/ocultar el menú al hacer clic en el botón
        btn.addEventListener("click", function (event) {
            event.stopPropagation(); // Evita que el evento se propague y cierre el menú inmediatamente
            // Cierra otros menús abiertos antes de abrir este
            document.querySelectorAll(".access-menu").forEach(m => {
                if (m !== menu) {
                    m.style.display = "none";
                }
            });
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        });

        // Seleccionar una opción dentro del menú
        options.forEach(option => {
            option.addEventListener("click", function () {
                const iconClass = this.querySelector("i").className;
                btn.innerHTML = `<i class="${iconClass}"></i> ${this.textContent}`;
                menu.style.display = "none"; // Ocultar menú
            });
        });
    });

    // Cerrar el menú si se hace clic fuera
    document.addEventListener("click", function (e) {
        document.querySelectorAll(".access-menu").forEach(menu => {
            if (!menu.contains(e.target) && !menu.previousElementSibling.contains(e.target)) {
                menu.style.display = "none";
            }
        });
    });
});


