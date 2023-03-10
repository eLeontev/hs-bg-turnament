export enum socketRoomChangesEventNames {
    joinPendingGamesRoom = 'joinPendingGamesRoom',
    leavePendingGamesRoom = 'leavePendingGamesRoom',
    joinOnlineGameRoom = 'joinOnlineGameRoom',
    leaveOnlineGameRoom = 'leaveOnlineGameRoom',
    joinPlayGameRoom = 'joinPlayGameRoom',
    leavePlayGameRoom = 'leavePlayGameRoom',
}

export enum playGameEventNames {
    startPlayGame = 'startPlayGame',
    gameAction = 'gameAction',
}

export enum pendingGamesRoomEventNames {
    getPendingGames = 'getPendingGames',
}

export enum onlineGameRoomEventNames {
    onlinePlayerKeys = 'onlinePlayerKeys',
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
