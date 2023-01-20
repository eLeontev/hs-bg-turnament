import { z } from 'zod';
import { PlayGamePlayer } from '@prisma/client';

import { startPlayGameInputSchema } from '../play-game/schemas/play-game.schemas';

import {
    PlayerId,
    PlayerIdInGame,
    PlayerKey,
    PlayerLogin,
} from '../../models/common.models';

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

export type PublicPlayers = Array<PublicPlayer>;
export type PendingGamePlayers = Array<PendingGamePlayer>;
export type PlayGamePlayers = Array<PlayGamePlayer>;

export type StartPlayGameInput = z.infer<typeof startPlayGameInputSchema>;
