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
import {
    startErrorHandlerSelector,
    usePlayGameErrorHandlerStore,
} from '../store/play-game.error-handler.store';

export const TavernTier = () => {
    const baseInput: PlayGameBaseInput = usePlayGameStore(baseInputSelector);
    const startErrorHandler = usePlayGameErrorHandlerStore(
        startErrorHandlerSelector
    );

    const player = usePlayerStore();
    const tavernTier = usePlayerStore(tavernTierSelector);

    const updateTavernTier = usePlayerStore(updateTavernTierSelector);

    const { mutateAsync, isLoading } = trpc.upgradeTavern.useMutation();

    const errorI18nKey = isTavernTierUpgradeDisabled(player);

    const action = () => {
        if (errorI18nKey) {
            return startErrorHandler(errorI18nKey);
        }

        updateTavernTier();
        mutateAsync(baseInput).catch(startErrorHandler);
    };

    return (
        <Button
            disabled={Boolean(errorI18nKey)}
            onClick={action}
            loading={isLoading}
            label={`tavern tier: ${tavernTier}`}
        ></Button>
    );
};
