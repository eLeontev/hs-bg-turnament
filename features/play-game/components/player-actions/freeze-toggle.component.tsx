import { PlayGameBaseInput } from '../../models/play-game.models';
import { baseInputSelector, usePlayGameStore } from '../store/play-game.store';
import {
    freezeMinionsSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { trpc } from '../../../../lib/client';
import { Button } from '../../../common/components/button.component';

export const FreezeToggle = () => {
    const baseInput: PlayGameBaseInput = usePlayGameStore(baseInputSelector);

    const freezeMinions = usePlayerStore(freezeMinionsSelector);

    const { mutateAsync, isLoading } = trpc.freezeMinions.useMutation();

    const action = () =>
        mutateAsync(baseInput).then(freezeMinions).catch(console.error);

    return (
        <Button
            onClick={action}
            disabled={isLoading}
            loading={isLoading}
            label="freeze minions"
            color="green"
        ></Button>
    );
};
