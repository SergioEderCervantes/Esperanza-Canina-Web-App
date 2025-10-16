window.addEventListener('DOMContentLoaded', () => {
    const setupImagePreview = (fileInput) => {
        if (fileInput.dataset.previewSetup) {
            return;
        }
        const row = fileInput.closest('tr');
        const previewCell = row.querySelector('.field-image_thumbnail');
        if (!previewCell) {
            return;
        }

        let previewImg = previewCell.querySelector('img');
        if (!previewImg) {
            previewCell.innerHTML = '';
            previewImg = document.createElement('img');
            previewImg.style.height = '80px';
            previewImg.style.display = 'none'; 
            previewCell.appendChild(previewImg);
        }

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImg.src = e.target.result;
                    previewImg.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
        fileInput.dataset.previewSetup = 'true';
    };

    document.querySelectorAll('.field-image input[type="file"]').forEach(setupImagePreview);
    document.addEventListener('formset:added', (event) => {
        const newRow = event.detail.row;
        const fileInput = newRow.querySelector('.field-image input[type="file"]');
        if (fileInput) {
            setupImagePreview(fileInput);
        }
    });
});
