import { Server } from 'Socket.IO';

let io;

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    io = res.socket.server.io;
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    io = new Server(res.socket.server);
    res.socket.server.io = io;
  }

  setTimeout(() => {
    io.emit('data', { test: 'hello' });
  }, 2000);

  res.end();
};

export default SocketHandler;
