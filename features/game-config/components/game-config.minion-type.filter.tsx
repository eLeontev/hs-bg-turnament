import { Flex, MultiSelect } from '@mantine/core';

import {
    selectedMinionTypesSelector,
    setSelectedMinionTypesSelector,
    useGameConfigStore,
} from '../store/game-config.store';

import { minionTypes } from '@prisma/client';
import { minionTypesValues } from '../../play-game/schemas/play-game.minion.schemas';
import { useI18nMinionTranslate } from '../../../i18n/i18n.hooks';
import { minionTypesI18nKeys } from '../../../i18n/i18n.constants';

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
