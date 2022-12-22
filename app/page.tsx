'use client';

import { useLazyQuery } from '@apollo/client';
import { getUsersQuery, UsersQuery } from '../graphql/queries';

export default function App() {
  const [getUsers, { data }] = useLazyQuery<UsersQuery>(getUsersQuery);

  return (
    <div>
      <button onClick={() => getUsers()}>click</button>
      {data && data.users[0].name}
    </div>
  );
}
