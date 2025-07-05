document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.gallery-image');
  const meta = document.getElementById('project-meta');
  const topnav = document.getElementById('topnav');
  const downInd = document.querySelector('.down-indicator');
  const welcome = document.getElementById('welcome');

  // --- Gallery Intersection Observer (fade in + meta update) ---
  function updateMeta(section) {
    if (!section) return;
    meta.querySelector('.project-title').textContent = section.dataset.title;
    meta.querySelector('.project-info').textContent = section.dataset.info;
    meta.querySelector('.project-desc').textContent = section.dataset.desc;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      let focused = null;
      entries.forEach(entry => {
        // Fade in
        if (entry.intersectionRatio >= 0.4) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
        // Meta info
        if (entry.intersectionRatio >= 0.6) {
          focused = entry.target;
        }
      });
      if (focused) updateMeta(focused);
    },
    { threshold: [0, 0.4, 0.6, 1] }
  );
  sections.forEach(section => observer.observe(section));

  // --- Hide nav on scroll ---
  let lastScroll = 0;
  function handleNav() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY < 20) {
      topnav.classList.remove('hide');
    } else {
      topnav.classList.add('hide');
    }
  }
  window.addEventListener('scroll', handleNav);
  handleNav();

  // --- Hide finger indicator after first welcome scroll ---
  function hideDownIndicator() {
    if (!downInd || !welcome) return;
    const rect = welcome.getBoundingClientRect();
    if (rect.bottom < 80) {
      downInd.style.opacity = 0;
      downInd.style.pointerEvents = 'none';
    } else {
      downInd.style.opacity = 0.85;
      downInd.style.pointerEvents = 'auto';
    }
  }
  window.addEventListener('scroll', hideDownIndicator);
  hideDownIndicator();
});
