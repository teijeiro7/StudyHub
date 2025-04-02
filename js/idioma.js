document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.getElementById("language");
    const saveButton = document.getElementById("save-btn");
    const textsToChange = document.querySelectorAll("[data-lang]");

    function loadLanguage(lang) {
        fetch(`../languages/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                textsToChange.forEach(el => {
                    const key = el.getAttribute("data-lang");
                    if (data[key]) {
                        el.innerHTML = data[key];
                    }
                });
                localStorage.setItem("language", lang);
            })
            .catch(error => console.error("Error loading language file:", error));
    }

    saveButton.addEventListener("click", function () {
        const selectedLang = languageSelect.value;
        loadLanguage(selectedLang);
    });

    // Cargar idioma guardado
    const savedLang = localStorage.getItem("language") || "es";
    languageSelect.value = savedLang;
    loadLanguage(savedLang);
});
