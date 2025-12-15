// copy.js
// ======================================
// Universal code-block copy button logic
// Hardcore version: strips line numbers
// ======================================

document.addEventListener("click", (e) => {
    const button = e.target.closest(".copy-code-btn");
    if (!button) return;

    const wrapper = button.closest(".code-block-wrapper");
    if (!wrapper) return;

    const code = wrapper.querySelector("pre code");
    if (!code) return;

    // --------------------------------------
    // HARDCORE COPY (remove line numbers)
    // --------------------------------------
    const text = code.innerText.replace(/^\s*\d+\s+/gm, "");

    const label = button.querySelector(".copy-text");

    // ✅ Modern Clipboard API (HTTPS)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(feedback)
            .catch(() => fallbackCopy(text));
    } 
    // ✅ Fallback (HTTP / file://)
    else {
        fallbackCopy(text);
    }

    function fallbackCopy(content) {
        const textarea = document.createElement("textarea");
        textarea.value = content;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";

        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand("copy");
            feedback();
        } catch (err) {
            console.error("Copy failed:", err);
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
