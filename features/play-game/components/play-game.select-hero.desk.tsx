import { Flex } from '@mantine/core';
import { heroIds } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { trpc } from '../../../lib/client';
import {
    getGameId,
    getPlayerIdInGame,
    getPlayerKey,
} from '../../../utils.ts/storage.utils';
import { Button } from '../../common/components/button.component';
import { GridComponent } from '../../common/components/table.grid.component';
import { playsGameSelectedHeroIdsState } from './atoms/play-game.selected-hero-id.atom';

export const SelectHeroDesk = () => {
    const selectedHeroIds = useRecoilValue(playsGameSelectedHeroIdsState);
    const { mutateAsync } = trpc.selectHero.useMutation();
    const { data } = trpc.getHeroes.useQuery({
        playerIdInGame: getPlayerIdInGame() || '',
        gameId: getGameId() || '',
    });
    const [heroId, setHeroId] = useState<heroIds | undefined>();

    const selectHero = () => {
        mutateAsync({
            playerIdInGame: getPlayerIdInGame() || '',
            gameId: getGameId() || '',
            heroId,
        });
    };
    useEffect(() => {
        if (selectedHeroIds.has(getPlayerIdInGame() || '')) {
            return;
        }
    }, [selectedHeroIds]);
    console.log(selectedHeroIds, data);

    if (selectedHeroIds.has(getPlayerKey() || '')) {
        return <b>your hero is selected</b>;
    }

    if (data) {
        return (
            <GridComponent>
                <Flex>
                    {data.map((heroId) => (
                        <Button
                            key={heroId}
                            onClick={() => setHeroId(heroId)}
                            label={heroId}
                        ></Button>
                    ))}
                </Flex>
                <Button
                    onClick={selectHero}
                    disabled={!heroId}
                    label="Select Hero"
                ></Button>
            </GridComponent>
        );
    }

    return null;
};
