'use client';

import { useLazyQuery } from '@apollo/client';
import { Socket } from 'socket.io-client';

import { getUsersQuery, UsersQuery } from '../graphql/queries';

import { useGameSubscription, useSocket } from '../lib/socket.client';

const SocketListener = ({ socket }: { socket: Socket }) => {
  const gameData = useGameSubscription(socket);
  return <>{gameData}</>;
};

export default function App() {
  const [getUsers, { data }] = useLazyQuery<UsersQuery>(getUsersQuery);
  const socket = useSocket();

  return (
    <div>
      <button onClick={() => getUsers()}>click</button>
      {data && data.users[0].name}
      {socket && <SocketListener socket={socket} />}
    </div>
  );
}
