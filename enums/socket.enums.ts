export enum socketRoomIds {
    gameSearch = 'gameSearch',
    joinLeavePendingGame = 'joinLeavePendingGame',
    startPendingGame = 'startPendingGame',
    onlinePlayers = 'onlinePlayers',
    offlinePlayer = 'offlinePlayer',
    joinGameOnlineStatus = 'joinGameOnlineStatus',
    leaveGameOnlineStatus = 'leaveGameOnlineStatus',
    finishGameOnlineStatus = 'finishGameOnlineStatus',
}

export enum socketRoomChangesEventNames {
    joinPendingGamesRoom = 'joinPendingGamesRoom',
    leavePendingGamesRoom = 'leavePendingGamesRoom',
    joinPendingGameRoom = 'joinPendingGameRoom',
    leavePendingGameRoom = 'leavePendingGameRoom',
}

export enum pendingGamesRoomEventNames {
    getPendingGames = 'getPendingGames',
}

export enum builtInSocketEventNames {
    connection = 'connection',
    disconnect = 'disconnect',
}

export enum socketRooms {
    pendingGames = 'pendingGames',
    pendingGame = 'pendingGame',
}
