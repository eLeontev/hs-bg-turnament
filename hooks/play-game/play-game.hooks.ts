import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { trpc } from '../../lib/client';

import { playerIdInGameSchema } from '../../schemas/player.schemas';
import { gameIdSchema } from '../../schemas/pending-games.schemas';

import { playGamePhaseState } from '../../ui/atoms/play-game.phases.atom';
import { playsGameSelectedHeroIdsState } from '../../ui/atoms/play-game.selected-hero-id.atom';

import { getPlayerIdInGame, getGameId } from '../../utils.ts/storage.utils';
import { formSelectedHeroIds } from '../../services/play-game.service';

export const usePlayGameInitialization = () => {
    const { data } = trpc.playGameDetails.useQuery({
        playerIdInGame: playerIdInGameSchema.parse(getPlayerIdInGame()),
        gameId: gameIdSchema.parse(getGameId()),
    });

    const [playGamePhase, setPlayGameState] =
        useRecoilState(playGamePhaseState);
    const setPlayGameplaysGameSelectedHeroIdsState = useSetRecoilState(
        playsGameSelectedHeroIdsState
    );

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
