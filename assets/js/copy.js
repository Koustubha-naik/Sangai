// copy.js
// ======================================
// Universal code-block copy button logic
// ======================================

document.addEventListener("click", (e) => {
    const button = e.target.closest(".copy-code-btn");
    if (!button) return;

    const wrapper = button.closest(".code-block-wrapper");
    if (!wrapper) return;

    const code = wrapper.querySelector("pre code");
    if (!code) return;

    const text = code.innerText;
    const label = button.querySelector(".copy-text");

    // ✅ Modern clipboard (HTTPS)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            feedback();
        }).catch(() => {
            fallbackCopy(text);
        });
    } 
    // ✅ Fallback (HTTP / file://)
    else {
        fallbackCopy(text);
    }

    function fallbackCopy(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand("copy");
            feedback();
        } catch (err) {
            console.error("Copy failed", err);
        }

        document.body.removeChild(textarea);
    }

    function feedback() {
        if (!label) return;
        const original = label.textContent;
        label.textContent = "Copied!";
        button.classList.add("copied");

        setTimeout(() => {
            label.textContent = original;
            button.classList.remove("copied");
        }, 1200);
    }
});
