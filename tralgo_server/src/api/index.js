const router = require('express').Router();

// Index routes
router.use((req, res, next) => {
  /* eslint-disable no-param-reassign */
  res.success = (data, status_code = 200) => {
    res.status(status_code).json(data);
  };
  
  res.failure = (data, status_code = 400) => {
    res.status(status_code).json(data);
  };
	/* eslint-enable no-param-reassign */
  
  next();
});

router.get('/', (req, res) => {
  res.success('Welcome to the API!');
});

// Authentication

// Resources
router.use('/places', require('./places'));
router.use('/tralgo', require('./tralgo'));

module.exports = router;
