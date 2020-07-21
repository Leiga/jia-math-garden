
const BACKGROUND_COLOR = '#000000';
const STROKE_COLOR = '#BCFF00';
const lineWidth = 15;

var previousX = 0;
var previousY = 0;
var currentX = 0;
var currentY = 0;

var isDrawing = false;
var canvas;
var context;


function prepareCanvas() {
    //console.log('preparing canvas');
    canvas = document.getElementById('my-canvas');
    context = canvas.getContext("2d");
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    context.strokeStyle = STROKE_COLOR;
    context.lineWidth = lineWidth;
    context.lineJoin = 'round';

    document.addEventListener('mousedown', function(event){       
        previousX = event.clientX - canvas.offsetLeft;
        previousY = event.clientY - canvas.offsetTop;
        isDrawing = true;
        //console.log('mouse pressed');
    });

    document.addEventListener('mousemove', function(event){
        if(isDrawing==true){
            currentX = event.clientX - canvas.offsetLeft;
            currentY = event.clientY - canvas.offsetTop;
            drawLine(previousX, previousY, currentX, currentY);
            previousX = currentX;
            previousY = currentY;
        }
    });

    document.addEventListener('mouseup', function(event){
    //    if(isDrawing == true) {
           isDrawing = false;
           //console.log('false');
    //    }
    });

    canvas.addEventListener('mouseleave', function(event){
        isDrawing = false;
        //console.log('mouse left');
    });

    //define touch event behaviours
    canvas.addEventListener('touchstart', function(event){       
        previousX = event.touches[0].clientX - canvas.offsetLeft;
        previousY = event.touches[0].clientY - canvas.offsetTop;
        isDrawing = true;
        //console.log('touch started!');
    },{passive: true});

    canvas.addEventListener('touchmove', function(event){
        if(isDrawing==true){
            currentX = event.touches[0].clientX - canvas.offsetLeft;
            currentY = event.touches[0].clientY - canvas.offsetTop;
            drawLine(previousX, previousY, currentX, currentY);
            previousX = currentX;
            previousY = currentY;
        }
    },{passive: true});

    canvas.addEventListener('touchend', function(event){
    //    if(isDrawing == true) {
           isDrawing = false;
           //console.log('Touch ended!');
    //    }
    });

    canvas.addEventListener('touchcancel', function(event){
        isDrawing = false;
        //console.log('Touch cancelled!');
    }); 
    
    

    function drawLine(x0,y0,x1,y1) {
        // console.log(`currentX: ${currentX}`);
        context.beginPath();
        context.moveTo(x0, y0);
        // console.log(`move to : (x0 ${x0}, y0 ${y0})`);
        context.lineTo(x1, y1);
        // console.log(`line to : (x1 ${x1}, y1 ${y1})`);
        context.closePath();
        context.stroke();
    }
}

function clearCanvas(){
    var previousX = 0;
    var previousY = 0;
    var currentX = 0;
    var currentY = 0;
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}