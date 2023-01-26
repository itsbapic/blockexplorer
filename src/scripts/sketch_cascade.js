// LETTER
var typeX, typeY, typeStroke, tracking;

var lineSpace = 10;

var yBlock;
var yField;
var typeYfigure;
var rows = 4;
var SA;

// WAVE
var waveSize, waveLength;
var waveSpeed;
var slope;

var maxFrame;

// STRING
var letter_select, inp, inpText;
var myText = [];
var doubleQuoteSwitch = 1;
var singleQuoteSwitch = 1;

// COLOR
var bkgdColor = 0;
var inp1, inp2, inp3, inp4, inp5;
var inpNumber = 2;

// SAVE BETA
var gifLength = 157;
var gifStart, gifEnd;
var gifRecord = false;
var canvas;
var pdSave;

var capturer = new CCapture({
  framerate: 60,
  format: 'gif',
  workersPath: 'js/',
  verbose: true
});

function preload() {
  font = loadFont('assets/IBMPlexMono-Regular.otf');
}

function setup() {
  var p5SaveCanvas = createCanvas(windowWidth, windowHeight);
  canvas = p5SaveCanvas.canvas;

  background(bkgdColor);
  smooth();
  textFont(font);

  inp = select("#textfield");

  typeXSlider = createSlider(0, 100, 20); typeXSlider.position(25, 20); typeXSlider.style('width', '100px');
  typeStrokeSlider = createSlider(0, 5, 2, 0.5); typeStrokeSlider.position(25, 50); typeStrokeSlider.style('width', '100px');
  trackingSlider = createSlider(0, 100, 10); trackingSlider.position(25, 80); trackingSlider.style('width', '100px');
  lineSpaceSlider = createSlider(0, 100, 20); lineSpaceSlider.position(25, 110); lineSpaceSlider.style('width', '100px');
  rowSlider = createSlider(0, 100, 14, 2); rowSlider.position(25, 160); rowSlider.style('width', '100px');

  waveLengthSlider = createSlider(0, 1, 0.13, 0.01); waveLengthSlider.position(25, 220); waveLengthSlider.style('width', '100px');
  waveSpeedSlider = createSlider(0, 10, 1); waveSpeedSlider.position(25, 250); waveSpeedSlider.style('width', '100px');
  slopeSlider = createSlider(0, PI, 1, 0.1); slopeSlider.position(25, 280); slopeSlider.style('width', '100px');

  inp0check = createCheckbox('', false); inp0check.position(150, 57);
  inp1 = createColorPicker('#000000'); inp1.position(170, 105); inp1.style('width', '20px');
  inp1check = createCheckbox('', true); inp1check.position(150, 107);
  inp2 = createColorPicker('#ffffff'); inp2.position(170, 135); inp2.style('width', '20px');
  inp2check = createCheckbox('', false); inp2check.position(150, 137);
  inp3 = createColorPicker('#ff0000'); inp3.position(170, 165); inp3.style('width', '20px');
  inp3check = createCheckbox('', false); inp3check.position(150, 167);
  inp4 = createColorPicker('#ffff00'); inp4.position(170, 195); inp4.style('width', '20px');
  inp4check = createCheckbox('', false); inp4check.position(150, 197);
  inp5 = createColorPicker('#0000ff'); inp5.position(170, 225); inp5.style('width', '20px');
  inp5check = createCheckbox('', false); inp5check.position(150, 227);

  bkgdColorPicker = createColorPicker('#FFFFFF'); bkgdColorPicker.position(152, 280); bkgdColorPicker.style('width', '40px');

  inp1check.changed(inp1checker);
  inp2check.changed(inp2checker);
  inp3check.changed(inp3checker);
  inp4check.changed(inp4checker);
  inp5check.changed(inp5checker);

  mosaicSet = createButton('Mosaic'); mosaicSet.position(80, height - 190); mosaicSet.mousePressed(mosaic);

  yField = height - 50;
  pdSave = pixelDensity();
}

function draw() {
  if (gifRecord == true) {
    pixelDensity(1);
  } else {
    pixelDensity(pdSave);
  }

  bkgdColor = bkgdColorPicker.value();
  background(bkgdColor);

  fill(50, 200, 250);
  noStroke();
  textSize(9);

  noFill();
  strokeWeight(1); strokeJoin(ROUND);
  stroke(50, 200, 250);

  inpText = String(inp.value());
  runLength = inpText.length;

  typeX = typeXSlider.value();
  typeXSlider.value(15);
  typeStroke = typeStrokeSlider.value();
  typeStrokeSlider.value(1.5);
  tracking = trackingSlider.value();
  trackingSlider.value(13);
  lineSpace = lineSpaceSlider.value();
  lineSpaceSlider.value(12);
  rows = rowSlider.value();
  rowSlider.value(6);

  mosaic()


  waveLength = waveLengthSlider.value();
  waveLengthSlider.value(1.5);

  waveSpeed = waveSpeedSlider.value() / 100;
  waveSpeedSlider.value(3);

  slope = slopeSlider.value();
  slopeSlider.value(3.14);

  inp0check.checked(true);


  SA = typeStroke / 2;
  doubleQuoteSwitch = 1;
  singleQuoteSwitch = 1;

  let step = (sq(rows) + rows) / 2;

  yBlock = yField / step;

  let waveBlock = 2 * PI / rows;

  push();
  translate(width / 2, height / 2);
  translate(-(runLength * typeX + tracking * (runLength - 1)) / 2, -yField / 2);

  for (var k = 0; k < runLength; k++) {
    push();
    for (var i = 0; i < rows; i++) {
      setTextOnlyColor(i);

      letter_select = k;

      if (waveSpeed > 0) {
        typeYfigure = map(sinEngine(i, waveBlock, k, waveLength, waveSpeed, slope), -1, 1, yBlock, rows * yBlock);
      } else {
        typeYfigure = (rows - i) * yBlock;
      }
      typeY = typeYfigure - typeYfigure * (lineSpaceSlider.value() / 100);
      lineSpace = typeYfigure * (lineSpaceSlider.value() / 100);

      push();
      translate(typeX * k + tracking * k, 0);
      translate(0, lineSpace / 2);
      stroke(strkColor); strokeWeight(typeStroke); noFill();
      keyboardEngine();
      pop();
      translate(0, typeYfigure);
    }
    pop();
  }

  pop();
}

