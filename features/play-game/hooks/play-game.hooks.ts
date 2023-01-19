import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { trpc } from '../../../lib/client';

import { formSelectedHeroIds } from '../services/play-game.client.service';

import { playerIdInGameSchema } from '../../player/player.schemas';
import { gameIdSchema } from '../../pending-games/pending-games.schemas';

import { playGamePhaseState } from '../components/atoms/play-game.phases.atom';
import { playsGameSelectedHeroIdsState } from '../components/atoms/play-game.selected-hero-id.atom';

import {
    getPlayerIdInGame,
    getGameId,
    setPlayerKey,
} from '../../../utils.ts/storage.utils';

export const usePlayGameInitialization = () => {
    const playGameBaseInput = {
        playerIdInGame: playerIdInGameSchema.parse(getPlayerIdInGame()),
        gameId: gameIdSchema.parse(getGameId()),
    };
    const playerKeyResponse =
        trpc.getPlayGamePlayerKey.useQuery(playGameBaseInput);
    const { data } = trpc.playGameDetails.useQuery(playGameBaseInput);

    const [playGamePhase, setPlayGameState] =
        useRecoilState(playGamePhaseState);
    const setPlayGameplaysGameSelectedHeroIdsState = useSetRecoilState(
        playsGameSelectedHeroIdsState
    );

    useEffect(() => {
        const playerKey = playerKeyResponse.data;
        if (playerKey) {
            setPlayerKey(playerKey);
        }
    }, [playerKeyResponse]);
    useEffect(() => {
        if (data) {
            const { phase, players } = data;

            setPlayGameState(phase);
            setPlayGameplaysGameSelectedHeroIdsState(
                formSelectedHeroIds(players)
            );
        }
    }, [setPlayGameState, setPlayGameplaysGameSelectedHeroIdsState, data]);

    return playGamePhase;
};
