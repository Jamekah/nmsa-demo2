/* ================================================================
   NMSA PNG — main.js
   Shared JavaScript for all pages
   ================================================================ */

(function () {
    'use strict';

    /* ── Navbar scroll effect ────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run on load in case page is already scrolled
    }

    /* ── Hamburger / Mobile nav ──────────────────────────────── */
    const hamburger  = document.getElementById('hamburger');
    const navMobile  = document.getElementById('navMobile');
    if (hamburger && navMobile) {
        hamburger.addEventListener('click', () => {
            const open = navMobile.classList.toggle('open');
            hamburger.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', open);
        });
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navMobile.classList.remove('open');
                hamburger.classList.remove('open');
            }
        });
    }

    /* ── Incident Report Modal ───────────────────────────────── */
    const backdrop       = document.getElementById('incidentModal');
    const openBtn        = document.getElementById('openModal');
    const openBtnMobile  = document.getElementById('openModalMobile');
    const closeBtn       = document.getElementById('closeModal');
    const cancelBtn      = document.getElementById('cancelModal');
    const submitBtn      = document.getElementById('submitIncident');

    function openModal() {
        if (!backdrop) return;
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
        backdrop.querySelector('.modal')?.focus?.();
    }

    function closeModal() {
        if (!backdrop) return;
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (openBtn)       openBtn.addEventListener('click', openModal);
    if (openBtnMobile) openBtnMobile.addEventListener('click', openModal);
    if (closeBtn)      closeBtn.addEventListener('click', closeModal);
    if (cancelBtn)     cancelBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && backdrop?.classList.contains('open')) closeModal();
    });

    // Submit with validation
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const form = document.getElementById('incidentForm');
            if (!form) return;
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            // Simulate submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting…';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted';
                submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                setTimeout(() => {
                    closeModal();
                    form.reset();
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Report';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 1800);
            }, 1200);
        });
    }

    /* ── Hero particles ──────────────────────────────────────── */
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 28; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 4 + 1;
            p.style.cssText = [
                `width:${size}px`,
                `height:${size}px`,
                `left:${Math.random() * 100}%`,
                `bottom:${Math.random() * 40}%`,
                `animation-duration:${Math.random() * 16 + 10}s`,
                `animation-delay:${Math.random() * 10}s`
            ].join(';');
            particleContainer.appendChild(p);
        }
    }

    /* ── Scroll reveal ───────────────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -35px 0px' });
        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show all
        revealEls.forEach(el => el.classList.add('visible'));
    }

    /* ── Animated counters ───────────────────────────────────── */
    const counters = document.querySelectorAll('.count');
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el    = entry.target;
                const end   = parseFloat(el.dataset.target);
                const dur   = 1800;
                const step  = end / (dur / 16);
                let current = 0;
                const tick  = () => {
                    current = Math.min(current + step, end);
                    el.textContent = Math.floor(current).toLocaleString();
                    if (current < end) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                counterObserver.unobserve(el);
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    /* ── Smooth scroll for anchor links ─────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();
