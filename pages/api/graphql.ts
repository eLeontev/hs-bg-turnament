import { gql, ApolloServer } from 'apollo-server-micro';

const typeDefs = gql`
  type User {
    id: ID
    name: String
  }
  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: () => [
      {
        id: 'Foo',
        name: 'test user',
      },
    ],
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
