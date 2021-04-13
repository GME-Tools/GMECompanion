import React, { Component } from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import {withAuthorization} from '../Session';
import {authenticatedCondition} from '../../constants/roles';

import { Container } from '@material-ui/core';
import AppBar from './AppBar';

const styles = theme => ({
  landingcontainer: {
    marginTop: '70px'
  }
})

class DashboardBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: {}
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const userId = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.db.collection('users').doc(userId).get()
      .then(doc => {
        if (doc.data().hasOwnProperty('campaigns')) {
          const campaign = doc.data().campaigns.find(elem => elem.id === params.id)
          this.setState({campaign: campaign});
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <AppBar
          title={this.state.campaign.name}
        />
        <Container className={classes.landingcontainer} maxWidth="md">
          {this.state.campaign.ruleset}
        </Container>
      </React.Fragment>
    );
  }
}

const Dashboard = compose(
  withStyles(styles),
  withAuthorization(authenticatedCondition)
)(DashboardBase);

export default Dashboard
