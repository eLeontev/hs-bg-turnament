'use client';

import { useEffect } from 'react';
import io from 'Socket.io-client';
let socket;

const Home = () => {
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/ws');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('data', console.log);
    fetch('http://localhost:3000/api/hello');
  };

  return <>tada</>;
};

export default Home;
