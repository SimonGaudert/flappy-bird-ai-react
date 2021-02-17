import React, { Component } from 'react';
import GameCanvas from './components/game-canvas/game-canvas'
import ControlPanel from './components/control-panel/control-panel'
import Header from './components/header/header'
import './App.css';
import Grid from '@material-ui/core/Grid';
import Population from './models/Population'
import './game-parameters';


class App extends Component {
  
  population = null;

  createPopulation(p){
    this.population = new Population(p, global.gameParameters.learning.population)
  }

  restartPopulation(){
    if(this.population){
      this.population = new Population(this.population.p, global.gameParameters.learning.population)
    }
  }

  getPopulation(){
    return this.population
  }

  gameLoop(){
    if (!this.population.allBirdsDead()) {
      this.population.update();
    } else { 
      this.population.naturalSelection();
    }
  }
  

  render() {
    return (
      <div>
        <Header></Header>
        <div class="App">

          <Grid container direction="row" justify="center" alignItems="top" spacing={2}>

          <Grid item xs>
            <GameCanvas gameLoop={() => this.gameLoop()} createPopulation={(p) => this.createPopulation(p)} getPopulation={()=>this.getPopulation()}></GameCanvas>
          </Grid>
          <Grid item xs>
            <ControlPanel restartPopulation={() => this.restartPopulation()}></ControlPanel>
          </Grid>


          </Grid>
        </div>
      </div>
    );
  }
}

export default App;