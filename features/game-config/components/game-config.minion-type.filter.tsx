import Image from 'next/image';

import {
    Box,
    createStyles,
    Flex,
    MantineTheme,
    MultiSelect,
    Text,
} from '@mantine/core';

import {
    removeSelectedTavernTierSelector,
    selectedMinionTypesSelector,
    selectedTavernTiersSelector,
    setSelectedMinionTypesSelector,
    setSelectedTavernTiersSelector,
    useGameConfigStore,
} from '../store/game-config.store';

import { tavernTiersArray } from '../../../constants/game-config.constants';

import { tavernTiers } from '../../play-game/models/play-game.tavern.models';

import { textStyles } from '../../common/styles/minion.styles';
import { minionTypes } from '@prisma/client';
import { minionTypesValues } from '../../play-game/schemas/play-game.minion.schemas';
import { useI18nMinionTranslate } from '../../../i18n/i18n.hooks';
import { minionTypesI18nKeys } from '../../../i18n/i18n.constants';

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

export const MinionTypeFilter = () => {
    const t = useI18nMinionTranslate();

    const minionTypesData = minionTypesValues.map(
        (minionType: minionTypes) => ({
            label: t(minionTypesI18nKeys[minionType]),
            value: minionType,
        })
    );

    const selectedMinionTypes = useGameConfigStore(selectedMinionTypesSelector);
    const setSelectedMinionTypes = useGameConfigStore(
        setSelectedMinionTypesSelector
    );

    return (
        <Flex>
            <MultiSelect
                value={selectedMinionTypes}
                onChange={setSelectedMinionTypes}
                data={minionTypesData}
            />
        </Flex>
    );
};
