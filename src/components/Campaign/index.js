import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import {withAuthorization} from '../Session';
import {authenticatedCondition} from '../../constants/roles';

import AppBar from './AppBar';
import { CreateCampaignDialog } from './Dialogs.js';
import { Container, IconButton } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { campaignCreate } from '../../constants/api';
import rulesets from '../../constants/rulesets';
import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  landingcontainer: {
    marginTop: '70px'
  }
})

class CampaignListBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: []
    }

    this.createCampaignDialog = React.createRef();
  }

  componentDidMount() {
    const userId = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.db.collection('users').doc(userId).get()
      .then(doc => {
        if (doc.data().hasOwnProperty('campaigns')) {
          this.setState({campaigns: doc.data().campaigns});
        }
        else {
          this.setState({campaigns: []});
        }
      })
      .catch(err => {
        this.props.firebase.db.collection('users').doc(userId).set({});
      });
  }
  
  handleCreateCampaign = (name, ruleset) => {
    axios.post(campaignCreate, {})
      .then(res => {
        const userId = this.props.firebase.auth.currentUser.uid;
        const campaigns = [
          ...this.state.campaigns,
          {
            id: res.data._id,
            name: name,
            ruleset: ruleset
          }
        ]
        console.log(campaigns);
        this.props.firebase.db.collection('users').doc(userId).update({campaigns: campaigns});
        this.setState({campaigns: campaigns});
      })
      .catch(err => console.log(err));
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <AppBar
          title="Campagnes"
          button={
            <IconButton
              color="inherit"
              onClick={event => this.createCampaignDialog.current.openDialog()}
            >
              <AddIcon />
            </IconButton>
          }
        />
        <Container className={classes.landingcontainer} maxWidth="md">
          <List>
            {this.state.campaigns.map( (key,idx) => (
              <ListItem key={idx} button>
                <ListItemText
                  primary={this.state.campaigns[idx].name}
                  secondary={rulesets[this.state.campaigns[idx].ruleset].name}
                  onClick={()=>this.props.history.push(ROUTES.CAMPAIGN+'/'+this.state.campaigns[idx].id)}
                />
              </ListItem>
            ))}
          </List>
        </Container>
        <CreateCampaignDialog 
          ref={this.createCampaignDialog}
          onSubmit={(name, ruleset)=>this.handleCreateCampaign(name,ruleset)}/>
      </React.Fragment>
    );
  }
}

const CampaignList = compose(
  withStyles(styles),
  withRouter,
  withAuthorization(authenticatedCondition)
)(CampaignListBase);

export { CampaignList }
