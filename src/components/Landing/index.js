import React, { Component } from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import {withAuthorization} from '../Session';
import {authenticatedCondition} from '../../constants/roles';

import { AppBar, Drawer, IconButton, Toolbar } from '@material-ui/core';
import { List, ListItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { SignOutButton } from '../Auth';


const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  fulllist: {
    width: '300'
  },
  landingcontainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
})

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    }
  }

  toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({drawerOpen: open});
    event.preventDefault();
  };

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              className={classes.menuButton}
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
          <div
            className={classes.list}
            role="presentation"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <List>
              <ListItem>
                <SignOutButton />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <div className={classes.landingcontainer}>
          <h1>Landing</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default compose(
  withAuthorization(authenticatedCondition),
  withStyles(styles)
)(Landing);
