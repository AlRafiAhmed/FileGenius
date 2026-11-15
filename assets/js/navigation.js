/**
 * FileGenius - Header & Mobile Navigation Manager
 */

(function () {
    function initNavigation() {
        const mobileNavBtn = document.getElementById('mobileNavBtn');
        const mobileNavDrawer = document.getElementById('mobileNavDrawer');

        // Toggle Mobile Navigation Drawer
        if (mobileNavBtn && mobileNavDrawer) {
            mobileNavBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = mobileNavDrawer.classList.contains('hidden');
                if (isHidden) {
                    mobileNavDrawer.classList.remove('hidden');
                    mobileNavBtn.setAttribute('aria-expanded', 'true');
                } else {
                    mobileNavDrawer.classList.add('hidden');
                    mobileNavBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Close mobile drawer on outside click
        document.addEventListener('click', (e) => {
            if (mobileNavDrawer && !mobileNavDrawer.contains(e.target) && (!mobileNavBtn || !mobileNavBtn.contains(e.target))) {
                mobileNavDrawer.classList.add('hidden');
                if (mobileNavBtn) mobileNavBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (mobileNavDrawer) {
                    mobileNavDrawer.classList.add('hidden');
                    if (mobileNavBtn) mobileNavBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
})();
