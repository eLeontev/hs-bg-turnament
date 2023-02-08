import Image from 'next/image';

import { Box, createStyles, Flex, MantineTheme, Text } from '@mantine/core';

import {
    removeSelectedTavernTierSelector,
    selectedTavernTiersSelector,
    setSelectedTavernTiersSelector,
    useGameConfigStore,
} from '../store/game-config.store';

import { tavernTiersArray } from '../../../constants/game-config.constants';

import { tavernTiers } from '../../play-game/models/play-game.tavern.models';

import { textStyles } from '../../common/styles/minion.styles';

const useMinionTextStyles = createStyles<string, number>(
    (theme: MantineTheme, value: number) => ({
        tierContainer: {
            position: 'relative',
        },
        text: {
            ...textStyles(theme, 1000),
            cursor: 'pointer',
            left: 10,
            top: 11,
        },
    })
);

type TavernTierProps = {
    tavernTier: tavernTiers;
    isSelected: boolean;
};

const TavernTier = ({ tavernTier, isSelected }: TavernTierProps) => {
    const { classes } = useMinionTextStyles(tavernTier);
    const setSelectedTavernTiers = useGameConfigStore(
        setSelectedTavernTiersSelector
    );
    const removeSelectedTavernTier = useGameConfigStore(
        removeSelectedTavernTierSelector
    );

    const src = isSelected ? '/selected-tier-star.png' : '/tier-star.png';
    const action = isSelected
        ? removeSelectedTavernTier
        : setSelectedTavernTiers;

    return (
        <Box
            className={classes.tierContainer}
            onClick={() => action(tavernTier)}
        >
            <Image
                priority
                key={tavernTier}
                width={20}
                height={20}
                src={src}
                alt=""
            ></Image>
            <Text className={classes.text}>{tavernTier}</Text>
        </Box>
    );
};
export const TavernTierFilter = () => {
    const selectedTavernTiers = useGameConfigStore(selectedTavernTiersSelector);

    return (
        <Flex>
            {tavernTiersArray.map((tavernTier: tavernTiers) => (
                <TavernTier
                    key={tavernTier}
                    tavernTier={tavernTier}
                    isSelected={selectedTavernTiers.has(tavernTier)}
                ></TavernTier>
            ))}
        </Flex>
    );
};
