import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { trpc } from '../../../lib/client';

import { formSelectedHeroIds } from '../services/play-game.client.service';

import { playGamePhaseState } from '../components/atoms/play-game.phases.atom';
import { playsGameSelectedHeroIdsState } from '../components/atoms/play-game.selected-hero-id.atom';
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

export const useSetPlayGamePlayerKey = (
    playGameBaseInput: PlayGameBaseInput
) => {
    const playerKeyResponse =
        trpc.getPlayGamePlayerKey.useQuery(playGameBaseInput);

    useEffect(() => {
        const playerKey = playerKeyResponse.data;
        if (playerKey) {
            setPlayerKey(playerKey);
        }
    }, [playerKeyResponse]);
};

export const useSetPlayGameDetails = (playGameBaseInput: PlayGameBaseInput) => {
    const setPlayGamePhase = useSetRecoilState(playGamePhaseState);
    const setPlaysGameSelectedHeroIdsState = useSetRecoilState(
        playsGameSelectedHeroIdsState
    );

    const playGameDetailsResponse =
        trpc.playGameDetails.useQuery(playGameBaseInput);

    useEffect(() => {
        const playGameDetails = playGameDetailsResponse.data;

        if (playGameDetails) {
            const { phase, players } = playGameDetails;

            setPlayGamePhase(phase);
            setPlaysGameSelectedHeroIdsState(formSelectedHeroIds(players));
        }
    }, [
        setPlayGamePhase,
        setPlaysGameSelectedHeroIdsState,
        playGameDetailsResponse,
    ]);
};
export const usePlayGameInitialization = () => {
    const playGameBaseInput = useRecoilValue(playGameBaseInputState);

    useSetPlayGamePlayerKey(playGameBaseInput);
    useSetPlayGameDetails(playGameBaseInput);
};
