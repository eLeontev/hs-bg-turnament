import { create } from 'zustand';

export type WaitingPlayGameState = {
    isWaitingForPlayGame: boolean;
};

export type WaitingPlayGameApi = {
    displayOverlay: () => void;
    hideOverlay: () => void;
};

export const useWaitingPlayGameStore = create<
    WaitingPlayGameState & WaitingPlayGameApi
>((set) => ({
    isWaitingForPlayGame: false,
    displayOverlay: () => set({ isWaitingForPlayGame: true }),
    hideOverlay: () => set({ isWaitingForPlayGame: false }),
}));

export const displayOverlaySelector = ({
    displayOverlay,
}: WaitingPlayGameApi) => displayOverlay;
export const hideOverlaySelector = ({ hideOverlay }: WaitingPlayGameApi) =>
    hideOverlay;
export const isWaitingForPlayGameSelector = ({
    isWaitingForPlayGame,
}: WaitingPlayGameState) => isWaitingForPlayGame;
