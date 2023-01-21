import { useEffect, useState } from 'react';

import { heroIds } from '@prisma/client';
import { trpc } from '../../../lib/client';

import { selectHeroPlayerInputSchema } from '../schemas/play-game.player-actions.schemas';

import {
    baseInputSelector,
    usePlayGameStore,
} from '../components/store/play-game.store';

import { PlayGameBaseInput } from '../models/play-game.models';
import { HeroIds } from '../models/play-game.hero.models';

export const useQueryHero = (playGameBaseInput: PlayGameBaseInput) => {
    const heroesQuery = trpc.getHeroes.useQuery(playGameBaseInput);
    const [heroIds, setHeroIds] = useState<HeroIds>([]);

    useEffect(() => {
        const heroIds = heroesQuery.data;
        if (heroIds) {
            setHeroIds(heroIds);
        }
    }, [heroesQuery]);

    return heroIds;
};

export const useSelectHero = (playGameBaseInput: PlayGameBaseInput) => {
    const { mutateAsync } = trpc.selectHero.useMutation();

    return (heroId: heroIds | undefined) =>
        mutateAsync(
            selectHeroPlayerInputSchema.parse({
                ...playGameBaseInput,
                heroId,
            })
        );
};

export const useHero = () => {
    const baseInput = usePlayGameStore(baseInputSelector);

    const heroIds = useQueryHero(baseInput);
    const selectHeroIdAction = useSelectHero(baseInput);

    return { heroIds, selectHeroIdAction };
};
