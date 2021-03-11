const cluster = require("cluster");
const http = require("http");
const {Server} = require("socket.io");
const redisAdapter = require("socket.io-redis");
const numCPUs = require("os").cpus().length;
const {setupMaster, setupWorker} = require("@socket.io/sticky");
const express = require("express")

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    const app = express()
    setupMaster(app, {
        loadBalancingMethod: "random", // either "random", "round-robin" or "least-connection"
    });
    // app.listen(3000);
    // app.get('/', (req, res) => {
    //     res.send(`Hello from ${process.pid}`)
    // })

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker: any) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    console.log(`Worker ${process.pid} started`);

    const app = express()
    const server = http.Server(app);
    server.listen(3001);
    const io = new Server(server, {
        cors: {
            origin: true,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.adapter(redisAdapter({host: "localhost", port: 6379}));
    setupWorker(io);

    // app.get('/ws', (req, res) => {
    //     res.send(`Hello from ${process.pid}`)
    // })

    io.on("connection", (socket: any) => {
        console.log(`connection to ${process.pid}`);
        socket.emit('hello',{procces_pid: process.pid})
    });
}
