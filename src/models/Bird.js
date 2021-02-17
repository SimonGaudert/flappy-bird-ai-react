import NeuralNetwork from '../libraries/nn'
import '../game-parameters';

function gaussianRand() {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}

function mutate(x) {
  if (Math.random() < global.gameParameters.learning.mutationRate) {
      let offset = gaussianRand() * 0.5;
      let newx = x + offset;
      return newx;
  } else {
      return x;
  }
}

const canvas = {width: 600, height: 700}

class Bird {

  constructor(brain) {
    //Bird properties
    this.x = canvas.width / 3;
    this.y = canvas.height / 2;
    this.xVel = 0;
    this.yVel = 0;
    this.size = 40;

    //NEAT properties
    this.dead = false;
    this.fitness = 0;
    this.lifetime = 0;
    this.visionInputs = [];
    this.descisionOutputs = [];
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(4, 3, 1);
    }
  }

  look(doublePipe){
    // Normalize values between 0 and 1 to remove any bias
    this.visionInputs = 
    [
      this.y/canvas.height,
      doublePipe.bottomPipe.height/canvas.height,
      (canvas.height - doublePipe.topPipe.height)/canvas.height,
      (doublePipe.topPipe.x - this.x)/canvas.width
    ]
  }

  think(){
    this.descisionOutputs = this.brain.predict(this.visionInputs)
    if(this.descisionOutputs[0] > 0.5){
      this.flap();
    }
  }

  draw(p) {
    if(!this.dead){
      p.fill(255, 0, 0);
      p.circle(this.x, this.y, this.size)
    }
  }

  update(doublePipe){
    if(!this.dead){
      this.lifetime++
      this.move()
    } 

    if(this.isKillable(doublePipe)){ //Check if 
      this.dead = true;
    }
  }

  isKillable(doublePipe){
    return this.isHittingPipe(doublePipe) || this.isOffScreen()
  }

  isHittingPipe(doublePipe){
    return doublePipe.checkCollision(this)
  }

  isOffScreen(){
    return this.y > canvas.height || this.y < 0
  }

  move() {
    this.yVel += global.gameParameters.game.gravity;
    this.y += this.yVel;
  }

  calculateFitness() {
    this.fitness = Math.pow(this.lifetime, 2)
  }

  flap() {
    this.yVel = -15;
  }

  copy(){
    return new Bird(this.brain);
  }
}

export default Bird