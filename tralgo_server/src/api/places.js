const router = require('express').Router();

const models = require('db');
const Place = models.Place;

router.get('/', (req, res) => {
  Place.findAll({attributes: ['id', 'name']})
    .then(res.success)
    .catch(res.failure);
});

router.post('/', (req, res) => {
  if (req.body.id) {
    // TODO: Update place, not working with associated data
    Place.findById(req.body.id).then(place => {
      place.update(req.body).then(res.success).catch(res.failure);
    }).catch(res.failure);
  } else {
    // TODO: Create place
  }
  /*
  Place.create({
    name: 'Glacier National Park',
    googlePlaceId: '1234567890A',
    Points: [{
      name: 'Ranger Office',
      geometry: {
        type: 'Point',
        coordinates: [29.582123, 85.3589235],
      },
    }],
  }, {
    include: [models.Point],
  })
	.then(res.success)
  .catch(res.failure);
  */
});

router.get('/:placeId', (req, res) => {
  Place.findById(req.params.placeId, {
    attributes: ['id', 'name', 'coordinates', 'zoom'],
    include: [models.Point, models.Edge]
  })
    .then(res.success)
    .catch(res.failure);
});

router.post('/:placeId/addNode', (req, res) => {
  const node = req.body.node;
  const nodeType = req.body.nodeType;

  let include;
  if (nodeType === 'point') include = models.Point;
  if (nodeType === 'edge') include = models.Edge;


  Place.findById(req.params.placeId, {include: [include]}).then(place => {
    if (nodeType === 'point') place.createPoint({
      name: node.name,
      type: node.trailhead ? 'Trailhead' : 'Junction',
      geometry: {
        type: 'Point',
        coordinates: [node.lat, node.lng],
      },
    }).then(res.success).catch(res.failure);
    else if (nodeType === 'edge') place.createEdge({
      name: node.name,
    }).then(res.success).catch(res.failure);
  }).catch(res.failure);
});

module.exports = router;
