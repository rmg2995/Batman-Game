
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth /2
canvas.height = canvas.width * 4/6 
let difficulty = 800
let startGame = document.querySelector("#startbtn")
startGame.onclick = ()=> {
    document.querySelector('section').remove('section')
    document.querySelector('canvas').style.display = 'block'
    animationLoop()
    game.addJoker()
}
let easy = document.querySelector('.easy')
easy.onclick = () => {
    difficulty = 800;
    // game.addJoker()
}
let hard = document.querySelector('.hard')
hard.onclick = () => {
    difficulty = 400
    // game.addJoker()
}

//Game class, adds jokers in set interval, draws map
class Game {

    constructor(){
        
        this.image = new Image()
        this.image.src = "Batman/batman experiment.gif"
        // this.batrangs = []
        this.jokers = []
        
        this.score = 0
    }
    addJoker = () => {
        // const joker = new Joker("Joker","/Batman/Joker-01.png", 50 ,100)
        // const joker2 = new Joker("Joker","/Batman/Joker-01.png", 350 ,100)
        // this.jokers.push(joker, joker2)
        
        setInterval(() => {
            // if(difficulty === "easy"){

            let joker = new Joker("Joker","Batman/Joker-01.png", Math.random() * canvas.width , 0)
            this.jokers.push(joker)
        // }
        }, difficulty)
        
        
        
    
    }

    drawMap = () => {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height )
    }

    

}
let game = new Game()


//defines characters, detect Collision , shoot batrangs 
class Character{
    constructor(name, src, xCanvas, yCanvas){
        this.image = new Image()
        this.image.src =  src
        this.x = 0
        this.y = 0
        this.width = 45
        this.height = 50
        this.xCanvas = xCanvas
        this.yCanvas = yCanvas
        this.widthCanvas = 45
        this.heightCanvas = 50
        this.batrangs = []  //objects 
        this.bangGunBullets = [] //objects 
        this.direction = "Down",
        this.gameOver = false
    }

    

    shootBatrang = () => {
        this.batrangs.push( 
            new Batrang(this.xCanvas+ 32, this.yCanvas + 38, 6, 6, this.color, this.direction, this.batrangs.length-1) 
        )
    }
    detectCollision = () => {
 
            
        game.jokers.forEach((joker, i) => {
            
            this.batrangs.forEach((batrang) => {

                if (joker.xCanvas < batrang.x + batrang.width &&
                    joker.xCanvas + joker.widthCanvas > batrang.x &&
                    joker.yCanvas < batrang.y + batrang.height &&
                    joker.yCanvas + joker.heightCanvas > batrang.y) {
                        game.jokers.splice(i,1)//Jokers dont hurt you unless you through the first batrang
                        document.querySelector('.score span').innerHTML++
                                
        
                    }
            })
            
            if (joker.xCanvas < batman.xCanvas + batman.widthCanvas &&
                joker.xCanvas + joker.widthCanvas > batman.xCanvas &&
                joker.yCanvas < batman.yCanvas + batman.heightCanvas &&
                joker.yCanvas + joker.heightCanvas > batman.yCanvas) {
                    window.cancelAnimationFrame(animationID)
                    gameOver()
                    // if(!this.gameOver){
                        console.log('collision detected!', this.gameOver)
                        console.log(`GAME OVER! LOOKS LIKE JOKER GOT BATMAN!`)
                        // this.gameOver = true
                        // return
                    // }
            }  
            


        })
       
            
    } 
    
        
    drawCharacter = () => {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height, this.xCanvas, this.yCanvas, this.widthCanvas, this.heightCanvas) // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
        this.batrangs.forEach(rang => {
            rang.drawThisBatrang()
                
        })
        
    }
    
    
      
      
    
    
}
function gameOver(){
    document.querySelector('#canvas').classList.add('gameOver')
    for(let i = 0; i < 5; i++){
    setTimeout(function (){
        document.querySelector('.container').innerHTML = `<div>restart in ${5-i} seconds</div>`
        if (i === 4){
            window.location.reload()
        }
    }, i * 1000)
}

}
// Batman properties: x, y, width, height, image
// Batman methods: shoot
class Batman extends Character{
    constructor(name, image, x, y, width, height, xCanvas, yCanvas, widthCanvas, heightCanvas, batrangs){
        super(name, image, x, y, width, height, xCanvas, yCanvas, widthCanvas, heightCanvas, batrangs) 
        this.name = name;
        
    }



}


