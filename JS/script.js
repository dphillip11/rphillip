let DEBUG = true;

function LOG(message) {
  if (DEBUG) console.log(message);
}

let cssUrl = 'CSS/style.css'; // Initial CSS file URL

// Function to update the CSS
function updateCSS() {
  const timestamp = Date.now();
  const cacheBusterUrl = cssUrl + '?t=' + timestamp;

  // Create a new <link> element with the updated CSS URL
  const newLink = document.createElement('link');
  newLink.rel = 'stylesheet';
  newLink.href = cacheBusterUrl;

  // Find the existing <link> element
  const existingLink = document.querySelector('link[href^="CSS/test.css"]');

  // Replace the existing <link> element with the new one
  if (existingLink) {
    existingLink.parentNode.replaceChild(newLink, existingLink);
  } else {
    // If no existing <link> element found, append the new one to the <head>
    document.head.appendChild(newLink);
  }
}

// Disable caching and clear cache
function makeRequest(url) {
    const timestamp = Date.now();
    const cacheBusterUrl = url + '?t=' + timestamp;
    const options = {};

    options.headers = {
      'Cache-Control': 'no-cache'
    };
  

  fetch(cacheBusterUrl, options)
    .then(response => {
      if (url === 'CSS/test.css') {
        updateCSS(); // Update the CSS after fetching the new version
        }
        begin();
    })
    .catch(error => {
      console.error('Request error:', error);
    });
}

if (DEBUG){
    makeRequest(cssUrl);
}

function fetchNames(outputList, filePath, callback) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      const fileNames = data.split(',').map(fileName => fileName.trim().replace(/"/g, ''));
      
      outputList.push(...fileNames); // Add the fetched image names to the output list

      callback(outputList);
    })
    .catch(error => {
      console.error('Error reading file:', error);
      callback([]);
    });
}

function FetchImagesCallback() { fetchNames(videoNames, 'Static/youtube_links.txt', FetchVideosCallback)}
function FetchVideosCallback() { onLoad(); }
//begin will start the callback chain
function begin() {
    fetchNames(imageNames, 'Static/file_names.txt', FetchImagesCallback);
    LOG("begin called");
}

const imageNames = []; // Output list to store the fetched image names
const videoNames = []; // Output list to store the fetched video names

let embed_link_front = "https://www.youtube.com/embed/";
function getEmbedLink(index)
{
    return embed_link_front + videoNames[index];
}

let thumbail_link_front = "https://img.youtube.com/vi/";
let thumbnail_link_back = "/0.jpg";
function getThumbnailLink(index)
{
    return thumbail_link_front + videoNames[index] + thumbnail_link_back;
}

function getImagePath(index)
{
    return "Static/Gallery/" + imageNames[index];
}

let imageGallery = document.getElementById("gallery");
let lightboxThumbnails = document.getElementById("lightbox-thumbnails");
let videoThumbnails = document.getElementById("video-thumbnails");

let selectedVideo = 0;
let selectedImage = 0;

function galleryItemClickEvent(index) {
    changeSelectedImage(index);
    showLightbox();
    LOG("gallery item clicked");
 }
function videoThumbnailClickEvent(index) {
    changeSelectedVideo(index);
    LOG("video thumbnail clicked");
}
function lightboxThumbnailClickEvent(index) {
    changeSelectedImage(index);
    LOG("lightbox thumbnail clicked");
}

// generic function for adding a contained image to a target
function addContainedImage(target, container_class, container_id, image_class, src)
{
    let container = document.createElement("div");
    container.classList.add(container_class);
    container.id = container_id;
    let image = document.createElement("img");
    image.classList.add(image_class);
    image.src = src;
    container.appendChild(image);
    target.appendChild(container);
    return container;
}

function createGalleryImage(index) {
    let container = addContainedImage(imageGallery, "gallery-item", "gallery-item-" + index, "gallery-image", getImagePath(index));
    container.addEventListener("click", galleryItemClickEvent.bind(null,index));
}

function createLightboxThumbnail(index) {
    let container = addContainedImage(lightboxThumbnails, "thumbnail-holder", "lightbox-thumbnail-" + index, "lightbox-thumbnail-image", getImagePath(index));
    container.onclick = lightboxThumbnailClickEvent.bind(null,index);
}

function createVideoThumbnail(index) {
    let container = addContainedImage(videoThumbnails, "thumbnail-holder", "video-thumbnail-" + index, "video-thumbnail-image", getThumbnailLink(index));
    container.addEventListener("click", videoThumbnailClickEvent.bind(null,index));
}

function createImageGallery() {
    for (let i = 0; i < imageNames.length; i++) {
        createGalleryImage(i);
    }
    LOG("created image gallery");
}

function createVideoGallery() {
    for (let i = 0; i < videoNames.length; i++) {
        createVideoThumbnail(i);
    }
    LOG("created video gallery");
}

function createLightboxGallery() {
    for (let i = 0; i < imageNames.length; i++) {
        createLightboxThumbnail(i);
    }
    LOG("created lightbox gallery");
}

function calculateThumbnailOffset(index) {
    let first_thumbnail = document.getElementById("lightbox-thumbnail-0");
    LOG("first thumbnail offset: " + first_thumbnail.offsetLeft)
    let thumbnail = document.getElementById("lightbox-thumbnail-" + index);
    LOG("thumbnail offset: " + thumbnail.offsetLeft)
    let offset = first_thumbnail.offsetLeft - thumbnail.offsetLeft;
    LOG("offset: " + offset);
    return offset;
}

