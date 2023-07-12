var boxes = document.querySelectorAll(".box");
var enlargedItem = null;
var justEnlarged = false;

window.addEventListener("click", function () {
    if (enlargedItem != null && !justEnlarged) {
        enlargedItem.classList.remove("enlarged");
        enlargedItem.style.zIndex = "0";
        enlargedItem = null;
    }
    justEnlarged = false;
});

boxes.forEach(function (box) {
    box.addEventListener("mouseover", function () {
        box.classList.add("hovered");
    });
    box.addEventListener("mouseout", function () {
        box.classList.remove("hovered");
    });
   box.addEventListener("click", function () {
    if (enlargedItem == null) {
        enlargedItem = box;
        enlargedItem.classList.add("enlarged");
        box.style.zIndex = "100";
        justEnlarged = true;

        // Calculate relative scale and position
        var boxWidth = box.offsetWidth;
        var boxHeight = box.offsetHeight;
        var boxX = box.getBoundingClientRect().left;
        var boxY = box.getBoundingClientRect().top;
        var aspectRatio = boxWidth / boxHeight;
        
        var targetScaleX = 0.8 * window.innerHeight / (boxWidth * aspectRatio);
        var targetScaleY = 0.8 * window.innerHeight / boxHeight;
        var translateX = 0.5 * window.innerWidth - 0.4 * window.innerHeight * aspectRatio -boxX + targetScaleX * boxWidth / 2;
        var translateY = 0.05 * window.innerHeight -boxY + targetScaleY * boxHeight/2;

        // Set CSS custom property values with calculated values
        box.style.setProperty('--scaleX', targetScaleX);
        box.style.setProperty('--scaleY', targetScaleY);
        box.style.setProperty('--translateX', translateX + 'px');
        box.style.setProperty('--translateY', translateY + 'px');
    }
});

});
