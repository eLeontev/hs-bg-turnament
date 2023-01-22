import { useEffect, useMemo } from 'react';

import { trpc } from '../../../lib/client';

import { formSelectedHeroIds } from '../services/play-game.client.service';

import {
    initStateSelector,
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
import { formPlayGamePlayers } from '../services/play-game.player.service';

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

    const initState = usePlayGameStore(initStateSelector);
    const setPlayers = usePlayersStore(setPlayersSelector);

    const playGameDetailsQuery = trpc.playGameDetails.useQuery(baseInput);

    useEffect(() => {
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
            });

            setPlayers(formPlayGamePlayers(players));
        }
    }, [playGameDetailsQuery, initState, setPlayers, baseInput]);

    return playGameDetailsQuery;
};
