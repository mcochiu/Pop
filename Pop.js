// devMarco 2022
console.log("Version up to date");
let canvas = document.querySelector("canvas");
canvas.width = 700;
canvas.height = 500;
$(function () {
    $('[data-toggle="popover"]').popover()
  })
let myFont = new FontFace(
    "myFont",
  "url(https://fonts.gstatic.com/s/robotoslab/v24/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISmb2Rj.woff2)"
);
myFont.load().then((font)=>{
document.fonts.add(font);

const spriteSheet = new Image();
const spriteSheet2 = new Image();
spriteSheet.src = "w36h62.png";
spriteSheet2.src = "w40h62.png";
spriteSheet.onload = loadImages;
spriteSheet2.onload = loadImages;
let numOfImages = 2;

let cols = 2;
let rows = 1;
let spriteWidth = spriteSheet.width/cols;
let spriteWidth2 = spriteSheet2.width/cols;

let totalFrames = 2;
let currentFrame = 0;

let srcX = 0;
let srcY = 0;

let framesDrawn = 0;


function loadImages (){
    if (--numOfImages > 0){
        return;
    }
    animate();
    loadPartner();
}

function animate(){
    c.clearRect(0,0,canvas.width,spriteH);
    requestAnimationFrame(animate);

    currentFrame = currentFrame % totalFrames;
    srcX = currentFrame * spriteWidth;

    drawGTimer();
    if(redRunning && !doorClosed){
        drawTimerR();
        srcX = currentFrame * spriteWidth2;
        c.drawImage(spriteSheet2,srcX,srcY,spriteWidth2,spriteH,timerFill+timerX-spriteWidth2,0,spriteSheet2.width,spriteSheet2.height);
        c.drawImage(dOpen,535,0,dOpen.width,dOpen.height);
    }else if (greenRunning && !doorClosed){
        c.drawImage(spriteSheet,srcX,srcY,spriteWidth,spriteH,timerFill+timerX-spriteWidth,0,spriteSheet.width,spriteSheet.height);
        c.drawImage(dOpen,535,0,dOpen.width,dOpen.height);
    }else {
        c.drawImage(dClosed,535,0,dOpen.width,dOpen.height);
        doorClosed = true;
    }
    

    framesDrawn++;
    if(framesDrawn >= 10){
        currentFrame++;
        framesDrawn =0;
    } 
}

const tBoxH = 30;
const messageX= 2;
const messageY= 22;
const clearPXY = -2;
const clearSXY = 4;
const maxTxts = 5;
let onscreenTxts = [];

const txtMessages = { 
    195: "You're over-reacting", // 0
    220: "Your feelings are valid.", // 1
    235: "Let me make it up to you", // 2
    249: "You're crazy, I don't cheat", //3
    275: "No one will love you like I do", //4
    345: "I'm sorry it will never happen again",//5
    347: "Why did you go through MY phone?!",//6
    428: "Let's try therapy, anything to make this work",//7
    498: "I'm in this for the long haul so let's talk this through.",//8
    593: "You can't do this to me! You still owe me for last night's dinner",//9
    undefined1:"Marry Me (POWER UP ONE)",
    undefined2:"AUTO COMPLETE TEXT POWER UP"
};

const c = canvas.getContext("2d");

const ring = document.getElementById("ring");
const dOpen = document.getElementById("dOpen");
const dClosed = document.getElementById("dClosed");


let spriteH = spriteSheet.height/rows;
let timerX = 150;
let timerY = spriteH/4;
let timerW = 400;
let timerH = 30;
let timerFill = 10;
let fullTimer = 100;
let redRunning = false;
let ringOut = false;
let ringDrawn = false;
let greenRunning = true;
let doorClosed = false;


let allTxts = [];
function ranTxt(){
    let ran = parseInt(10*Math.random());
    if (!onscreenTxts.includes(ran)){
    onscreenTxts.push(ran);
    allTxts.push(Object.values(txtMessages)[ran]);
    return parseInt(ran);
    } else {
        ranTxt();
    }
    
}



while(onscreenTxts.length<=maxTxts-1){
    ranTxt();
}

let ranXs =[];
let ranYs =[];
for (let i = 0; i < maxTxts; i++) {
    let x = ranRange(0,canvas.width-593);
    ranXs.push(x);
}

for (let i = 0; i < maxTxts; i++) {
    let y = ranRange(spriteH,canvas.height-tBoxH);
    if (i !== 0){
        for (let j = 0; j < ranYs.length; j++) {
            if(y>ranYs[j]+tBoxH+10 || y<ranYs[j]-tBoxH-10){
            } else{
                y = ranRange(spriteH,canvas.height-tBoxH);
                j=-1;
            }
        }
    }
    ranYs.push(y);
    

}

function newSpawn (x,y,spawnIndex){
    new tMessage (x,y,Object.values(txtMessages)[spawnIndex],Object.keys(txtMessages)[spawnIndex],tBoxH,messageX,messageY);
}

function ranRange(min, max) {
    return Math.random() * (max - min) + min;
}

function typo(){
    function white(){
        textBox.backgroundColor = "white";
    }
    textBox.backgroundColor = "red";
    setTimeout(white,500);
}

function endGame(){
    textBox.display = "none";
    boxLabel.style.display = "none";
    greenRunning = false;
    redRunning = false;
    $("#h2Play").modal('hide')
    $("#gameOver").modal('show');
}

function anotherChance(){
    textBox.display = "none";
    boxLabel.style.display = "none";
    $("#anotherChance").modal('show');
}

function marriage(){
    timerFill = 0;
    greenRunning = false;
    redRunning = false;
    textBox.display = "none";
    boxLabel.style.display = "none";
    $("#marriage").modal('show');
}

function restartGame(){
    window.location.reload();
}

function clear(index){
    c.clearRect(ranXs[index]+clearPXY,ranYs[index]+clearPXY,parseInt(Object.keys(txtMessages)[onscreenTxts[index]])+clearSXY,tBoxH+clearSXY);
    allTxts.splice(index,1);
    onscreenTxts.splice(index,1);
    ranYs.splice(ranYs.indexOf(ranYs[index]),1)
    ranXs.splice(ranXs.indexOf(ranXs[index]),1)
    while(onscreenTxts.length<=maxTxts-1){
        ranTxt();
    }

    let spawnX = ranRange(0,canvas.width-593);
    ranXs.push(spawnX);

    let y = ranRange(spriteH,canvas.height-tBoxH);
        for (let j = 0; j < ranYs.length; j++) {
            if(y>ranYs[j]+tBoxH+10 || y<ranYs[j]-tBoxH-10){
            } else{
                y = ranRange(spriteH,canvas.height-tBoxH);
                j=-1;
            }
        } let spawnY = y;
        ranYs.push(spawnY);
        
        setTimeout(function(){
            newSpawn(spawnX,spawnY,onscreenTxts[4])
        },2000); 
    
}

function oEffect(){
    switch (localStorage.getItem("pAnswer")){
        case Object.values(txtMessages)[0]:
            //"You're over-reacting"
            increaseTimer(8);
            break;
        case Object.values(txtMessages)[1]:
            // "Your feelings are valid"
            reduceTimer(8);
            break;
        case Object.values(txtMessages)[2]:
            // "Let me make it up to you"
            reduceTimer(3);
            break;
        case Object.values(txtMessages)[3]:
            // "You're crazy, I don't cheat."
            stopGreen();
            startCrazy();
            break;
        case Object.values(txtMessages)[4]:
            // "No one will love you like I do"
            reduceTimer(10);
            stopGreen();
            startRed();
            break;
        case Object.values(txtMessages)[5]:
            // "I'm sorry it will never happen again"
            reduceTimer(2);
            break;
        case Object.values(txtMessages)[6]:
            // "Why did you go through MY phone?!"
            increaseTimer(6);
            break;
        case Object.values(txtMessages)[7]:
            // "Let's try therapy, anything to make this work"
            reduceTimer(15);
            break;
        case Object.values(txtMessages)[8]:
            // "I'm in this for the long haul so let's talk through this"
            reduceTimer(28);
            break;
        case Object.values(txtMessages)[9]:
            // "You can't do this to me! You still owe me for last night's dinner."
            stopGreen();
            setTimeout(startRed,3000);
            break;
        case "Marry Me" && ringOut:
            marriage();
        default:
            break;
    }
}


let textInput = document.getElementById("textInput");
let boxLabel = document.getElementById("boxLabel");
let textBox = textInput.style;
let next1 = document.getElementById("next1");
let next2 = document.getElementById("next2");
let next3 = document.getElementById("next3");
let back2 = document.getElementById("back2");
let back3 = document.getElementById("back3");
let back4 = document.getElementById("back4");
let back5 = document.getElementById("back5");
let skip = document.getElementById("skip");
let startButton = document.getElementById("startGame");
let noMusicStart = document.getElementById("startGameNoM");
let restartButton = document.getElementById("restartGame");
let restartButton2 = document.getElementById("restartGame2");
let restartButton3 = document.getElementById("restartGame3");
let gas = document.getElementById("gasDs");
let mousePressed = false;

gas.addEventListener("mouseover",function(e){
    let gasHeight = gas.clientHeight
    gas.style = `background-position: 0px -${gasHeight}px;`
})
gas.addEventListener("mouseout",function(e){
    gas.style = `background-position: 0px 0px;`
})
gas.addEventListener("mousedown",function(e){
    let gasHeight = gas.clientHeight
    gas.style = `background-position: 0px -${gasHeight*2}px;`
})
gas.addEventListener("dragover",function(e){
    let gasHeight = gas.clientHeight
    if (mousePressed){
    gas.style = `background-position: 0px -${gasHeight*2}px;`
    mousePressed = false;
}})
gas.addEventListener("dragleave",function(e){
    let gasHeight = gas.clientHeight
    gas.style = `background-position: 0px -${gasHeight*3}px;`
})
gas.addEventListener("dragend",function(e){
    gas.style = `background-position: 0px 0px;`
})
gas.addEventListener("click",function(e){
    gas.style = `background-position: 0px 0px;`
})
textInput.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        localStorage.setItem("pAnswer",textInput.value);
        textInput.value = ""; 
        switch (localStorage.getItem("pAnswer")) {
            case Object.values(txtMessages)[onscreenTxts[0]]:
                clear(0);
                oEffect();
                break;
            case Object.values(txtMessages)[onscreenTxts[1]]:
                clear(1);
                oEffect();
                break;
            case Object.values(txtMessages)[onscreenTxts[2]]:
                clear(2);
                oEffect();
                break;
            case Object.values(txtMessages)[onscreenTxts[3]]:
                clear(3);
                oEffect();
                break;
            case Object.values(txtMessages)[onscreenTxts[4]]:
                clear(4);
                oEffect();
                break;
            case "Marry Me" && ringOut:
                oEffect();
            default:
                typo();
                break;
        }
    }
})
startButton.addEventListener("click",function(e){
    let audio = document.getElementById("audio");
    audio.volume = 0.05;
    audio.currentTime = 0;
    audio.play();
    $('#page5').modal('hide');
    clearTimer();
    timerFill = timerW/fullTimer*11;
    drawGTimer();
    
})
noMusicStart.addEventListener("click",function(e){
    let audio = document.getElementById("audio");
    audio.volume = 0.05;
    audio.pause();
    $('#page5').modal('hide');
    clearTimer();
    timerFill = 10;
    drawGTimer();
})
next1.addEventListener("click",function(e){
    $("#h2Play").modal('hide');
    $("#page2").modal('show');
})
next2.addEventListener("click",function(e){
    $("#page2").modal('hide');
    $("#page3").modal('show');
})
next3.addEventListener("click",function(e){
    $("#page3").modal('hide');
    $("#page4").modal('show');
})
next4.addEventListener("click",function(e){
    $("#page4").modal('hide');
    $("#page5").modal('show');
})
skip.addEventListener("click",function(e){
    $("#h2Play").modal('hide');
    $("#page5").modal('show');
})
back2.addEventListener("click",function(e){
    $("#page2").modal('hide');
    $("#h2Play").modal('show');
})
back3.addEventListener("click",function(e){
    $("#page3").modal('hide');
    $("#page2").modal('show');
})
back4.addEventListener("click",function(e){
    $("#page4").modal('hide');
    $("#page3").modal('show');
})
back5.addEventListener("click",function(e){
    $("#page5").modal('hide');
    $("#page4").modal('show');
})
restartButton.addEventListener("click",function(e){
    restartGame();
})
restartButton2.addEventListener("click",function(e){
    restartGame();
})
restartButton3.addEventListener("click",function(e){
    restartGame();
})


function drawGTimer(){
c.beginPath();
c.strokeStyle = "black";
c.strokeRect(timerX,timerY,timerW,timerH);
c.closePath();

c.beginPath();
c.strokeStyle = "black";
c.fillStyle = "green";
c.fillRect(timerX+1, timerY,timerFill,timerH);
c.closePath();
}

function drawTimerR(){

c.beginPath();
c.strokeStyle = "black";

c.strokeRect(timerX,timerY,timerW,timerH);
c.closePath();


c.beginPath();
c.strokeStyle = "black";
c.fillStyle = "red";
c.fillRect(timerX, timerY,timerFill,timerH);
c.closePath();
}

function clearTimer(){
    c.clearRect(timerX,timerY,timerW,timerH);
    c.strokeRect(timerX,timerY,timerW,timerH);
}

function ringRandom(){
    if (!ringDrawn){
        ringOut = "Marry Me";
    
        let x = ranRange(canvas.width-593,canvas.width-150);
    
        let ranY = ranRange(spriteH,canvas.height-40);
        for (let j = 0; j < ranYs.length; j++) {
            if(ranY>ranYs[j]+tBoxH+15 || ranY<ranYs[j]-tBoxH-15){
            } else{
                ranY = ranRange(spriteH,canvas.height-40);
                j=-1;
            }
        }
        powerY = ranY;
    
        c.beginPath();
        c.strokeStyle = "black";
        c.strokeRect(x,ranY,150,35);
        c.font = "20px myFont";
        c.fillStyle = "black";
        c.fillText("Marry Me",x+30,ranY+messageY+3);
        c.closePath();
        c.drawImage(ring,x+2,ranY+2,ring.width,ring.height);
        c.drawImage(ring,x+125,ranY+2,ring.width,ring.height);
        ringDrawn = true;

        function clearRing(){
            c.clearRect(x+clearPXY,ranY+clearPXY,150+clearSXY,35+clearSXY);
            ringOut = false;
        }

        setTimeout(clearRing,4000);
    }
}    

