import { useRef } from 'react';

import { Button } from '../button.component';

import { useCreatePendingGame } from '../../../hooks/pending-games/pending-games.mutation.hooks';

import {
    createPendingGameLabel,
    pendingGameNameErrorMessage,
} from '../../../constants/pending-games.constants';

import { gameNameSchema } from '../../../schemas/pending-games.schemas';

export const CreatePendingGame = () => {
    const gameNameRef = useRef<HTMLInputElement>(null);
    const action = useCreatePendingGame();

    const onClick = () => {
        const res = gameNameSchema.safeParse(gameNameRef.current?.value);

        if (res.success) {
            action(res.data);
            return;
        }

        alert(pendingGameNameErrorMessage);
    };

    return (
        <>
            <label>
                Please enter game name before to create it:
                <input type="text" ref={gameNameRef} />
            </label>
            <Button onClick={onClick} label={createPendingGameLabel}></Button>
        </>
    );
};
