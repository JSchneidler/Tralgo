import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import Select from './Select';
import * as placeActions from 'actions/placeActions';
import * as editorActions from 'actions/editorActions';

const PlaceSelect = props => {
	function getPlaceNames(input) {
    let url = 'http://localhost:3001/api/places';
    if (input) url += `?query=${input}`;
    return axios.get(url).then(res => {
      return {
        options: res.data.map(place => {
          return { label: place.name, value: place.id };
        })
      };
    });
  }

  function onPlaceSelect(place) {
    if (place) {
			props.edit ?
			props.handlePlaceEdit(place.value) :
			props.handlePlaceSelect(place.value);
		} else props.clearPlace();
	}

	const id = props.place ? props.place.id : null;

	return (
		<Select
			value={id}
			loadOptions={getPlaceNames}
			onChange={onPlaceSelect}
			placeholder="Search places..."
		/>
	);
};

PlaceSelect.propTypes = {
	edit: PropTypes.bool,
};

const mapStateToProps = state => {
	return {
		place: state.place,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		handlePlaceSelect: placeId => dispatch(placeActions.loadPlace(placeId)),
		handlePlaceEdit: placeId => dispatch(editorActions.editPlace(placeId)),
		clearPlace: () => dispatch(placeActions.clearPlace()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceSelect);