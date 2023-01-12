import { z } from 'zod';

import { startPlayGameBodySchema } from '../schemas/play-game.schemas';

import { PlayerId, PlayerIdInGame, PlayerLogin } from './common.models';

export type Player = {
    playerId: PlayerId;
    playerLogin: PlayerLogin;
};

export type PendingGamePlayer = PlayGamePlayer & {
    playerIdInGame: PlayerId;
};

export type PlayGamePlayer = {
    playerIdInGame: PlayerIdInGame;
    playerLogin: PlayerLogin;
};

export type Players = Array<Player>;
export type PendingGamePlayers = Array<PendingGamePlayer>;
export type PlayGamePlayers = Array<PlayGamePlayer>;

export type StartPlayGameBody = z.infer<typeof startPlayGameBodySchema>;
