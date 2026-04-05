const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
let scrollAccumulator = 0;
let snapTimeout;

function updateCardVisibility() {
    //  use the negative scrollAccumulator because thats whats applied to the carousel
    const currentRotation = -scrollAccumulator;

    items.forEach((item, index) => {
        // 60 is the angle between each 6 cards
        const itemInitialAngle = index * 60;
        
        // Calculate where this specific card is relative to the front (0 degrees
        let relativeAngle = (itemInitialAngle + currentRotation) % 360;
        
        // Normalize angle to be between 0 and 360
        if (relativeAngle < 0) relativeAngle += 360;

        // If the card is between 90 and 270 degrees, it's in the bacck
        if (relativeAngle > 90 && relativeAngle < 270) {
            item.classList.add('is-back');
        } else {
            item.classList.remove('is-back');
        }
    });
}

// Trackpad / Wheel Logic
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaX || e.deltaY;
    scrollAccumulator += delta * 0.2;
    
    carousel.style.transition = 'transform 0.1s linear';
    carousel.style.transform = `rotateY(${-scrollAccumulator}deg)`;

    updateCardVisibility(); // Update text visibility while spinning

    clearTimeout(snapTimeout);
    snapTimeout = setTimeout(snapToCard, 150);
}, { passive: false });

function snapToCard() {
    const step = 60;
    const rotationValue = Math.round(-scrollAccumulator / step) * step;
    scrollAccumulator = -rotationValue;

    carousel.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    carousel.style.transform = `rotateY(${rotationValue}deg)`;
    
    updateCardVisibility(); // Update text visibility after snapping
}

// Initial check on load
updateCardVisibility();
