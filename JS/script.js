let scrollSpeed = -0.5;

window.addEventListener('scroll', function () {
    console.log('scrolling');
  var parallaxBg = document.querySelector('.parallax-bg');
  var scrollPosition = window.pageYOffset;

  parallaxBg.style.transform = 'translate3d(0, ' + (scrollPosition * scrollSpeed) + 'px, 0)';
});

var navbar = document.getElementById('navbar');
var isNavbarVisible = false;

window.addEventListener('scroll', function() {
  var scrollPosition = window.pageYOffset;

  if (scrollPosition < 100 && !isNavbarVisible) {
    navbar.classList.add('show');
    isNavbarVisible = true;
  } else if (scrollPosition >= 100 && isNavbarVisible) {
    navbar.classList.remove('show');
    isNavbarVisible = false;
  }
});

window.addEventListener('mousemove', function(event) {
  var mouseY = event.clientY;

  if (mouseY <= 160 && !isNavbarVisible) {
    navbar.classList.add('show');
    isNavbarVisible = true;
  } else if (mouseY > 160 && isNavbarVisible && window.pageYOffset >= 100) {
    navbar.classList.remove('show');
    isNavbarVisible = false;
  }
});

let offsetFromTop = 150;
window.addEventListener('DOMContentLoaded', function() {
  var arrow = document.getElementById('gallery-link');
  var gallery = document.getElementById('gallery');

  arrow.addEventListener('click', function(event) {
    event.preventDefault();
    var topOffset = gallery.offsetTop - offsetFromTop;
    window.scrollTo({ top: topOffset, behavior: 'smooth' });
  });
});

window.addEventListener('DOMContentLoaded', function() {
  var arrow = document.getElementById('animation-link');
  var animation = document.getElementById('animation');

  arrow.addEventListener('click', function(event) {
    event.preventDefault();
    var topOffset = animation.offsetTop - offsetFromTop;
    window.scrollTo({ top: topOffset, behavior: 'smooth' });
  });
});

const puzzleItems = document.querySelectorAll('.puzzle-item');
let enlargedItem = null;

puzzleItems.forEach((item) => {
  item.addEventListener('mouseover', function() {
    puzzleItems.forEach((otherItem) => {
      if (otherItem !== item && !otherItem.classList.contains('enlarged')) {
        otherItem.style.transform = 'scale(0.95)';
        }
        item.style.transform = 'scale(1.2)';
    });
  });

  item.addEventListener('mouseout', function() {
    puzzleItems.forEach((otherItem) => {
        otherItem.style.transform = 'scale(1)';
    });
  });

  item.addEventListener('click', function() {
    if (enlargedItem === item) {
      item.style.transform = 'scale(1)';
      item.style.position = 'static';
      enlargedItem = null;
      item.classList.remove('enlarged');
    } else {
      item.style.transform = 'scale(0.8)';
      item.style.position = 'fixed';
      enlargedItem = item;
      item.classList.add('enlarged');
      centerItem(item);
    }
  });
});

function centerItem(item) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const itemWidth = item.offsetWidth;
  const itemHeight = item.offsetHeight;
  const itemLeft = (windowWidth - itemWidth) / 2;
  const itemTop = (windowHeight - itemHeight) / 2;

  item.style.left = itemLeft + 'px';
  item.style.top = itemTop + 'px';
}

document.addEventListener('mouseout', function(event) {
  if (enlargedItem && !enlargedItem.contains(event.relatedTarget)) {
    enlargedItem.style.transform = 'scale(1)';
    enlargedItem.style.position = 'static';
    enlargedItem.classList.remove('enlarged');
    enlargedItem = null;
  }
});





