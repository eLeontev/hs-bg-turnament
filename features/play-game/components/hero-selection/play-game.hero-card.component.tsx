import Image from 'next/image';

import { Box, Text, Title } from '@mantine/core';
import { heroIds } from '@prisma/client';

import { useI18nHeroTranslate } from '../../../../i18n/i18n.hooks';

import { Hero } from '../../models/play-game.hero.models';

import { useStyles } from '../styles/play-game.hero-selection.styles';

export type HeroCardProps = Hero & {
    selectedHeroId: heroIds | undefined;
    setHeroId: (heroId: heroIds) => void;
};
export const HeroCard = ({
    setHeroId,
    selectedHeroId,
    heroId,
    name,
    avatarSrc,
    powerDescription,
}: HeroCardProps) => {
    const { classes } = useStyles();
    const t = useI18nHeroTranslate();

    const isHeroSelected = selectedHeroId === heroId;
    const heroCardClassName = `${classes.heroCard} ${
        isHeroSelected ? classes.heroCardSelected : ''
    }`;

    return (
        <Box className={heroCardClassName} onClick={() => setHeroId(heroId)}>
            <Image
                priority
                width={200}
                height={276}
                src={avatarSrc}
                alt={t(name)}
            ></Image>
            <Title order={4}>{t(name)}</Title>
            <Text component="p" className={classes.powerDescription}>
                {t(powerDescription)}
            </Text>
        </Box>
    );
};
