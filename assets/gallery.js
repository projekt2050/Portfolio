document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.gallery-image');
  const meta = document.getElementById('project-meta');

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
        if (entry.isIntersecting) {
          focused = entry.target;
        }
      });
      if (focused) {
        updateMeta(focused);
      }
    },
    {
      threshold: 0.6
    }
  );

  sections.forEach(section => observer.observe(section));
});
