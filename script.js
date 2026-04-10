/* =========================================
   Abhay Mishra — Portfolio
   script.js
   ========================================= */

(function () {
  'use strict';

  /* ─── Theme Toggle ─────────────────────────────────── */
  var themeBtn = document.getElementById('theme-btn');
  var themeIcon = document.getElementById('theme-icon');
  var htmlNode = document.documentElement;
  var isLight = true; // page starts in light mode

  if (themeBtn) {
    themeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      isLight = !isLight;

      if (isLight) {
        htmlNode.classList.add('light');
        htmlNode.classList.remove('dark');
        themeIcon.textContent = 'dark_mode';
      } else {
        htmlNode.classList.remove('light');
        htmlNode.classList.add('dark');
        themeIcon.textContent = 'light_mode';
      }
    });
  }

  /* ─── Ambient Cursor Glow ──────────────────────────── */
  var cursorGlow = document.getElementById('cursor-glow');
  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var glowX = mouseX;
  var glowY = mouseY;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;

    if (cursorGlow) {
      cursorGlow.style.transform =
        'translate(' + glowX + 'px, ' + glowY + 'px) translate(-50%, -50%)';
    }

    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  /* ─── Scroll Reveal ────────────────────────────────── */
  var revealObserver = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ─── CGPA / Transcript Modal ──────────────────────── */
  var cgpaCard = document.getElementById('stat-cgpa');
  var cgpaModal = document.getElementById('cgpa-modal');
  var closeCgpa = document.getElementById('close-cgpa');

  function openCgpaModal() {
    cgpaModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCgpaModal() {
    cgpaModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cgpaCard && cgpaModal) cgpaCard.addEventListener('click', openCgpaModal);
  if (closeCgpa && cgpaModal) closeCgpa.addEventListener('click', closeCgpaModal);

  if (cgpaModal) {
    cgpaModal.addEventListener('click', function (e) {
      if (e.target === cgpaModal) closeCgpaModal();
    });
  }

  /* ─── Certification Image Modal ────────────────────── */
  var certItems = document.querySelectorAll('.cert-item');
  var certModal = document.getElementById('cert-modal');
  var closeCert = document.getElementById('close-cert');
  var certImgWrap = document.getElementById('cert-image-container');
  var certImg = document.getElementById('cert-modal-img');
  var certFallback = document.getElementById('cert-fallback-container');

  function openCertModal(imgSrc) {
    if (imgSrc && imgSrc.trim() !== '') {
      certImg.src = imgSrc;
      // Forcefully show the image wrapper and hide the fallback text
      certImgWrap.style.display = 'block';
      certFallback.style.display = 'none';
    } else {
      certImg.src = '';
      // Forcefully hide the image wrapper and show the fallback text
      certImgWrap.style.display = 'none';
      certFallback.style.display = 'flex'; // Uses flex to keep icon & text centered
    }

    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (certModal) {
    certItems.forEach(function (item) {
      item.addEventListener('click', function () {
        openCertModal(this.getAttribute('data-cert-image'));
      });
    });

    if (closeCert) closeCert.addEventListener('click', closeCertModal);

    certModal.addEventListener('click', function (e) {
      if (e.target === certModal) closeCertModal();
    });
  }

  /* ─── Close any modal with Escape key ─────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeCgpaModal();
      closeCertModal();
    }
  });

})();