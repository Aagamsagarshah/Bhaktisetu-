// Optional: Can add interactive JS features like modal or slider
// Example: Click gallery image to open bigger view
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        alert(item.querySelector('h3')?.innerText + "\nMore info coming soon!");
    });
});
