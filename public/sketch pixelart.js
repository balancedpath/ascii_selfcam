let video;

const videoWidth = 60; 
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

const hslRounding = (h, s, l) => {
  // devide by 10
  const hueDiv = 12
  const newHue = Math.round(h / hueDiv) * hueDiv

  const satDiv = 10
  const newSat = Math.round(s / satDiv) * satDiv

  const lightDiv = 20
  const newLight = Math.round(l / lightDiv) * lightDiv

  return [newHue, newSat, newLight]
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
      
      /**
       * IDEA TO MAKE
       * keep track of values of every block
       * and average it out with new values
       * to create a 'tracer' effect
       */


      // noStroke()
      let [h,s,l] = rgb2hsl(r,g,b)
      colorMode(HSL)
      let [h2,s2,l2] = hslRounding(h,s,l)
      fill(h2,s2,l2) 

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

