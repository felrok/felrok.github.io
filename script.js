var carsY = [30];
var carsX = [30];
var LastCarY;

var Rob = new Image();
Rob.src = "car.png";
var X = 100;
var carWidth, carLength, carWidth0;
carWidth = 40; carLength = 90; carWidth0 = 40;
var ang = 0;
//document.addEventListener("mousemove", mouseMoveHandler, false);
var mousePos, carX, carY, SpeedX, speedY, speedM, CrY, LastY, newIDX, newIDY, n, f;
speedM = 10;
carX = X;
crY = -50;
LastY = 1000;
n = 4;
var per = 8;
f=1;
carsX[0] = 1000;
carsY[0] = 1000;
var score = 0;


function init() {
    var canvas = document.getElementById('field');
        canvas.width = document.documentElement.clientWidth/3.5;
        scrW = document.documentElement.clientWidth/3.5;
        canvas.height = document.documentElement.clientHeight * 0.97;
        scrH = document.documentElement.clientHeight * 0.97;
    var context = canvas.getContext("2d");
	    //context.fillStyle = "#222";
	    //context.fillRect(0, 0, canvas.width, canvas.height);
    console.log('start');
    drawField();
    Rob.onload = function() {
        context1.save();
        context1.translate(X + carWidth/2 + 50, scrH-150 + carLength/2);
        context1.rotate(1);
        context1.drawImage(Rob, 0, 0, 40, 90);
        context1.restore();
        canvas.addEventListener("mousemove", function(evt) {
            mousePos = getMousePos(canvas, evt);
        }, false);
    };

    context.strokeStyle = "black";    
    context.lineWidth = 1;
    X0 = scrW/2;
}

function drawField() {
    
    for (let i = 0; i<=8; i++) {
        
        context.moveTo(i*scrW/7, 0);
        context.lineTo(i*scrW/7, scrH);
        context.stroke();
        context.moveTo(600, 0);
        context.lineTo(600, scrH);
        context.stroke();
    }
}



function frame() {
    context.clearRect(0,0,scrW,scrH);
    context.beginPath();
    
    for (let i = 0; i<=8; i++) {
        context.moveTo(i*scrW/7, 0);
        context.lineTo(i*scrW/7, scrH);
        context.stroke();
        context.moveTo(600, 0);
        context.lineTo(600, scrH);
        context.stroke();
    }
    //document.getElementById("1").innerHTML = ang+"<br>"+speedY+"<br>"+carsY.arrayLength+"<br>"+carY+"<br>"+carsY+"<br>"+scrH;
    //document.getElementById("2").innerHTML = speedY;
    //alert(mousePos.x)
    //ang+=5;
    context1.clearRect(0,0,100000,100000);
    context1.beginPath();
    context1.save();
    carX=carX + f*speedM * Math.sin(ang)*2;
    //carX=scrW/2;
    carY=scrH-200 + carLength/2;
    let ang0=ang;
    if (mousePos.y-carY < 30) {}
    ang=Math.atan((-mousePos.x + carX)/(mousePos.y - carY));
    if ((Math.tan(ang) >= 1) || (Math.tan(ang)<=-1)) {
        ang=ang0;
    }
    context1.translate(carX, carY);
    //context1.rotate(ang);
    context1.drawImage(Rob, -carWidth/2, 0, carWidth, carLength);
    context1.restore();
    speedY = f*speedM;
    if (carWidth<=scrW*0.25) {
        carWidth+=0.1;
        carLength+=0.03;
    }

    for (let i in carsX) {
        carsY[i]+=speedY;
        if (i==0){
            LastY=carsY[i];
        }
        //context.rect(carX - 10, carY + 10, 20, 20);
        //context.fill();
        //context.stroke();
        context.rect(carsX[i]-100, carsY[i], 50, 100);
        context.fill();
        context.stroke();
        //console.log(carsY[i]);
        if (carsY[i]>scrH+10) {
            newIDY = carsY.splice(i,999);
            newIDX = carsX.splice(i,999);
        }
        if (   ((carsY[i] >= carY && carsY[i] <= carY + carLength) || (carsY[i] + 100 >= carY && carsY[i] + 100 <= carY + carLength) ) && (carsY[i]<=scrH)){
            //alert('got: '+carsY[i]+" & "+carY);
        if ( (carsX[i] - 100 >= carX - carWidth/2 && carsX[i] - 100 <= carX + carWidth/2) || (carsX[i] - 50 >= carX - carWidth/2 && carsX[i] - 50 <= carX - carWidth/2) ) {
            //alert('1');
                //setTimeout("alert('got!')", 10);
                crash();
                //setTimeout("alert('crash! cY: '+carsY[i]+" cX:" + carsX[i] + " y: "+carY+" x: "+carX)", 250);
            }
        }
    }
    
    if (per==-1) {
        per = Math.floor(Math.random() / 2);
    }
    //console.log(LastY);
    //console.log(carsY.arrayLength);
    if (LastY>300) {
        
        for (let i=1; i<=n; i++) {
            if (Math.random()>1-per/100) {
                console.log(i*scrW/n);
                carsX.unshift(i*scrW/n);
                carsY.unshift(-100);
                console.log(i);
                LastY=-100;
            }
        }
    }
    context.fill();
    context.stroke();
    f+=0.001;
    if (carX<0 || carX>scrW+1) {
        crash();
    }
    score+=speedY/50;
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function crash() {
    clearInterval(refreshIntervalId);
    clearInterval(refreshScore);
    audio.pause();
    crashA.play();
}

function updScore() {
    document.getElementById("score").innerHTML = "SCORE: " + Math.round(score);
}

function restart() {
    document.location.reload();
}
var crashA = new Audio();
  crashA.src = 'crash.mp3';

var audio = new Audio();
  audio.src = 'eng.mp3';
  audio.loop = true;
  audio.autoplay = true;





var refreshIntervalId = setInterval("frame()", 20);
var refreshScore = setInterval("updScore()", 100);



