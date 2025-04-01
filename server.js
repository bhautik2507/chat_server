const cluster = require('cluster');
const os = require('os');
const express = require('express');
const conversationRoutes = require('./src/api/routes/conversationRoutes');
const errorHandler = require('./src/api/middlewares/errorHandler');
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    const app = express();
    const PORT = process.env.PORT || 3000;
    app.use(express.json());
    app.use('/api', conversationRoutes);
    app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} listening on port ${PORT}`);
    });
}