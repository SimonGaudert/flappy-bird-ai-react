import PipeType from './PipeType'
import '../game-parameters';

const canvas = {width: 600, height: 700}

class Pipe{

    constructor(pipeType, height){
        this.width = 50;
        this.height = height;
        this.x = canvas.width;
        this.y = canvas.height/2

        if (pipeType === PipeType.TOP){
            this.y = 0
        } else {
            this.y = canvas.height -  this.height
        }
    }

    draw(p){
        p.fill(30,255,30);
        p.rect(this.x,this.y,this.width, this.height)
    }

    update(){
        this.x -= global.gameParameters.game.scrollSpeed
    }
}

export default Pipe