import { minionIds, minionTypes } from '@prisma/client';
import { create } from 'zustand';
import { tavernTiers } from '../../play-game/models/play-game.tavern.models';

export type GameConfigState = {
    selectedMinionTypes: Array<minionTypes>;
    selectedTavernTiers: Array<tavernTiers>;
    tripleMinionIds: Set<minionIds>;
};

export type GameConfigApi = {
    setSelectedMinionTypes: (minionType: minionTypes) => void;
    setSelectedTavernTiers: (tavernTier: tavernTiers) => void;
    removeSelectedMinionType: (minionType: minionTypes) => void;
    removeSelectedTavernTier: (tavernTier: tavernTiers) => void;
    setTripleMinionIds: (minionId: minionIds) => void;
    removeTripleMinionIds: (minionId: minionIds) => void;
};

const initialState: GameConfigState = {
    selectedMinionTypes: [],
    selectedTavernTiers: [],
    tripleMinionIds: new Set(),
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
export const setTripleMinionIdsSelector = ({
    setTripleMinionIds,
}: GameConfigApi) => setTripleMinionIds;
export const removeTripleMinionIdsSelector = ({
    removeTripleMinionIds,
}: GameConfigApi) => removeTripleMinionIds;

export const selectedMinionTypesSelector = ({
    selectedMinionTypes,
}: GameConfigState) => new Set(selectedMinionTypes);
export const selectedTavernTiersSelector = ({
    selectedTavernTiers,
}: GameConfigState) => new Set(selectedTavernTiers);
export const tripleMinionIdsSelector = ({ tripleMinionIds }: GameConfigState) =>
    new Set(tripleMinionIds);
