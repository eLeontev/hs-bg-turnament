import { togglePlayGameEngine } from './engine/play-game.engine';

import {
    getPlayerHeroIds,
    getPlayGame,
    getPlayGameRecruitPhaseInitialData,
    selectPlayGamePlayerHero,
    startPlayGame,
} from './services/play-game.server.service';
import {
    getPendingGames,
    deletePendingGame,
} from '../pending-games/services/pending-game.server.service';
import { cancelDeletePendingGame } from '../pending-games/services/pending-games.scheduled.service';

import {
    notifyOnlinePlayersPlayGameStarted,
    notifyPlayersInPlayGame,
} from './sockets/play-game.notification.socket';
import { notifyPendingGames } from '../pending-games/sockets/pending-games.notification.socket';

import { pendingGameStartMessage } from '../pending-games/pending-games.constants';

import { playGameActions } from './play-game.enums';

import { StartPlayGameInput } from '../player/player.models';
import { TRCPProps } from '../../models/trcp.models';
import {
    PlayGameBaseInput,
    PlayGameSelectHeroInput,
} from './models/play-game.models';

import { getHash } from '../../utils.ts/hash-server.utils';

export const playGameQuery = ({ input }: TRCPProps<PlayGameBaseInput>) =>
    getPlayGame(input);

export const startPlayGameMutation = async ({
    input,
    ctx: { io },
}: TRCPProps<StartPlayGameInput>) => {
    const { gameId, players } = await deletePendingGame(input);

    const { phase, round } = await startPlayGame(gameId, players);

    notifyOnlinePlayersPlayGameStarted(io, input.gameId);
    notifyPendingGames(io, getPendingGames());
    cancelDeletePendingGame(gameId);

    togglePlayGameEngine(io, gameId, phase, round, true);

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
        payload: { playerKey, selectedHeroId: heroId },
    });

    return { message: 'hero selected' };
};

export const getPlayGameRecruitPhaseInitialDataQuery = ({
    input,
}: TRCPProps<PlayGameBaseInput>) => getPlayGameRecruitPhaseInitialData(input);
