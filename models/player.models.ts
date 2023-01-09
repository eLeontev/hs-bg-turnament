import { PlayerId, PlayerLogin } from './common.models';

export type Player = {
    playerId: PlayerId;
    playerLogin: PlayerLogin;
};

export type PendingGamePlayer = PlayGamePlayer & {
    playerIdInGame: PlayerId;
};

export type PlayGamePlayer = {
    playerId: PlayerId;
    playerLogin: PlayerLogin;
};

export type Players = Array<Player>;
export type PendingGamePlayers = Array<PendingGamePlayer>;
export type PlayGamePlayers = Array<PlayGamePlayer>;
