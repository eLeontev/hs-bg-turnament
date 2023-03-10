import { useState } from 'react';
import { Flex } from '@mantine/core';

import { heroIds } from '@prisma/client';

import { GridComponent } from '../../../common/components/table.grid.component';
import { Button } from '../../../common/components/button.component';
import { OverlayLoader } from '../../../common/components/loader.component';
import { HeroCard } from './play-game.hero-card.component';

import { useHero } from '../../hooks/play-game.select-hero.hooks';
import { useI18nLabelTranslate } from '../../../../i18n/i18n.hooks';

import { labelI18nKeys } from '../../../../i18n/enums/i18n.label.enums';

import { Hero } from '../../models/play-game.hero.models';

export const SelectHero = () => {
    const t = useI18nLabelTranslate();

    const { heroes, selectHeroIdAction } = useHero();
    const [selectedHeroId, setHeroId] = useState<heroIds>();

    const [visible, setVisible] = useState(false);
    const onClick = () => {
        setVisible(true);
        selectHeroIdAction(selectedHeroId).finally(() => setVisible(false));
    };

    return (
        <GridComponent>
            <OverlayLoader visible={!heroes.length || visible}></OverlayLoader>
            <Flex justify="center">
                {heroes.map((hero: Hero) => (
                    <HeroCard
                        key={hero.heroId}
                        {...hero}
                        selectedHeroId={selectedHeroId}
                        setHeroId={setHeroId}
                    ></HeroCard>
                ))}
            </Flex>
            <Flex justify="center">
                <Button
                    onClick={onClick}
                    disabled={!selectedHeroId}
                    label={t(labelI18nKeys.selectHeroLabel)}
                ></Button>
            </Flex>
        </GridComponent>
    );
};
