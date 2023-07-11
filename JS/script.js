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

function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  var topOffset = section.offsetTop - offsetFromTop;
  window.scrollTo({ top: topOffset, behavior: 'smooth' });
}

const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('DOMContentLoaded', function() {
  navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function(event) {
      event.preventDefault();
      var sectionId = navLink.getAttribute('href');
      scrollToSection(sectionId);
    });
  });
});


const puzzleItems = document.querySelectorAll('.puzzle-item');
let enlargedItem = null;

puzzleItems.forEach((item) => {
  item.addEventListener('mouseover', function() {
    if (enlargedItem == null && !item.classList.contains('enlarged')) {
      puzzleItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.style.transform = 'scale(0.95)';
        }
      });
      item.style.transform = 'scale(1.2)';
    }
  });

  item.addEventListener('mouseout', function() {
      if (enlargedItem == null && !item.classList.contains('enlarged')) {
      puzzleItems.forEach((otherItem) => {
        otherItem.style.transform = 'scale(1)';
      });
    }
  });

  item.addEventListener('click', function() {
    if (enlargedItem === item) {
      item.style.transform = 'scale(1)';
      item.style.position = 'static';
      enlargedItem = null;
        item.classList.remove('enlarged');
        item.style.zIndex = '0';
    } else if (enlargedItem == null) {
      item.style.transform = 'scale(0.8)';
      item.style.position = 'fixed';
      enlargedItem = item;
      item.classList.add('enlarged');
      resizeImage(item);
        centerItem(item);
        item.style.zIndex = '100';
    }
  });
});

function resizeImage(item) {
  if (item.classList.contains('enlarged')) {
    var windowHeight = window.innerHeight;
    var imageHeight = item.offsetHeight;
    var scaleFactor = 0.8 * windowHeight / imageHeight;
    item.style.transform = 'scale(' + scaleFactor + ')';
  } else {
    item.style.transform = 'scale(1)';
  }
}

function centerItem(item) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const itemWidth = item.offsetWidth;
  const itemHeight = item.offsetHeight;
  const itemLeft = (windowWidth - itemWidth) / 2;
  const itemTop = (windowHeight - itemHeight) / 2;

  item.style.left = itemLeft + 'px';
  item.style.top = itemTop + 20 + 'px';
}

const videoFrames = document.querySelectorAll('.video-frame');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentVideoIndex = 0;

// Initialize the carousel
videoFrames[currentVideoIndex].classList.add('active');

// Navigate to the previous video
prevButton.addEventListener('click', function() {
  videoFrames[currentVideoIndex].classList.remove('active');
  currentVideoIndex = (currentVideoIndex - 1 + videoFrames.length) % videoFrames.length;
  videoFrames[currentVideoIndex].classList.add('active');
});

// Navigate to the next video
nextButton.addEventListener('click', function() {
  videoFrames[currentVideoIndex].classList.remove('active');
  currentVideoIndex = (currentVideoIndex + 1) % videoFrames.length;
  videoFrames[currentVideoIndex].classList.add('active');
});












