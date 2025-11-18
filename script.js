// Basic UI helpers for the small menu and year fill
document.addEventListener('DOMContentLoaded', function () {
  // fill copyright years
  const y = new Date().getFullYear();
  const s1 = document.getElementById('year');
  const s2 = document.getElementById('year-2');
  if (s1) s1.textContent = y;
  if (s2) s2.textContent = y;

  // mobile toggles
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      if (mobileMenu.hasAttribute('hidden')) mobileMenu.removeAttribute('hidden');
      else mobileMenu.setAttribute('hidden', '');
    });
  }

  const menuToggle2 = document.getElementById('menu-toggle-2');
  const mobileMenu2 = document.getElementById('mobile-menu-2');
  if (menuToggle2 && mobileMenu2) {
    menuToggle2.addEventListener('click', () => {
      const expanded = menuToggle2.getAttribute('aria-expanded') === 'true';
      menuToggle2.setAttribute('aria-expanded', !expanded);
      if (mobileMenu2.hasAttribute('hidden')) mobileMenu2.removeAttribute('hidden');
      else mobileMenu2.setAttribute('hidden', '');
    });
  }
});
