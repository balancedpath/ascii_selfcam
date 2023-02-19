const density = "Ñ@#W$9876543210?!abc;:+=-,._";

let loadedImage;

function preload() {
  video = loadImage("car_100.jpg");
}

// ideas:
// displaying text as overlay of ascii

function setup() {
  noCanvas()

  // image(loadedImage, 0, 0, width, height)
  background(0)

  let w = width / video.width
  let h = height / video.height

  video.loadPixels()
  
  for (let j = 0; j < video.height; j++) {
    let row = '';
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + b + g) / 3;
      
      const len = density.length
      const charIndex = floor(map(avg, 0, 255, len, 0))

      // noStroke()
      // fill(255) // tie this to brightness when its not ascii density representation
      // rect(i*w, j*h, w)

      // textSize(w)
      // textAlign(CENTER, CENTER)
      // text(
      //   density.charAt(charIndex),
      //   i * w + w * 0.5,
      //   j * h + h * 0.5
      // );
      const c = density.charAt(charIndex)
      if (c == ' '){
        row += '&nbsp;'
      } else {
        row += c;
      }
    }
    console.log(row);
    createDiv(row)
  }
}

