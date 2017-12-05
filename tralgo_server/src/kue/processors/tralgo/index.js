const _ = require('lodash');
const util = require('util');

const models = require('db/models');

const Point = require('./Point');
const Edge = require('./Edge');
const Path = require('./Path');

function init(job_data) {
	return models.Place.findById(job_data.mapId, { include: [models.Point, models.Edge] }).then(place => {
		let map = {
			points: {},
			edges: {},
		};

		for (let i = 0; i < place.Points.length; i++) {
			let point = place.Points[i];
			map.points[point.name] = new Point(point.name, point.type, point.edges);
		}

		for (let i = 0; i < place.Edges.length; i++) {
			let edge = place.Edges[i];
			map.edges[edge.name] = new Edge(edge.name, edge.distance, edge.elevation_gain, edge.points);
		}

		return findPath(map, job_data.pathOptions);
	});
}

function findPath(map, options = {}) {
	let path = new Path();

	let origin_point;
	if (options.trailhead) origin_point = map.points[options.trailhead];
	else origin_point = getRandomTrailhead();

	path.addPoint(origin_point);

	let finished = false;
	while (!finished) finished = traverseRecursive(origin_point);
	return path;

	function traverseRecursive(start_point, deadEndBypass = false) {
		start_point.visit();
		
		const connectedPoints = getConnectedPoints(start_point, options.randomPath);
		for (let i = 0; i < connectedPoints.length; i++) {
			let connected = connectedPoints[i];
			let point = connected.point;
			if (point.wasVisited() && !deadEndBypass) {
				connectedPoints.splice(i, 1);
				i--;
			} else {
				path.addPoint(point, connected.edge);

				if (point.isTrailhead()) return true;
				return traverseRecursive(point, point.isDeadEnd());
			}
		}

		path.error('Could not find valid path');
		return true;
	}

	function getConnectedPoints(point, random = true) {
		const connected = [];

		point.getEdges().forEach(edge => {
			edge = map.edges[edge];
			edge.getPoints().forEach(p => {
				if (point.name !== p) connected.push({
					point: map.points[p],
					edge,
				});
			});
		})

		return random ? _.shuffle(connected) : connected;
	}

	function getRandomTrailhead() {
		const options = [];

		for (let key in map.points) {
			if (map.points[key].isTrailhead()) options.push(key);
		}

		return map.points[options[Math.floor(Math.random() * options.length)]];
	}
}

module.exports = init;