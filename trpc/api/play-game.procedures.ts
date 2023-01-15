import { procedure } from '../runtime-config';

import {
    playGameQuery,
    startPlayGameMutation,
} from '../../controllers/play-game.controller';

import {
    playGameBaseInputSchema,
    playGameDetailsOutputSchema,
    startPlayGameInputSchema,
} from '../../schemas/play-game.schemas';

export const playGameProcedures = {
    startPlayGame: procedure
        .input(startPlayGameInputSchema)
        .mutation(({ input, ctx }) => startPlayGameMutation({ input, ctx })), // TODO: fix types to avoid wrapper
    playGameDetails: procedure
        .input(playGameBaseInputSchema)
        .output(playGameDetailsOutputSchema)
        .query(({ input, ctx }) => playGameQuery({ input, ctx })),
};
