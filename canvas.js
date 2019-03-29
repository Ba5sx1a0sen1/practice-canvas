let canvas = document.querySelector('#canvas')
canvas.width = 400
canvas.height = 400
let ctx = canvas.getContext('2d')
let upload = document.querySelector('#upload')
//用于清除画布
const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height
const hudu = Math.PI / 180

console.log(CANVAS_WIDTH,CANVAS_HEIGHT)
ctx.lineWidth = 10
ctx.lineCap = 'round'
ctx.lineJoin = 'round'

// drawManual()
addUploadEvent()
// drawLine()
// drawCircle()

function drawLine() {
  ctx.beginPath()
  ctx.moveTo(10,10)
  ctx.lineTo(50,50)
  ctx.lineTo(100,50)
  ctx.closePath()
  ctx.stroke()
}

function drawCircle() {
  ctx.moveTo(150,75)
  ctx.arc(150,75,25,0,hudu*240)
  ctx.closePath()
  ctx.stroke()
  ctx.fillStyle = 'rgba(232,122,156,0.5)'
  ctx.fill()
}

function drawManual() {
  // let clearButton = document.querySelector('#clear')
  // clearButton.addEventListener('click', (e) => {
  //   ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  // })
  let isClick = false
  canvas.addEventListener('mousemove', (e) => {
    // console.log(isClick)
    console.log(e)
    if (!isClick) { 
      return false;
    } else {
      const x = e.offsetX
      const y = e.offsetY
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  })
  
  canvas.addEventListener('mousedown', (e) => {
    isClick = true
    const x = e.offsetX
    const y = e.offsetY
    ctx.moveTo(x, y)
  })

  canvas.addEventListener('mouseup', (e) => {
    isClick = false
  })

  canvas.addEventListener('mouseleave', (e) => {
    isClick = false
  })
}

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = function() {
      const { result } = fileReader
      resolve(result)
    }
    fileReader.readAsDataURL(file)
  })
}

function addUploadEvent() {
  upload.addEventListener('change', (e) => {
    const file = e.target.files[0]
    let fileReader = new FileReader()
    fileReader.onload = function () {
      const { result } = fileReader
      const image = new Image
      image.onload = function () {
        console.log(image.width,image.height)
        const ratio = image.height / image.width
        console.log(ratio)
        canvas.height = ratio * canvas.width
        const { width, height } = canvas
        ctx.clearRect(0,0,width,height)
        ctx.drawImage(image,0,0,width,height)
      }
      image.src = result
    }
    if (file) {
      if (/\.(jpe?g|png|gif|jpg)$/i.test(file.name)){
        fileReader.readAsDataURL(file)
      } else {
        const { width, height } = canvas
        ctx.font = '24px sans-serif'
        ctx.textAlign = 'center'
        ctx.clearRect(0,0,width,height)
        ctx.fillText('请上传正确格式的图片', width / 2, height / 2)
      }
    }
  })
}

// drawLineAni()
function drawLineAni() {
  let x = 10,y =10
  function ltr() {
    if( x >= 390 ) {
      return false
    }
    ctx.lineTo(x, y)
    ctx.stroke()
    x += 20
    requestAnimationFrame(ltr)
  }
  function topToDown() {
    if( y >= 390) {
      ltr()
      return false
    }
    ctx.lineTo(x, y)
    ctx.stroke()
    y += 20
    requestAnimationFrame(topToDown)
  }
  function rtl() {
    if (x <= 10) {
      topToDown()
      return false
    }
    ctx.lineTo(x, y)
    ctx.stroke()
    x -= 20
    requestAnimationFrame(rtl)
  }
  function downToTop() {
    if ( y <= 10) {
      rtl()
      return false
    }
    ctx.lineTo(x,y)
    ctx.stroke()
    y -= 20
    requestAnimationFrame(downToTop)
  }
  function ani(){
    if (x >= 390 || y >= 390) {
      downToTop()
      return false
    }
    ctx.moveTo(10,10)
    ctx.lineTo(x, y)
    ctx.stroke()
    x = x + 20
    y = y + 20
    requestAnimationFrame(ani)
  }
  ani()
}

const context = document.getElementById('can').getContext('2d')
const can = document.querySelector('#can')
context.addGrid(25)
context.strokeStyle = 'green';        // set the color for the circle to 'green'
context.lineWidth = 5.0;              // set the lineWidth for the circle to 5.0
context.beginPath();                  // start a new path
context.arc (100,100,80,0,2*Math.PI); // a circle with center point (100,100) and radius 80
context.stroke();                     // draw the path; in this case only the circle