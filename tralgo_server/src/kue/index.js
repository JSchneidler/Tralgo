const debug = require('debug');
const cluster = require('cluster');
const Queue = require('kue').createQueue();

const processors = require('./processors');

//require('./hooks');

Queue.process('tralgo', 10, (job, done) => {
    debug('app:kue:tralgo')(`Job ${job.id} being processed by worker ${cluster.worker.id}`);
    processors.Tralgo(job.data).then(result => {
        debug('app:kue:tralgo')(`Job ${job.id} completed by worker ${cluster.worker.id}`);
        done(null, result);
    }).catch(err => {
        debug('app:kue:tralgo')(`Job ${job.id} by worker ${cluster.worker.id} failed`);
        done(err);
    });
});