import {
    getPlayGame,
    startPlayGame,
} from '../services/server/play-game.service';
import {
    getPendingGames,
    deletePendingGame,
} from '../services/server/pending-game.server.service';
import { cancelDeletePendingGame } from '../services/pending-games.scheduled.service';

import { notifyOnlinePlayersPlayGameStarted } from '../sockets/play-game.notification.socket';
import { notifyPendingGames } from '../sockets/pending-games.notification.socket';

import { pendingGameStartMessage } from '../constants/pending-games.constants';

import { StartPlayGameInput } from '../models/player.models';
import { TRCPProps } from '../models/trcp.models';
import { PlayGameBaseInput } from '../models/play-game/play-game.models';

export const playGameQuery = ({ input }: TRCPProps<PlayGameBaseInput>) =>
    getPlayGame(input);

export const startPlayGameMutation = async ({
    input,
    ctx: { io },
}: TRCPProps<StartPlayGameInput>) => {
    const { gameId, players } = await deletePendingGame(input);

    await startPlayGame(gameId, players);

    notifyOnlinePlayersPlayGameStarted(io, input.gameId);
    notifyPendingGames(io, getPendingGames());
    cancelDeletePendingGame(gameId);

    return pendingGameStartMessage;
};
