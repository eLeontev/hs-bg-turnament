import { createYoga, createSchema } from 'graphql-yoga';

import { graphqlUrl } from '../../constants/urls';

import { resolvers } from '../../graphql/resolvers';
import { typeDefs } from '../../graphql/type-defs';

const schema = createSchema({
    typeDefs,
    resolvers,
});

export default createYoga({
    schema,
    graphqlEndpoint: graphqlUrl,
});
