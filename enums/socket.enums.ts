export enum socketRoomChangesEventNames {
    joinPendingGamesRoom = 'joinPendingGamesRoom',
    leavePendingGamesRoom = 'leavePendingGamesRoom',
    joinOnlineGameRoom = 'joinOnlineGameRoom',
    leaveOnlineGameRoom = 'leaveOnlineGameRoom',
}

export enum playGameEventNames {
    startPlayGame = 'startPlayGame',
}

export enum pendingGamesRoomEventNames {
    getPendingGames = 'getPendingGames',
}

export enum onlineGameRoomEventNames {
    onlinePlayerIds = 'onlinePlayerIds',
}

export enum builtInSocketEventNames {
    connection = 'connection',
    disconnect = 'disconnect',
}

export enum socketRooms {
    pendingGames = 'pendingGames',
    onlineGame = 'onlineGame',
    playGame = 'playGame',
}