function changeSelectedVideo(index) {
    let animationIframe = document.getElementById("animation-iframe");
    animationIframe.src = embed_link_front + videoNames[index];
    //update CSS
    let oldSelected = document.getElementById("video-thumbnail-" + selectedVideo);
    if (oldSelected != null)
        oldSelected.classList.remove("selected");
    let newSelected = document.getElementById("video-thumbnail-" + index);
    if (newSelected != null)
        newSelected.classList.add("selected");
    //update index
    selectedVideo = index;
    LOG("updated selected video");
}

function changeSelectedImage(index) {
    let lightboxImage = document.getElementById("lightbox-main-image");
    lightboxImage.src = getImagePath(index);
    //update CSS
    let oldSelected = document.getElementById("lightbox-thumbnail-" + selectedImage);
    if (oldSelected != null)
        oldSelected.classList.remove("selected");
    let newSelected = document.getElementById("lightbox-thumbnail-" + index);
    if (newSelected != null)
        newSelected.classList.add("selected");
    //update index
    selectedImage = index;
    LOG("updated selected image");
    let offset = calculateThumbnailOffset(index);
    LOG("offset: " + offset);
    lightboxThumbnails.style.transform = "translateX(" + offset + "px)";
}

function previousImage() {
    let newIndex = selectedImage - 1;
    if (newIndex < 0)
        newIndex = imageNames.length - 1;
    changeSelectedImage(newIndex);
}

function nextImage() {
    let newIndex = selectedImage + 1;
    if (newIndex >= imageNames.length)
        newIndex = 0;
    changeSelectedImage(newIndex);
    LOG("next image called");
}

function nextVideo() {
    let newIndex = selectedVideo + 1;
    if (newIndex >= videoNames.length)
        newIndex = 0;
    changeSelectedVideo(newIndex);
    LOG("next video called");
}

function previousVideo() {
    let newIndex = selectedVideo - 1;
    if (newIndex < 0)
        newIndex = videoNames.length - 1;
    changeSelectedVideo(newIndex);
}

function showLightbox() {
    let overlay = document.getElementById("lightbox-overlay");
    overlay.style.display = "block";
    document.body.classList.add("no-scroll");
    LOG("showed image viewer");
}

function hideLightbox() {
    let imageViewer = document.getElementById("lightbox-overlay");
    imageViewer.style.display = "none";
    document.body.classList.remove("no-scroll");
    LOG("hid image viewer");
}

function addLightboxEventListeners() {
    let closeButton = document.getElementById("lightbox-close");
    closeButton.addEventListener("click", hideLightbox);
    let previousButton = document.getElementById("lightbox-previous");
    previousButton.addEventListener("click", previousImage);
    let nextButton = document.getElementById("lightbox-next");
    nextButton.addEventListener("click", nextImage);
}

let mouseDown = false;
let mouseDownX = 0;
let mouseDownY = 0;

function lightboxMouseDown(event) {
    mouseDown = true;
    mouseDownX = event.clientX;
    mouseDownY = event.clientY;
    //check for touch event
    if (event.touches != null) {
        mouseDownX = event.touches[0].clientX;
        mouseDownY = event.touches[0].clientY;
    }
    LOG("mouse down at: " + mouseDownX + ", " + mouseDownY);
}

function lightboxMouseUp(event) {
    LOG("mouse up");
    mouseDown = false;
}

function lightboxMouseMove(event) {
    if (mouseDown) {
        let deltaX = event.clientX - mouseDownX;
        let deltaY = event.clientY - mouseDownY;
        //check for touch event
        if (event.touches != null) {
            deltaX = event.touches[0].clientX - mouseDownX;
            deltaY = event.touches[0].clientY - mouseDownY;
        }
        LOG("delta: " + deltaX + ", " + deltaY);
        let image = document.getElementById("lightbox-main-image");
        image.style.transform = "translate(" + deltaX + "px, " +  deltaY + "px)";
    }
}

function addCustomMouseEventsLightbox() {
    let mainImage = document.getElementById("lightbox-main-image");
    mainImage.addEventListener("mousedown", lightboxMouseDown);
    mainImage.addEventListener("mouseup", lightboxMouseUp);
    mainImage.addEventListener("mousemove", lightboxMouseMove);
    mainImage.addEventListener("mouseleave", lightboxMouseUp);
    //touch
    mainImage.addEventListener("touchstart", lightboxMouseDown);
    mainImage.addEventListener("touchend", lightboxMouseUp);
    mainImage.addEventListener("touchmove", lightboxMouseMove);
    mainImage.addEventListener("touchcancel", lightboxMouseUp);

}


function addVideoEventListeners() {
    let previousButton = document.getElementById("animation-previous");
    previousButton.addEventListener("click", previousVideo);
    let nextButton = document.getElementById("animation-next");
    nextButton.addEventListener("click", nextVideo);
}


function onLoad() {
    //create gallery on load
    createImageGallery();
    createVideoGallery();
    createLightboxGallery();
    addLightboxEventListeners();
    addCustomMouseEventsLightbox();
    addVideoEventListeners();
    changeSelectedVideo(0);
    changeSelectedImage(0);

    LOG("onload called");
}

if(!DEBUG)
    begin();








