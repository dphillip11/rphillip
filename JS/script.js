// Store the initial viewport size
const initialViewportWidth = window.innerWidth;
const initialViewportHeight = window.innerHeight;

// Check for changes in viewport size
window.addEventListener('resize', handleResize);

function handleResize() {
  // Check if the viewport size has changed
  if (window.innerWidth !== initialViewportWidth || window.innerHeight !== initialViewportHeight) {
    // Reset the viewport size to the initial values
    window.resizeTo(initialViewportWidth, initialViewportHeight);
  }
}

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

const boxes = document.querySelectorAll('.puzzle-item');
let enlargedItem = 0;
let showLightbox = false;
let isDragging = false;
let startX;
let startY;
let translateX = 0;
let translateY = 0;
let thumbnailOffset = 0;

const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
let currentZoomLevel = 1;

// Display the lightbox gallery when an image is clicked
boxes.forEach(function (box, index) {
  box.addEventListener('click', function () {
    enlargedItem = index;
    updateLightbox();
    lightboxOverlay.style.display = 'block';
    showLightbox = true;
    document.body.classList.add('no-scroll');
  });
  box.addEventListener("mouseover", function () {
        box.classList.add("hovered");
  });
  box.addEventListener("touchstart", function () {
        box.classList.add("hovered");
    });
    box.addEventListener("mouseout", function () {
        box.classList.remove("hovered");
    });
  box.addEventListener("touchend", function () {
        box.classList.remove("hovered");
    });
});

// Hide the lightbox gallery when close button is clicked
lightboxClose.addEventListener('click', function () {
  lightboxOverlay.style.display = 'none';
  showLightbox = false;
  document.body.classList.remove('no-scroll');
  resetZoomAndTranslate();
});

// Update the lightbox gallery with the selected image and thumbnails
function updateLightbox() {
  var lightboxOverlay = document.getElementById('lightbox-overlay');
 var viewportWidth = window.innerWidth / window.devicePixelRatio;
  var viewportHeight = window.innerHeight / window.devicePixelRatio;
  lightboxOverlay.width = viewportWidth;
  lightboxOverlay.height = viewportHeight;
  const imageSrc = boxes[enlargedItem].querySelector('img').src;
  lightboxImage.src = imageSrc;
  resetZoomAndTranslate();

  // Remove previous thumbnails
  lightboxThumbnails.innerHTML = '';
  var thumbnailOffset = 0;

  boxes.forEach(function (box, index) {
    const thumbnailSrc = box.querySelector('img').src;
    const thumbnail = document.createElement('img');
    thumbnail.classList.add('lightbox-thumbnail');
    thumbnail.src = thumbnailSrc;
    thumbnail.addEventListener('click', function () {
      enlargedItem = index;
      updateLightbox();
    });
    thumbnail.addEventListener('touchstart', function () {
      enlargedItem = index;
      updateLightbox();
    });
    lightboxThumbnails.appendChild(thumbnail);
  });

  offsetThubmbnails();

  // Add event listeners to previous and next buttons
  lightboxPrev.addEventListener('click', showPrevImage);
  lightboxNext.addEventListener('click', showNextImage);
}

function offsetThubmbnails() {
  var thumbnails = document.querySelectorAll('.lightbox-thumbnail');
  offset = thumbnails[enlargedItem].offsetLeft - thumbnails[0].offsetLeft;
  thumbnails[enlargedItem].style.border = '2px solid var(--color-red)';
  lightboxThumbnails.style.transform = `translateX(${-offset}px)`;
}

// Function to show the previous image
function showPrevImage() {
  if (enlargedItem === 0) {
    enlargedItem = boxes.length - 1;
  } else {
    enlargedItem--;
  }
  updateLightbox();
}

// Function to show the next image
function showNextImage() {
  if (enlargedItem === boxes.length - 1) {
    enlargedItem = 0;
  } else {
    enlargedItem++;
  }
  updateLightbox();
}

