import { atom } from 'recoil';

import { PlayGameBaseInput } from '../../models/play-game.models';

import {
    getGameId,
    getPlayerIdInGame,
} from '../../../../utils.ts/storage.utils';

export const playGameBaseInputState = atom<PlayGameBaseInput>({
    key: 'playGameBaseInput',
    default: {
        playerIdInGame: getPlayerIdInGame() || '',
        gameId: getGameId() || '',
    },
});
