const router = require('express').Router();
const Queue = require('kue').createQueue();

const jobs = require('jobs');

router.get('/', (req, res) => {
	res.success('Welcome to Tralgo');
});

router.post('/', (req, res) => {
	let meta = req.body;
	meta.title = meta.title || 'Tralgo Path';

	jobs.Tralgo(meta).then(res.success).catch(err => {
		res.failure(err);
	});
});

module.exports = router;
