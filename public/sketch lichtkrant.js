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

function draw (){

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
      fill(grey) // tie this to brightness when its not ascii density representation

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

