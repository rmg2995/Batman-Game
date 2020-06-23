
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 700//window.innerWidth /1.2
canvas.height = 500//window.innerHeight /1.2


//Game class
class Game {

    constructor(){
        this.image = new Image()
        this.image.src = "/Batman/batman experiment.gif"
        // this.batrangs = []
        this.jokers = []
    }
    addJoker = () => {
        // const joker = new Joker("Joker","/Batman/Joker-01.png", 50 ,100)
        // const joker2 = new Joker("Joker","/Batman/Joker-01.png", 350 ,100)
        // this.jokers.push(joker, joker2)
        setInterval(() => {
            let joker = new Joker("Joker","/Batman/Joker-01.png", Math.random() * canvas.width , Math.random() * canvas.height)
            this.jokers.push(joker)
        }, 2000)
    }

    drawMap = () => {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height )
    }



}
let game = new Game()



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
        this.widthCanvas = 64
        this.heightCanvas = 64
        this.batrangs = []  //objects 
        this.bangGunBullets = [] //objects 
        this.direction = "Up"
    }

    

    shootBatrang = () => {
        this.batrangs.push( 
            new Batrang(this.xCanvas, this.yCanvas, 50, 50, 'blue', this.direction, this.batrangs.length-1) 
        )
    }
    detectCollision = (batrang) => {


        game.jokers.forEach(joker => {
            joker.moveJoker()
            console.log(joker)
            //this.batrangs.forEach(batrang => {
                if (joker.xCanvas < batrang.x + batrang.width &&
                    joker.xCanvas + joker.widthCanvas > batrang.x &&
                    joker.yCanvas < batrang.y + batrang.height &&
                    joker.yCanvas + joker.heightCanvas > batrang.y) {
                    console.log('collision detected!')
                 }


            //})


        })
       
            
        } 
        
        drawCharacter = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height, this.xCanvas, this.yCanvas, this.widthCanvas, this.heightCanvas) // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
            this.batrangs.forEach(rang => {
                rang.drawThisBatrang()
                this.detectCollision(rang)
            } )
        }
      
    
      
      
    
    
}


class Batman extends Character{
    constructor(name, image, x, y, width, height, xCanvas, yCanvas, widthCanvas, heightCanvas, batrangs){
        super(name, image, x, y, width, height, xCanvas, yCanvas, widthCanvas, heightCanvas, batrangs) 
        this.name = name;
        
    }



}


const batman = new Batman("Batman","/Batman/batman finally.jpg", 300, 250)




class Joker extends Character{
    constructor(name, image, x, y, width, height, xCanvas, yCanvas, widthCanvas, heightCanvas){
        super(name, image, x, y, width, height, xCanvas, yCanvas, widthCanvas, heightCanvas) 
        this.name = name;
    
    }
    moveJoker= () => {
        this.xCanvas++
        this.yCanvas++
        console.log(this)
    }

}


//THis will probably end up going in an array 

//const joker = new Joker("Joker","/Batman/Joker-01.png", 50 ,100)

//const joker2 = new Joker("Joker","/Batman/Joker-01.png", 350 ,100)




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
        switch(this.direction){
            case 'Up':
                ctx.fillRect(this.x, this.y--, this.width, this.height, this.color)
                break;
            case 'Down':
                ctx.fillRect(this.x, this.y++, this.width, this.height, this.color)
                break;
            case 'Left':
                ctx.fillRect(this.x--, this.y, this.width, this.height, this.color)
                break;
            case 'Right':
                ctx.fillRect(this.x++, this.y, this.width, this.height, this.color)
                break;                                                
        }
        if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height){
            batman.batrangs.splice(this.index,1)
        }

    }
}

game.addJoker()

function animationLoop() {
    animationID = window.requestAnimationFrame(animationLoop)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    game.drawMap()
    batman.drawCharacter()
    game.jokers.forEach(joker => joker.drawCharacter())
    
    // ctx.drawImage(batman.image, batman.xImage, batman.yImage, batman.widthImage,batman.heightImage, batman.xCanvas, batman.yCanvas, batman.widthCanvas, batman.heightCanvas) // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
    // game.draw()
    // ctx.drawImage(joker.image, joker.xImage, joker.yImage, joker.widthImage,joker.heightImage, joker.xCanvas, joker.yCanvas, joker.widthCanvas, joker.heightCanvas)
}

animationLoop()
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
            console.log()
            batman.shootBatrang()
    }
})