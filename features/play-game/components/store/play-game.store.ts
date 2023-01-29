import { z } from 'zod';
import { create } from 'zustand';
import { heroIds, playGamePhases } from '@prisma/client';

import { playGameRoundSchema } from '../../schemas/play-game.schemas';

import { getPhaseDuration } from '../../services/play-game.phase.service';

import {
    DurationInMs,
    PlayGameBaseInput,
    PlayGamePhases,
} from '../../models/play-game.models';
import { PlayerKey } from '../../../../models/common.models';

export type PlayGameState = {
    isReady: boolean;
    playerKey: PlayerKey;
    baseInput: PlayGameBaseInput;
    phase: playGamePhases;
    phaseDurationInMs: DurationInMs;
    phaseStartDate: string;
    round: z.infer<typeof playGameRoundSchema>;
    selectedHeroId: heroIds | undefined;
    selectedHeroIds: Map<string, heroIds>;
};

export type PlayGameStoreApi = {
    initState: (playGameState: PlayGameState) => void;
    setPhase: (phase: PlayGamePhases) => void;
    setSelectedHeroId: (selectedHeroId: heroIds) => void;
};

const initialPhase = playGamePhases.heroSelection;
const initialState: PlayGameState = {
    isReady: false,
    playerKey: '',
    baseInput: { gameId: '', playerIdInGame: '' },
    phase: initialPhase,
    phaseStartDate: '',
    phaseDurationInMs: getPhaseDuration(initialPhase),
    round: 0,
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

export const playerKeySelector = ({ playerKey }: PlayGameState) => playerKey;
export const baseInputSelector = ({ baseInput }: PlayGameState) => baseInput;
export const phaseSelector = ({ phase }: PlayGameState) => phase;
export const selectedHeroIdSelector = ({ selectedHeroId }: PlayGameState) =>
    selectedHeroId;
export const selectedHeroIdsSelector = ({ selectedHeroIds }: PlayGameState) =>
    selectedHeroIds;
export const isReadySelector = ({ isReady }: PlayGameState) => isReady;
export const phaseDurationInMsSelector = ({
    phaseDurationInMs,
}: PlayGameState) => phaseDurationInMs;
export const roundSelector = ({ round }: PlayGameState) => round;
