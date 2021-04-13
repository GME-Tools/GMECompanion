import React, { Component } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import rulesets from '../../constants/rulesets';

const INITIAL_STATE = {
  open: false,
  name: "",
  ruleset: 'mythic'
}

class CreateCampaignDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  openDialog = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.name, this.state.ruleset);
    this.setState({...INITIAL_STATE});
  }

  render() {
    return (
      <Dialog open={this.state.open} onClose={() => this.handleClose()}>
        <DialogTitle>Nouvelle Campagne</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom"
            fullWidth
            onChange={event => this.setState({name: event.target.value})}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Règles</FormLabel>
              <RadioGroup name="ruleset" value={this.state.ruleset} onChange={event => this.setState({ruleset: event.target.value})}>
                {Object.keys(rulesets).map( (key, idx) => (
                  <FormControlLabel key={key} value={key} control={<Radio />} label={rulesets[key].name} />
                ))}
              </RadioGroup>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Annuler
          </Button>
          <Button onClick={() => this.handleSubmit()} color="primary">
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export { CreateCampaignDialog }
