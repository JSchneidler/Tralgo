import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  TextField,
  ListSubheader,
  Divider,
} from 'material-ui';

import * as placeActions from 'actions/placeActions';
import EdgeInputForm from './EdgeInputForm';

const EdgesInformation = props => {
  function renderPolylineInput(edge) {
    return (
      <Grid item xs={12}>
        {edge.coordinates.map((coordinate, i) => {
          if (Array.isArray(coordinate)) {
            return (
              <div key={i}>
                <TextField label="Latitude" value={coordinate[0]} onChange={e => props.updateEdgePolyline(edge.id, i, 'latitude', e.target.value)} />
                <TextField label="Longitude" value={coordinate[1]} onChange={e => props.updateEdgePolyline(edge.id, i, 'longitude', e.target.value)} />
              </div>
            );
          } else return (
            <TextField key={i} label="Point" value={coordinate} onChange={e => props.updateEdgePolyline(edge.id, i, 'point', e.target.value)} />
          );
        })}
      </Grid>
    );
  }

  return (
    <div>
      <EdgeInputForm onSubmit={(values) => props.onAddNode('edge', values)} />
      <Grid container spacing={0}>
      {props.place && props.place.Edges && props.place.Edges.map((edge, i) => 
        <div key={i}>
          {i > 0 && 
            <Divider />
          }
          <Grid item xs={12}><TextField label="Name" value={edge.name} onChange={e => props.updatePlaceEdge(edge.id, 'name', e.target.value)} /></Grid>
          <ListSubheader>Coordinates</ListSubheader>
          {renderPolylineInput(edge)}
        </div>
      )}
      </Grid>
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
    updatePlaceEdge: (nodeId, property, value) => dispatch(placeActions.updatePlaceNode('edge', nodeId, property, value)),
    updateEdgePolyline: (edgeId, coordinateIndex, field, value) => dispatch(placeActions.updateEdgePolyline(edgeId, coordinateIndex, field, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EdgesInformation);