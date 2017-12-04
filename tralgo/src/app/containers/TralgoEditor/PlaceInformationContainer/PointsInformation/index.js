import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  TextField
} from 'material-ui';

import * as placeActions from 'actions/placeActions';
import PointInputForm from './PointInputForm';

const PointsInformation = props => {
  return (
    <div>
      <PointInputForm onSubmit={(values) => props.onAddNode('point', values)} />
      {props.place && props.place.Points && props.place.Points.map((point, i) => 
        <Grid key={point.id} container spacing={0}>
          <Grid item xs={12} sm={4}><TextField label="Name" value={point.name} onChange={(e) => props.updatePlacePoint(point.id, 'name', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField label="Latitude" value={point.coordinates[0]} onChange={(e) => props.updatePlacePoint(point.id, 'latitude', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField label="Longitude" value={point.coordinates[1]} onChange={(e) => props.updatePlacePoint(point.id, 'longitude', e.target.value)} /></Grid>
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    place: state.place,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePlacePoint: (nodeId, property, value) => dispatch(placeActions.updatePlaceNode('point', nodeId, property, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PointsInformation);