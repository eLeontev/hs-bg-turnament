import Image from 'next/image';

import { Box, Text, Title } from '@mantine/core';
import { heroIds } from '@prisma/client';

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
    const isHeroSelected = selectedHeroId === heroId;
    const { classes } = useStyles(isHeroSelected);
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
                alt={name}
            ></Image>
            <Title order={4}>{name}</Title>
            <Text component="p" className={classes.powerDescription}>
                {powerDescription}
            </Text>
        </Box>
    );
};
