document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const content = document.querySelector('main#content') || document.querySelector('main');
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const form = document.getElementById('contact-form');

  // Splash / intro — bevarad
  if (splash && content) {
    setTimeout(() => {
      splash.classList.add('fade-out');
      document.body.classList.add('loaded');
      content.classList.add('reveal');
    }, 2500);
  } else if (content) {
    content.classList.add('reveal');
  }

  // Navbar scroll background
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Product stages — scroll-driven mini product experiences
  const stages = document.querySelectorAll('.product-stage');
  stages.forEach((stage) => {
    const frames = stage.querySelectorAll('.frame');
    const dots = stage.querySelectorAll('.stage-progress span');
    if (!frames.length) return;
    let index = 0;
    let timer = null;
    const setFrame = (i) => {
      frames.forEach((f, n) => f.classList.toggle('active', n === i));
      dots.forEach((d, n) => d.classList.toggle('active', n === i));
      index = i;
    };
    const advance = () => setFrame((index + 1) % frames.length);
    const start = () => {
      if (timer) return;
      timer = setInterval(advance, 2400);
    };
    const stop = () => {
      if (timer) { clearInterval(timer); timer = null; }
    };
    setFrame(0);
    new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) start(); else stop(); });
    }, { threshold: 0.4 }).observe(stage);
  });

  // Reveal on scroll
  const sections = document.querySelectorAll('.section');
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
    { threshold: 0.05 }
  );
  sections.forEach((s) => obs.observe(s));

  // Arc SVG draw
  const arc = document.querySelector('.arc');
  if (arc) {
    new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) arc.classList.add('in-view'); }),
      { threshold: 0.3 }
    ).observe(arc);
  }

  // Contact form → Web3Forms skickar mailet direkt till suits@noblearc.se
  const formStatus = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Fyll i namn, e-post och meddelande.';
        }
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        const data = await res.json();
        if (data.success) {
          form.reset();
          if (formStatus) {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Tack. Vi hör av oss snart.';
          }
        } else {
          throw new Error('send failed');
        }
      } catch (err) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Något gick fel. Maila suits@noblearc.se direkt.';
        }
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  // Venture gate modal — koden verifieras server-side av middleware:n
  const gateModal = document.getElementById('gate-modal');
  const gateForm = document.getElementById('gate-modal-form');
  const gateInput = document.getElementById('gate-modal-code');
  const gateHint = document.getElementById('gate-modal-hint');
  let gateTarget = null;

  document.querySelectorAll('a[data-gate]').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      gateTarget = card.getAttribute('href');
      if (gateModal) {
        gateModal.hidden = false;
        if (gateHint) gateHint.textContent = '\u00a0';
        if (gateInput) {
          gateInput.value = '';
          setTimeout(() => gateInput.focus(), 50);
        }
      }
    });
  });

  if (gateModal) {
    gateModal.addEventListener('click', (e) => {
      if (e.target === gateModal) gateModal.hidden = true;
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') gateModal.hidden = true;
    });
  }

  if (gateForm) {
    gateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!gateTarget) return;
      try {
        const res = await fetch(gateTarget, {
          method: 'POST',
          body: new FormData(gateForm),
          redirect: 'manual',
        });
        if (res.type === 'opaqueredirect' || res.status === 0 || res.ok) {
          window.location.href = gateTarget;
        } else {
          if (gateHint) gateHint.textContent = 'Koden stämmer inte.';
          if (gateInput) { gateInput.value = ''; gateInput.focus(); }
        }
      } catch (err) {
        window.location.href = gateTarget;
      }
    });
  }
});
