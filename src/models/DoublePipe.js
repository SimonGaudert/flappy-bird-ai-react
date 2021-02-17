import Pipe from './Pipe'
import PipeType from './PipeType'
import '../game-parameters';

const canvas = {width: 600, height: 700}

class DoublePipe {

    constructor(p) {
        // p5 object
        this.p = p;

        this.gap = global.gameParameters.game.pipeGap;
        this.minimumHeight = 25;
        this.topPipeHeight = Math.random() * ((canvas.height - this.gap - 2 * this.minimumHeight)) + this.minimumHeight;
        this.bottomPipeHeight = canvas.height - this.topPipeHeight - this.gap
        this.topPipe = new Pipe(PipeType.TOP, this.topPipeHeight);
        this.bottomPipe = new Pipe(PipeType.BOTTOM, this.bottomPipeHeight)
    }

    draw() {
        this.topPipe.draw(this.p)
        this.bottomPipe.draw(this.p)
    }

    update() {
        this.topPipe.update()
        this.bottomPipe.update()
        this.draw()
    }

    checkOnScreen() {
        if (this.bottomPipe.x + this.bottomPipe.width < 0) {
            return false;
        }
        return true;
    }

    checkCollision(bird) {
        if ((bird.x+bird.size/2) >= this.topPipe.x &&
             bird.x <= this.topPipe.x + this.topPipe.width &&
            (bird.y+bird.size/2) >= this.topPipe.y &&
             bird.y <= this.topPipe.y + this.topPipe.height) {
            return true;
        } else if ((bird.x + bird.size/2) >= this.bottomPipe.x &&
                    bird.x <= this.bottomPipe.x + this.bottomPipe.width &&
                    (bird.y + bird.size/2) >= this.bottomPipe.y &&
                    bird.y <= this.bottomPipe.y + this.bottomPipe.height) {
            return true;
        } else {
            return false;
        }
    }

}

export default DoublePipe