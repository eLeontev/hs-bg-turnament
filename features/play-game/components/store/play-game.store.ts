import { create } from 'zustand';
import { heroIds, playGamePhases } from '@prisma/client';

import { PlayGameBaseInput } from '../../models/play-game.models';

export type PlayGameState = {
    baseInput: PlayGameBaseInput;
    phase: playGamePhases;
    selectedHeroId: heroIds | undefined;
    selectedHeroIds: Map<string, heroIds>;
};

export type PlayGameStoreApi = {
    initState: (playGameState: PlayGameState) => void;
    setPhase: (phase: playGamePhases) => void;
    setSelectedHeroId: (selectedHeroId: heroIds) => void;
};

const initialState: PlayGameState = {
    baseInput: { gameId: '', playerIdInGame: '' },
    phase: playGamePhases.initialisation,
    selectedHeroId: undefined,
    selectedHeroIds: new Map<string, heroIds>(),
};

export const usePlayGameStore = create<PlayGameState & PlayGameStoreApi>(
    (set) => ({
        ...initialState,

        initState: (playGameState: PlayGameState) => set(playGameState),
        setPhase: (phase: playGamePhases) => set({ phase }),
        setSelectedHeroId: (selectedHeroId: heroIds) => set({ selectedHeroId }),
    })
);

export const initStateSelector = ({ initState }: PlayGameStoreApi) => initState;
export const setPhaseSelector = ({ setPhase }: PlayGameStoreApi) => setPhase;
export const setSelectedHeroIdSelector = ({
    setSelectedHeroId,
}: PlayGameStoreApi) => setSelectedHeroId;

export const baseInputSelector = ({ baseInput }: PlayGameState) => baseInput;
export const phaseSelector = ({ phase }: PlayGameState) => phase;
export const selectedHeroIdSelector = ({ selectedHeroId }: PlayGameState) =>
    selectedHeroId;
export const selectedHeroIdsSelector = ({ selectedHeroIds }: PlayGameState) =>
    selectedHeroIds;
