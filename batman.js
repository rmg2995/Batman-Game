
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth /2
canvas.height = canvas.width * 4/6 
let difficulty = "easy"
let startGame = document.querySelector("#startbtn")
startGame.onclick = ()=> {
    game.addJoker()
    animationLoop()
    document.querySelector('section').remove('section')
    document.querySelector('canvas').style.display = 'block'
}
let easy = document.querySelector('.easy')
easy.onclick = () => {
    difficulty = "easy"
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
            if(difficulty === "easy"){

            let joker = new Joker("Joker","Batman/Joker-01.png", Math.random() * canvas.width , 0)
            this.jokers.push(joker)}
        }, 800)
    
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
        if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height){
            batman.batrangs.splice(this.index,1)//doesnt work like i want. it deletes all of them
        }

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
document.addEventListener('keydown', function(event){
    switch(event.key) {
        case 'ArrowUp':
            batman.y = 48* 3
            batman.yCanvas -= 10
            batman.x = (batman.x + 45) % 90
            batman.direction= "Up"

            break;
        case 'ArrowDown':
            batman.y =0
            batman.yCanvas += 10
            batman.x = (batman.x + 45) % 90
            batman.direction = "Down"
            break;
        case 'ArrowLeft':
            
            batman.y =48* 1
            batman.xCanvas -= 10
            batman.x = (batman.x + 45) % 90
            batman.direction= "Left"
            break;
        case 'ArrowRight':
            batman.y = 48 * 2
            batman.xCanvas += 10
            batman.x = (batman.x + 45) % 90
            batman.direction = "Right"
            break;
        case " ":
            
            batman.shootBatrang()
    }
    // if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height){
    //     batman.batrangs.splice(this.index,0) dont know how to stop batman from going off canvas
    // }
})

//mute music
function mute(){
    if(document.getElementById('background_audio').muted == true){
      document.getElementById('background_audio').muted = true;
    } else {
      document.getElementById('background_audio').muted = true;
    }

}