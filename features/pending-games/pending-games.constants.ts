import { Message } from '../../models/graphql.models';

export const pendingGameDeletedMessage: Message = {
    message: 'pending game deleted',
};

export const pendingGameLeaveMessage: Message = {
    message: 'you left the pending game',
};

export const pendingGameStartMessage: Message = {
    message: 'the game has started',
};

export const noGameName = '';

export const pendingGameLiveDurationInMs = 900000; // 15min
