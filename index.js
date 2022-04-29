let html = document.documentElement;
let canvas = document.getElementById("hero-lightpass");
let context = canvas.getContext("2d");

let frameCount = 46;
let currentFrame = index => (
    /* `images/final.png`*/
    `images/airy_scrolling/airy${index.toString().padStart(2, '0')}.png`
)

let preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
        let img = new Image();
        img.src = currentFrame(i);
    }
};

let img = new Image()
img.src = currentFrame(1);
canvas.width = 1158;
canvas.height = 770;
var wrh = img.width / img.height;
var newWidth = canvas.width;
var newHeight = newWidth / wrh;
if (newHeight > canvas.height) {
    newHeight = canvas.height;
    newWidth = newHeight * wrh;
}
var xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;
img.onload = function () {
    context.drawImage(img, xOffset,
        yOffset, newWidth, newHeight);
}

let updateImage = index => {
    img.src = currentFrame(index);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, xOffset,
        yOffset, newWidth, newHeight);
}

window.addEventListener('scroll', () => {
    let scrollTop = html.scrollTop;
    let maxScrollTop = html.scrollHeight - window.innerHeight;
    let scrollFraction = scrollTop / maxScrollTop;
    let frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages();
