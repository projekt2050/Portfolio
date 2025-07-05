document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.gallery-image');
  const meta = document.getElementById('project-meta');

  function updateMeta(section) {
    if (!section) return;
    meta.querySelector('.project-title').textContent = section.dataset.title;
    meta.querySelector('.project-info').textContent = section.dataset.info;
    meta.querySelector('.project-desc').textContent = section.dataset.desc;
  }

  // Intersection Observer for meta info and fade-in effect
  const observer = new IntersectionObserver(
    (entries) => {
      let focused = null;
      entries.forEach(entry => {
        // Fade in when at least 40% visible
        if (entry.intersectionRatio >= 0.4) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
        // Use as focused for meta if at least 60% visible
        if (entry.intersectionRatio >= 0.6) {
          focused = entry.target;
        }
      });
      if (focused) {
        updateMeta(focused);
      }
    },
    {
      threshold: [0, 0.4, 0.6, 1]
    }
  );

  sections.forEach(section => observer.observe(section));
});
