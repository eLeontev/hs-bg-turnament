import Image from 'next/image';

import { Box, createStyles, Flex, MantineTheme } from '@mantine/core';

import { Minion } from '../../../play-game/models/play-game.minion.models';

const useMinionAbilitiesStyle = createStyles((theme: MantineTheme) => ({
    minionAbilitiesContainer: {
        position: 'absolute',
        top: 0,
        width: '80%',
    },
    ability: {
        position: 'relative',
        width: 32,
        height: 32,
        overflow: 'hidden',
    },
}));

export type AbilityProps = { src: string };
const Ability = ({ src }: AbilityProps) => {
    const { classes } = useMinionAbilitiesStyle();
    return (
        <Box className={classes.ability}>
            <Image priority width={32} height={32} src={src} alt=""></Image>
        </Box>
    );
};

export type MinionAbilitiesProps = { minion: Minion };
export const MinionAbilities = ({ minion }: MinionAbilitiesProps) => {
    const { classes } = useMinionAbilitiesStyle();
    const { hasDeathRattle, hasDivineShield, hasReborn, hasWindFury } = minion;

    return (
        <Flex justify="center" className={classes.minionAbilitiesContainer}>
            {hasWindFury && <Ability src="/wind-fury.icon.png"></Ability>}
            {hasDivineShield && (
                <Ability src="/divine-shield.icon.png"></Ability>
            )}
            {hasDeathRattle && <Ability src="/death-rattle.icon.png"></Ability>}
            {hasReborn && <Ability src="/reborn.icon.png"></Ability>}
        </Flex>
    );
};
