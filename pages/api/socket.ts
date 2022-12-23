import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'Socket.IO';

import { getSocket } from '../../utils.ts/socket.utils';

export const socketInitialization = (res: NextApiResponse) => {
    let socketServer = getSocket(res);

    if (!socketServer) {
        socketServer = new Server(res.socket.server);
        res.socket.server.io = socketServer;
    }
};

export const socketHandler = (req: NextApiRequest, res: NextApiResponse) => {
    socketInitialization(res);
    res.end();
};

export default socketHandler;
