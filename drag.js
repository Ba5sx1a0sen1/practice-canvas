// let dragEle = document.querySelector('.dragArea')
// let dropEle = document.querySelector('.dropArea')
// dragEle.addEventListener('dragstart', (e) => {
//   e.dataTransfer.setData('text/plain', 'This drag')
//   console.log(e)
// })

// dropEle.addEventListener('dragenter', (e) => {
//   e.preventDefault()
//   console.log(e)
//   e.target.style.backgroundColor = 'red'
// })

// dropEle.addEventListener('dragleave', (e) => {
//   e.target.style.backgroundColor = 'orangered'
// })
CanvasRenderingContext2D.prototype.addGrid = function (delta, color, fontParams) {
  // define the default values for the optional arguments
  if (! arguments[0]) { delta = 25; }
  if (! arguments[1]) { color = 'blue'; }
  if (! arguments[2]) { fontParams = '8px sans-serif'; }
  // extend the canvas width and height by delta
  var oldWidth = this.canvas.width;
  var oldHeight = this.canvas.height;      
  this.canvas.width = oldWidth + delta;
  this.canvas.height = oldHeight + delta;        
  // draw the vertical and horizontal lines
  this.lineWidth = 0.1;
  this.strokeStyle = color;
  this.font = fontParams;
  this.beginPath();
  for (var i = 0; i * delta < oldWidth; i ++) {
    this.moveTo (i * delta, 0);
    this.lineTo (i * delta, oldHeight);
  }
  for (var j = 0; j * delta < oldHeight; j ++) {
    this.moveTo (0, j * delta);
    this.lineTo (oldWidth, j * delta);
  }      
  this.closePath();
  this.stroke();
  // draw a thicker line, which is the border of the original canvas
  this.lineWidth = 0.5;
  this.beginPath();
  this.moveTo(0,0);
  this.lineTo(oldWidth,0);
  this.lineTo(oldWidth,oldHeight);
  this.lineTo(0,oldHeight);
  this.lineTo(0,0);
  this.closePath();
  this.stroke();
  // set the text parameters and write the number values to the vertical and horizontal lines
  this.font = fontParams
  this.lineWidth = 0.3;
  // 1. writing the numbers to the x axis
  var textY = oldHeight + Math.floor(delta/2); // y-coordinate for the number strings
  for (var i = 0; i * delta <= oldWidth; i ++) {
    this.strokeText (i * delta, i * delta, textY);        
  }
  // 2. writing the numbers to the y axis
  var textX = oldWidth + 5; // x-coordinate for the number strings
  for (var j = 0; j * delta <= oldHeight; j ++) {
    this.strokeText (j * delta, textX, j * delta);
  }
};