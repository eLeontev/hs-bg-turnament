import { Resolvers } from '../__generated__/resolvers-types';

export const resolvers: Resolvers = {
  Query: {
    users: () => [{ id: '123', name: 'John Smitt' }],
  },
};
