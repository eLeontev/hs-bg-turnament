import { z } from 'zod';
import { create } from 'zustand';
import { heroIds, playGamePhases } from '@prisma/client';

import { playGameRoundSchema } from '../../schemas/play-game.schemas';

import { getPhaseDuration } from '../../services/play-game.phase.service';

import {
    DurationInMs,
    PlayGameBaseInput,
    PlayGamePhaseData,
} from '../../models/play-game.models';
import { PlayerKey } from '../../../../models/common.models';
import { minionTypesSchema } from '../../schemas/play-game.minion.schemas';

export type PlayGameState = {
    isReady: boolean;
    playerKey: PlayerKey;
    baseInput: PlayGameBaseInput;
    phase: playGamePhases;
    phaseDurationInMs: DurationInMs;
    phaseStartDate: string;
    round: z.infer<typeof playGameRoundSchema>;
    minionTypes: z.infer<typeof minionTypesSchema>;
    selectedHeroId: heroIds | undefined;
    selectedHeroIds: Map<string, heroIds>;
};

export type PlayGameStoreApi = {
    initState: (playGameState: PlayGameState) => void;
    setPhase: (playGamePhaseData: PlayGamePhaseData) => void;
    switchToRecrutPhase: () => void;
    setSelectedHeroId: (selectedHeroId: heroIds) => void;
    setRecruitPhaseData: (recruitPhaseData: PlayGamePhaseData) => void;
};

const initialPhase = playGamePhases.heroSelection;
const initialState: PlayGameState = {
    isReady: false,
    playerKey: '',
    baseInput: { gameId: '', playerIdInGame: '' },
    phase: initialPhase,
    phaseStartDate: '',
    phaseDurationInMs: getPhaseDuration(initialPhase),
    minionTypes: [],
    round: 0,
    selectedHeroId: undefined,
    selectedHeroIds: new Map<string, heroIds>(),
};

export const usePlayGameStore = create<PlayGameState & PlayGameStoreApi>(
    (set) => ({
        ...initialState,

        initState: (playGameState: PlayGameState) => set(playGameState),
        setPhase: (playGamePhaseData: PlayGamePhaseData) =>
            set(playGamePhaseData),
        switchToRecrutPhase: () => set({ phase: playGamePhases.recruit }),
        setSelectedHeroId: (selectedHeroId: heroIds) => set({ selectedHeroId }),
        setRecruitPhaseData: (recruitPhaseData: PlayGamePhaseData) =>
            set(recruitPhaseData),
    })
);

export const initStateSelector = ({ initState }: PlayGameStoreApi) => initState;
export const setPhaseSelector = ({ setPhase }: PlayGameStoreApi) => setPhase;
export const setSelectedHeroIdSelector = ({
    setSelectedHeroId,
}: PlayGameStoreApi) => setSelectedHeroId;
export const setRecruitPhaseDataSelector = ({
    setRecruitPhaseData,
}: PlayGameStoreApi) => setRecruitPhaseData;

export const playerKeySelector = ({ playerKey }: PlayGameState) => playerKey;
export const baseInputSelector = ({ baseInput }: PlayGameState) => baseInput;
export const phaseSelector = ({ phase }: PlayGameState) => phase;
export const phaseStartDateSelector = ({ phaseStartDate }: PlayGameState) =>
    phaseStartDate;

export const selectedHeroIdSelector = ({ selectedHeroId }: PlayGameState) =>
    selectedHeroId;
export const selectedHeroIdsSelector = ({ selectedHeroIds }: PlayGameState) =>
    selectedHeroIds;
export const isReadySelector = ({ isReady }: PlayGameState) => isReady;
export const phaseDurationInMsSelector = ({
    phaseDurationInMs,
}: PlayGameState) => phaseDurationInMs;
export const roundSelector = ({ round }: PlayGameState) => round;
