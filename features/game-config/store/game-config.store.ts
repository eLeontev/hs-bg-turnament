import { minionTypes } from '@prisma/client';
import { create } from 'zustand';
import { tavernTiers } from '../../play-game/models/play-game.tavern.models';

export type GameConfigState = {
    selectedMinionTypes: Array<minionTypes>;
    selectedTavernTiers: Array<tavernTiers>;
};

export type GameConfigApi = {
    setSelectedMinionTypes: (minionType: minionTypes) => void;
    setSelectedTavernTiers: (tavernTier: tavernTiers) => void;
    removeSelectedMinionType: (minionType: minionTypes) => void;
    removeSelectedTavernTier: (tavernTier: tavernTiers) => void;
};

const initialState: GameConfigState = {
    selectedMinionTypes: [],
    selectedTavernTiers: [],
};

const setSelectedEntry = <T>(entries: Array<T>, entry: T): Array<T> => [
    ...entries,
    entry,
];

const removeSelectedEntry = <T>(entries: Array<T>, entry: T): Array<T> =>
    entries.filter((selectedEntry) => selectedEntry !== entry);

export const useGameConfigStore = create<GameConfigState & GameConfigApi>(
    (set, get) => ({
        ...initialState,

        setSelectedMinionTypes: (minionType: minionTypes) =>
            set({
                selectedMinionTypes: setSelectedEntry(
                    get().selectedMinionTypes,
                    minionType
                ),
            }),
        setSelectedTavernTiers: (tavernTier: tavernTiers) =>
            set({
                selectedTavernTiers: setSelectedEntry(
                    get().selectedTavernTiers,
                    tavernTier
                ),
            }),
        removeSelectedMinionType: (minionType: minionTypes) =>
            set({
                selectedMinionTypes: removeSelectedEntry(
                    get().selectedMinionTypes,
                    minionType
                ),
            }),
        removeSelectedTavernTier: (tavernTier: tavernTiers) =>
            set({
                selectedTavernTiers: removeSelectedEntry(
                    get().selectedTavernTiers,
                    tavernTier
                ),
            }),
    })
);

export const setSelectedMinionTypesSelector = ({
    setSelectedMinionTypes,
}: GameConfigApi) => setSelectedMinionTypes;
export const setSelectedTavernTiersSelector = ({
    setSelectedTavernTiers,
}: GameConfigApi) => setSelectedTavernTiers;
export const removeSelectedMinionTypeSelector = ({
    removeSelectedMinionType,
}: GameConfigApi) => removeSelectedMinionType;
export const removeSelectedTavernTierSelector = ({
    removeSelectedTavernTier,
}: GameConfigApi) => removeSelectedTavernTier;

export const selectedMinionTypesSelector = ({
    selectedMinionTypes,
}: GameConfigState) => new Set(selectedMinionTypes);
export const selectedTavernTiersSelector = ({
    selectedTavernTiers,
}: GameConfigState) => new Set(selectedTavernTiers);
