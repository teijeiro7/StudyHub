// Obtén el toggle y la cuadrícula de insignias
const badgeToggle = document.getElementById('badge-toggle');
const badgesGrid = document.getElementById('badges-grid');

// Añadir un evento para detectar el cambio en el toggle
badgeToggle.addEventListener('change', function() {
    // Si el toggle está marcado, mostramos las insignias, si no, las ocultamos
    if (badgeToggle.checked) {
        badgesGrid.style.display = 'grid';  // Mostrar las insignias
    } else {
        badgesGrid.style.display = 'none';  // Ocultar las insignias
    }
});
