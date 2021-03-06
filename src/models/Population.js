import DoublePipe from './DoublePipe'
import Bird from './Bird'

class Population {

    constructor(p, size) {
        //p5 object
        this.p = p

        this.size = size;
        this.generation = 1;
        this.pipesClearedByGeneration = 0;
        this.birds = [];
        for (var i = 0; i < size; i++) {
            this.birds[i] = new Bird();
        }
        this.doublePipe = new DoublePipe(this.p);
        this.dummyDoublePipe= null;
    }

    update() {
        this.updatePipes();
        this.updateBirds();
    }

    updateBirds(){
        for (let bird of this.birds) {
            if (!bird.dead) {
                bird.look(this.doublePipe);
                bird.think();
                bird.update(this.doublePipe);
                if (true) { // TODO: set to false if we want to not render for better performance
                    bird.draw(this.p);
                }
            }
        }
        if (this.allBirdsDead()) {
            this.doublePipe = new DoublePipe(this.p);
            this.dummyDoublePipe = null;
        }
    }

    updatePipes() {
        if(this.birds[0].x > this.doublePipe.topPipe.x + this.doublePipe.topPipe.width){
            this.pipesClearedByGeneration++;
            this.dummyDoublePipe = this.doublePipe;
            this.doublePipe = new DoublePipe(this.p);
        }

        if (!this.doublePipe.checkOnScreen()) {
            this.pipesClearedByGeneration++;
            this.doublePipe = new DoublePipe(this.p)
        }
        this.doublePipe.update()
        if(this.dummyDoublePipe){
            this.dummyDoublePipe.update()
        }


        if (true) { // TODO: set to false if we want to not render for better performance
            this.doublePipe.draw()
            if(this.dummyDoublePipe){
                this.dummyDoublePipe.draw()
            }
        }
    }

    naturalSelection() {
        this.calculateAllFitness()
        let totalFitness = this.calculateTotalFitness()
        this.sortBirds()
        let temp = []
        // eslint-disable-next-line no-unused-vars
        for (let bird of this.birds) {
            temp.push(this.pickBird(totalFitness))
        }
        this.birds = temp
        this.generation++
        this.pipesClearedByGeneration = 0;
    }

    //sort descending by fitness
    sortBirds() {
        this.birds.sort(function (a, b) { return b.fitness - a.fitness })
    }

    pickBird(totalFitness) {
        let index = 0;
        let r = Math.random();

        while (r > 0) {
            r -= (this.birds[index].fitness / totalFitness); //Picking birds proportional to fitness
            index += 1;
        }
        index -= 1;

        return this.birds[index].copy();
    }

    calculateAllFitness() {
        for (let bird of this.birds) {
            bird.calculateFitness()
        }
    }

    calculateTotalFitness() {
        let total = 0;
        for (let bird of this.birds) {
            total += bird.fitness
        }
        return total;
    }

    allBirdsDead() {
        for (let bird of this.birds) {
            if (bird.dead !== true) {
                return false;
            }
        }
        return true;
    }

    calculateLivingBirds(){
        let count = 0;
        for (let bird of this.birds) {
            if (bird.dead !== true) {
                count++;
            }
        }
        return count;
    }
}

export default Population