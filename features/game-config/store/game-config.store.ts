import { minionIds, minionTypes } from '@prisma/client';
import { create } from 'zustand';
import { tavernTiers } from '../../play-game/models/play-game.tavern.models';

export type GameConfigState = {
    selectedMinionTypes: Array<minionTypes>;
    selectedTavernTiers: Array<tavernTiers>;
    tripleMinionIds: Set<minionIds>;
    shouldDisplaySummonedMinions: boolean;
};

export type GameConfigApi = {
    setSelectedMinionTypes: (selectedMinionTypes: Array<minionTypes>) => void;
    setSelectedTavernTiers: (tavernTier: tavernTiers) => void;
    removeSelectedTavernTier: (tavernTier: tavernTiers) => void;
    setTripleMinionIds: (minionId: minionIds) => void;
    removeTripleMinionIds: (minionId: minionIds) => void;
    toggleTavernSummonMinionVisibility: (
        shouldDisplaySummonedMinions: boolean
    ) => void;
};

const initialState: GameConfigState = {
    selectedMinionTypes: [],
    selectedTavernTiers: [],
    tripleMinionIds: new Set(),
    shouldDisplaySummonedMinions: false,
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

        setSelectedMinionTypes: (selectedMinionTypes: Array<minionTypes>) =>
            set({ selectedMinionTypes }),
        setSelectedTavernTiers: (tavernTier: tavernTiers) =>
            set({
                selectedTavernTiers: setSelectedEntry(
                    get().selectedTavernTiers,
                    tavernTier
                ),
            }),

        removeSelectedTavernTier: (tavernTier: tavernTiers) =>
            set({
                selectedTavernTiers: removeSelectedEntry(
                    get().selectedTavernTiers,
                    tavernTier
                ),
            }),
        setTripleMinionIds: (minionId: minionIds) => {
            const tripleMinionIds = get().tripleMinionIds;
            tripleMinionIds.add(minionId);
            set({ tripleMinionIds: new Set(tripleMinionIds) });
        },
        removeTripleMinionIds: (minionId: minionIds) => {
            const tripleMinionIds = get().tripleMinionIds;
            tripleMinionIds.delete(minionId);
            set({ tripleMinionIds: new Set(tripleMinionIds) });
        },
        toggleTavernSummonMinionVisibility: (
            shouldDisplaySummonedMinions: boolean
        ) => set({ shouldDisplaySummonedMinions }),
    })
);

export const setSelectedMinionTypesSelector = ({
    setSelectedMinionTypes,
}: GameConfigApi) => setSelectedMinionTypes;
export const setSelectedTavernTiersSelector = ({
    setSelectedTavernTiers,
}: GameConfigApi) => setSelectedTavernTiers;
export const removeSelectedTavernTierSelector = ({
    removeSelectedTavernTier,
}: GameConfigApi) => removeSelectedTavernTier;
export const setTripleMinionIdsSelector = ({
    setTripleMinionIds,
}: GameConfigApi) => setTripleMinionIds;
export const removeTripleMinionIdsSelector = ({
    removeTripleMinionIds,
}: GameConfigApi) => removeTripleMinionIds;
export const toggleTavernSummonMinionVisibilitySelector = ({
    toggleTavernSummonMinionVisibility,
}: GameConfigApi) => toggleTavernSummonMinionVisibility;

export const selectedMinionTypesSelector = ({
    selectedMinionTypes,
}: GameConfigState) => selectedMinionTypes;
export const selectedMinionTypesSetSelector = ({
    selectedMinionTypes,
}: GameConfigState) => new Set(selectedMinionTypes);
export const selectedTavernTiersSelector = ({
    selectedTavernTiers,
}: GameConfigState) => new Set(selectedTavernTiers);
export const tripleMinionIdsSelector = ({ tripleMinionIds }: GameConfigState) =>
    new Set(tripleMinionIds);
export const shouldDisplaySummonedMinionsSelector = ({
    shouldDisplaySummonedMinions,
}: GameConfigState) => shouldDisplaySummonedMinions;
