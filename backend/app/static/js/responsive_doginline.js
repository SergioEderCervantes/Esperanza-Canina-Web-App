window.addEventListener('DOMContentLoaded', () => {
    const initCustomFileInput = (container) => {
        const originalInput = container.querySelector('input[type="file"]');
        if (!originalInput || container.dataset.initialized) return;
        container.dataset.initialized = 'true';

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-file-wrapper';

        const customBtn = document.createElement('label');
        customBtn.htmlFor = originalInput.id;
        customBtn.className = 'custom-file-button';

        const fileName = document.createElement('span');
        fileName.className = 'custom-file-name';
        fileName.textContent = 'Ningún archivo seleccionado';

        const currentlyLink = container.querySelector('a[href]');
        if (currentlyLink) {
            customBtn.textContent = 'Cambiar';
        } else {
            customBtn.textContent = 'Examinar';
        }

        wrapper.appendChild(customBtn);
        wrapper.appendChild(fileName);

        container.style.display = 'none';
        container.parentNode.insertBefore(wrapper, container);

        originalInput.addEventListener('change', () => {
            const file = originalInput.files[0];
            if (file) {
                fileName.textContent = file.name;
            } else {
                fileName.textContent = 'Ningún archivo seleccionado';
            }
        });
    };

    document.querySelectorAll('.custom-file-input-container').forEach(initCustomFileInput);

    document.addEventListener('formset:added', (event) => {
        const container = event.detail.row.querySelector('.custom-file-input-container');
        if (container) setTimeout(() => initCustomFileInput(container), 0);
    });
});
