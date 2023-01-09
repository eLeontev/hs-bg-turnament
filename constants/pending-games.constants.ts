import {
    maxGameNameLength,
    minGameNameLength,
} from '../configs/pending-games.config';

import { Message } from '../models/graphql.models';

export const pendingGameDeletedMessage: Message = {
    message: 'pending game deleted',
};

export const pendingGameLeaveMessage: Message = {
    message: 'you left the pending game',
};

export const pendingGameStartMessage: Message = {
    message: 'the game has started',
};

export const pendingGameNameErrorMessage = `Game name length should be between the range ${minGameNameLength} and ${maxGameNameLength}.`;

export const noGameName = '';

export const createPendingGameInputLabel =
    'Please enter game name before to create it';
export const createPendingGameInputPlaceholder = 'Game name';
export const createGameButtonLabel = 'Create Game';

export const createPendingGameLabel = 'Create pending game';
