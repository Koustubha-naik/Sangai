(function () {

    const slides = document.querySelectorAll('.featured-slide');
    const dots   = document.querySelectorAll('.featured-dots .dot');
    const arrows = document.querySelectorAll('.featured-nav');
    const shell  = document.querySelector('.featured-card-shell');

    if (!slides.length) return;

    let current = 0;

    function showSlide(index) {
        const total = slides.length;
        current = (index + total) % total;

        slides.forEach((slide, i) =>
            slide.classList.toggle("is-active", i === current)
        );

        dots.forEach((dot, i) =>
            dot.classList.toggle("active", i === current)
        );
    }

    window.featuredPrev = () => showSlide(current - 1);
    window.featuredNext = () => showSlide(current + 1);

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const idx = parseInt(dot.dataset.index, 10);
            showSlide(idx);
            stopAutoSlide();
        });
    });

    let startX = 0;

    shell.addEventListener("touchstart", e => {
        startX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });

    shell.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].screenX;
        let diff = endX - startX;

        if (Math.abs(diff) > 40) {
            if (diff > 0) showSlide(current - 1); 
            else showSlide(current + 1);
        }
    });

    let autoTimer = null;
    const AUTO_DELAY = 4000;

    function startAutoSlide() {
        if (autoTimer) return;
        autoTimer = setInterval(() => {
            showSlide(current + 1);
        }, AUTO_DELAY);
    }

    function stopAutoSlide() {
        clearInterval(autoTimer);
        autoTimer = null;
    }

    shell.addEventListener("mouseenter", stopAutoSlide);
    shell.addEventListener("mouseleave", startAutoSlide);

    arrows.forEach(btn =>
        btn.addEventListener("click", stopAutoSlide)
    );

    showSlide(0);
    startAutoSlide();

})();
