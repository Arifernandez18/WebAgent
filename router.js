/**
 * WEBAGENT — Local Router
 * Handles navigation between index.html and quote.html
 * Works when files are opened locally (file://) or hosted on a server.
 */

(function() {
  // Persist language choice across pages using sessionStorage
  const LANG_KEY = 'webagent_lang';

  // On page load: restore saved language
  document.addEventListener('DOMContentLoaded', function() {
    const savedLang = sessionStorage.getItem(LANG_KEY);
    if (savedLang && typeof setLang === 'function') {
      setLang(savedLang);
    }
  });

  // Override setLang to also save the choice
  const _origSetLang = window.setLang;
  window.setLang = function(l) {
    sessionStorage.setItem(LANG_KEY, l);
    if (typeof _origSetLang === 'function') _origSetLang(l);
  };

  // Smooth navigation: intercept all internal .html links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    // Only handle local html navigation (not anchors, not external, not wa.me)
    if (href && href.endsWith('.html') && !href.startsWith('http')) {
      // Save lang before navigating
      sessionStorage.setItem(LANG_KEY, window.currentLang || window.lang || 'en');
    }
  });
})();
