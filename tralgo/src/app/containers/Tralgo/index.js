import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TralgoLeaflet from 'components/TralgoLeaflet';
import PlaceSelect from 'containers/PlaceSelect';

import * as placeActions from 'actions/placeActions';
import * as pathActions from 'actions/pathActions';

class Tralgo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.findPath = this.findPath.bind(this);
    this.getPointByName = this.getPointByName.bind(this);
  }

  componentWillUnmount() {
    this.props.clearPlace();
  }

  findPath() {
    this.props.onFindPathClick({
      mapId: this.props.place.id,
      pathOptions: {
        randomPath: true,
      }
    });
  }

  getPointByName(pointName) {
    for (let i = 0; i < this.props.place.Points.length; i++) {
      const point = this.props.place.Points[i];
      if (point.name === pointName) return point;
    }
  }

  render() {
    return (
      <div>
        <PlaceSelect/>
        <button disabled={!this.props.place} onClick={this.findPath}>Find Path</button>

        <TralgoLeaflet
          place={this.props.place}
          path={this.props.path}
          //handlePointClick={handlePointClick}
        />
      </div>
    );
  }
};

Tralgo.propTypes = {
  place: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    place: state.place,
    path: state.path,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearPlace: () => dispatch(placeActions.clearPlace()),
    onFindPathClick: options => dispatch(pathActions.loadPath(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tralgo);