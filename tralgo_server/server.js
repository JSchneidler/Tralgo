require('app-module-path').addPath(__dirname + '/src'); // Set relative path root

const http = require('http');
const cluster = require('cluster');
const kue = require('kue');
const debug = require('debug');

const numCores = require('os').cpus().length;

if (cluster.isMaster) {
  const app = require('./src');

  const port = normalizePort(process.env.PORT || 3001);
  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  kue.app.listen(port + 1);
  kue.app.set('title', 'Tralgo Job Queue');

  for (let i = 0; i < numCores; i++) {
      cluster.fork();
  }

  function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
} else {
  require('./src/kue');
}