// Reset the zoom level and translation of the image
function resetZoomAndTranslate() {
  currentZoomLevel = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

// Update the zoom level and translation of the image based on the scroll event
function updateZoom(event) {
  const scrollDelta = Math.sign(event.deltaY);
  const zoomStep = 0.1;
  const minZoomLevel = 0.5;
  const maxZoomLevel = 4;

  if (scrollDelta > 0 && currentZoomLevel > minZoomLevel) {
    currentZoomLevel -= zoomStep;
  } else if (scrollDelta < 0 && currentZoomLevel < maxZoomLevel) {
    currentZoomLevel += zoomStep;
  }
  applyTransform();
}

// Update the position and scale of the image using CSS transform
function applyTransform() {
  lightboxImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoomLevel})`;
}

// Handle mouse drag to pan and translate the image within the container
function handleMouseDown(event) {
  event.preventDefault();
  isDragging = true;
  startX = event.clientX || event.touches[0].clientX;
  startY = event.clientY || event.touches[0].clientY;
}

function handleMouseMove(event) {
  if (!isDragging) return;

  const currentX = event.clientX || event.touches[0].clientX;
  const currentY = event.clientY || event.touches[0].clientY;
  const diffX = currentX - startX;
  const diffY = currentY - startY;

  translateX += diffX;
  translateY += diffY;
  startX = currentX;
  startY = currentY;
  applyTransform();
}

function handleMouseUp() {
  isDragging = false;
}

// Prevent default scrolling and handle zooming when the lightbox is active
function handleLightboxScroll(event) {
  if (showLightbox) {
    event.preventDefault();
    updateZoom(event);
  }
}

// Add event listeners for mousewheel, touch, and mouse drag events
window.addEventListener('wheel', handleLightboxScroll, { passive: false });
window.addEventListener('touchstart', handleTouchStart, { passive: false });
window.addEventListener('touchmove', handleTouchMove, { passive: false });
window.addEventListener('touchend', handleTouchEnd, { passive: false });

lightboxContent.addEventListener('mousedown', handleMouseDown);
lightboxContent.addEventListener('mousemove', handleMouseMove);
lightboxContent.addEventListener('mouseup', handleMouseUp);
lightboxContent.addEventListener('mouseleave', handleMouseUp);

lightboxContent.addEventListener('touchstart', handleTouchStart, { passive: false });
lightboxContent.addEventListener('touchmove', handleTouchMove, { passive: false });
lightboxContent.addEventListener('touchend', handleTouchEnd, { passive: false });

// Pinch Zoom variables
let initialDistance = null;
let initialZoomLevel = 1;

function handleTouchStart(event) {
  if (event.touches.length > 1)
    event.preventDefault();
  if (event.touches.length === 2) {
    // Pinch Zooming
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    initialDistance = getDistanceBetweenTouches(touch1, touch2);
    initialZoomLevel = currentZoomLevel;
  } else {
    handleMouseDown(event);
  }
}

function handleTouchMove(event) {
  if (event.touches.length === 2) {
    // Pinch Zooming
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    const currentDistance = getDistanceBetweenTouches(touch1, touch2);
    const pinchDelta = currentDistance - initialDistance;

    const zoomStep = 0.01;
    const minZoomLevel = 0.5;
    const maxZoomLevel = 4;

    if (pinchDelta < 0 && currentZoomLevel > minZoomLevel) {
      currentZoomLevel -= zoomStep;
    } else if (pinchDelta > 0 && currentZoomLevel < maxZoomLevel) {
      currentZoomLevel += zoomStep;
    }
     applyTransform();
  } else {
    handleMouseMove(event);
  }
}

function handleTouchEnd(event) {
  handleMouseUp(event);
}

function getDistanceBetweenTouches(touch1, touch2) {
  return Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
}

const videoFrames = document.querySelectorAll('.video-frame');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentVideoIndex = 0;

var thumbnails = document.querySelectorAll('.thumbnail');
var activeThumb = 0;
// Initialize the carousel
videoFrames[currentVideoIndex].classList.add('active');
thumbnails[activeThumb].classList.add('activeThumb');

// Navigate to the previous video
prevButton.addEventListener('click', function() {
  videoFrames[currentVideoIndex].classList.remove('active');
  thumbnails[activeThumb].classList.remove('activeThumb');

  currentVideoIndex = (currentVideoIndex - 1 + videoFrames.length) % videoFrames.length;
  activeThumb = (activeThumb - 1 + thumbnails.length) % thumbnails.length;

  videoFrames[currentVideoIndex].classList.add('active');
  thumbnails[activeThumb].classList.add('activeThumb');
});

// Navigate to the next video
nextButton.addEventListener('click', function() {
  videoFrames[currentVideoIndex].classList.remove('active');
  thumbnails[activeThumb].classList.remove('activeThumb');

  currentVideoIndex = (currentVideoIndex + 1) % videoFrames.length;
  activeThumb = (activeThumb + 1) % thumbnails.length;

  videoFrames[currentVideoIndex].classList.add('active');
  thumbnails[activeThumb].classList.add('activeThumb');
});













