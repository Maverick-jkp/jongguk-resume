/*
 * Progressive enhancement — fade-in + stagger.
 * Page is fully functional without JS.
 */

(function () {
    'use strict';

    // Elements to fade in on scroll
    var reveals = document.querySelectorAll(
        '.origin, .story, .work, .contact, .role-card, .callout, .sidebar-card, .origin-quote, .origin-text'
    );

    // Stagger groups (children animate sequentially)
    var staggers = document.querySelectorAll('.js-stagger');

    // Apply reveal class
    reveals.forEach(function (el) { el.classList.add('js-reveal'); });

    if ('IntersectionObserver' in window) {
        var opts = { threshold: 0.08, rootMargin: '0px 0px -30px 0px' };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, opts);

        reveals.forEach(function (el) { observer.observe(el); });
        staggers.forEach(function (el) { observer.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('is-visible'); });
        staggers.forEach(function (el) { el.classList.add('is-visible'); });
    }
})();
