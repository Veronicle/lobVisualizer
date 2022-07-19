// used to help my tutoring of students in algebra and more

var data = []

let canvasWidth = 600
let canvasHeight = 600

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function mousePressed() {
  var xLocation = map(mouseX, 0, width, 0, 1)
  var yLocation = map(mouseY, 0, height, 1, 0)

  var dot = createVector(xLocation, yLocation)
  data.push(dot)
  }

function draw() {
  
  background(132, 165, 184);
  
  stroke(66, 104, 124) // medium blue
  strokeWeight(8) // axes have a thickness of 8
  line(canvasWidth/2, 0, canvasWidth/2, canvasHeight) // x-axis
  line(0, canvasHeight/2, canvasWidth, canvasHeight/2) // y-axis
  
  for (let i = 0; i < data.length; i++) { // iterate through the set of pressed points
    let x = map(data[i].x, 0, 1, 0, width); // map x-value to a defined location within the window
    let y = map(data[i].y, 0, 1, height, 0); // map y-value to a defined locationw within the window
    fill('rgba(255, 255, 255, 0.75)');  // added opacity effect for white points
    noStroke() // no border around points
    ellipse(x,y,10,10);  // white points
  }
  
  if(data.length > 1) { // as long as there is enough dat for a line (at least 2 points), the LOB will be calculated and shown
    linReg();
    drawLine();
  }

}

// based on y = mx + b (slope-intercept form of line)
var m = 1; // slope
var b = 0; // y-intercept


function drawLine(){
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m* x2 + b;
  
  // sets available coordinates to areas within the canvas
  x1 = map(x1, 0, 1,0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);
  
  strokeWeight(6) // line will have thickness of 6
  stroke('rgba(255, 165, 0, 0.75)'); // line color
  line(x1, y1, x2, y2); // line is drawn
}

function linReg() { // approximate the data set using linear regression
  
  var xsum = 0;
  var ysum = 0;
  
  for (let i = 0; i < data.length; i++){ // iterating through all the points to sum up x- and y-values
    xsum += data[i].x;
    ysum += data[i].y;
  }
  
  let xmean = xsum / data.length; // avg x- and y-values calculated
  let ymean = ysum / data.length;
  
  let numerator = 0;
  let denominator = 0;
  
  for(let i = 0; i < data.length; i++){ 
    var x = data[i].x;
    var y = data[i].y;
    // using the ordinary least square method
    numerator += (x-xmean) * (y-ymean);
    denominator += (x-xmean) * (x-xmean);
  }
  
  m = numerator/denominator;
  b = ymean - m*xmean;
  
  print("The current slope is roughly " + m.toFixed(3))
}



