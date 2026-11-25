// Prevent clickjacking when embedded in unauthorized cross-origin frames
(function () {
  'use strict';
  try {
    if (window.top !== window.self) {
      window.top.location.replace(window.self.location.href);
    }
  } catch (e) {
    // Cross-origin framing detected; hide content to prevent clickjacking
    if (document.documentElement) {
      document.documentElement.style.display = 'none';
    }
    window.addEventListener('DOMContentLoaded', function () {
      if (document.body) {
        document.body.style.display = 'none';
      }
    });
  }

  // Clean URL Routing for GitHub Pages SPA
  var l = window.location;
  if (l.search && l.search.charAt(1) === '/') {
    var decoded = l.search
      .slice(1)
      .split('&')
      .map(function (s) {
        return s.replace(/~and~/g, '&');
      })
      .join('?');

    var target = l.pathname.slice(0, -1) + decoded + l.hash;
    // Strict same-origin relative path validation: must begin with single '/' and not '//'
    if (target.charAt(0) === '/' && target.charAt(1) !== '/') {
      try {
        window.history.replaceState(null, null, target);
      } catch (_) {}
    }
  }
})();
