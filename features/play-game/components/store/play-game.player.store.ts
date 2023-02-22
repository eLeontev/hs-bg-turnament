import { create } from 'zustand';
import {
    Card,
    CardId,
} from '../../../../data/minions/battle-cries/minions.battle-cries';
import {
    PlayGamePlayer,
    PlayGamePlayerWithCards,
} from '../../../player/player.models';
import { initPlayGamePlayer } from '../../services/play-game.player.service';

export type PlayGamePlayerState = PlayGamePlayerWithCards & {};

export type PlayGamePlayerStoreApi = {
    initPlayer: (player: PlayGamePlayer) => void;
};

export const initialPlayGamePlayerState: PlayGamePlayerState = {
    ...initPlayGamePlayer({
        playerLogin: '',
        playerIdInGame: '',
        playerKey: '',
        heroIds: [],
    }),
    cards: [],
};

export const usePlayerStore = create<
    PlayGamePlayerState & PlayGamePlayerStoreApi
>((set) => ({
    ...initialPlayGamePlayerState,
    initPlayer: (player: PlayGamePlayer) => set({ ...player }),
}));

export const initPlayerSelector = ({ initPlayer }: PlayGamePlayerStoreApi) =>
    initPlayer;

export const tavernTierSelector = ({ tavernTier }: PlayGamePlayerState) =>
    tavernTier;

export const tavernCardIdsSelector = ({ tavernCardIds }: PlayGamePlayerState) =>
    tavernCardIds;

export const cardSelector =
    (cardId: CardId) =>
    ({ cards }: PlayGamePlayerState) =>
        cards.find((card) => card.cardId === cardId) as unknown as Card;
