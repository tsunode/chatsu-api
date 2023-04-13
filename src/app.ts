import express from 'express';
import { Server as Io } from 'socket.io';
import { createServer, Server } from 'http';
import cors from 'cors';

import SocketService from './services/socket';

class App {
    public app: express.Application;

    public server: Server;

    private socketIo: Io;
    private socketService: SocketService;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.socketIo = new Io(this.server, {
            cors: {
                origin: '*'
            }
        });

        this.middlewares();
        this.socketService = SocketService.getInstance(this.socketIo);
        this.socketService.init();
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }
}

export default App;
