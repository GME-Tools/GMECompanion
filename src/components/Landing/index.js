import React, { Component } from 'react';
import {withAuthorization} from '../Session';
import {authenticatedCondition} from '../../constants/roles';

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Landing</h1>
      </div>
    );
  }
}

export default withAuthorization(authenticatedCondition)(Landing);
