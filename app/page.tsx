const testRequest = () =>
  fetch('http://localhost:3000/api/hello').then((res) => res.json());

const testInternalreusability = () =>
  fetch('http://localhost:3000/api/test').then((res) => res.json());

const testGraphQL = () =>
  fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: '{ users { name } }' }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default async function App(props) {
  const data1 = await testRequest();
  const data2 = await testGraphQL();
  const data3 = await testInternalreusability();

  return (
    <div>
      count of games:{' '}
      {data1.map((i) => (
        <span>{i}</span>
      ))}
      <hr />
      {data2.users.map(({ name }) => (
        <>{name}</>
      ))}
      <hr />
      {data3.users.map(({ name }) => (
        <>{name}</>
      ))}
    </div>
  );
}
