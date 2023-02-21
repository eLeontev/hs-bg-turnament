import { useEffect, useMemo } from 'react';

import { trpc } from '../../../lib/client';

import { formSelectedHeroIds } from '../services/play-game.client.service';
import { formPlayGamePlayers } from '../services/play-game.player.service';

import {
    initStateSelector,
    isReadySelector,
    usePlayGameStore,
} from '../components/store/play-game.store';
import {
    usePlayersStore,
    setPlayersSelector,
} from '../components/store/play-game.players.store';

import {
    getSaveGameId,
    getSavePlayerIdInGame,
    setPlayerKey,
} from '../../../utils.ts/storage.utils';
import {
    initPlayerSelector,
    usePlayerStore,
} from '../components/store/play-game.player.store';

export const useSetPlayGameBaseInput = () =>
    useMemo(
        () => ({
            playerIdInGame: getSavePlayerIdInGame(),
            gameId: getSaveGameId(),
        }),
        []
    );

export const usePlayGameInitialization = () => {
    const baseInput = useSetPlayGameBaseInput();

    const isReady = usePlayGameStore(isReadySelector);
    const initState = usePlayGameStore(initStateSelector);

    const setPlayers = usePlayersStore(setPlayersSelector);

    const playGameDetailsQuery = trpc.playGameDetails.useQuery(baseInput);

    useEffect(() => {
        if (isReady) {
            return;
        }

        const playGameDetails = playGameDetailsQuery.data;

        if (playGameDetails) {
            const { players, playerKey, ...restPlayGameDetails } =
                playGameDetails;

            setPlayerKey(playerKey);

            const selectedHeroIds = formSelectedHeroIds(players);
            const selectedHeroId = selectedHeroIds.get(playerKey);

            initState({
                ...restPlayGameDetails,
                playerKey,
                selectedHeroId,
                selectedHeroIds,
                baseInput,
                isReady: true,
            });

            setPlayers(formPlayGamePlayers(players));
        }
    }, [playGameDetailsQuery, initState, setPlayers, baseInput, isReady]);

    return playGameDetailsQuery;
};

export const useInitialRecruitPhaseData = () => {
    const initPlayer = usePlayerStore(initPlayerSelector);

    const baseInput = useSetPlayGameBaseInput();

    const playerDataQuery = trpc.getPlayerData.useQuery(baseInput, {
        cacheTime: 0,
    });
    useEffect(() => {
        const player = playerDataQuery.data;
        if (player) {
            initPlayer(player);
        }
    }, [playerDataQuery, initPlayer]);
};
