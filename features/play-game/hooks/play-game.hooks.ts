import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { trpc } from '../../../lib/client';

import { formSelectedHeroIds } from '../services/play-game.client.service';

import { playGamePhaseState } from '../components/atoms/play-game.phases.atom';
import {
    playsGameSelectedHeroIdsState,
    playsGameSelectedHeroIdState,
} from '../components/atoms/play-game.selected-hero-id.atom';
import { playGameBaseInputState } from '../components/atoms/play-game.base-input.atom';

import { PlayGameBaseInput } from '../models/play-game.models';

import {
    getSaveGameId,
    getSavePlayerIdInGame,
    setPlayerKey,
} from '../../../utils.ts/storage.utils';

export const useSetPlayGameBaseInput = () => {
    const setPlayGameBaseInput = useSetRecoilState(playGameBaseInputState);
    useEffect(
        () =>
            setPlayGameBaseInput({
                playerIdInGame: getSavePlayerIdInGame(),
                gameId: getSaveGameId(),
            }),
        [setPlayGameBaseInput]
    );
};

export const useSetPlayGameDetails = (playGameBaseInput: PlayGameBaseInput) => {
    const setPlayGamePhase = useSetRecoilState(playGamePhaseState);
    const setPlayGameSelectedHeroId = useSetRecoilState(
        playsGameSelectedHeroIdState
    );
    const setPlaysGameSelectedHeroIds = useSetRecoilState(
        playsGameSelectedHeroIdsState
    );

    const playGameDetailsQuery =
        trpc.playGameDetails.useQuery(playGameBaseInput);

    useEffect(() => {
        const playGameDetails = playGameDetailsQuery.data;

        if (playGameDetails) {
            const { phase, players, playerKey } = playGameDetails;

            setPlayerKey(playerKey);
            setPlayGamePhase(phase);

            const selectedHeroIds = formSelectedHeroIds(players);

            setPlayGameSelectedHeroId(selectedHeroIds.get(playerKey));
            setPlaysGameSelectedHeroIds(selectedHeroIds);
        }
    }, [setPlayGamePhase, setPlaysGameSelectedHeroIds, playGameDetailsQuery]);

    return playGameDetailsQuery;
};

export const usePlayGameInitialization = () => {
    const playGameBaseInput = useRecoilValue(playGameBaseInputState);
    const playGameDetailsQuery = useSetPlayGameDetails(playGameBaseInput);

    return playGameDetailsQuery;
};
