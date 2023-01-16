import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { trpc } from '../../../lib/client';
import { getGameId, getPlayerIdInGame } from '../../../utils.ts/storage.utils';
import { playsGameSelectedHeroIdsState } from './atoms/play-game.selected-hero-id.atom';

export const SelectHeroDesk = () => {
    const selectedHeroIds = useRecoilValue(playsGameSelectedHeroIdsState);
    const { data } = trpc.getHeroes.useQuery({
        playerIdInGame: getPlayerIdInGame() || '',
        gameId: getGameId() || '',
    });
    useEffect(() => {
        if (selectedHeroIds.has(getPlayerIdInGame() || '')) {
            return;
        }
    }, [selectedHeroIds]);
    console.log(selectedHeroIds);
    return <>please select hero</>;
};
