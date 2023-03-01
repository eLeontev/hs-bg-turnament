import { z } from 'zod';
import { create } from 'zustand';

import { playGameGamePlayerDetailsSchema } from '../../schemas/play-game.schemas';

import { PlayerKey } from '../../../../models/common.models';
import { tavernTiers } from '../../models/play-game.tavern.models';

import { getPlayerKey } from '../../../../utils.ts/storage.utils';

export type PlayGamePlayerDetails = z.infer<
    typeof playGameGamePlayerDetailsSchema
>;

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

export const playerTavernTierSelector = ({
    players,
}: PlayGamePlayersDataState): tavernTiers => {
    const playerKey = getPlayerKey();
    if (playerKey && players.get(playerKey)) {
        return players.get(playerKey)?.tavernTier as tavernTiers;
    }

    return tavernTiers['☆☆☆☆☆☆'];
};
