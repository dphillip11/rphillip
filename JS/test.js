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
}
//append the thumbnail to the target gallery
function createVideoGalleryThumbnail(target, link, index) {
    let gallery_item = document.createElement("div");
    gallery_item.classList.add("thumbnail-holder");
    gallery_item.id = "thumbnail-" + index;
    let thumbnail = document.createElement("img");
    thumbnail.src = thumbail_link_front + link + thumbnail_link_back;
    thumbnail.classList.add("gallery-thumbnail");
    gallery_item.appendChild(thumbnail);
    target.appendChild(gallery_item);
}

function createImageGallery() {
    for (let i = 0; i < imageNames.length; i++) {
        createGalleryItem(gallery, imageNames[i], "image", i);
    }
}
function createVideoGallery() {
    for (let i = 0; i < videoNames.length; i++) {
        createVideoGalleryThumbnail(thumbnails, videoNames[i], "thumbnail", i + imageNames.length);
    }
}

function onLoad() {
    //create gallery on load
    createImageGallery();
    createVideoGallery();
}

fetchNames(imageNames, 'Static/file_names.txt', FetchImagesCallback);
;


