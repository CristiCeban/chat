import {Socket} from "socket.io";

const cluster = require("cluster");
const http = require("http");
const {Server} = require("socket.io");
const redisAdapter = require("socket.io-redis");
const numCPUs = require("os").cpus().length;
const {setupMaster, setupWorker} = require("@socket.io/sticky");
const express = require("express")
const mongoose = require('mongoose')
const Pusher = require("pusher");
const cors = require('cors')
const config = require('config')
const apiPort = config.get('apiPort') || 3000

const startWorker = async () => {
    console.log(`Worker ${process.pid} started`);

    try {

        await mongoose.connect(config.get('mongoUrl'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        const app = express()
        const pusher = new Pusher({
            appId: "1170414",
            key: "e7b49de1db93e5713dc5",
            secret: "7ad6f85ba2dbad914694",
            cluster: "eu",
            useTLS: true
        });

        // pusher.trigger("my-channel", "my-event", {
        //     message: "hello world"
        // });
        app.use(express.json({extended: true}))
        app.use(cors())

        app.use('/api/auth', require('./routes/auth.routes'))
        app.use('/api/chat',require('./routes/chat.routes'))
        app.use('/api/profile',require('./routes/profile.routes'))
        app.get('/',(req,res)=>{
            console.log('connected')
            res.send('Connected')
        })

        const server = http.createServer(app);
        const io = new Server(server, {
            cors: {
                origin: true,
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        io.adapter(redisAdapter({host: "localhost", port: 6379}));
        setupWorker(io);

        io.on("connection", (socket:Socket) => {
            socket.on("message",(data) => {
                console.log(data)
            })
            // pusher.trigger("my-channel", "my-event", {
            //     message: "hello world"
            // });
            console.log(`connection to ${process.pid}`);
            // socket.on
            socket.emit('hello', {procces_pid: process.pid})
        });
    } catch (e) {
        console.log(`server error with process ${process.pid}`)
        console.log(e.message)
        process.exit(1)
    }

}

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    const server = http.createServer()
    setupMaster(server, {
        loadBalancingMethod: "round-robin", // either "random", "round-robin" or "least-connection"
    });
    server.listen(apiPort);

    for (let i = 0; i < numCPUs - 1; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker: any) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    startWorker()
}
