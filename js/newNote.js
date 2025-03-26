document.addEventListener('DOMContentLoaded', function () {
    // Formatting buttons
    const boldBtn = document.getElementById('bold-btn');
    const underlineBtn = document.getElementById('underline-btn');
    const italicBtn = document.getElementById('italic-btn');
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    const noteArea = document.querySelector('.note-area');

    // Dropdowns
    const fontDropdownBtn = document.getElementById('font-dropdown-btn');
    const fontDropdown = document.getElementById('font-dropdown');
    const currentFont = document.getElementById('current-font');
    const sizeDropdownBtn = document.getElementById('size-dropdown-btn');
    const sizeDropdown = document.getElementById('size-dropdown');
    const currentSize = document.getElementById('current-size');

    // Tags
    const tags = document.querySelectorAll('.tag');

    // Toggle active state for formatting buttons
    boldBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        document.execCommand('bold', false, null);
    });

    underlineBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        document.execCommand('underline', false, null);
    });

    italicBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        document.execCommand('italic', false, null);
    });

    // Undo and Redo buttons
    undoBtn.addEventListener('click', function () {
        document.execCommand('undo', false, null);
    });

    redoBtn.addEventListener('click', function () {
        document.execCommand('redo', false, null);
    });

    // Font dropdown functionality
    fontDropdownBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        fontDropdown.classList.toggle('show');
        if (sizeDropdown.classList.contains('show')) {
            sizeDropdown.classList.remove('show');
        }
    });

    // Font size dropdown functionality
    sizeDropdownBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        sizeDropdown.classList.toggle('show');
        if (fontDropdown.classList.contains('show')) {
            fontDropdown.classList.remove('show');
        }
    });

    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function () {
        fontDropdown.classList.remove('show');
        sizeDropdown.classList.remove('show');
    });

    // Handle font family selection
    const fontItems = document.querySelectorAll('#font-dropdown .dropdown-item');
    fontItems.forEach(item => {
        item.addEventListener('click', function () {
            const font = this.getAttribute('data-font');

            // Update displayed font
            currentFont.textContent = font;

            // Apply font to selected text
            document.execCommand('fontName', false, font);

            // Update selected item
            fontItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Handle font size selection
    const sizeItems = document.querySelectorAll('#size-dropdown .dropdown-item');
    sizeItems.forEach(item => {
        item.addEventListener('click', function () {
            const size = this.getAttribute('data-size');

            // Update displayed size
            currentSize.textContent = size;

            // Apply size to selected text
            document.execCommand('fontSize', false, size);

            // Update selected item
            sizeItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Tag selection
    tags.forEach(tag => {
        tag.addEventListener('click', function () {
            tags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Save button functionality
    const saveBtn = document.querySelector('.save-button');
    saveBtn.addEventListener('click', function () {
        const originalText = this.textContent;
        this.textContent = 'Guardando...';
        this.disabled = true;

        // Simulate saving
        setTimeout(() => {
            this.textContent = '¡Guardado!';
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 800);
        }, 800);
    });

    // Make note area editable
    noteArea.focus();
});