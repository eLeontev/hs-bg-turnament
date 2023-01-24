import { z } from 'zod';
import { create } from 'zustand';

import { playGamePlayerDetailsSchema } from '../../schemas/play-game.schemas';

import { PlayerKey } from '../../../../models/common.models';

export type PlayGamePlayerDetails = z.infer<typeof playGamePlayerDetailsSchema>;

export type PlayGameStorePlayers = Map<PlayerKey, PlayGamePlayerDetails>;
export type PlayGamePlayersDataState = {
    players: PlayGameStorePlayers;
    onlinePlayers: Set<PlayerKey>;
};

export type PlayGamePlayersStoreApi = {
    setPlayers: (players: PlayGamePlayersDataState['players']) => void;
    setOnlinePlayers: (
        players: PlayGamePlayersDataState['onlinePlayers']
    ) => void;
};

export type PlayGameState = PlayGamePlayersDataState & PlayGamePlayersStoreApi;
export const usePlayersStore = create<
    PlayGamePlayersDataState & PlayGamePlayersStoreApi
>((set) => ({
    players: new Map<PlayerKey, PlayGamePlayerDetails>(),
    onlinePlayers: new Set(),
    setPlayers: (players: PlayGameStorePlayers) => set({ players }),
    setOnlinePlayers: (
        onlinePlayers: PlayGamePlayersDataState['onlinePlayers']
    ) => set({ onlinePlayers }),
}));

export const setOnlinePlayersSelector = ({
    setOnlinePlayers,
}: PlayGamePlayersStoreApi) => setOnlinePlayers;
export const setPlayersSelector = ({ setPlayers }: PlayGamePlayersStoreApi) =>
    setPlayers;

export const onlinePlayersSelector = ({
    onlinePlayers,
}: PlayGamePlayersDataState) => onlinePlayers;
export const playersSelector = ({ players }: PlayGamePlayersDataState) =>
    players;