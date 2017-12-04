import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Input,
  TextField,
} from 'material-ui';

import * as placeActions from 'actions/placeActions';
import * as editorActions from 'actions/editorActions';

const PlaceInformation = props => {
  function getPlaceLatitude() { return (props.place && props.place.coordinates) ? props.place.coordinates[0] : ''; }
  function getPlaceLongitude() { return (props.place && props.place.coordinates) ? props.place.coordinates[1] : ''; }

  const placeName = props.place ? props.place.name : '';
  const placeZoom = props.place ? props.place.zoom : '';

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Input className="input" type="text" placeholder="Enter place name..." value={placeName} onChange={e => props.updatePlaceProperty('name', e.target.value)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Latitude" value={getPlaceLatitude()} onChange={e => props.updatePlaceCenter('latitude', e.target.value)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Longitude" value={getPlaceLongitude()} onChange={e => props.updatePlaceCenter('longitude', e.target.value)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Zoom" value={placeZoom} onChange={e => props.updatePlaceProperty('zoom', e.target.value)} />
        <Button dense raised color="primary" onClick={() => props.updatePlaceProperty('zoom', props.map.zoom)} disabled={!props.map}>Set from Map</Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    place: state.place,
    map: state.map,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createNewPlace: () => dispatch(editorActions.createNewPlace()),
    cancelEditPlace: () => dispatch(editorActions.cancelEditPlace()),
    updatePlaceProperty: (property, value) => dispatch(placeActions.updatePlaceProperty(property, value)),
    updatePlaceCenter: (latOrLng, value) => dispatch(placeActions.updatePlaceCenter(latOrLng, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInformation);