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
      toggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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

  // Contact form → mailto
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const subject = `Idea from ${fd.get('name') || 'someone'}`;
      const body = `Name: ${fd.get('name')}\r\nEmail: ${fd.get('email')}\r\nWhat are you building?: ${fd.get('building')}\r\nMessage:\r\n${fd.get('message')}`;
      window.location.href = `mailto:hello@noblearc.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.reset();
    });
  }

  // PrivateAccessGate — demo access layer for venture detail pages
  const privateSections = document.querySelectorAll('[data-private-code]');
  privateSections.forEach((section) => {
    const gate = section.querySelector('.private-gate-form');
    if (!gate) return;
    const input = gate.querySelector('input[type="text"]');
    const hint = section.querySelector('.private-hint');
    const code = section.dataset.privateCode;

    gate.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input) return;
      const value = input.value.trim().toLowerCase();
      if (value === code.toLowerCase()) {
        section.classList.add('unlocked');
        if (hint) {
          hint.textContent = 'Welcome in.';
          hint.classList.remove('denied');
          hint.classList.add('allowed');
        }
      } else {
        if (hint) {
          hint.textContent = "That code doesn't match.";
          hint.classList.remove('allowed');
          hint.classList.add('denied');
        }
        input.value = '';
        input.focus();
      }
    });
  });
});
