import React, { Component } from 'react';
import { Chip, Typography } from '@material-ui/core';
import OracleIcon from '../../../assets/oracle.jpg';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  chip: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  label: {
    display: 'flex',
    flexDirection: 'column'
  }
});

class FateCheckView extends Component {
  render() {
    const { classes, data } = this.props;
    const answer = (data.isYes ? "Oui" : "Non") 
                 + (data.isExceptional ? " Exceptionel" : "");
    const mod = data.mods[0]+data.mods[1];
    const result = data.dice[0]+data.dice[1]+mod;
    const diceline = "2d10+" + mod + ': (' + data.dice[0] + ',' + data.dice[1] + ') ' + result;
    const chaosline = "1d10 : (" + data.dice[2] + ")";
    return (
      <Chip
        icon={<img src={OracleIcon} alt="" width="16" />}
        label={
          <div className={classes.label}>
            <Typography style={{whiteSpace: 'normal'}} variant="button">
              {answer}
            </Typography>
            {data.randomEvent &&
              <Typography style={{whiteSpace: 'normal'}}>
                Evénément aléatoire
              </Typography>
            }
            <Typography style={{whiteSpace: 'normal'}} variant="caption">
              {diceline}
            </Typography>
            <Typography style={{whiteSpace: 'normal'}} variant="caption">
              {chaosline}
            </Typography>
          </div>
        }
        style={{height:"100%"}}
        className={classes.chip}
      />
    )
  }
}

export default withStyles(styles)(FateCheckView);