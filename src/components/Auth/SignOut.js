import React from 'react';

import { Button } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';

import { withFirebase } from '../Firebase';
 
const SignOutButton = ({ firebase }) => (
  <Button
    onClick={firebase.doSignOut}
    startIcon={<LogoutIcon />}
  >
    Déconnexion
  </Button>
);
 
export default withFirebase(SignOutButton);