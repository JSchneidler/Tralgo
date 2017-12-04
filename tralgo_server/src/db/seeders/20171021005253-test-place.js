'use strict';
const debug = require('debug');
const util = require('util');
const models = require('db/models');

const NAME = 'Test Place';

const place = {
	coordinates: [43.083415, -88.400586],
	points: {
		T1: {
      type: 'Trailhead',
      coordinates: [43.103540, -88.408662],
      edges: ['E1'],
    },
		T2: {
      type: 'Trailhead',
      coordinates: [43.076318, -88.367365],
      edges: ['E3'],
    },
		T3: {
      type: 'Trailhead',
      coordinates: [43.048561, -88.394608],
      edges: ['E12', 'E13'],
    },
		T4: {
      type: 'Trailhead',
      coordinates: [43.059190, -88.360494],
      edges: ['E11'],
    },

		P1: {
      type: 'Junction',
      coordinates: [43.090915, -88.369387],
      edges: ['E2'],
    },
		P2: {
      type: 'Junction',
      coordinates: [43.076516, -88.397005],
      edges: ['E4', 'E7'],
    },
		P3: {
      type: 'Junction',
      coordinates: [43.092629, -88.393328],
      edges: ['E1', 'E4', 'E5'],
    },
		P4: {
      type: 'Junction',
      coordinates: [43.084459, -88.384331],
      edges: ['E2', 'E5', 'E6'],
    },
		P5: {
      type: 'Junction',
      coordinates: [43.075337, -88.381355],
      edges: ['E3', 'E6'],
    },
		P6: {
      type: 'Junction',
      coordinates: [43.066908, -88.366902],
      edges: ['E10', 'E11'],
    },
		P7: {
      type: 'Junction',
      coordinates: [43.063399, -88.395217],
      edges: ['E7', 'E9', 'E12'],
    },
		P8: {
      type: 'Junction',
      coordinates: [43.061088, -88.378677],
      edges: ['E8', 'E9', 'E10'],
    },
		P9: {
      type: 'Junction',
      coordinates: [43.049574, -88.426297],
      edges: ['E13'],
    },
  },
  edges: {
    E1: {
      distance: 10,
      elevation_gain: 4,
      points: ['T1', 'P3'],
    },
    E2: {
      distance: 5,
      elevation_gain: 4,
      points: ['P1', 'P4'],
    },
    E3: {
      distance: 7,
      elevation_gain: -3,
      points: ['T2', 'P5'],
    },
    E4: {
      distance: 8,
      elevation_gain: 5,
      points: [
        'P2',
        [43.088185, -88.397594],
        'P3'
      ],
    },
    E5: {
      distance: 4,
      elevation_gain: -2,
      points: [
        'P3',
        [43.099133, -88.394346],
        [43.097491, -88.383601],
        'P4'
      ],
    },
    E6: {
      distance: 4,
      elevation_gain: -2,
      points: [
        'P4',
        [43.082528, -88.377479],
        [43.076588, -88.376480],
        'P5'
      ],
    },
    E7: {
      distance: 5,
      elevation_gain: 1,
      points: [
        'P2',
        [43.064548, -88.407215],
        [43.059071, -88.403966],
        'P7'
      ],
    },
    E8: {
      distance: 4,
      elevation_gain: 2,
      points: [
        'P5',
        [43.072672, -88.375230],
        'P8'
      ],
    },
    E9: {
      distance: 3,
      elevation_gain: 1,
      points: [
        'P7',
        [43.056333, -88.385725],
        [43.056972, -88.377854],
        'P8'
      ],
    },
    E10: {
      distance: 2,
      elevation_gain: 1,
      points: ['P6', 'P8'],
    },
    E11: {
      distance: 8,
      elevation_gain: 3,
      points: ['T4', 'P6'],
    },
    E12: {
      distance: 6,
      elevation_gain: 2,
      points: ['T3', 'P7'],
    },
    E13: {
      distance: 7,
      elevation_gain: 4,
      points: ['T3', 'P9'],
    },
  },
};

function buildPoints(points) {
  const result = [];

  for (let key in points) {
    let point = points[key];

    result.push({
      name: key,
      type: point.type,
      edges: point.edges,
      coordinates: point.coordinates,
    });
  }

  return result;
}

function buildEdges(edges) {
  const result = [];

  for (let key in edges) {
    let edge = edges[key];

    result.push({
      name: key,
      distance: edge.distance,
      elevation_gain: edge.elevation_gain,
      points: edge.points.filter(edge => {
        return typeof(edge) === 'string';
      }),
      //coordinates: buildPolyLine(edge.points),
      coordinates: edge.points,
    });
  }

  return result;
}

function buildPolyLine(points) {
  let polyLine = [];

  for (let i = 0; i < points.length; i++) {
    if (Array.isArray(points[i])) points[i].forEach(coordinate => polyLine.push(coordinate));
    else polyLine.push(points[i]);
  }

  return polyLine;
}

debug('app:sequelize:seeder:testPlace')(util.inspect({
  name: NAME,
  googlePlaceId: '0123456789A',
  coordinates: place.coordinates,
  Points: buildPoints(place.points),
  Edges: buildEdges(place.edges),
}, false, null));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.Place.create({
      name: NAME,
      googlePlaceId: '0123456789A',
      coordinates: place.coordinates,
      zoom: 12,
      Points: buildPoints(place.points),
      Edges: buildEdges(place.edges),
    }, {
      include: [models.Point, models.Edge],
    })
    .then(place => {
      debug('app:sequelize:seeder:testPlace')(`Place '${NAME}' created`);
    })
    .catch(err => debug('app:sequelize:seeder:testPlace'));
  },

  down: (queryInterface, Sequelize) => {
    return models.Place.find({name: NAME}).then(place => {
      place.destroy();
    });
  }
};