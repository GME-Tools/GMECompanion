import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '../Theme';

import { withAuthentication } from '../Session';
import AppRoutes from './AppRoutes';

const useStyles = makeStyles({
  appcontainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
});

const App = (props) => {
  const classes = useStyles(props);
  
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appcontainer}>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default withAuthentication(App);