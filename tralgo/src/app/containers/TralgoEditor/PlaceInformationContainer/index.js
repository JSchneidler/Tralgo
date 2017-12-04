import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Input,
  List,
  ListSubheader,
  Divider,
  TextField,
  Tabs,
  Tab,
} from 'material-ui';

import PlaceInformation from './PlaceInformation';
import PointsInformation from './PointsInformation';
import EdgesInformation from './EdgesInformation';
import * as placeActions from 'actions/placeActions';
import * as editorActions from 'actions/editorActions';

const PlaceInformationContainer = props => {
  function handleAddNode(nodeType, values) {
    props.addPlaceNode(nodeType, values);
  }

  function getView() {
    if (props.editor.view === 'points') return <PointsInformation onAddNode={handleAddNode}/>;
    if (props.editor.view === 'edges') return <EdgesInformation onAddNode={handleAddNode} />;
    return <PlaceInformation />; // Return place information by default
  }

  function changeEditorView(event, value) {
    props.changeEditorView(value);
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <Button dense raised color="primary" onClick={props.cancelEditPlace}>X</Button>
      </Grid>
      <Grid item xs={10}>
        <Tabs
          value={props.editor.view}
          onChange={changeEditorView}
          fullWidth
        >
          <Tab label="Place" value="place"></Tab>
          <Tab label="Points" value="points"></Tab>
          <Tab label="Edges" value="edges"></Tab>
        </Tabs>
        <Button dense raised color="primary" onClick={props.savePlace}>Save</Button>
      </Grid>
      {getView()}
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    place: state.place,
    map: state.map,
    editor: state.editor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewPlace: () => dispatch(editorActions.createNewPlace()),
    cancelEditPlace: () => dispatch(editorActions.cancelEditPlace()),
    addPlaceNode: (nodeType, node) => dispatch(placeActions.addPlaceNode(nodeType, node)),
    changeEditorView: view => dispatch(editorActions.changeEditorView(view)),
    savePlace: () => dispatch(placeActions.savePlace()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInformationContainer);