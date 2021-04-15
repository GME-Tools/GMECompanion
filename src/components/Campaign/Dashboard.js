import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import {withAuthorization} from '../Session';
import {authenticatedCondition} from '../../constants/roles';

import { Card, Container, Collapse, Divider, Fab, IconButton, Paper, Typography } from '@material-ui/core';
import { List, ListItem } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AppBar from './AppBar';
import { SignOutButton } from '../Auth';

import FateCheckView from './ChipViews/FateCheckView';

import { campaign as getCampaign, fateCheck } from '../../constants/api';

import OracleIcon from '../../assets/oracle.jpg';
import EventIcon from '../../assets/event.png';

const styles = theme => ({
  landingcontainer: {
    position: 'relative',
    marginTop: '70px',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto'
  },
  chaosdisplay: {
    margin: '5px 0 5px 0',
    textAlign: 'center',
    minHeight: '20px'
  },
  logpaper: {
    position: 'absolute',
    top: '40px',
    bottom: '5px',
    left: '5px',
    right: '5px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: '5px'
  },
  expandbutton: {
    position: 'absolute',
    bottom: '10px',
    left: '10px'
  },
  actionbar: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    width: '56px',
    paddingBottom: '60px',
    borderRadius: '28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  chiplist: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  chipitem: {
    alignItem: 'flex-end',
    justifyContent: 'flex-end'
  }
});

const ListScroller = ({list, scrollRef}) => {
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [list, scrollRef]);
  return null;
}

class DashboardBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: {},
      actionopen: false,
      logdata: []
    }

    this.scrollRef = React.createRef(null);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const userId = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.db.collection('users').doc(userId).get()
      .then(doc => {
        if (doc.data().hasOwnProperty('campaigns')) {
          const campaign = doc.data().campaigns.find(elem => elem.id === params.id)
          this.setState({campaign: campaign});
          axios.get(getCampaign+'/'+campaign.id)
            .then(res => {
              this.setState({campaign: {
                ...this.state.campaign,
                ...res.data
              }})
            })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  handleClick = () => {
    this.setState({actionopen: !this.state.actionopen});
  }

  fateCheck = () => {
    axios.post(fateCheck, {
      campaignID: this.state.campaign.id,
      odd: '50',
      yesorno: 'y'
    }).then(res => {
      this.setState({logdata: [
        ...this.state.logdata,
        {
          key: uuidv4(),
          type: 'fatecheck',
          payload: res.data
        }
      ]})
    })
  }
  
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <AppBar
          title={this.state.campaign.name}
          drawerlist={
            <List>
              <ListItem>
                <Divider />
                <SignOutButton />
              </ListItem>
            </List>
          }
        />
        <Container className={classes.landingcontainer} maxWidth="sm">
          <Card className={classes.chaosdisplay}>
            <Typography variant="button">Chaos : {this.state.campaign.chaosFactor}</Typography>
          </Card>
          <Paper className={classes.logpaper}>
            <List className={classes.chiplist} style={{maxHeight: '100%', overflow: 'auto'}}>
            {
              this.state.logdata.map((log,idx) => {
                return (
                  <ListItem key={log.key} className={classes.chipitem}>
                    <FateCheckView data={log.payload} />
                  </ListItem>
                )
              })
            }
              <ListItem ref={this.scrollRef} />
              <ListScroller list={this.state.logdata} scrollRef={this.scrollRef} />
            </List>
          </Paper>
          <Collapse in={this.state.actionopen}>
            <Paper className={classes.actionbar}>
              <IconButton onClick={()=>this.fateCheck()}><img src={OracleIcon} alt="I" width={32} /></IconButton>
              <IconButton><img src={EventIcon} alt="I" width={32} /></IconButton>
            </Paper>
          </Collapse>
          <Fab
            className={classes.expandbutton}
            color="primary"
            onClick={()=>this.handleClick()}
          >
            {this.state.actionopen ? <ExpandMore /> : <ExpandLess/> }
          </Fab>
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
