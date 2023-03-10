// note for choosing a density. higher samples might be more 'realistic'
// however as the thresholds become increasingly narrower, the image will become more and more restless
// therefor a 10 step samplerate is currently in use.

// also, put more spaces in front of it to increase the threshold of dark/bright

// const density = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~i!lI;;;;::::,,,,\"\"\"\"^^^^````''''....    ";
// const density = "ÆÑÊŒØMÉËÈÃÂWQBÅæ#NÁþEÄÀHKRŽœXgÐêqÛŠÕÔA€ßpmãâG¶øðé8ÚÜ$ëdÙýèÓÞÖåÿÒb¥FDñáZPäšÇàhû§ÝkŸ®S9žUTe6µOyxÎ¾f4õ5ôú&aü™2ùçw©Y£0VÍL±3ÏÌóC@nöòs¢u‰½¼‡zJƒ%¤Itocîrjv1lí=ïìi7†[¿?×}*{+()\/»«•¬|!¡÷¦¯—^ª„”“~³º²–°­¹‹›;:’‘‚’˜ˆ¸…·¨´` ";
// const density = "$@B%8WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~i!lI;:,\"^`'.              ";
const density = " .:-=+*#%@";

let video;
let asciiDiv;

const maxFrameRate = 30;

let videoWidth, videoHeight;

// check if screen is portrait, if yes, most likely mobile
if (window.innerHeight > window.innerWidth) {
  videoHeight = 80
  videoWidth = Math.floor((videoHeight / 4) * 3);
} else {
  videoWidth = 200; 
  // for minimal image warping, keep a 4:3 aspect ratio
  videoHeight = Math.floor((videoWidth / 4) * 3);
}

// ideas:
// displaying text as overlay of ascii

const setUsableScreenspace = () => {
  // calculate usable screenspace
  exampleLine = '_'.repeat(videoWidth)
  exampleDiv = document.createElement('span')
  exampleDiv.innerHTML = exampleLine
  document.body.appendChild(exampleDiv)

  // delayed because render needs moment to display before grabbing it
  setTimeout(() => {
    // multiply font size by this
    charMulti = window.innerWidth / exampleDiv.offsetWidth

    let style = window.getComputedStyle(document.body, null).getPropertyValue('font-size');
    let newFontSize = parseFloat(style); 
  
    document.body.style.fontSize = (newFontSize * charMulti)+ 'px'

    // set lineheight when other stuff is fixed
    document.body.style.lineHeight = (newFontSize * charMulti) / 1.4 + 'px'

    // remove example line when calculations are done
    document.body.removeChild(exampleDiv)

  }, 500);
}

function setup() {
  noCanvas()
  frameRate(maxFrameRate)

  video = createCapture(VIDEO)
  video.size(videoWidth, videoHeight)
  video.hide()
  
  asciiDiv = createDiv()

  setUsableScreenspace()

}

function draw (){

  video.loadPixels()
  
  let asciiImage = '';
  for (let j = 0; j < video.height; j++) {
    let row = '';
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];

      // Luminance
      const grey = r * 0.3 + g * 0.59 + b * 0.11;
      
      const len = density.length
      const charIndex = floor(map(grey, 0, 255, 0, len))

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
        row += ';psbn&' // crazy, but the below backwards, as the html will be mirrored
        // row += '&nbsp;'
      } else {
        row += c;
      }
    }
    row = row.split('').reverse().join('');
    // console.log(getFrameRate());
    asciiImage += row
    asciiImage += '<br/>'
  }

  asciiDiv.html(asciiImage)
}

