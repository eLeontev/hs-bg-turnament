import { PendingGames } from '../models/pending-games.models';

const pendingGamesStore = {
    pendingGames: [] as PendingGames,
    pendingGamesAuthorIds: new Set<string>(),
};

export default pendingGamesStore;
