import { heroIds } from '@prisma/client';
import { atom } from 'recoil';

export const playsGameSelectedHeroIdsState = atom<Map<string, heroIds>>({
    key: 'selectedHeroId',
    default: new Map(),
});
