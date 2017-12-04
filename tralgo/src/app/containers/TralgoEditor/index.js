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

import TralgoLeaflet from 'components/TralgoLeaflet';
import PlaceSelect from 'containers/PlaceSelect';
import PlaceInformationContainer from './PlaceInformationContainer';
import * as editorActions from 'actions/editorActions';
import * as mapActions from 'actions/mapActions';

class TralgoEditor extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleMapMoveEnd = this.handleMapMoveEnd.bind(this);
  }

  componentWillUnmount() {
    this.props.cancelEditPlace();
  }

  handleMapMoveEnd(event) {
    this.props.setMapZoom(event.target.getZoom());
    this.props.setMapCenter(event.target.getCenter());
  }

  render() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} md={4}>
          {!this.props.editor.creating &&
            <div>
              <PlaceSelect edit/>
              <Button raised color="primary" className="btn" disabled={this.props.editor.creating} onClick={this.props.createNewPlace}>Create New</Button>
            </div>
          }
          {this.props.editor.creating && <PlaceInformationContainer />}
        </Grid>
        <Grid item xs={12} md={8}>
          <TralgoLeaflet edit
            place={this.props.place}
            onMoveEnd={this.handleMapMoveEnd}
          />
        </Grid>
      </Grid>
    );
  }
};

const mapStateToProps = state => {
  return {
    place: state.place,
    editor: state.editor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelEditPlace: () => dispatch(editorActions.cancelEditPlace()),
    setMapZoom: zoom => dispatch(mapActions.setMapZoom(zoom)),
    setMapCenter: center => dispatch(mapActions.setMapCenter(center)),
    createNewPlace: () => dispatch(editorActions.createNewPlace()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TralgoEditor);