function updateTimer (){
    if (timerFill < timerW){
        timerFill += timerW/fullTimer;
        console.log("T filled- "+ timerFill + " timerW is "+timerW   );
        if (timerFill >= timerW){
            timerFill = timerW;
            endGame();
        } else if (timerFill > timerW/fullTimer*50){
            ringRandom();
        }
        else if(timerFill <= 0){
            timerFill = 0;
            anotherChance();
        }
        drawGTimer();
    } 
}

function updateRTimer (){
    redRunning = true;
    if (timerFill < timerW){
        timerFill += timerW/fullTimer*2;
        if (timerFill >= timerW){
            timerFill = timerW;
            endGame();
        } else if (timerFill > timerW/fullTimer*50){
            ringRandom();
        }
        else if(timerFill <= 0){
            timerFill = 0;
            anotherChance();
        }
        drawTimerR();
    } 
}

function updateCTimer (){
    redRunning = true;
    if (timerFill < timerW){
        timerFill += timerW/fullTimer*4;
        if (timerFill >= timerW){
            timerFill = timerW;
            endGame();
        } else if (timerFill > timerW/fullTimer*50){
            ringRandom();
        }
        else if(timerFill <= 0){
            timerFill = 0;
            anotherChance();
        }
        drawTimerR();
    } 
}

