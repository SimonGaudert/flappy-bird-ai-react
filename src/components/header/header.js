import React, { Component } from 'react';
import './header.css';
import bird from '../../assets/bird.png'

import Grid from '@material-ui/core/Grid';


class Header extends Component {
    render() {
        return (
            <div className="header">

                <Grid container direction="row" justify="flex-start" alignItems="center">
                    <Grid item>
                        <div class="title">Alpha Bird | Deep Mind</div>
                    </Grid>
                    <Grid item>
                        <img src={bird} className="banner-bird" alt="logo" />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Header;
