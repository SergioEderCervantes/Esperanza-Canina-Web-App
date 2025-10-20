window.addEventListener('DOMContentLoaded', () => {
    const img_zoom = document.createElement('div');
    img_zoom.id = 'image-img_zoom';
    img_zoom.className = 'img_zoom-overlay';
    const img_zoomImg = document.createElement('img');
    img_zoomImg.className = 'img_zoom-content';
    img_zoom.appendChild(img_zoomImg);
    document.body.appendChild(img_zoom);

    img_zoom.addEventListener('click', () => {
        img_zoom.style.display = 'none';
    });

    document.body.addEventListener('click', (event) => {
        const thumbnail = event.target.closest('.img_zoom-thumbnail');

        if (thumbnail) {
            event.preventDefault(); 
            img_zoom.style.display = 'block';
            img_zoomImg.src = thumbnail.src;
        }
    });
});