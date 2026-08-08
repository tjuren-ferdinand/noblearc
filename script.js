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
      const name = fd.get('name') || 'okänd avsändare';
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
        formStatus.textContent = 'Tack för ditt meddelande. Vi återkommer så snart vi kan.';
      }
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
          hint.textContent = 'Åtkomst beviljad.';
          hint.classList.remove('denied');
          hint.classList.add('allowed');
        }
      } else {
        if (hint) {
          hint.textContent = 'Koden stämmer inte.';
          hint.classList.remove('allowed');
          hint.classList.add('denied');
        }
        input.value = '';
        input.focus();
      }
    });
  });
});
