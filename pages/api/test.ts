import yogaServer from './graphql';
import { storage } from './store/storage';

export default async function handler(req, res) {
  const response = await yogaServer.fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: '{ users { name } }' }),
  });

  storage.games.set('123', [...storage.games.get('123'), 123]);

  const data = await response.json();
  res.status(200).json(data.data);
}
