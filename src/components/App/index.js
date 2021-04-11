import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {withAuthentication} from '../Session';
import AppRoutes from './AppRoutes';

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default withAuthentication(App);