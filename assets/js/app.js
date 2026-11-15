/**
 * FileGenius - Core Application Orchestration
 * Initializes global features, tool cards, and keyboard shortcuts.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Check offline readiness
    window.addEventListener('online', () => console.log('FileGenius is running locally & online.'));
    window.addEventListener('offline', () => console.log('FileGenius runs 100% offline in browser.'));
});

