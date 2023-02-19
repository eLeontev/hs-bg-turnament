import { create } from 'zustand';
import { PlayGamePlayer } from '../../../player/player.models';
import { initPlayGamePlayer } from '../../services/play-game.player.service';

export type PlayGamePlayerState = PlayGamePlayer & {};

export type PlayGamePlayerStoreApi = {
    initPlayer: (player: PlayGamePlayer) => void;
};

export const initialPlayGamePlayerState: PlayGamePlayerState =
    initPlayGamePlayer({
        playerLogin: '',
        playerIdInGame: '',
        playerKey: '',
        heroIds: [],
    });

export const usePlayerStore = create<
    PlayGamePlayerState & PlayGamePlayerStoreApi
>((set) => ({
    ...initialPlayGamePlayerState,
    initPlayer: (player: PlayGamePlayer) => set({ ...player }),
}));

export const initPlayerSelector = ({ initPlayer }: PlayGamePlayerStoreApi) =>
    initPlayer;
