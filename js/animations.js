/* =====================================================
   Windward Marketing Dashboard - Animations Module
   GSAP-powered animations
   ===================================================== */

// Animate counter from 0 to target value
function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const decimals = target % 1 !== 0 ? 2 : 0;

    gsap.fromTo(element,
        { innerHTML: 0 },
        {
            duration: 2,
            innerHTML: target,
            snap: { innerHTML: decimals === 0 ? 1 : 0.01 },
            ease: 'power2.out',
            onUpdate: function() {
                const current = parseFloat(this.targets()[0].innerHTML);
                element.innerHTML = prefix + current.toFixed(decimals) + suffix;
            }
        }
    );
}

// Animate all counters in a section
function animateCountersInSection(section) {
    const counters = section.querySelectorAll('.counter');
    counters.forEach((counter, index) => {
        // Stagger the animations
        gsap.delayedCall(index * 0.1, () => {
            animateCounter(counter);
        });
    });
}

// Animate KPI cards entrance
function animateKPICards(section) {
    const cards = section.querySelectorAll('.kpi-card');

    gsap.fromTo(cards,
        {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }
    );
}

// Animate insight boxes
function animateInsightBoxes(section) {
    const boxes = section.querySelectorAll('.insight-box');

    gsap.fromTo(boxes,
        {
            opacity: 0,
            x: -20
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
            delay: 0.3,
            ease: 'power2.out'
        }
    );
}

// Animate chart cards
function animateChartCards(section) {
    const cards = section.querySelectorAll('.chart-card, .stats-card, .table-card');

    gsap.fromTo(cards,
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.2,
            ease: 'power2.out'
        }
    );
}

// Animate business cards
function animateBusinessCards(section) {
    const cards = section.querySelectorAll('.business-card');

    gsap.fromTo(cards,
        {
            opacity: 0,
            y: 30,
            rotateX: 10
        },
        {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
        }
    );
}

// Animate action cards
function animateActionCards(section) {
    const cards = section.querySelectorAll('.action-card');

    gsap.fromTo(cards,
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
        }
    );
}

// Animate summary cards
function animateSummaryCards(section) {
    const cards = section.querySelectorAll('.summary-card');

    gsap.fromTo(cards,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.2,
            delay: 0.3,
            ease: 'power2.out'
        }
    );
}

// Animate conversion bars
function animateConversionBars(section) {
    const fills = section.querySelectorAll('.conversion-fill');

    fills.forEach((fill, index) => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';

        gsap.to(fill, {
            width: targetWidth,
            duration: 1,
            delay: 0.5 + (index * 0.2),
            ease: 'power2.out'
        });
    });
}

// Main function to animate a section when it becomes active
function animateSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Reset any existing animations
    gsap.killTweensOf(section.querySelectorAll('*'));

    // Run appropriate animations based on section
    switch(sectionId) {
        case 'revenue':
            animateKPICards(section);
            animateCountersInSection(section);
            animateInsightBoxes(section);
            animateBusinessCards(section);
            animateChartCards(section);
            break;

        case 'executive':
            animateKPICards(section);
            animateCountersInSection(section);
            animateInsightBoxes(section);
            animateChartCards(section);
            break;

        case 'funnel':
            animateChartCards(section);
            animateConversionBars(section);
            animateInsightBoxes(section);
            break;

        case 'business':
            animateBusinessCards(section);
            animateChartCards(section);
            animateInsightBoxes(section);
            break;

        case 'channels':
            animateChartCards(section);
            animateInsightBoxes(section);
            break;

        case 'paid':
            animateChartCards(section);
            animateInsightBoxes(section);
            break;

        case 'actions':
            animateActionCards(section);
            animateSummaryCards(section);
            break;
    }
}

// Animate section header
function animateSectionHeader(section) {
    const header = section.querySelector('.section-header');
    if (header) {
        gsap.fromTo(header,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
    }
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Animate the initial active section
    const activeSection = document.querySelector('.dashboard-section.active');
    if (activeSection) {
        animateSection(activeSection.id);
    }
});

// Export for use in navigation module
window.animateSection = animateSection;
