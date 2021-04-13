import React from 'react';
import {Route} from 'react-router-dom';

import {AuthUserContext} from '../Session';

import { CampaignList } from '../Campaign';
import Dashboard from '../Campaign/Dashboard';
import { SignIn } from '../Auth';
 
import * as ROUTES from '../../constants/routes';

const AppRoutes = () => (
  <AuthUserContext.Consumer>
    { authUser =>
      authUser ? <AppRoutesAuth /> : <AppRoutesNonAuth />
    }
  </AuthUserContext.Consumer>
);

const AppRoutesAuth = () => (
  <React.Fragment>
    <Route exact path={ROUTES.LANDING} component={CampaignList} />
    <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
  </React.Fragment>
);
 
const AppRoutesNonAuth = () => (
  <React.Fragment>
    <Route path={ROUTES.LANDING} component={SignIn} />
  </React.Fragment>
);

export default AppRoutes;