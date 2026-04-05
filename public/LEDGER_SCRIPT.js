const carousel = document.getElementById('carousel');
    let scrollAccumulator = 0;
    let snapTimeout;

    // Trackpad Swipe / Wheel Logic
    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaX || e.deltaY;
        scrollAccumulator += delta * 0.2;
        
        carousel.style.transition = 'transform 0.1s linear';
        carousel.style.transform = `rotateY(${-scrollAccumulator}deg)`;

        clearTimeout(snapTimeout);
        snapTimeout = setTimeout(snapToCard, 150);
    }, { passive: false });

    function snapToCard() {
        const step = 60;
        const rotationValue = Math.round(-scrollAccumulator / step) * step;
        scrollAccumulator = -rotationValue;

        carousel.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        carousel.style.transform = `rotateY(${rotationValue}deg)`;
    }