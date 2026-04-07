/* ============================================
   RODRIGO SÁNCHEZ — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ── Nav ──────────────────────────────────
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');

    // Hamburger
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        // Close on link click
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Scroll: add/remove 'scrolled' class
    function handleNavScroll() {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run on load

    // ── Smooth scroll for # links ─────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (!href || href === '#') return;

            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Copy email contact card ──────────────
    var emailCopyCard = document.querySelector('.email-copy-card');
    if (emailCopyCard) {
        var emailCopyText = emailCopyCard.querySelector('.email-copy-text');
        var emailToCopy = emailCopyCard.getAttribute('data-copy-email');
        var originalText = emailCopyText ? emailCopyText.textContent : emailToCopy;

        function setCopyMessage(message) {
            if (!emailCopyText) return;
            emailCopyText.textContent = message;
            window.setTimeout(function () {
                emailCopyText.textContent = originalText;
            }, 2200);
        }

        emailCopyCard.addEventListener('click', function (e) {
            e.preventDefault();
            if (!emailToCopy) return;

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(emailToCopy)
                    .then(function () { setCopyMessage('Copied email to clipboard'); })
                    .catch(function () { setCopyMessage(emailToCopy); });
            } else {
                var textarea = document.createElement('textarea');
                textarea.value = emailToCopy;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                setCopyMessage('Copied email to clipboard');
            }
        });
    }

    // ── Project filter (compact cards) ───────
    var filterBtns = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var filter = btn.getAttribute('data-filter');
            projectCards.forEach(function (card) {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ── Scroll-in animation for project features ──
    var features = document.querySelectorAll('.project-feature, .category-card, .contact-card');
    if ('IntersectionObserver' in window && features.length > 0) {
        features.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        });
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        features.forEach(function (el) { io.observe(el); });
    }

});
