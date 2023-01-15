import { heroIds } from '@prisma/client';
import { z } from 'zod';

import { startPlayGameInputSchema } from '../schemas/play-game.schemas';

import { PlayerId, PlayerIdInGame, PlayerLogin } from './common.models';

export type Player = {
    playerId: PlayerId;
    playerLogin: PlayerLogin;
};

export type PendingGamePlayer = Player & {
    playerIdInGame: PlayerId;
};

export type PlayGamePlayer = {
    playerIdInGame: PlayerIdInGame;
    playerLogin: PlayerLogin;
    heroIds: Array<heroIds>;
    selectedHeroId?: heroIds;
};

export type Players = Array<Player>;
export type PendingGamePlayers = Array<PendingGamePlayer>;
export type PlayGamePlayers = Array<PlayGamePlayer>;

export type StartPlayGameInput = z.infer<typeof startPlayGameInputSchema>;
