import React from 'react';
import {Route} from 'react-router-dom';

import {AuthUserContext} from '../Session';

import Landing from '../Landing';
import { SignIn } from '../Auth';
 
import * as ROUTES from '../../constants/routes';

const AppRoutes = () => (
  <div>
    <AuthUserContext.Consumer>
      { authUser =>
        authUser ? <AppRoutesAuth /> : <AppRoutesNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const AppRoutesAuth = () => (
  <React.Fragment>
    <Route path={ROUTES.LANDING} component={Landing} />
  </React.Fragment>
);
 
const AppRoutesNonAuth = () => (
  <React.Fragment>
    <Route path={ROUTES.LANDING} component={SignIn} />
  </React.Fragment>
);

export default AppRoutes;