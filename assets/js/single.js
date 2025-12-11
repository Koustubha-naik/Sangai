// single.js
// =====================================
// Logic ONLY for single article pages
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------
       TOC COLLAPSE / EXPAND
    --------------------------------*/
    const toc = document.querySelector(".toc-sidebar");
    const tocTitle = document.querySelector(".toc-title");

    if (toc && tocTitle) {
        tocTitle.addEventListener("click", () => {
            toc.classList.toggle("closed");
        });
    }

    /* -------------------------------
       TOC SMOOTH SCROLL
    --------------------------------*/
    document.querySelectorAll(".toc-content a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(href);
            if (!target) return;

            window.scrollTo({
                top: target.offsetTop - 40,
                behavior: "smooth"
            });
        });
    });

    /* -------------------------------
       ACTIVE HEADING HIGHLIGHT
    --------------------------------*/
    const headings = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5")
    ).filter(h => h.id);

    const tocLinks = document.querySelectorAll(".toc-content a");

    const activateLink = (id) => {
        tocLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`
            );
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    }, {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0
    });

    headings.forEach(h => observer.observe(h));

    /* -------------------------------
       VIDEO FULLSCREEN ORIENTATION
    --------------------------------*/
    const videos = document.querySelectorAll(
        ".single-content video, .single-content iframe"
    );

    videos.forEach(video => {
        video.addEventListener("fullscreenchange", () => {
            if (!document.fullscreenElement) {
                if (screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
                return;
            }

            const w = video.videoWidth || 16;
            const h = video.videoHeight || 9;
            const ratio = w / h;

            if (ratio > 1.2 && screen.orientation.lock) {
                screen.orientation.lock("landscape").catch(() => {});
            }
        });
    });

});
