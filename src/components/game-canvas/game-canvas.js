import React, { Component } from 'react';
import Sketch from "react-p5";
import Population from '../../models/Population'
import './game-canvas.css'

class GameCanvas extends Component {

  canvas;

  constructor(props){
    super(props);
  }


  preload = (p) => {
    p.loadImage("./background.png", img => {
      this.backgroundImage = img;
    });

    p.loadImage("./bird.png", img => {
      this.birdImage = img;
    });
  }

  setup = (p, parentRef) => {
    p.frameRate(60);
    this.props.createPopulation(p)
    this.canvas = p.createCanvas(600, 700).parent(parentRef);
  }

  draw = (p) => {
    // p.background(135, 206, 250); // Clean last draw
    if(this.backgroundImage){
      p.image(this.backgroundImage, 0, 0,850,850);
    }

    this.props.gameLoop()
    
    let population = this.props.getPopulation()

    p.fill('while');
    p.rect(8,16,140,60)

    p.fill('black');
    p.text("Generation: " + population.generation, 10, 30);
    p.text("Birds Alive: " + population.calculateLivingBirds() + " / " + population.size, 10, 50);
    p.text("Pipes Cleared: " + population.pipesClearedByGeneration, 10, 70);
  }

  render() {
    return (
      <div>
        <Sketch class="sketch" preload={this.preload} setup={this.setup} draw={this.draw}></Sketch>
      </div>
    );
  }
}

export default GameCanvas;