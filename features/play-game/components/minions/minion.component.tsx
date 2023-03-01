import { CardId } from '../../../../data/minions/battle-cries/minions.battle-cries';
import { PlayGamePlayer } from '../../../player/player.models';
import { cardSelector, usePlayerStore } from '../store/play-game.player.store';
import { Box } from '@mantine/core';
import { MinionCard } from '../../../common/components/minion/minion-card';
import { minions } from '../../../../data/minions';
import { Minion } from '../../models/play-game.minion.models';
import { IconIceCream } from '@tabler/icons';
import { Button } from '../../../common/components/button.component';
import { ActionValidatorResult } from '../../validators/play-game.player-actions.validators';

type MinionCardInGameProps = {
    cardId: CardId;
    isActionDisabled: (
        player: PlayGamePlayer,
        cardId: CardId
    ) => ActionValidatorResult;
    isLoading: boolean;
    action: () => void;
    label: string;
    isFrozen?: boolean;
};
export const MinionCardInGame = ({
    cardId,
    action,
    isActionDisabled,
    isLoading,
    label,
    isFrozen,
}: MinionCardInGameProps) => {
    const {
        tavernTier,
        minionTypes: [minionType],
        minionId,
    } = usePlayerStore(cardSelector(cardId));
    const player = usePlayerStore();

    return (
        <Box>
            <MinionCard
                minion={minions[tavernTier][minionType].get(minionId) as Minion}
                minionType={minionType}
                tavernTier={tavernTier}
            ></MinionCard>
            {isFrozen && <IconIceCream></IconIceCream>}
            <Button
                disabled={Boolean(isActionDisabled(player, cardId))}
                loading={isLoading}
                label={label}
                onClick={action}
            ></Button>
        </Box>
    );
};
