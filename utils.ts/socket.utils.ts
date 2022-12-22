import { NextApiResponse } from 'next';
import { Server } from 'Socket.IO';

export const getSocket = (res: NextApiResponse): Server => res.socket.server.io;
