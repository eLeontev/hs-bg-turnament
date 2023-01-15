import {
    getPlayerHeroIds,
    getPlayGame,
    selectPlayGamePlayerHero,
    startPlayGame,
} from '../services/server/play-game.service';
import {
    getPendingGames,
    deletePendingGame,
} from '../services/server/pending-game.server.service';
import { cancelDeletePendingGame } from '../services/pending-games.scheduled.service';

import {
    notifyOnlinePlayersPlayGameStarted,
    notifyPlayersInPlayGame,
} from '../sockets/play-game.notification.socket';
import { notifyPendingGames } from '../sockets/pending-games.notification.socket';

import { pendingGameStartMessage } from '../constants/pending-games.constants';

import { playGameActions } from '../enums/play-game.enums';

import { StartPlayGameInput } from '../models/player.models';
import { TRCPProps } from '../models/trcp.models';
import {
    PlayGameBaseInput,
    PlayGameSelectHeroInput,
} from '../models/play-game/play-game.models';

import { getHash } from '../utils.ts/hash-server.utils';

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

export const getPlayerHeroIdsQuery = ({
    input,
}: TRCPProps<PlayGameBaseInput>) => getPlayerHeroIds(input);

export const selectPlayGamePlayerHeroMutation = async ({
    input,
    ctx,
}: TRCPProps<PlayGameSelectHeroInput>) => {
    await selectPlayGamePlayerHero(input);

    const { heroId, playerIdInGame } = input;
    const playerKey = await getHash(playerIdInGame);

    notifyPlayersInPlayGame(ctx.io, input.gameId, {
        action: playGameActions.heroSelected,
        payload: { playerKey, heroId },
    });

    return { message: 'hero selected' };
};
