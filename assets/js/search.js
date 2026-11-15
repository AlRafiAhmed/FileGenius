/**
 * FileGenius - Real-time Tool Search and Category Filtering
 */

(function () {
    function initSearch() {
        const searchInputs = document.querySelectorAll('#toolSearchInput, #heroSearchInput');
        const toolCards = document.querySelectorAll('.tool-card');
        const sections = document.querySelectorAll('.tool-section');
        const categoryBtns = document.querySelectorAll('.category-filter-btn');
        const noResultsBox = document.getElementById('noResultsBox');

        let currentCategory = 'all';
        let currentSearchQuery = '';

        function filterTools() {
            let visibleCount = 0;
            const query = currentSearchQuery.trim().toLowerCase();

            sections.forEach(section => {
                const sectionCategory = section.getAttribute('data-category') || '';
                const categoryMatches = (currentCategory === 'all' || currentCategory === sectionCategory);

                let sectionVisibleCards = 0;
                const cardsInSection = section.querySelectorAll('.tool-card');

                cardsInSection.forEach(card => {
                    const text = (card.textContent || '').toLowerCase();
                    const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
                    const title = (card.querySelector('h3')?.textContent || '').toLowerCase();

                    const searchMatches = !query || text.includes(query) || keywords.includes(query) || title.includes(query);

                    if (categoryMatches && searchMatches) {
                        card.classList.remove('hidden');
                        sectionVisibleCards++;
                        visibleCount++;
                    } else {
                        card.classList.add('hidden');
                    }
                });

                // Toggle visibility of the section itself
                if (sectionVisibleCards > 0) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });

            // Toggle No Results Box
            if (noResultsBox) {
                if (visibleCount === 0) {
                    noResultsBox.classList.remove('hidden');
                } else {
                    noResultsBox.classList.add('hidden');
                }
            }
        }

        // Input search handlers
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                currentSearchQuery = e.target.value;
                // Sync values across inputs
                searchInputs.forEach(other => {
                    if (other !== e.target) other.value = currentSearchQuery;
                });
                filterTools();
            });
        });

        // Category filter buttons
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                currentCategory = btn.getAttribute('data-filter') || 'all';

                // Update active styling
                categoryBtns.forEach(b => {
                    b.classList.remove('bg-indigo-600', 'text-white', 'shadow-xs');
                    b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-200', 'dark:border-slate-700');
                });
                btn.classList.add('bg-indigo-600', 'text-white', 'shadow-xs');
                btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-200', 'dark:border-slate-700');

                filterTools();
            });
        });

        // Global hotkey: '/' to focus search
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
                e.preventDefault();
                const primaryInput = document.getElementById('toolSearchInput') || document.getElementById('heroSearchInput');
                if (primaryInput) {
                    primaryInput.focus();
                    primaryInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
})();

