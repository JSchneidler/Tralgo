const cluster = require('cluster');
const debug = require('debug');
const kue = require('kue');
const Queue = kue.createQueue();

Queue.on('job enqueue', (id, type) => {
    debug('app:kue:hooks')(`Job ${id} queued on cluster ${cluster.worker.id}`);
}).on('job complete', (id, result) => {
    try {
        kue.Job.get(id, (err, job) => {
            if (err) return;
            job.remove();
        });
    } catch(err) {
        debug('app:kue:hooks')(err);
    }
});