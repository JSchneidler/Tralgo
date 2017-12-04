import React from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css'; // Must come before leaflet js
import { Map, TileLayer, Marker, Popup, Polyline, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import { isNumber, findKey } from 'lodash';
import 'leaflet-draw/dist/leaflet.draw.css';

import './style.css';
import * as icons from './icons';

// L.Icon.Default.imagePath = '.'; Doesn't work, icons do not load
// OR
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const defaultCenter = [49.083415, -90.400586];

const TralgoLeaflet = (props) => {
	function getPoints() {
		function getPointMeta(key) {
			const meta = {};
			for (let i = 0; i < props.path.length; i++) {
				let element = props.path[i].point;
				if (element && element.name === key) {
					meta.active = true;
					if (i === 0) meta.start = true;
					if (i === props.path.length-1) meta.end = true;
				}
			}

			return meta;
		}

		if (!props.place || !props.place.Points) return;
		const points = [];

		for (let i = 0; i < props.place.Points.length; i++) {
			const point = props.place.Points[i];

			const meta = props.path ? getPointMeta(point.name) : {};
			let icon;
			if (meta.start && meta.end) icon = icons.startAndEndMarkerIcon;
			else if (meta.start) 		icon = icons.startMarkerIcon;
			else if (meta.end) 			icon = icons.endMarkerIcon;
			else if (meta.active) 		icon = icons.activeMarkerIcon;
			else 						icon = icons.markerIcon;

			points.push(
				<Marker
					key={point.id}
					title={point.name}
					icon={icon}
					position={[point.coordinates[0], point.coordinates[1]]}
					onClick={() => props.handlePointClick ? props.handlePointClick(point.name) : null}
				>
					<Popup><span>{ point.name }</span></Popup>
				</Marker>
			);
		}

		return points;
	}

	function getPointByName(name) {
		return props.place.Points[findKey(props.place.Points, (o) => {
			return o.name === name;
		})];
	}

	function getEdges() {
		function isEdgeActive(key) {
			let found = false;
			
			for (let i = 0; i < props.path.length; i++) {
				const element = props.path[i].edge;
				if (element && element.name === key) found = true;
			}

			return found;
		}

		function buildPolyLine(coordinates) {
			let result = [];
			for (let i = 0; i < coordinates.length; i++) {
				if (!Array.isArray(coordinates[i])) {
					let point = getPointByName(coordinates[i]);
					if (point) result.push(parseCoordinates(point.coordinates));
				}
				else result.push(parseCoordinates(coordinates[i]));
			}
			return result;
		}

		if (!props.place || !props.place.Edges) return;

		let edges = [];

		for (let i = 0; i < props.place.Edges.length; i++) {
			let edge = props.place.Edges[i];

			let color = props.path && isEdgeActive(edge.name) ? '#0000FF' : '#000000';

			edges.push(
				<Polyline key={edge.id} positions={buildPolyLine(edge.coordinates)} color={color}>
					<Popup><span>{ edge.name }</span></Popup>
				</Polyline>
			);
		}

		return edges;
	}

	function _onMapMoveEnd(e) {
		console.log(e);
	}
	function _onEditPath(e) {
		console.log('Path edited', e);
	}
	function _onCreate(event) {
		// To edit this polyline call : polyline.handler.enable()
		console.log('Element created', event);
		if (event.layerType === 'marker') {
			let marker = event.layer;
		}
	}
	function _onDeleted(e) {
		console.log('Path deleted', e);
	}
	function _mounted(drawControl) {
		console.log('Component mounted', drawControl);
	}
	function _onEditStart() {
		console.log('Edit is starting');
	}
	function _onEditStop() {
		console.log('Edit is stopping');
	}
	function _onDeleteStart() {
		console.log('Delete is starting');
	}
	function _onDeleteStop() {
		console.log('Delete is stopping');
	}
	function _onDrawVertex(e) {
		console.log(e);
	}
	function _onEditVertex(e) {
		console.log(e);
	}

	let center, zoom;
	if (props.place && props.place.coordinates) center = parseCoordinates(props.place.coordinates);
	if (props.place && props.place.zoom) zoom = parseInt(props.place.zoom);

	return (
		<Map id="map" center={center} zoom={zoom} onmoveend={props.onMoveEnd}>
			<TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
			{getPoints()}
			{getEdges()}
			{props.edit &&
				<FeatureGroup>
					<EditControl
						position='topright'
						onEdited={_onEditPath}
						onCreated={_onCreate}
						onDeleted={_onDeleted}
						onMounted={_mounted}
						onEditStart={_onEditStart}
						onEditStop={_onEditStop}
						onDeleteStart={_onDeleteStart}
						onDeleteStop={_onDeleteStop}
						onDrawVertex={_onDrawVertex}
						onEditVertex={_onEditVertex}
						draw={{
							rectangle: false
						}}
					/>
				</FeatureGroup>
			}
		</Map>
	);
};

function parseCoordinates(coordinates) {
	let latitude = parseFloat(coordinates[0]);
	let longitude = parseFloat(coordinates[1]);
	if (
		(isNumber(latitude) && latitude >= -90 && latitude <= 90) &&
		(isNumber(longitude) && longitude >= -180 && longitude <= 180)
	) {
		return [latitude, longitude];
	}
}

TralgoLeaflet.PropTypes = {
	place: PropTypes.object,
	path: PropTypes.arrayOf(PropTypes.object),
	handlePointClick: PropTypes.func,
};
TralgoLeaflet.defaultProps = {
	path: [],
};

export default TralgoLeaflet;
