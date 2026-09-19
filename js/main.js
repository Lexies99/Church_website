/**
 * PASSION CREEK CHURCH - CORE JAVASCRIPT LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initDrawer();
  initSubnavScrollspy();
  initModals();
  initAccordions();
  initGivingWidget();
  initEventsFilter();
  initPlanVisitForm();
});

/* ==========================================================================
   1. Header Scroll Effect
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Slide-out Navigation Drawer
   ========================================================================== */
function initDrawer() {
  const openButtons = document.querySelectorAll('.menu-trigger-btn, [data-open-drawer]');
  const closeButton = document.querySelector('.drawer-close-btn');
  const drawer = document.querySelector('.slide-drawer');
  const overlay = document.querySelector('.drawer-overlay');

  if (!drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  }));

  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }

  overlay.addEventListener('click', closeDrawer);

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close when clicking internal drawer links that jump to page sections
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('#') || href.includes('#'))) {
        closeDrawer();
      }
    });
  });
}

/* ==========================================================================
   3. Sub-Navbar Scrollspy & Smooth Scrolling
   ========================================================================== */
function initSubnavScrollspy() {
  const subnavLinks = document.querySelectorAll('.sub-navbar-links a[href^="#"]');
  if (!subnavLinks.length) return;

  const sections = Array.from(subnavLinks).map(link => {
    const id = link.getAttribute('href').substring(1);
    return document.getElementById(id);
  }).filter(Boolean);

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        subnavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   4. Video & General Modals
   ========================================================================== */
function initModals() {
  // Video Modal Triggers
  const videoTriggers = document.querySelectorAll('[data-video-id]');
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');

  if (videoModal && videoIframe) {
    videoTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoId = btn.getAttribute('data-video-id') || 'sSVcMD47FjQ';
        videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
        openModal(videoModal);
      });
    });
  }

  // Generic modal openers
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) openModal(targetModal);
    });
  });

  // Modal Closers
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop || e.target.closest('.modal-close-btn')) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        closeModal(modal);
      });
    }
  });
}

function openModal(modal) {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  // Clear any active iframe to stop audio
  const iframe = modal.querySelector('iframe');
  if (iframe) {
    iframe.src = '';
  }
}

/* ==========================================================================
   5. Accordion (FAQs)
   ========================================================================== */
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Optional: close other items in the same accordion
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const siblingBody = sibling.querySelector('.accordion-body');
            if (siblingBody) siblingBody.style.maxHeight = null;
          }
        });
      }

      if (isOpen) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   6. Plan Your Visit Interactive Form
   ========================================================================== */
function initPlanVisitForm() {
  const form = document.getElementById('planVisitForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || 'Friend';
    const service = form.querySelector('[name="service"]')?.value || 'Sunday Gathering';

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Saving Your Spot...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      const modal = form.closest('.modal-backdrop');
      if (modal) closeModal(modal);

      showToast(`We can't wait to welcome you, ${name}! Your visit for ${service} has been confirmed. Check your email for details.`);
      form.reset();
    }, 900);
  });
}

/* ==========================================================================
   7. Giving Widget Interactivity
   ========================================================================== */
function initGivingWidget() {
  const widget = document.querySelector('.giving-widget-card');
  if (!widget) return;

  const typeBtns = widget.querySelectorAll('.give-type-btn');
  const presetBtns = widget.querySelectorAll('.preset-btn');
  const amountInput = widget.querySelector('#customGiveAmount');
  const fundSelect = widget.querySelector('#giveFundSelect');
  const submitBtn = widget.querySelector('#submitGiveBtn');

  // One-time vs Recurring toggle
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateGiveBtnText();
    });
  });

  // Preset amount selection
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (amountInput) {
        amountInput.value = btn.getAttribute('data-amount');
      }
      updateGiveBtnText();
    });
  });

  if (amountInput) {
    amountInput.addEventListener('input', () => {
      presetBtns.forEach(b => {
        if (b.getAttribute('data-amount') === amountInput.value) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      updateGiveBtnText();
    });
  }

  function updateGiveBtnText() {
    if (!submitBtn) return;
    const activeType = widget.querySelector('.give-type-btn.active')?.textContent.trim() || 'Give';
    const amount = amountInput?.value ? `$${amountInput.value}` : '';
    submitBtn.textContent = `${activeType} ${amount} Now`;
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const amount = amountInput?.value || '50';
      const fund = fundSelect?.value || 'General Tithes & Offerings';
      const type = widget.querySelector('.give-type-btn.active')?.textContent.trim() || 'One-time';

      submitBtn.textContent = 'Processing Securely...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = `Give Now`;
        submitBtn.disabled = false;
        showToast(`Thank you for your generous gift of $${amount} (${type}) toward ${fund}!`);
      }, 1000);
    });
  }
}

/* ==========================================================================
   8. Events Filter
   ========================================================================== */
function initEventsFilter() {
  const filterBtns = document.querySelectorAll('.events-filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  if (!filterBtns.length || !eventCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. Toast Notification System
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 28px;
      right: 28px;
      background: #111111;
      color: #ffffff;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      border-left: 4px solid #a71e30;
      z-index: 9999;
      font-size: 0.98rem;
      max-width: 420px;
      line-height: 1.5;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 4500);
}
