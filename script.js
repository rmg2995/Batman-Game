

//Game class
class Game {
    // Game properties: canvasWidth, canvasHeight, BatmanObj, JokerObj, lives
    constructor(width, height, batrangs, frames, score){
        this.canvasWidth = width
        this.canvasHeight = height
        //  this.batman = new Batman()
        // this.joker = new Joker()
        this.lives = 3
        this.animationID = 0
        this.batrangs = batrangs
        this.frames = frames
        this.score = score
    }
    drawBatrang = () => this.batrangs.forEach(batrang => batrang.drawThisBatrang())
  
    shootGun = () => { 
    this.batrangs.push( new Batrang({x: Batman.xCanvas + Batman.widthCanvas / 2, y: Batman.yCanvas, color: 'black', width: 2, height: 10 }) )
  }
    gameOver(animationID) {
        if(this.lives <= 0){
            window.cancelAnimationFrame(animationID)
            alert('You have sent X amount of Jokers to Jail!')
        }
    }
    draw = () => {
        game.drawBatrang()
    }
}
// Batman properties: x, y, width, height, image, health
// Batman methods: shoot, move, detectCollision

class Batman extends Game{
    constructor(batrangs){
        
        super({batrangs})
        this.xCanvas = 300
        this.yCanvas = 250
        this.widthCanvas = 64
        this.heightCanvas = 64
        this.xImage =0
        this.yImage = 0
        this.widthImage = 45
        this.heightImage = 50
        this.image = new Image()
        this.image.src = "/Batman/batman finally.jpg" 
    }

    
    shootGun = () => {
        Batman.batrangs.push( new Batrang({x: this.xCanvas + this.widthCanvas / 2,y: this.yCanvas,color: 'blue' , width: 2, height: 10 }))
    }
}
this.batman = new Batman()





document.addEventListener('keydown', function(event){
    switch(event.key) {
        case 'ArrowUp':
            batman.yImage =48* 3
            batman.yCanvas -= 10
            batman.xImage = (batman.xImage + 45) % 90
            
            break;
        case 'ArrowDown':
            batman.yImage =0
            batman.yCanvas += 10
            batman.xImage = (batman.xImage + 45) % 90
            break;
        case 'ArrowLeft':
            
            batman.yImage =48* 1
            batman.xCanvas -= 10
            batman.xImage = (batman.xImage + 45) % 90
            break;
        case 'ArrowRight':
            batman.yImage = 48 * 2
            batman.xCanvas += 10
            batman.xImage = (batman.xImage + 45) % 90
            break;
        case " ":
            console.log()
            game.shootGun()
    }
})
class Batrang extends Batman{
    constructor({xCanvas,yCanvas,widthCanvas,heightImage, color}){
      super({xCanvas,yCanvas,widthCanvas,heightImage, color})
      this.color = color 
    }
    drawThisBatrang = () => {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.xCanvas+ this.widthCanvas/2, this.yCanvas-=5, 2, 10)
    }
}class Obstacle extends Batman {
    constructor({x, y, width, height, color, good, bullets}){
      super({x, y, width, height, bullets})
      this.color = color 
      this.good = good
    }
}

class Joker {
    constructor(){
        this.xCanvas = 0
        this.yCanvas = 0
        this.widthCanvas = 64
        this.heightCanvas = 64
        this.xImage =0
        this.yImage = 0
        this.widthImage = 45
        this.heightImage = 50
        this.image = new Image()
        this.image.src = "/Batman/Joker-01.png" 
    }
}

let game = new Game(
    canvasWidth= '700' ,
    canvasHeight= '500',
    jokers= [],
    batrangs= [],
    frames= 1,
    score= 0,
    
        
)
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = game.canvasWidth
canvas.height = game.canvasHeight


function drawMap(){
    this.image = new Image()
    this.image.src = "/Batman/batman experiment.gif"
    ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height )
    
    
}

function animationLoop() {
    animationID = window.requestAnimationFrame(animationLoop)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawMap()
    ctx.drawImage(batman.image, batman.xImage, batman.yImage, batman.widthImage,batman.heightImage, batman.xCanvas, batman.yCanvas, batman.widthCanvas, batman.heightCanvas) // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
    game.draw()
}

animationLoop()