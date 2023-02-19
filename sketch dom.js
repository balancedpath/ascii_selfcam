const density = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~i!lI;;;;::::,,,,\"\"\"\"^^^^````''''....    ";
// const density = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~i!lI;:,\"^`'. ";

let loadedImage;
let video;
let asciiDiv;

// function preload() {
//   loadedImage = loadImage("car_100.jpg");
// }

// ideas:
// displaying text as overlay of ascii

function setup() {
  noCanvas()

  video = createCapture(VIDEO)
  video.size(160, 120)
  asciiDiv = createDiv()
  frameRate(30)

  // image(loadedImage, 0, 0, width, height)
  background(0)

}

function draw (){
  // let w = width / loadedImage.width
  // let h = height / loadedImage.height

  video.loadPixels()
  
  let asciiImage = '';
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      // const avg = (r + b + g) / 3;

      // Luminance
      const grey = r * 0.3 + g * 0.59 + b * 0.11;
      
      const len = density.length
      const charIndex = floor(map(grey, 0, 255, len, 0))

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
        asciiImage += '&nbsp;'
      } else {
        asciiImage += c;
      }
    }
    // console.log(asciiImage);
    asciiImage += '<br/>'
  }

  asciiDiv.html(asciiImage)
}

