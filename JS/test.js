let light_blue = (40, 143, 180);
let dark_blue = (29, 85, 111);
let beige = (239, 221, 178);
let red = (250, 54, 10);

let image_paths = [];

fetch('file_names.txt')
  .then(response => response.text())
  .then(data => {
    const fileNames = data.split(',').map(fileName => fileName.trim().replace(/"/g, ''));
    
    fileNames.forEach(fileName => {
      image_paths.push("Static/Gallery/" + fileName);
    });

    // The data has been processed, now you can use the image_paths array
    createGallery();
  })
  .catch(error => {
    console.error('Error reading file:', error);
  });

let video_paths = ["_msV5WNpCBA", "frNrP5eVZbg","2hND6p_URAw","TmcVo-qb8Fs", "oqfpHw8BV_c", "qEQmj6LcMTk", "m6K-4fqicnQ"];

let embed_link = "https://www.youtube.com/embed/";

let thumbail_link_front = "https://img.youtube.com/vi/";
let thumbnail_link_back = "/0.jpg";

let gallery = document.getElementById("gallery");

function createGalleryItem(path, type, index) {
    let gallery_item = document.createElement("div");
    gallery_item.classList.add("gallery-item");
    gallery_item.id = "gallery-item-" + index;
    //fill with image
    if (type == "image") {
        let image = document.createElement("img");
        image.src = path;
        image.classList.add("gallery-image");
        gallery_item.appendChild(image);
    }
    //fill with video
    else if (type == "thumbnail") {
        //fill with thumbnail
        let thumbnail = document.createElement("img");
        thumbnail.src = thumbail_link_front + path + thumbnail_link_back;
        thumbnail.classList.add("gallery-thumbnail");
        gallery_item.appendChild(thumbnail);
    }
    //add to gallery
    gallery.appendChild(gallery_item);
}

function createGallery() {
    for (let i = 0; i < image_paths.length; i++) {
        createGalleryItem(image_paths[i], "image", i);
    }
    for (let i = 0; i < video_paths.length; i++) {
        createGalleryItem(video_paths[i], "thumbnail", i + image_paths.length);
    }
}


function onLoad() {
    //create gallery on load
    createGallery();
}