function sinEngine(aCount, aLength, bCount, bLength, Speed, slopeN) {
  var sinus = sin((-frameCount * Speed + aCount * aLength + bCount * bLength));
  var sign = (sinus >= 0 ? 1 : -1);
  var sinerSquare = sign * (1 - pow(1 - abs(sinus), slopeN));
  return sinerSquare;
}

function inp1checker() {
  inp2check.checked(false);
  inp3check.checked(false);
  inp4check.checked(false);
  inp5check.checked(false);
  inpNumber = 1;
}

function inp2checker() {
  inp1check.checked(true);
  inp3check.checked(false);
  inp4check.checked(false);
  inp5check.checked(false);
  if (this.checked()) {
    inpNumber = 2;
  } else {
    inpNumber = 1;
  }
}

function inp3checker() {
  inp1check.checked(true);
  inp2check.checked(true);
  inp4check.checked(false);
  inp5check.checked(false);
  if (this.checked()) {
    inpNumber = 3;
  } else {
    inpNumber = 2;
  }
}

function inp4checker() {
  inp1check.checked(true);
  inp2check.checked(true);
  inp3check.checked(true);
  inp5check.checked(false);
  if (this.checked()) {
    inpNumber = 4;
  } else {
    inpNumber = 3;
  }
}

function inp5checker() {
  inp1check.checked(true);
  inp2check.checked(true);
  inp3check.checked(true);
  inp4check.checked(true);
  if (this.checked()) {
    inpNumber = 5;
  } else {
    inpNumber = 4;
  }
}

function setTextOnlyColor(switcher) {
  if (inpNumber == 6) {
    if (switcher % 6 == 0) { strkColor = inp1.value(); }
    if (switcher % 6 == 1) { strkColor = inp2.value(); }
    if (switcher % 6 == 2) { strkColor = inp3.value(); }
    if (switcher % 6 == 3) { strkColor = inp4.value(); }
    if (switcher % 6 == 4) { strkColor = inp5.value(); }
    if (switcher % 6 == 5) { strkColor = inp6; }
  } else if (inpNumber == 5) {
    if (switcher % 5 == 0) { strkColor = inp1.value(); }
    if (switcher % 5 == 1) { strkColor = inp2.value(); }
    if (switcher % 5 == 2) { strkColor = inp3.value(); }
    if (switcher % 5 == 3) { strkColor = inp4.value(); }
    if (switcher % 5 == 4) { strkColor = inp5.value(); }
  } else if (inpNumber == 4) {
    if (switcher % 4 == 0) { strkColor = inp1.value(); }
    if (switcher % 4 == 1) { strkColor = inp2.value(); }
    if (switcher % 4 == 2) { strkColor = inp3.value(); }
    if (switcher % 4 == 3) { strkColor = inp4.value(); }
  } else if (inpNumber == 3) {
    if (switcher % 3 == 0) { strkColor = inp1.value(); }
    if (switcher % 3 == 1) { strkColor = inp2.value(); }
    if (switcher % 3 == 2) { strkColor = inp3.value(); }
  } else if (inpNumber == 2) {
    if (switcher % 2 == 0) { strkColor = inp1.value(); }
    if (switcher % 2 == 1) {
      strkColor = inp2.value();
    }
  } else if (inpNumber == 1) {
    strkColor = inp1.value();
  }
}

function mosaic() {
  // typeXSlider.value(15); 
  // typeStrokeSlider.value(1.5);
  // trackingSlider.value(13);
  // lineSpaceSlider.value(12);
  // rowSlider.value(6);
  // waveLengthSlider.value(1.5);
  // waveSpeedSlider.value(3);
  // slopeSlider.value(3.14);
  // inp0check.checked(true);

  inp1.value('#ffffff');

  inp1check.checked(true);


  bkgdColorPicker.value('#000000');
  inp.value("0xdb85b26a14e9a9b4bcabb3dde627375137a192c35b465fec920b4f12506c5174");
  inpNumber = 1;
}