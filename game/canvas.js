let _canvas, _ctx;

_canvas =  document.getElementById("canvas");
_ctx = _canvas.getContext("2d");
_canvas.width = 800;
_canvas.height = 800;

let image = new Image();
image.src = 'img/start.jpeg';
image.onload = function(){
    _ctx.drawImage(image, 0, 0, _canvas.width, _canvas.height);
}


let pixelify = new FontFace(
    "Pixelify",
    "url(fonts/PixelifySans-Regular.ttf)"
);

pixelify.load().then((font) => {
    document.fonts.add(font);
});