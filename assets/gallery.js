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

  let firstProjectInView = false;

  const observer = new IntersectionObserver(
    (entries) => {
      let focused = null;
      let firstVisible = false;
      entries.forEach(entry => {
        // Fade in gallery images
        if (entry.intersectionRatio >= 0.4) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
        // Meta info logic
        if (entry.intersectionRatio >= 0.6) {
          focused = entry.target;
        }
        // Check if first project is in view
        if (entry.target === sections[0] && entry.intersectionRatio >= 0.6) {
          firstVisible = true;
        }
      });

      // Animate sidebar meta in/out
      if (firstVisible) {
        meta.classList.add('visible');
        meta.classList.remove('out');
        firstProjectInView = true;
      } else if (focused) {
        meta.classList.add('visible');
        meta.classList.remove('out');
        firstProjectInView = false;
      }

      if (focused) {
        updateMeta(focused);
      }
    },
    { threshold: [0, 0.4, 0.6, 1] }
  );
  sections.forEach(section => observer.observe(section));

  // --- Hide nav on scroll ---
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

  // --- Animate sidebar out when at top/welcome section ---
  function handleSidebarMeta() {
    if (!meta) return;
    const welcomeRect = welcome ? welcome.getBoundingClientRect() : { bottom: 0 };
    // If welcome section bottom is visible in viewport (i.e., at top)
    if (welcomeRect.bottom > 80) {
      meta.classList.remove('visible');
      meta.classList.add('out');
    } else {
      // Only animate in if first project is in view (handled by observer)
      if (!meta.classList.contains('visible') && firstProjectInView) {
        meta.classList.add('visible');
        meta.classList.remove('out');
      }
    }
  }
  window.addEventListener('scroll', handleSidebarMeta);
  handleSidebarMeta();
});
