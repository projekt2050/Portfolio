document.addEventListener('DOMContentLoaded', function () {
  const topnav = document.getElementById('topnav');

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
});
