export type PlayerId = {
    playerId: string;
};

export type Player = PlayerId & {
    playerLogin: string;
};

export type Players = Array<Player>;
