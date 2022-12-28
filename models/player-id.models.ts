import { PlayerId, PlayerLogin } from './common.models';

export type Player = {
    playerId: PlayerId;
    playerLogin: PlayerLogin;
};

export type Players = Array<Player>;
