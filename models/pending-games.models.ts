export type PendingGame = {
    authorId: string;
    gameId: string;
    authorLogin: string;
    createdDate: string;
    countOfPlayers: number;
};
export type PendingGames = Array<PendingGame>;

export type PendingGamesQuery = { pendingGames: PendingGames };

export type DeletePendingGameBody = {
    authorId: string;
};

export type CreatePendingGameBody = DeletePendingGameBody & {
    authorLogin: string;
};

export type PendinGameBody = DeletePendingGameBody & CreatePendingGameBody;
