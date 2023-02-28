let video;

const videoWidth = 40; 
// for minimal image warping, keep a 4:3 aspect ratio
const videoHeight = Math.floor((videoWidth / 4) * 3);
const maxFrameRate = 30;

function setup() {
  createCanvas(displayWidth, displayHeight)
  frameRate(maxFrameRate)

  video = createCapture(VIDEO)
  video.size(videoWidth, videoHeight)
  video.hide()
}

function draw (){

  clear()
  // background(0)

  video.loadPixels()

  let w = width / video.width
  let h = height / video.height
  
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4
      
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      
      // noStroke()
      const [h,s,l] = rgb2hsl(r,g,b)
      colorMode(HSL)
      fill(h,s,l) 

      rectMode(CENTER)
      rect(
        i * w - w * 0.5,
        j * w - w * 0.5,
        w,
        w        
      )
    }
  }
}

