import { useState } from 'react';
import { Flex } from '@mantine/core';

import { heroIds } from '@prisma/client';

import { GridComponent } from '../../common/components/table.grid.component';
import { Button } from '../../common/components/button.component';

import { useHero } from '../hooks/play-game.select-hero.hooks';

export const SelectHero = () => {
    const { heroIds, selectHeroIdAction } = useHero();
    const [heroId, setHeroId] = useState<heroIds>();

    return (
        <GridComponent>
            <Flex>
                {heroIds.map((heroId: heroIds) => (
                    <Button
                        key={heroId}
                        onClick={() => setHeroId(heroId)}
                        label={heroId}
                    ></Button>
                ))}
            </Flex>
            <Button
                onClick={() => selectHeroIdAction(heroId)}
                disabled={!heroId}
                label="Select Hero"
            ></Button>
        </GridComponent>
    );
};
