import IoSocket from 'socket.io';

class SocketService {
    private static instance: SocketService;
    public connectedUsers: { [key: string]: string };

    constructor(public io: IoSocket.Server) {
        this.connectedUsers = {};
    }

    static getInstance(io?: IoSocket.Server) {
        if (!SocketService.instance && io) {
            SocketService.instance = new SocketService(io);
        }

        return SocketService.instance;
    }

    public init(): void {
        this.io.on('connection', socket => {
            const id = socket.handshake.query.userId as string;

            console.log('Usuarios conectados', this.connectedUsers);
            this.connectedUsers[id] = socket.id;
            this.events(socket);

            socket.on('disconnect', () => {
                console.log('desconectado');
                delete this.connectedUsers[id];
            });
        });
    }

    public events(socket: IoSocket.Socket): void {
        socket.on('message', (message: any) => {
            socket.broadcast.emit('message', message); //  Envia pra todo mundo, exceto o emissor
            // this.socketIo.emit('message', message); Envia pra todo mundo, inclusive o emissor
        });
    }
}

export default SocketService;
