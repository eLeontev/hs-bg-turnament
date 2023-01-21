import { create } from 'zustand';
import { heroIds, playGamePhases } from '@prisma/client';

import {
    DurationInMs,
    PlayGameBaseInput,
    PlayGamePhases,
} from '../../models/play-game.models';

export type PlayGameState = {
    baseInput: PlayGameBaseInput;
    phase: playGamePhases;
    phaseDurationInMs: DurationInMs;
    selectedHeroId: heroIds | undefined;
    selectedHeroIds: Map<string, heroIds>;
};

export type PlayGameStoreApi = {
    initState: (playGameState: PlayGameState) => void;
    setPhase: (phase: PlayGamePhases) => void;
    setSelectedHeroId: (selectedHeroId: heroIds) => void;
};

const initialState: PlayGameState = {
    baseInput: { gameId: '', playerIdInGame: '' },
    phase: playGamePhases.initialisation,
    phaseDurationInMs: 100000000000,
    selectedHeroId: undefined,
    selectedHeroIds: new Map<string, heroIds>(),
};

export const usePlayGameStore = create<PlayGameState & PlayGameStoreApi>(
    (set) => ({
        ...initialState,

        initState: (playGameState: PlayGameState) => set(playGameState),
        setPhase: (playGamePhases: PlayGamePhases) => set(playGamePhases),
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
