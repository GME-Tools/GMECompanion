import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


const styles = theme => ({
  appBar: {
    flexGrow: 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  }
});

class AppBarBase extends Component {
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
        <AppBar position ="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              className={classes.menuButton}
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>{this.props.title}</Typography>
            {this.props.button}
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
          <div
            role="presentation"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {this.props.drawerlist}
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AppBarBase);
