
// Batman properties: x, y, width, height, image, health
// Batman methods: shoot, move, detectCollision
class Batman {
    constructor(){
        this.xCanvas = 0
        this.yCanvas = 0
        this.widthCanvas = 72
        this.heightCanvas = 72
        this.xImage =10
        this.yImage = 64 *3.1
        this.widthImage = 64
        this.heightImage = 67
        this.image = new Image()
        this.image.src = "Batman/batman-canvas.jpg"
        // let image1 = new Image()
        // this.image.src = "../Batman/Batman canvas left to right.png"
        
    }

    move(event){
        switch(event.key) {
            case 'ArrowUp':
                this.y -= 5
                break;
            case 'ArrowDown':
                this.y += 5
                break;
            case 'ArrowLeft':
                
                this.yImage =65* 5
                this.xCanvas -= 10
                this.xImage = (this.ximage1 + 75) % 450
                break;
            case 'ArrowRight':
                this.yImage = 62 * 5
                this.xCanvas += 10
                this.xImage = (this.xImage + 75) % 450
                break
        }
    }
}

//Game class
class Game {
    // Game properties: canvasWidth, canvasHeight, BatmanObj, JokerObj, lives
    constructor(width, height){
        this.canvasWidth = width
        this.canvasHeight = height
        this.batman = new Batman()
        //this.joker = new Joker()
        this.lives = 3
        this.animationID = 0
    }

    gameOver(animationID) {
        if(this.lives <= 0){
            window.cancelAnimationFrame(animationID)
            alert('You have sent X amount of Jokers to Jail!')
        }
    }
}




let game1 = new Game(700, 500)
const canvas = document.querySelector('canvas')
const cxt = canvas.getContext('2d')
canvas.width = game1.canvasWidth
canvas.height = game1.canvasHeight

function drawMap(){
    this.image = new Image()
    this.image.src = "Batman/batman experiment.gif"
    cxt.drawImage(this.image, 0, 0, canvas.width, canvas.height )
    

}

function animationLoop() {
    animationID = window.requestAnimationFrame(animationLoop)
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    cxt.fillRect(0, 0, canvas.width, canvas.height)
    drawMap()
    cxt.drawImage(game1.batman.image, game1.batman.xImage, game1.batman.yImage, game1.batman.widthImage,game1.batman.heightImage, game1.batman.xCanvas, game1.batman.yCanvas, game1.batman.widthCanvas, game1.batman.heightCanvas) // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
}
document.onkeydown = (event) => game1.batman.move(event)
animationLoop()