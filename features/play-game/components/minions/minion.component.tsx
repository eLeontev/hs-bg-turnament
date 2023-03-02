import { CardId } from '../../../../data/minions/battle-cries/minions.battle-cries';
import {
    cardSelector,
    isFrozenCardSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { Box } from '@mantine/core';
import { MinionCard } from '../../../common/components/minion/minion-card';
import { minions } from '../../../../data/minions';
import { Minion } from '../../models/play-game.minion.models';
import { IconIceCream } from '@tabler/icons';
import { Button } from '../../../common/components/button.component';
import { ActionValidator } from '../../validators/play-game.player-actions.validators';
import { baseInputSelector, usePlayGameStore } from '../store/play-game.store';
import { PlayGameBaseInput } from '../../models/play-game.models';

type MinionCardWithOwnState = {
    cardId: CardId;
    actionValidator: ActionValidator;
    stateAction: (cardId: CardId) => void;
    request: (
        playerAction: PlayGameBaseInput & { cardId: CardId }
    ) => Promise<void>;
    cardActionLabel: string;
};
export const MinionCardWithOwnState = ({
    cardId,
    request,
    stateAction,
    actionValidator,
    cardActionLabel,
}: MinionCardWithOwnState) => {
    const baseInput = usePlayGameStore(baseInputSelector);

    const player = usePlayerStore();
    const isFrozen = usePlayerStore(isFrozenCardSelector(cardId));
    const card = usePlayerStore(cardSelector(cardId));

    const actionValidatorResult = actionValidator(player, cardId);

    const action = () => {
        if (actionValidatorResult) {
            return alert(actionValidatorResult);
        }

        stateAction(cardId);
        request({ ...baseInput, cardId }).catch(console.error);
    };

    const {
        tavernTier,
        minionId,
        minionTypes: [minionType],
    } = card; // TODO: improve minion cards

    return (
        <Box>
            <MinionCard
                minion={minions[tavernTier][minionType].get(minionId) as Minion}
                minionType={minionType}
                tavernTier={tavernTier}
            ></MinionCard>
            {isFrozen && <IconIceCream></IconIceCream>}
            <Button
                disabled={Boolean(actionValidatorResult)}
                label={cardActionLabel}
                onClick={action}
            ></Button>
        </Box>
    );
};
