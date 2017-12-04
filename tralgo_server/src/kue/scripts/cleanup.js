const kue = require('kue');
const k = new kue;

k.complete(remove);
k.failed(remove);

function remove(err, ids) {
    let pending = [];

    if (ids.length < 1) {
        console.log('No jobs to remove');
        return;
    }

    console.log(`Removing ${ids.length} jobs`);

    for (let i = 0; i < ids.length; i++) {
        let id = ids[i];
        pending.push(new Promise((resolve, reject) => {
            kue.Job.get(id, (err, job) => {
                job.remove();
                resolve();
            });
        }));
    }

    Promise.all(pending).then(process.exit);
}