import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Button, TextField } from 'material-ui';

const EdgeInputForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name="name" component="input" type="text" />
      <Button dense raised color="primary" type="submit">+</Button>
    </form>
  );
};

export default reduxForm({
  form: 'edge-input'
})(EdgeInputForm);