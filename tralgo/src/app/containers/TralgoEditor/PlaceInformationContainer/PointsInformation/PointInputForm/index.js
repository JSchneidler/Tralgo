import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Button, TextField } from 'material-ui';

const PointInputForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name="trailhead" component="input" type="checkbox" />
      <Field name="name" component="input" type="text" />
      <Field name="lat" component="input" type="text" />
      <Field name="lng" component="input" type="text" />
      <Button dense raised color="primary" type="submit">+</Button>
    </form>
  );
};

export default reduxForm({
  form: 'point-input'
})(PointInputForm);