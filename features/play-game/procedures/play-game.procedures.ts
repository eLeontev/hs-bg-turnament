import { procedure } from '../../../trpc/runtime-config';

import {
    getPlayerHeroIdsQuery,
    playGamePlayerKeyQuery,
    playGameQuery,
    selectPlayGamePlayerHeroMutation,
    startPlayGameMutation,
} from '../play-game.controller';

import {
    playGameBaseInputSchema,
    playGameDetailsOutputSchema,
    playGameSelectHeroSchema,
    startPlayGameInputSchema,
} from '../schemas/play-game.schemas';
import { heroIdsSchema } from '../schemas/play-game.hero.schemas';
import { playerKeySchema } from '../../player/player.schemas';

export const playGameProcedures = {
    startPlayGame: procedure
        .input(startPlayGameInputSchema)
        .mutation(({ input, ctx }) => startPlayGameMutation({ input, ctx })), // TODO: fix types to avoid wrapper
    playGameDetails: procedure
        .input(playGameBaseInputSchema)
        .output(playGameDetailsOutputSchema)
        .query(({ input, ctx }) => playGameQuery({ input, ctx })),
    getPlayGamePlayerKey: procedure
        .input(playGameBaseInputSchema)
        .output(playerKeySchema)
        .query(({ input, ctx }) => playGamePlayerKeyQuery({ input, ctx })),
    getHeroes: procedure
        .input(playGameBaseInputSchema)
        .output(heroIdsSchema)
        .query(({ input, ctx }) => getPlayerHeroIdsQuery({ input, ctx })),
    selectHero: procedure
        .input(playGameSelectHeroSchema)
        .mutation(({ input, ctx }) =>
            selectPlayGamePlayerHeroMutation({ input, ctx })
        ),
};