function stopGreen(){
    clearInterval(initG);
}

function startRed(){
    setInterval(updateRTimer,1000);
}

function startCrazy(){
    setInterval(updateCTimer,1000);
}

function reduceTimer(seconds){
    clearTimer();
    timerFill -= timerW/fullTimer*seconds;
    updateTimer();
}

function increaseTimer(seconds){
    clearTimer();
    timerFill += timerW/fullTimer*seconds;
    updateTimer();
}

function restartTimer(){
    setInterval(updateTimer,1000);
}

function tMessage (x, y, mContent,tBoxW,tBoxH,mX,mY){

    this.x = x;
    this.y = y;

    this.tBoxW = tBoxW;
    this.tBoxH = tBoxH;
    this.mContent = mContent;
    this.mX = mX;
    this.mY = mY;

    this.draw = function(){
        c.beginPath();
        c.strokeStyle = "black";
        c.strokeRect(this.x,this.y,this.tBoxW,this.tBoxH);
        c.font = "20px myFont";
        c.fillStyle = "black";
        c.fillText(this.mContent,this.mX+this.x,this.mY+this.y);
        c.closePath();
    }
    this.draw();
    
}

function init() {
    $("#h2Play").modal('show');

    for (let i = 0; i < maxTxts; i++) {
        new tMessage (ranXs[i],ranYs[i],Object.values(txtMessages)[onscreenTxts[i]],Object.keys(txtMessages)[onscreenTxts[i]],tBoxH,messageX,messageY)
    }

}

function loadPartner() {
    if (window.localStorage){
        if (!localStorage.getItem("firstLoad")){
            localStorage.setItem("firstLoad",true);
            window.location.reload();
        } else{
            localStorage.removeItem("firstLoad");
        }
    }
}

const initG = setInterval(updateTimer,1000);

init();

});
// devMarco 2022