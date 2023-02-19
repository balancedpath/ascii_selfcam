const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

let loadedImage;

function preload() {
  video = loadImage("car_400.png");
}

function setup() {
  createCanvas(800, 800)
  frameRate(60)
  background(10)
}

// displaying text as overlay of ascii

function draw() {
  // image(loadedImage, 0, 0, width, height)

  let w = width / video.width
  let h = height / video.height

  video.loadPixels()

  for (let i = 0; i < video.width; i++) {
    for (let j = 0; j < video.height; j++) {
      const pixelIndex = (i + j * video.width) * 4
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + b + g) / 3;
      
      noStroke()
      fill(avg)
      // rect(i*w, j*h, w)
      textSize(w)
      textAlign(CENTER, CENTER)
      text(
        'G',
        i * w + w * 0.5,
        j * h + h * 0.5
      );
    }
  }
}

