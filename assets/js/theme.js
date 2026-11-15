/**
 * FileGenius - Theme Manager
 * Robust, Zero-FOUC Dark / Light Theme System with LocalStorage persistence
 * and OS preference detection.
 */

// Immediate configuration for Tailwind CDN
if (window.tailwind) {
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    darkbg: '#0f172a',
                    darkcard: '#1e293b',
                    darkborder: '#334155'
                }
            }
        }
    };
}

(function () {
    const STORAGE_KEY = 'filegenius_theme';

    function getPreferredTheme() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'dark' || saved === 'light') return saved;
        } catch (e) {
            // LocalStorage inaccessible
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        updateThemeUI(theme);
    }

    function updateThemeUI(theme) {
        const toggleButtons = document.querySelectorAll('[data-action="toggle-theme"], #quickThemeToggleBtn, #themeToggleBtn, #menuThemeToggleBtn');
        toggleButtons.forEach(btn => {
            const label = btn.querySelector('.theme-label');
            if (label) {
                label.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            }
        });
    }

    // Apply immediately to head/document before render
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    window.ThemeManager = {
        getTheme: function () {
            return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        },
        setTheme: function (theme) {
            try {
                localStorage.setItem(STORAGE_KEY, theme);
            } catch (e) {}
            applyTheme(theme);
        },
        toggleTheme: function () {
            const next = this.getTheme() === 'dark' ? 'light' : 'dark';
            this.setTheme(next);
            return next;
        }
    };

    // DOM Ready listener for button hooks & OS preference changes
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(getPreferredTheme());

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action="toggle-theme"], #quickThemeToggleBtn, #themeToggleBtn, #menuThemeToggleBtn');
            if (btn) {
                e.preventDefault();
                window.ThemeManager.toggleTheme();
            }
        });

        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                try {
                    if (!localStorage.getItem(STORAGE_KEY)) {
                        applyTheme(e.matches ? 'dark' : 'light');
                    }
                } catch (err) {}
            });
        }
    });
})();

