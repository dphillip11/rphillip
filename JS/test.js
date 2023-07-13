let DEBUG = true;
function LOG(message) {
    if (DEBUG) console.log(message);
}

let light_blue = (40, 143, 180);
let dark_blue = (29, 85, 111);
let beige = (239, 221, 178);
let red = (250, 54, 10);

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

let thumbail_link_front = "https://img.youtube.com/vi/";
let thumbnail_link_back = "/0.jpg";

let gallery = document.getElementById("gallery");
let thumbnails = document.getElementById("thumbnails");

//appends the image to the target gallery
function createGalleryItem(target, path, index) {
    let gallery_item = document.createElement("div");
    gallery_item.classList.add("gallery-item");
    gallery_item.id = "gallery-item-" + index;
    //fill with image
    let image = document.createElement("img");
    image.src = "Static/Gallery/" + path;
    image.classList.add("gallery-image");
    gallery_item.appendChild(image);
    target.appendChild(gallery_item);
    LOG("created gallery item");
}

function createVideoGalleryThumbnail(target, link, index) {
    let gallery_item = document.createElement("div");
    gallery_item.classList.add("thumbnail-holder");
    gallery_item.id = index;
    let thumbnail = document.createElement("img");
    thumbnail.src = thumbail_link_front + link + thumbnail_link_back;
    thumbnail.classList.add("gallery-thumbnail");
    gallery_item.appendChild(thumbnail);
    target.appendChild(gallery_item);
    LOG("created video gallery item");
}

function createImageGallery() {
    for (let i = 0; i < imageNames.length; i++) {
        createGalleryItem(gallery, imageNames[i], i);
    }
    LOG("created image gallery");
}

function createVideoGallery() {
    for (let i = 0; i < videoNames.length; i++) {
        createVideoGalleryThumbnail(thumbnails, videoNames[i], i);
    }
    LOG("created video gallery");
}

function UpdateSelectedVideo(index) {
    let selectedVideo = document.getElementById("animation-iframe");
    selectedVideo.src = embed_link_front + videoNames[index];
    LOG("updated selected video");
}

function SetThumbnailClickEvents()
{
    let thumbnails = document.getElementsByClassName("thumbnail-holder");
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].onclick = function () {
            UpdateSelectedVideo(thumbnails[i].id);
        }
    }
    LOG("set thumbnail click events");
}

function onLoad() {
    //create gallery on load
    createImageGallery();
    createVideoGallery();
    UpdateSelectedVideo(0);
    SetThumbnailClickEvents();
    LOG("onload called");
}

begin();








