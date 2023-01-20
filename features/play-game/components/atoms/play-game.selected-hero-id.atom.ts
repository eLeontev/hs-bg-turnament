import { heroIds } from '@prisma/client';
import { atom } from 'recoil';

export const playsGameSelectedHeroIdsState = atom<Map<string, heroIds>>({
    key: 'selectedHeroIds',
    default: new Map(),
});

export const playsGameSelectedHeroIdState = atom<heroIds>({
    key: 'selectedHeroId',
    default: undefined,
});
