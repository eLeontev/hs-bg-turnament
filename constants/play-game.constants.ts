import { GameId } from '../models/common.models';
import { Message } from '../models/graphql.models';
import { PlayGame } from '../models/play-game/play-game.models';

export const playGames = new Map<GameId, PlayGame>();

export const initPlayGameMessage: Message = {
    message: 'private player id is registered to start the game',
};
