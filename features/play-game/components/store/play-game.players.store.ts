import { z } from 'zod';
import { create } from 'zustand';

import { playGamePlayerDetailsSchema } from '../../schemas/play-game.schemas';

import { PlayerKey } from '../../../../models/common.models';

export type PlayGamePlayerDetails = z.infer<typeof playGamePlayerDetailsSchema>;

export type PlayGamePlayersState = {
    players: Map<PlayerKey, PlayGamePlayerDetails>;
    onlinePlayers: Set<PlayerKey>;
};

export type PlayGamePlayersStoreApi = {
    setPlayers: (players: PlayGamePlayersState['players']) => void;
    setOnlinePlayers: (players: PlayGamePlayersState['onlinePlayers']) => void;
};

export const usePlayersStore = create<
    PlayGamePlayersState & PlayGamePlayersStoreApi
>((set) => ({
    players: new Map<PlayerKey, PlayGamePlayerDetails>(),
    onlinePlayers: new Set(),
    setPlayers: (players: PlayGamePlayersState['players']) => set({ players }),
    setOnlinePlayers: (onlinePlayers: PlayGamePlayersState['onlinePlayers']) =>
        set({ onlinePlayers }),
}));

export const setOnlinePlayersSelector = ({
    setOnlinePlayers,
}: PlayGamePlayersStoreApi) => setOnlinePlayers;
export const setPlayersSelector = ({ setPlayers }: PlayGamePlayersStoreApi) =>
    setPlayers;

export const playersSelector = ({ players }: PlayGamePlayersState) => players;
