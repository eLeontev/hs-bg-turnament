import { Box, Switch } from '@mantine/core';

import { minionTypes } from '@prisma/client';

import {
    useGameConfigStore,
    tripleMinionIdsSelector,
    setTripleMinionIdsSelector,
    removeTripleMinionIdsSelector,
} from '../store/game-config.store';

import { MinionCard } from '../../common/components/minion/minion-card';

import { useI18nLabelTranslate } from '../../../i18n/i18n.hooks';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

import { Minion } from '../../play-game/models/play-game.minion.models';
import { tavernTiers } from '../../play-game/models/play-game.tavern.models';

import { useGameConfigStyles } from './styles/game-config.styles';

type GameConfigMinionCardProps = {
    tavernTier: tavernTiers;
    minionType: minionTypes;
    minion: Minion;
};
export const GameConfigMinionCard = ({
    minion,
    minionType,
    tavernTier,
}: GameConfigMinionCardProps) => {
    const { minionId } = minion;

    const t = useI18nLabelTranslate();

    const tripleMinionIds = useGameConfigStore(tripleMinionIdsSelector);
    const setTripleMinionIds = useGameConfigStore(setTripleMinionIdsSelector);
    const removeTripleMinionIds = useGameConfigStore(
        removeTripleMinionIdsSelector
    );

    const isTriple = tripleMinionIds.has(minionId);

    const onChangeAction = isTriple
        ? removeTripleMinionIds
        : setTripleMinionIds;

    const { classes } = useGameConfigStyles();

    return (
        <Box>
            <Switch
                className={classes.toggletriple}
                checked={isTriple}
                onLabel={t(labelI18nKeys.switchToTriple)}
                offLabel={t(labelI18nKeys.switchToRegular)}
                onChange={() => onChangeAction(minionId)}
            ></Switch>
            <MinionCard
                key={minion.minionId}
                minion={{
                    ...minion,
                    isTriple,
                }}
                minionType={minionType}
                tavernTier={tavernTier}
            ></MinionCard>
        </Box>
    );
};
