// note for choosing a density. higher samples might be more 'realistic'
// however as the thresholds become increasingly narrower, the image will become more and more restless
// therefor a 10 step samplerate is currently in use.

// also, put more spaces in front of it to increase the threshold of dark/bright

// const density = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~i!lI;;;;::::,,,,\"\"\"\"^^^^````''''....    ";
// const density = "ÆÑÊŒØMÉËÈÃÂWQBÅæ#NÁþEÄÀHKRŽœXgÐêqÛŠÕÔA€ßpmãâG¶øðé8ÚÜ$ëdÙýèÓÞÖåÿÒb¥FDñáZPäšÇàhû§ÝkŸ®S9žUTe6µOyxÎ¾f4õ5ôú&aü™2ùçw©Y£0VÍL±3ÏÌóC@nöòs¢u‰½¼‡zJƒ%¤Itocîrjv1lí=ïìi7†[¿?×}*{+()\/»«•¬|!¡÷¦¯—^ª„”“~³º²–°­¹‹›;:’‘‚’˜ˆ¸…·¨´` ";
// const density = "$@B%8WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~i!lI;:,\"^`'.              ";
const density = " .:-=+*#%@";

const textShiftText = lichtkrantText

let video;
let asciiDiv;

// amount of characters on a line 
// as every pixel is a character, increasing this will be performance costly
const videoWidth = 80; 
// for minimal image warping, keep a 16:9 aspect ratio
const videoHeight = Math.floor((videoWidth / 16) * 9);
const maxFrameRate = 30;


const textShiftSpeed = 450
let textShiftOffset = 0;
// make the offset change every X ms
setInterval(() => {
  if (textShiftOffset < textShiftText.length) {
    textShiftOffset += 1
  } else {
    textShiftOffset = 0
  }
}, textShiftSpeed);

function setup() {
  createCanvas(displayWidth, displayHeight)
  frameRate(maxFrameRate)

  video = createCapture(VIDEO)
  video.size(videoWidth, videoHeight)
  video.hide()

  
  // setUsableScreenspace()

}

const rgb2hsl = (r, g, b) => {
  // source: https://css-tricks.com/converting-color-spaces-in-javascript/

  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  // h = Math.round(h * 60);
  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;


  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h,s,l]
}

function draw (){

  // clear()
  background(0)

  video.loadPixels()

  let w = width / video.width
  let h = height / video.height
  
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4
      const textShiftIndex = (i + j * video.width) + textShiftOffset
      
      // Luminance
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const grey = r * 0.3 + g * 0.59 + b * 0.11;
      
      // const len = density.length
      // const charIndex = floor(map(grey, 0, 255, 0, len))

      noStroke()
      const hsl = rgb2hsl(r,g,b)
      colorMode(HSL)
      fill(hsl[0],hsl[1],hsl[2]) // tie this to brightness when its not ascii density representation

      textSize(w * 2)
      textAlign(CENTER, CENTER)
      textFont('Courier')
      text(
        textShiftText[textShiftIndex % textShiftText.length],
        // density.charAt(charIndex),
        i * w - w * 0.5,
        (j * w - w * 0.5) * 1.5
        );
    }
  }
}

