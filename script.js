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

  // Contact form → mailto (hosting är statisk; mailto är real fallback som öppnar användarens klient)
  const formStatus = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Fyll i namn, e-post och meddelande.';
        }
        return;
      }
      const fd = new FormData(form);
      const name = fd.get('name') || 'Okänd avsändare';
      const email = fd.get('email') || '';
      const building = fd.get('building') || '';
      const message = fd.get('message') || '';
      const subject = `Nytt meddelande från ${name}`;
      const sent = new Date().toLocaleString('sv-SE');
      const body = `Nytt meddelande från NobleArc-webbplatsen\r\n\r\nSkickat: ${sent}\r\n\r\nNamn: ${name}\r\nE-post: ${email}\r\nVad bygger du?: ${building}\r\n\r\nMeddelande:\r\n${message}`;
      window.location.href = `mailto:suits@noblearc.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.reset();
      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Tack. Vi hör av oss snart.';
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
