import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';

import './control-panel.css'
import '../../game-parameters';

class ControlPanel extends Component {

  // gravity;
  
  // renderOnlyOneBird;
  // renderPipes;

  // population;
  // hiddenNodes;

  constructor(props) {
    super(props);
    this.scrollSpeed = global.gameParameters.game.scrollSpeed
    this.pipeGap = global.gameParameters.game.pipeGap
    this.population = global.gameParameters.learning.population
    this.mutationRate = global.gameParameters.learning.mutationRate

    this.props.restartPopulation();
  }

  handlePipeGapChange(event, value) {
    global.gameParameters.game.pipeGap = value
  }

  handleScrollSpeedChange(event, value) {
    global.gameParameters.game.scrollSpeed = value
  }

  handlePopulationChange(event, value) {
    global.gameParameters.learning.population = value
  }

  handleMutationRateChange(event, value) {
    global.gameParameters.learning.mutationRate = value
  }
  
  render() {
    return (
      <div class="panel-container">

        <Typography style={{ marginTop: "15px" }} gutterBottom variant="h4">
          Game Settings
        </Typography>

        <Grid style={{ marginBottom: "15px" }} container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Pipe Gap
            </Typography>
            <Slider
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={25}
              marks
              min={100}
              max={500}
              defaultValue={this.pipeGap}
              onChange={this.handlePipeGapChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Scroll Speed
            </Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={20}
              defaultValue={this.scrollSpeed}
              onChange={this.handleScrollSpeedChange}
            />
          </Grid>
        </Grid>
        {/* <Grid style={{ marginBottom: "15px" }} container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Show Birds
            </Typography>
            <Switch
              checked={this.renderBirds}
              onChange={this.handleRenderBirdsChange}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
        </Grid> */}

        <Divider />

        <Typography style={{ marginTop: "15px" }} gutterBottom variant="h4">
          AI Settings
        </Typography>

        <Grid style={{ marginBottom: "15px" }} container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Population
            </Typography>
            <Slider
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={50}
              marks
              min={100}
              max={1000}
              defaultValue={this.population}
              onChange={this.handlePopulationChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Mutation Rate
            </Typography>
            <Slider
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={0.1}
              marks
              min={0}
              max={1}
              defaultValue={this.mutationRate}
              onChange={this.handleMutationRateChange}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button onClick={()=>this.props.restartPopulation()} variant="contained" color="primary" startIcon={<ReplayIcon />}>
            Restart Training
          </Button>
        </Grid>

      </div>
    );
  }
}

export default ControlPanel;