import { PlayGameBaseInput } from '../../models/play-game.models';
import { baseInputSelector, usePlayGameStore } from '../store/play-game.store';
import {
    updateTavernCardsSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { trpc } from '../../../../lib/client';
import { isRollMinionsDisabled } from '../../validators/play-game.player-actions.validators';
import { Button } from '../../../common/components/button.component';
import {
    startErrorHandlerSelector,
    usePlayGameErrorHandlerStore,
} from '../store/play-game.error-handler.store';

export const RollTavernMinions = () => {
    const baseInput: PlayGameBaseInput = usePlayGameStore(baseInputSelector);
    const startErrorHandler = usePlayGameErrorHandlerStore(
        startErrorHandlerSelector
    );

    const player = usePlayerStore();
    const updateTavernCards = usePlayerStore(updateTavernCardsSelector);

    const { mutateAsync, isLoading } = trpc.rollTavernMinions.useMutation();
    const errorI18nKey = isRollMinionsDisabled(player);

    const action = () => {
        if (errorI18nKey) {
            return startErrorHandler(errorI18nKey);
        }

        mutateAsync(baseInput).then(updateTavernCards).catch(startErrorHandler);
    };

    return (
        <Button
            onClick={action}
            disabled={Boolean(errorI18nKey)}
            loading={isLoading}
            label="roll tavern minions"
            color="teal"
        ></Button>
    );
};
