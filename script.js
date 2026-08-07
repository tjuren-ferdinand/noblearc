document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const main = document.querySelector('main');

  setTimeout(() => {
    splash.classList.add('fade-out');
    document.body.classList.add('loaded');
    main.classList.add('reveal');
  }, 2500);
});
