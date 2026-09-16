/* =========================================================================
   Marie Rose Shop — GA4 Custom Event Tracking
   -------------------------------------------------------------------------
   This file is separate from script.js on purpose: it only adds analytics
   events on top of the existing behaviour, so it can be added, edited, or
   removed without touching the rest of the site's working code.

   REQUIRES: the GA4 base snippet (gtag.js) must already be loaded in
   index.html's <head> BEFORE this file runs, so that window.gtag exists.

   Tracks:
     - WhatsApp button/link clicks (any href containing wa.me)
     - "Add to list" clicks on product cards
     - "Get directions" / "View directions" clicks
     - PWA install banner: shown vs. accepted
   ========================================================================= */
(function () {
  'use strict';

  // Safe wrapper: never let a missing/blocked gtag break the site.
  function track(eventName, params) {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params || {});
      }
    } catch (err) {
      console.warn('analytics-events.js: tracking failed', err);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {

    // ---- WhatsApp clicks (chat button, footer link, order-list send, etc.) ----
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="wa.me"]');
      if (link) {
        track('whatsapp_click', {
          link_text: link.textContent.trim().slice(0, 60),
          link_location: link.closest('section, footer, header')?.id || 'unknown'
        });
      }
    });

    // ---- Add to list (product interest, since there's no real checkout) ----
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.add-to-list');
      if (btn) {
        track('add_to_list', {
          item_name: btn.getAttribute('data-item') || 'unknown',
          price: btn.getAttribute('data-price') || '',
          unit: btn.getAttribute('data-unit') || ''
        });
      }
    });

    // ---- Directions / map clicks ----
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="google.com/maps"]');
      if (link) {
        track('get_directions_click', {});
      }
    });

    // ---- PWA install banner shown ----
    var installBanner = document.getElementById('installBanner');
    if (installBanner) {
      var seen = false;
      var observer = new MutationObserver(function () {
        var visible = installBanner.offsetParent !== null;
        if (visible && !seen) {
          seen = true;
          track('install_banner_shown', {});
        }
      });
      observer.observe(installBanner, { attributes: true, attributeFilter: ['class', 'style'] });
    }

    // ---- PWA install accepted ----
    var installBtn = document.getElementById('installBannerBtn');
    if (installBtn) {
      installBtn.addEventListener('click', function () {
        track('install_banner_accepted', {});
      });
    }

    // ---- AI chat widget opened ----
    var chatToggle = document.getElementById('ai-chat-toggle');
    if (chatToggle) {
      chatToggle.addEventListener('click', function () {
        track('ai_chat_opened', {});
      });
    }

  });
})();