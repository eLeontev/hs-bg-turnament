import { useEffect, useState } from 'react';

import { heroIds } from '@prisma/client';
import { trpc } from '../../../lib/client';

import { selectHeroPlayerInputSchema } from '../schemas/play-game.player-actions.schemas';

import { getHeroesFromId } from '../services/play-game.hero.service';
import { playGameActionsHandler } from '../services/play-game.actions.service';

import {
    baseInputSelector,
    playerKeySelector,
    setSelectedHeroIdSelector,
    usePlayGameStore,
} from '../components/store/play-game.store';

import { playGameActions } from '../play-game.enums';

import { PlayGameBaseInput } from '../models/play-game.models';
import { Hero } from '../models/play-game.hero.models';

export const useQueryHero = (playGameBaseInput: PlayGameBaseInput) => {
    const heroesQuery = trpc.getHeroes.useQuery(playGameBaseInput);
    const [heroes, setHeroes] = useState<Array<Hero>>([]);

    useEffect(() => {
        const heroIds = heroesQuery.data;
        if (heroIds) {
            setHeroes(getHeroesFromId(heroIds));
        }
    }, [heroesQuery.data]);

    return heroes;
};

export const useSelectHero = (playGameBaseInput: PlayGameBaseInput) => {
    const { mutateAsync } = trpc.selectHero.useMutation();

    const playerKey = usePlayGameStore(playerKeySelector);
    const setSelectedHeroId = usePlayGameStore(setSelectedHeroIdSelector);

    return async (heroId: heroIds | undefined) => {
        const selectHeroplayerInput = selectHeroPlayerInputSchema.parse({
            ...playGameBaseInput,
            heroId,
        });

        await mutateAsync(selectHeroplayerInput);

        const { heroId: selectedHeroId } = selectHeroplayerInput;

        setSelectedHeroId(selectedHeroId);
        playGameActionsHandler({
            action: playGameActions.heroSelected,
            payload: { playerKey, selectedHeroId },
        });
    };
};

export const useHero = () => {
    const baseInput = usePlayGameStore(baseInputSelector);

    const heroes = useQueryHero(baseInput);
    const selectHeroIdAction = useSelectHero(baseInput);

    return { heroes, selectHeroIdAction };
};
