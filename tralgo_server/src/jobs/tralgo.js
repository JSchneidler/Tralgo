const Queue = require('kue').createQueue();

module.exports = (job_data) => {
	return new Promise((resolve, reject) => {
		const job = Queue.create('tralgo', job_data).save(err => {
			if (err) reject(err);
		});

		job.on('complete', resolve).on('failed', reject);
	});
};
