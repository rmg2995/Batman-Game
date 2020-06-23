

//Game class
class Game {
    // Game properties: canvasWidth, canvasHeight, BatmanObj, JokerObj, lives
    constructor(){

        this.canvasWidth = 700
        this.canvasHeight = 500
        this.lives = 3
        this.animationID = 0
        this.batrangs = []
        this.frames = 1
        this.score = 0
        this.jokers = []
    }
    drawJkrs = () => this.jokers.forEach(joker => joker.drawThisJkrs())
    drawBatrang = () => this.batrangs.forEach(batrang => batrang.drawThisBatrang())
  
    shootGun = () => { 
        console.log('batman.shootGun', this)
        game.batrangs.push( new Batrang({x: batman.x, y: batman.y, direction: this.direction, color: 'black', width: 2, height: 10 }) )
  }
    gameOver(animationID) {
        if(this.lives <= 0){
            window.cancelAnimationFrame(animationID)
            alert('You have sent X amount of Jokers to Jail!')
        }
    }
    draw = () => {
        // console.log("draw")
        game.drawBatrang()
    }
    detectCollision = () => {
        this.jokers.forEach((jkrs,i) => { //Look at each obstacle to see if it hit the car?
      
          this.batrangs.forEach((batrangs,j) => {
      
            if (batrangs.xCanvas < jkrs.xCanvas + jkrs.widthCanvas &&
              batrangs.xCanvas + batrangs.widthCanvas > jkrs.xCanvas &&
              batrangs.yCanvas< jkrs.yCanvas+ jkrs.height &&
              batrangs.yCanvas+ batrangs.height > jkrs.y) {
                this.jkrs.splice(i,1)
                this.batrangs.splice(j,1)
            }
            
          })
      
          if (carObj.x < obs.x + obs.width &&
            carObj.x + carObj.width > obs.x &&
            carObj.y < obs.y + obs.height &&
            carObj.y + carObj.height > obs.y) {
             window.cancelAnimationFrame(id)
            //  alert('game over')
          }  
      
        })
      
      }
}
let game = new Game()
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
        this.direction = "Down"
    }


    
    

    
}
const batman = new Batman()






class Batrang extends Batman{
    constructor({xCanvas,yCanvas,widthCanvas,heightImage, color}){
      super({xCanvas,yCanvas,widthCanvas,heightImage, color})
      this.color = color 
    }
    drawThisBatrang = () => {
        console.log(this.direction)
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, 2, 10)
    }

}
class Joker {
    constructor(){
        this.moveX=5
        this.moveY = 5
        this.xCanvas = 300 
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
this.joker = new Joker()

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
    ctx.drawImage(joker.image, joker.xImage, joker.yImage, joker.widthImage,joker.heightImage, joker.xCanvas, joker.yCanvas, joker.widthCanvas, joker.heightCanvas)
}

animationLoop()
document.addEventListener('keydown', function(event){
    switch(event.key) {
        case 'ArrowUp':
            batman.yImage =48* 3
            batman.yCanvas -= 10
            batman.xImage = (batman.xImage + 45) % 90
            batman.direction= "Up"
            break;
        case 'ArrowDown':
            batman.yImage =0
            batman.yCanvas += 10
            batman.xImage = (batman.xImage + 45) % 90
            batman.direction = "Down"
            break;
        case 'ArrowLeft':
            
            batman.yImage =48* 1
            batman.xCanvas -= 10
            batman.xImage = (batman.xImage + 45) % 90
            batman.direction= "Left"
            break;
        case 'ArrowRight':
            batman.yImage = 48 * 2
            batman.xCanvas += 10
            batman.xImage = (batman.xImage + 45) % 90
            batman.direction = "Right"
            break;
        case " ":
            console.log()
            game.shootGun()
    }
})