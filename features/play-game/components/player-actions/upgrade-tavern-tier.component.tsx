import { PlayGameBaseInput } from '../../models/play-game.models';
import { baseInputSelector, usePlayGameStore } from '../store/play-game.store';
import {
    tavernTierSelector,
    updateTavernTierSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { trpc } from '../../../../lib/client';
import { isTavernTierUpgradeDisabled } from '../../validators/play-game.player-actions.validators';
import { Button } from '../../../common/components/button.component';

export const TavernTier = () => {
    const baseInput: PlayGameBaseInput = usePlayGameStore(baseInputSelector);

    const player = usePlayerStore();
    const tavernTier = usePlayerStore(tavernTierSelector);

    const updateTavernTier = usePlayerStore(updateTavernTierSelector);

    const { mutateAsync, isLoading } = trpc.upgradeTavern.useMutation();

    const validatorErrorMessage = isTavernTierUpgradeDisabled(player);

    const action = () => {
        if (validatorErrorMessage) {
            alert(validatorErrorMessage);

            return;
        }

        updateTavernTier();
        mutateAsync(baseInput).catch(console.error);
    };

    return (
        <Button
            disabled={Boolean(validatorErrorMessage)}
            onClick={action}
            loading={isLoading}
            label={`tavern tier: ${tavernTier}`}
        ></Button>
    );
};
