const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let xCenter = canvas.width / 2
let yCenter = canvas.height / 2
let right = canvas.width
let bottom = canvas.height

class Ball {
    constructor(pos, radius, color) {
        this.pos = pos
        this.radius = radius
        this.color = color
        this.velocity = {
            x: 5,
            y: 10
        }
    }
    draw() {
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }
}

let bigCircleRadius = canvas.height/2.8
function backgroundCircle() {
    c.beginPath()
    c.arc(xCenter, yCenter, bigCircleRadius, 0, Math.PI * 2)
    c.stroke()
    c.closePath()
}

function colliding(ball){
    if(Math.hypot(ball.pos.x + ball.velocity.x - xCenter, ball.pos.y + ball.velocity.y - yCenter)<bigCircleRadius - ball.radius){
        ball.velocity.y += 0.5
    }
    else{
        const collideAngle = Math.atan2(ball.pos.y - yCenter, ball.pos.x - xCenter)
        
        ball.velocity.x = -Math.cos(collideAngle)*10
        ball.velocity.y = -Math.sin(collideAngle)*10
        console.log(-Math.cos(collideAngle)*10, -Math.sin(collideAngle)*7 )
    }
}

const balls = []
let mouse = {
    x: 0,
    y: 0
}

const amount = 1

for (let i = 0; i < amount; i++) {
    balls.push(new Ball({ x: xCenter +50, y: yCenter }, bigCircleRadius/10, 'blue'))
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, right, bottom)
    backgroundCircle()
    balls.forEach((ball, i) => {
        colliding(ball)
        ball.update()
    })
}
animate()

addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

addEventListener('resize', () => {
    xCenter = canvas.width / 2
    yCenter = canvas.height / 2
    right = canvas.width
    bottom = canvas.height
    bigCircleRadius = canvas.height/2.8
}) 