const batman = new Batman("Batman","Batman/batman finally.jpg", 225, 150)



//Joker properties: x, y, width, height, image, makes joker move
class Joker extends Character{
    constructor(name, image, x, y, width, height, xCanvas, yCanvas, widthCanvas, heightCanvas){
        super(name, image, x, y, width, height, xCanvas, yCanvas, widthCanvas, heightCanvas) 
        this.name = name;
    
    }
    moveJoker= () => {
        
        this.yCanvas++
        
        
    }

}








//batrang, move batrang, still doesnt delete batrangs
class Batrang {
    constructor(x,y,width, height,color, direction, index){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        this.color = color; 
        this.direction = direction,
        this.index = index
        

    }
    drawThisBatrang = () => {
        ctx.fillStyle = "yellow";
        switch(this.direction){
            case 'Up':
                ctx.fillRect(this.x, this.y-=3, this.width, this.height, this.color)
                break;
            case 'Down':
                ctx.fillRect(this.x, this.y+=3, this.width, this.height, this.color)
                break;
            case 'Left':
                ctx.fillRect(this.x-=3, this.y, this.width, this.height, this.color)
                break;
            case 'Right':
                ctx.fillRect(this.x+=3, this.y, this.width, this.height, this.color)
                break;                                                
        }
        batman.batrangs.forEach((batrang, i) => {

            if(batrang.x < 0 || batrang.x > canvas.width || batrang.y < 0 || batrang.y > canvas.height){
                batman.batrangs.splice(i,1)//doesnt work like i want. it deletes all of them
            }
        })

    }
}


//animates everything, and is called in start game button
function animationLoop() {
    animationID = window.requestAnimationFrame(animationLoop)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    game.drawMap()
    batman.drawCharacter()
    batman.detectCollision()
    game.jokers.forEach(joker => joker.drawCharacter())
    game.jokers.forEach(joker => joker.moveJoker())
    
    
        
       
    
      
    // ctx.drawImage(batman.image, batman.xImage, batman.yImage, batman.widthImage,batman.heightImage, batman.xCanvas, batman.yCanvas, batman.widthCanvas, batman.heightCanvas) // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
    // game.draw()
    // ctx.drawImage(joker.image, joker.xImage, joker.yImage, joker.widthImage,joker.heightImage, joker.xCanvas, joker.yCanvas, joker.widthCanvas, joker.heightCanvas)
}

 //animationLoop()



 //move batman
//  let soundEffect = new Audio('Batman/Sound effect Batman.mp3')
document.addEventListener('keydown', function(event){
    switch(event.key) {
        case 'ArrowUp':
            batman.direction= "Up"
            batman.y = 48* 3
            if(batman.yCanvas -10 >= 0 ){
                batman.yCanvas -= 10
                batman.x = (batman.x + 45) % 90
            }

            break;
        case 'ArrowDown':
            batman.direction = "Down"
            batman.y =0
            if(batman.yCanvas +10 <= canvas.height -40){
            batman.yCanvas += 10
            batman.x = (batman.x + 45) % 90
            } 
            break;
        case 'ArrowLeft':
            batman.y =48* 1
            batman.direction= "Left"
            if(batman.xCanvas -10 >= 0 ){
               
                batman.xCanvas -= 10
                batman.x = (batman.x + 45) % 90
                

            }
            break;
        case 'ArrowRight':
            batman.direction = "Right"
            batman.y = 48 * 2
            if(batman.xCanvas +10 <= canvas.width -40){
            batman.xCanvas += 10
            batman.x = (batman.x + 45) % 90
            }
            
            break;
        case " ":
            // soundEffect?.pause()
            // soundEffect?.currentTime = 0
            // soundEffect.play()
             batman.shootBatrang()
           new Audio('Batman/Sound effect Batman.mp3').play()
    }
    // if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height){
    //     batman.batrangs.splice(this.index,0) dont know how to stop batman from going off canvas
    // }
})

//mute music
function mute(){
    
    audioTag.pause()
    playAudio.onclick = play
}
let playAudio = document.querySelector('.audiobtn')
let audioTag = document.querySelector('#background_audio')
playAudio.onclick= play

function play (){
    audioTag.currentTime = 0
    audioTag.volume = 0.2
    audioTag.play()
    playAudio.onclick = mute
}