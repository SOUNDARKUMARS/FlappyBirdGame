const cvs=document.getElementById("canvas")
let ctx=cvs.getContext("2d")
const restart=document.querySelector("#pressEnter")
let darkmode=false
let birdImg
let birdSpeed=0
const openingSpace=180

// background music
let bg1=document.getElementById("aud1")
let bg2=document.getElementById("aud2")
let lost_aud=new Audio("audio/mixkit-arcade-space-shooter-dead-notification-272.wav")
// let lost_aud=document.getElementById("lost_aud")
let bg4=document.getElementById("aud4")
let bg5=document.getElementById("aud5")
let bg6=document.getElementById("aud6")
let bg7=document.getElementById("aud7")



let musicArr=[
    'audio/town-of-tranqness-25976.mp3',
    'audio/space_line-27593.mp3',
    'audio/mixkit-game-show-uplifting-944.wav',
    'audio/mixkit-game-show-intro-943.wav',
    'audio/merx-market-song-33936.mp3',
    'audio/jam-spotlight-lazytoms-l-29565.mp3'
]

let musicBtn=document.getElementById("musicBtn")
let muteBtn=document.getElementById("muteBtn")
let rand_index=Math.floor(Math.random()*musicArr.length)
let current_music=new Audio(musicArr[rand_index])
musicBtn.onclick=function(){

    current_music.play()
    current_music.volume=0.1
    muteBtn.style.display="block"
}
muteBtn.onclick=function(){
    current_music.pause()
    muteBtn.style.display="none"
}

const gameOverImg=new Image()
gameOverImg.src="img/gameover.png"
const bird={
    height:71,
    width:90,
    y:cvs.height/2,
    x:50
}
let score=0

// pipes
let bambooArray=[]
const bamboo={
    height:267,
    width:50,
    x:cvs.width-10,
    y:0,
    passed:true
}
let topBambooImg
let BotmBambooImg
let gameOver=false

function createBoard(){
    document.addEventListener('keydown',movebird )

    birdImg=new Image()
    birdImg.src="img/bird.png"


    topBambooImg=new Image()
    topBambooImg.src="img/bamboo.png"
    BotmBambooImg=new Image()
    BotmBambooImg.src="img/bamboo.png"
    requestAnimationFrame(update)
    setInterval(placeBamboo,2000)

}
createBoard()
function update(){
    if(gameOver) {
        lost_aud.play()
        gameOverImg.style.cursor="pointer"        
        ctx.drawImage(gameOverImg,180,100 )
        restart.style.visibility="visible"
        return;
    }
    requestAnimationFrame(update)
    ctx.clearRect(0,0,cvs.width,cvs.height)
    // bird
    birdSpeed+=0.2
    bird.y+=birdSpeed
    ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height) 
    
    if (bird.y > cvs.height) {
        gameOver = true;
    }

    for(let i=0; i<bambooArray.length ; i++){
        let ibamb=bambooArray[i]
        ibamb.x-=1.6
        ctx.drawImage(ibamb.img,ibamb.x,ibamb.y,ibamb.width,ibamb.height)
            if (bird.y > cvs.height) {
        gameOver = true;
    } 
    if(bird.y<-40){
        gameOver=true  
    }
    if (detectCollision(bird, ibamb)) {
        gameOver = true;
    }
    if(!ibamb.passed &&  bird.x>ibamb.x+ibamb.width){
        score+=.5
        ibamb.passed=true
    }
    }

    while(bambooArray.length>0 && bambooArray[0].x+bamboo.width<0){
        bambooArray.shift()
    }

    ctx.fillStyle="rgb(182, 180, 189)"
    ctx.font="35px sans-serif"
    ctx.fillText("Score: "+score,20,40,150)

}



function placeBamboo(){
    if(gameOver){
        return
    }
    let randomY=-(Math.random()*250)
   let topBamboo={
      img:topBambooImg,
      x:bamboo.x,
      y:randomY,
      height:bamboo.height,
      width:bamboo.width,
      passed:false  
    }
    bambooArray.push(topBamboo)



   let bottomBamboo={
      img:topBambooImg,
      x:bamboo.x,
      y:randomY+bamboo.height+openingSpace,
      height:bamboo.height,
      width:bamboo.width,
      passed:false  
    }
    bambooArray.push(bottomBamboo) 
}

function movebird(e){   
        if(e.code=="Space"){
            birdSpeed=-5
        }
        if(gameOver){
            restartGame(e)
        }
    }
document.addEventListener("keydown",restartGame)
function restartGame(e){
if(e.code=="Enter"){
    location.reload()

}
}
 
function detectCollision(a, b) {
 
    return a.x+10< b.x + b.width &&  
           a.x + a.width -15 > b.x &&  
           a.y+20 < b.y + b.height && 
           a.y + a.height> b.y; 
}

