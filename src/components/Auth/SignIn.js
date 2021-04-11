import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
class SignInBase extends Component {
  handleSignIn = event => {
    this.props.firebase.doSignIn()
      .then(() => {
        this.props.history.push(ROUTES.HOME);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <button onClick={this.handleSignIn}>
          Identification Google
        </button>
      </div>
    );
  }
}
 
const SignIn = compose(
  withRouter,
  withFirebase,
)(SignInBase);
 
export default SignIn;
