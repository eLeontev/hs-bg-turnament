import { PendingGames } from '../models/pending-games.models';
import { Message } from '../__generated__/resolvers-types';

export const pendingGameCreatedMessage: Message = {
    message: 'pending game created',
};

export const pendingGameDeletedMessage: Message = {
    message: 'pending game deleted',
};

const pendingGamesStore = {
    pendingGames: [] as PendingGames,
    pendingGamesAuthorIds: new Set<string>(),
};

export default pendingGamesStore;
