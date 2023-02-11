import { Switch } from '@mantine/core';

import {
    shouldDisplaySummonedMinionsSelector,
    toggleTavernSummonMinionVisibilitySelector,
    useGameConfigStore,
} from '../store/game-config.store';

import { useI18nLabelTranslate } from '../../../i18n/i18n.hooks';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

export const SummonedMinionsToggle = () => {
    const t = useI18nLabelTranslate();

    const shouldDisplaySummonedMinions = useGameConfigStore(
        shouldDisplaySummonedMinionsSelector
    );
    const toggleTavernSummonMinionVisibility = useGameConfigStore(
        toggleTavernSummonMinionVisibilitySelector
    );

    return (
        <Switch
            checked={shouldDisplaySummonedMinions}
            onLabel={t(labelI18nKeys.switchToSummonedMinions)}
            offLabel={t(labelI18nKeys.switchToTavernMinions)}
            onChange={(event) =>
                toggleTavernSummonMinionVisibility(event.currentTarget.checked)
            }
        ></Switch>
    );
};
