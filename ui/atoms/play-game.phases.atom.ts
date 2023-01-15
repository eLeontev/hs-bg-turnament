import { atom } from 'recoil';
import { playGamePhases } from '@prisma/client';

export const playGamePhaseState = atom<playGamePhases>({
    key: 'playGamePhase',
    default: undefined,
});
