import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import Divider from '@material-ui/core/Divider';
// import Switch from '@material-ui/core/Switch';

import './control-panel.css'
import '../../game-parameters';

class ControlPanel extends Component {

  constructor(props) {
    super(props);
    this.scrollSpeed = global.gameParameters.game.scrollSpeed;
    this.pipeGap = global.gameParameters.game.pipeGap;
    this.population = global.gameParameters.learning.population;
    this.mutationRate = global.gameParameters.learning.mutationRate;
    this.gravity = global.gameParameters.game.gravity;
    this.flapVelocity = global.gameParameters.game.flapVelocity;
    this.renderBirds = global.gameParameters.game.renderBirds;
  }

  handlePipeGapChange(event, value) {
    global.gameParameters.game.pipeGap = value;
  }

  handleScrollSpeedChange(event, value) {
    global.gameParameters.game.scrollSpeed = value;
  }

  handlePopulationChange(event, value) {
    global.gameParameters.learning.population = value;
  }

  handleMutationRateChange(event, value) {
    global.gameParameters.learning.mutationRate = value;
  }

  handleGravityChange(event, value) {
    global.gameParameters.game.gravity = value;
  }

  handleFlapVelocityChange(event, value) {
    global.gameParameters.game.flapVelocity = value;
  }

  handleRenderBirdsChange(event, value) {
    global.gameParameters.game.showBirds = value;
  }
  
  render() {
    return (
      <div class="panel-container">

        <Typography style={{ marginTop: "15px" }} gutterBottom variant="h4">
          Game Settings
        </Typography>

        <Grid style={{ marginBottom: "15px" }} container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom style={{textAlign:'left'}} variant="h6">
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
            <Typography gutterBottom style={{textAlign:'left'}} variant="h6">
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
        <Grid style={{ marginBottom: "15px" }} container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom style={{textAlign:'left'}} variant="h6">
              Gravity
            </Typography>
            <Slider
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={20}
              defaultValue={this.gravity}
              onChange={this.handleGravityChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom style={{textAlign:'left'}} variant="h6">
              Flap Velocity
            </Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={100}
              defaultValue={this.flapVelocity}
              onChange={this.handleFlapVelocityChange}
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

        <Typography style={{ marginTop: "30px" }} gutterBottom variant="h4">
          AI Settings
        </Typography>

        <Grid style={{ marginBottom: "15px" }} container spacing={3}>
          <Grid item xs={12} sm={6} >
            <Typography gutterBottom style={{textAlign:'left'}} variant="h6">
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
            <Typography gutterBottom style={{textAlign:'left'}} variant="h6">
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
          <Button style={{textTransform: 'none'}} onClick={()=>this.props.restartPopulation()} variant="contained" color="primary" startIcon={<ReplayIcon />}>
            Restart Training
          </Button>
        </Grid>

      </div>
    );
  }
}

export default ControlPanel;