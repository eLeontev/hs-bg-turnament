import { procedure } from '../../../trpc/runtime-config';

import {
    getPlayerHeroIdsQuery,
    getPlayGameRecruitPhaseInitialDataQuery,
    playGameQuery,
    startPlayGameMutation,
} from '../controllers/play-game.controller';

import {
    playGameBaseInputSchema,
    playGameDetailsOutputSchema,
    playGamePhaseDataSchema,
    startPlayGameInputSchema,
} from '../schemas/play-game.schemas';
import { heroIdsSchema } from '../schemas/play-game.hero.schemas';

export const playGameProcedures = {
    startPlayGame: procedure
        .input(startPlayGameInputSchema)
        .mutation(({ input, ctx }) => startPlayGameMutation({ input, ctx })), // TODO: fix types to avoid wrapper
    playGameDetails: procedure
        .input(playGameBaseInputSchema)
        .output(playGameDetailsOutputSchema)
        .query(({ input, ctx }) => playGameQuery({ input, ctx })),
    getHeroes: procedure
        .input(playGameBaseInputSchema)
        .output(heroIdsSchema)
        .query(({ input, ctx }) => getPlayerHeroIdsQuery({ input, ctx })),
    recruitPhaseInitialData: procedure
        .input(playGameBaseInputSchema)
        .output(playGamePhaseDataSchema)
        .query(({ input, ctx }) =>
            getPlayGameRecruitPhaseInitialDataQuery({ input, ctx })
        ),
};
