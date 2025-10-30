window.addEventListener('DOMContentLoaded', () => {
    function attachPreview(input) {
        input.addEventListener('change', () => {
            const row = input.closest('.dynamic-dogimage_set') || input.closest('tr');
            if (!row) return;
            const previewCell = row.querySelector('.field-image_thumbnail');
            if (!previewCell) return;

            let previewImg = previewCell.querySelector('img');
            if (!previewImg) {
                previewCell.innerHTML = '';
                previewImg = document.createElement('img');
                previewImg.style.height = '80px';
                previewImg.classList.add('img_zoom-thumbnail');
                previewCell.appendChild(previewImg);
            }

            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImg.src = e.target.result;
                    previewImg.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                previewImg.style.display = 'none';
                previewImg.src = '';
            }
        });
    }


    document.querySelectorAll('.field-image input[type="file"]').forEach(attachPreview);


    document.addEventListener('formset:added', function(event) {
        const newInline = event.target;
        newInline.querySelectorAll('.field-image input[type="file"]').forEach(attachPreview);
    });
});
