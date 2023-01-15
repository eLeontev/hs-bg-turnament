import { heroIds } from '@prisma/client';
import { z } from 'zod';

import { startPlayGameInputSchema } from '../schemas/play-game.schemas';

import {
    PlayerId,
    PlayerIdInGame,
    PlayerKey,
    PlayerLogin,
} from './common.models';

export type PublicPlayer = {
    playerLogin: PlayerLogin;
    playerKey: PlayerKey;
};

export type Player = PublicPlayer & {
    playerId: PlayerId;
};

export type PendingGamePlayer = Player & {
    playerIdInGame: PlayerIdInGame;
};

export type PlayGamePlayer = Player & {
    playerIdInGame: PlayerIdInGame;
    heroIds: Array<heroIds>;
    selectedHeroId?: heroIds;
};

export type PublicPlayers = Array<PublicPlayer>;
export type Players = Array<Player>;
export type PendingGamePlayers = Array<PendingGamePlayer>;
export type PlayGamePlayers = Array<PlayGamePlayer>;

export type StartPlayGameInput = z.infer<typeof startPlayGameInputSchema>;
