import { PlayGameBaseInput } from '../../models/play-game.models';
import { baseInputSelector, usePlayGameStore } from '../store/play-game.store';
import {
    updateTavernCardsSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { trpc } from '../../../../lib/client';
import { isRollMinionsDisabled } from '../../validators/play-game.player-actions.validators';
import { Button } from '../../../common/components/button.component';

export const RollTavernMinions = () => {
    const baseInput: PlayGameBaseInput = usePlayGameStore(baseInputSelector);

    const player = usePlayerStore();
    const updateTavernCards = usePlayerStore(updateTavernCardsSelector);

    const { mutateAsync, isLoading } = trpc.rollTavernMinions.useMutation();
    const validatorErrorMessage = isRollMinionsDisabled(player);

    const action = () => {
        if (validatorErrorMessage) {
            alert(validatorErrorMessage);

            return;
        }

        mutateAsync(baseInput).then(updateTavernCards).catch(console.error);
    };

    return (
        <Button
            onClick={action}
            disabled={Boolean(validatorErrorMessage)}
            loading={isLoading}
            label="roll tavern minions"
            color="teal"
        ></Button>
    );
};
