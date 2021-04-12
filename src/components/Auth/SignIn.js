import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withStyles } from '@material-ui/core/styles';
import { Button, Icon, Typography } from '@material-ui/core';
import * as ROUTES from '../../constants/routes';

import logo from '../../assets/logo.png';

const styles = theme => ({
  signincontainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
})

class SignInBase extends Component {
  handleSignIn = event => {
    this.props.firebase.doSignIn()
      .then(() => {
        this.props.history.push(ROUTES.HOME);
      });
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.signincontainer}>
        <img src={logo} className="App-logo" alt="logo" width={92} />
        <Typography variant="h4">GME Companion</Typography>
        <Button 
          variant="contained"
          size="large"
          startIcon={<Icon className='fab fa-google'/>}
          onClick={this.handleSignIn}>
          Identification Google
        </Button>
      </div>
    );
  }
}
 
const SignIn = compose(
  withStyles(styles),
  withRouter,
  withFirebase,
)(SignInBase);
 
export default SignIn;
