import * as types from 'constants/actionTypes';
import { merge, findKey } from 'lodash';

export default (state = null, action={}) => {
	switch(action.type) {
		case types.SET_PLACE:
			action.place.updates = {
				Edges: [],
				Points: [],
			};
			return action.place;
		case types.CLEAR_PLACE:
			return null;
		case types.ADD_PLACE_NODE_SUCCESS:
			return addPlaceNode();
		case types.UPDATE_PLACE_PROPERTY:
			return updatePlaceProperty();
		case types.UPDATE_PLACE_CENTER:
			return updatePlaceCenter();
		case types.UPDATE_PLACE_NODE:
			return updatePlaceNode();
		case types.UPDATE_EDGE_POLYLINE:
			return updateEdgePolyline();
		default:
			return state;
	}

	function addPlaceNode() {
		let place = {...state};
		let nodeType = getNodeType(action.nodeType);
		let node = {
			id: action.node.id,
			name: action.node.name,
			coordinates: [action.node.coordinates[0], action.node.coordinates[1]],
		};

		if (!place[nodeType]) place[nodeType] = [node];
		else place[nodeType].unshift(node);
		return place;
	}

	function updatePlaceProperty() {
		let place = {...state};
		place[action.property] = action.value;
		place.updates[action.property] = action.value;
		return place;
	}

	function updatePlaceCenter() {
		let place = {...state};
		let index = action.latOrLng === 'latitude' ? 0 : 1;
		place.coordinates[index] = action.value;

		if (!place.updates.coordinates) place.updates.coordinates = [];
		place.updates.coordinates = place.coordinates;

		return place;
	}

	function updatePlaceNode() {
		let place = {...state};
		let nodeType = getNodeType(action.nodeType);
		let update = {};

		let node = place[nodeType][findIndexById(place[nodeType], action.nodeId)];

		if (['latitude', 'longitude'].indexOf(action.property) >= 0) {
			let index = action.property === 'latitude' ? 0 : 1;
			node.coordinates[index] = action.value;
			update.coordinates = node.coordinates;
		} else {
			node[action.property] = action.value;
			update[action.property] = action.value;
		}

		let index = findIndexById(place.updates[nodeType], action.nodeId);

		if (!index) place.updates[nodeType].push({
			id: action.nodeId,
		});
		merge(place.updates[nodeType][index], update);

		return place;
	}

	function updateEdgePolyline() {
		let place = {...state};

		let edge = place.Edges[findIndexById(place.Edges, action.edgeId)];

		if (action.field === 'point') edge.coordinates[action.coordinateIndex] = action.value;
		else if (action.field === 'latitude') edge.coordinates[action.coordinateIndex][0] = action.value;
		else if (action.field === 'longitude') edge.coordinates[action.coordinateIndex][1] = action.value;

		let index = findIndexById(place.updates.Edges, action.edgeId);

		if (!index) place.updates.Edges.push({
			id: action.edgeId,
		});
		place.updates.Edges[index].coordinates = edge.coordinates;

		return place;
	}
}

function findIndexById(nodes, id) {
	return findKey(nodes, o => {
		return o.id === id;
	});
}

function getNodeType(type) {
	switch (type) {
		case 'point':
			return 'Points';
		case 'edge':
			return 'Edges';
	}
}