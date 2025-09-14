(function () {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navMenu.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const form = document.getElementById('contactForm');
    if (form) {
        const status = document.getElementById('formStatus');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            if (!data.name || !data.email || !data.message) {
                status.textContent = 'Please fill in required fields.';
                status.classList.remove('visually-hidden');
                status.style.color = '#b40000';
                return;
            }
            // Placeholder: In production, send via backend or service.
            status.textContent = 'Message prepared (demo). Implement send logic.';
            status.classList.remove('visually-hidden');
            status.style.color = '#0e3fa9';
            form.reset();
            setTimeout(() => status.classList.add('visually-hidden'), 5000);
            console.log('Contact form submission (simulate):', data);
        });
    }

    const applyStoredTheme = () => {
        const stored = localStorage.getItem('ttadv-theme');
        if (stored === 'light' || stored === 'dark') {
            document.documentElement.setAttribute('data-theme', stored);
            return stored;
        }
        return null;
    };

    const systemPrefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const updateToggleLabel = (mode) => {
        const label = document.getElementById('themeToggleLabel');
        if (!label) return;
        label.textContent = mode === 'dark' ? 'Light' : 'Dark';
    };

    const initTheme = () => {
        const stored = applyStoredTheme();
        let active = stored;
        if (!active) {
            active = systemPrefersDark() ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', active);
        }
        updateToggleLabel(active);
    };

    const toggleTheme = () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ttadv-theme', next);
        updateToggleLabel(next);
    };

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
    });
})();