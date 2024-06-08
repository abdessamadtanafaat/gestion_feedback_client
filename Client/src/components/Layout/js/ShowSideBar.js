    document.addEventListener('DOMContentLoaded', function () {
    let button = document.querySelector('[data-drawer-target="drawer-navigation"]');
    let drawer = document.getElementById('drawer-navigation');

    button.addEventListener('click', function () {
      drawer.classList.toggle('-translate-x-full');
    });
  });
