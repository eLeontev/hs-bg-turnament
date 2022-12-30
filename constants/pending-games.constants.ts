import {
    maxGameNameLength,
    minGameNameLength,
} from '../configs/pending-games.config';
import { PendingGames } from '../models/pending-games.models';
import { Message } from '../__generated__/resolvers-types';

export const pendingGameCreatedMessage: Message = {
    message: 'pending game created',
};

export const pendingGameDeletedMessage: Message = {
    message: 'pending game deleted',
};

export const pendingGameJoinMessage: Message = {
    message: 'you joined to the pending game',
};

export const pendingGameLeaveMessage: Message = {
    message: 'you left the pending game',
};

export const pendingGameStartMessage: Message = {
    message: 'the game has started',
};

export const pendingGameNameErrorMessage = `game name length should be between the range ${minGameNameLength} and ${maxGameNameLength}`;

export const createPendingGameLabel = 'Create pending game';
export const deletePendingGameLabel = 'Delete pending game';
export const joinPendingGameLabel = 'Join pending game';
export const leavePendingGameLabel = 'Leave pending game';
export const startPendingGameLabel = 'Start pending game';

const pendingGamesStore = {
    pendingGames: [] as PendingGames,
    pendingGamesAuthorIds: new Set<string>(),
};

export default pendingGamesStore;
