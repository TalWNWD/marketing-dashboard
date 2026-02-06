/* =====================================================
   Windward Marketing Dashboard - Navigation Module
   Tab switching and theme toggle
   ===================================================== */

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeThemeToggle();
    initializeMobileNav();
    initializeTooltips();
});

// Tab Navigation (Desktop)
function initializeNavigation() {
    const navPills = document.querySelectorAll('.nav-pill');

    navPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            switchSection(targetSection);

            // Update active state for desktop nav
            navPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            // Also update mobile nav
            updateMobileNav(targetSection);
        });
    });
}

// Mobile Bottom Navigation
function initializeMobileNav() {
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            switchSection(targetSection);

            // Update active state for mobile nav
            mobileNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Also update desktop nav
            updateDesktopNav(targetSection);
        });
    });
}

// Switch to a section
function switchSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Trigger animations
        if (typeof animateSection === 'function') {
            setTimeout(() => {
                animateSection(sectionId);
            }, 100);
        }

        // Re-render charts for this section if needed
        if (typeof renderAllCharts === 'function') {
            setTimeout(() => {
                renderAllCharts();
            }, 150);
        }
    }
}

// Update desktop nav active state
function updateDesktopNav(sectionId) {
    const navPills = document.querySelectorAll('.nav-pill');
    navPills.forEach(pill => {
        if (pill.dataset.section === sectionId) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
}

// Update mobile nav active state
function updateMobileNav(sectionId) {
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    // Load saved theme preference
    const savedTheme = localStorage.getItem('windward-dashboard-theme') || 'light';
    setTheme(savedTheme);

    // Toggle button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.dataset.theme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('windward-dashboard-theme', newTheme);
        });
    }
}

// Set theme
function setTheme(theme) {
    document.documentElement.dataset.theme = theme;

    // Update toggle button icon
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        }
    }

    // Update charts for new theme
    if (typeof updateChartsTheme === 'function') {
        setTimeout(() => {
            updateChartsTheme();
        }, 100);
    }
}

// Initialize tooltips (KPI card tooltips)
function initializeTooltips() {
    const tooltipCards = document.querySelectorAll('[data-tooltip="true"]');

    tooltipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.kpi-tooltip');
            if (tooltip) {
                // Position tooltip
                const cardRect = this.getBoundingClientRect();
                tooltip.style.display = 'block';
            }
        });

        card.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.kpi-tooltip');
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Arrow keys for section navigation
    if (e.altKey) {
        const sections = ['revenue', 'executive', 'funnel', 'business', 'channels', 'paid', 'actions', 'strategy'];
        const activeSection = document.querySelector('.dashboard-section.active');
        const currentIndex = sections.indexOf(activeSection?.id);

        if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            switchSection(sections[currentIndex + 1]);
            updateDesktopNav(sections[currentIndex + 1]);
            updateMobileNav(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            switchSection(sections[currentIndex - 1]);
            updateDesktopNav(sections[currentIndex - 1]);
            updateMobileNav(sections[currentIndex - 1]);
        }
    }

    // 'd' key to toggle dark mode
    if (e.key === 'd' && e.ctrlKey) {
        e.preventDefault();
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('windward-dashboard-theme', newTheme);
    }
});

// Update last updated date from data
function updateLastUpdatedDate() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement && typeof dashboardData !== 'undefined') {
        const date = new Date(dashboardData.metadata.lastUpdated);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        lastUpdatedElement.textContent = date.toLocaleDateString('en-US', options);
    }
}

// Call on load
document.addEventListener('DOMContentLoaded', updateLastUpdatedDate);

// Export functions for external use
window.switchSection = switchSection;
window.setTheme = setTheme;
