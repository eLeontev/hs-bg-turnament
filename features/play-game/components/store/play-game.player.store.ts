import { create } from 'zustand';
import {
    Card,
    CardId,
    Cards,
} from '../../../../data/minions/battle-cries/minions.battle-cries';
import {
    PlayGamePlayer,
    PlayGamePlayerWithCards,
} from '../../../player/player.models';
import { initPlayGamePlayer } from '../../services/play-game.player.service';
import {
    freezeTogglePlayerStateAction,
    playCardPlayerStateAction,
    purchaseCardPlayerStateAction,
    sellCardPlayerStateAction,
} from '../../utils/play-game.player-actions.utils';

export type PlayGamePlayerState = PlayGamePlayerWithCards & {};

export type PlayGamePlayerStoreApi = {
    initPlayer: (player: PlayGamePlayer) => void;
    updateTavernTier: () => void;
    increaseGoldAmount: (price: number) => void;
    decreaseGoldAmount: (price: number) => void;
    updateTavernCards: (cards: Cards) => void;
    purchaseCard: (cardId: CardId) => void;
    sellCard: (cardId: CardId) => void;
    playCard: (cardId: CardId) => void;
    freezeMinions: () => void;
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
    updateTavernTier: () =>
        set((state: PlayGamePlayerState) => ({
            tavernTier: state.tavernTier + 1,
        })),
    decreaseGoldAmount: (price: number) =>
        set((state) => ({ goldAmount: state.goldAmount - price })),
    increaseGoldAmount: (price: number) =>
        set((state) => ({ goldAmount: state.goldAmount + price })),
    updateTavernCards: (cards: Cards) =>
        set((state) => ({
            tavernCardIds: cards.map(({ cardId }: Card) => cardId),
            cards: [
                ...state.cards.filter(
                    ({ cardId }: Card) => !state.tavernCardIds.includes(cardId)
                ),
                ...cards,
            ],
        })),
    purchaseCard: (cardId: CardId) =>
        set((state) => purchaseCardPlayerStateAction(state, cardId)),
    sellCard: (cardId: CardId) =>
        set((state) => sellCardPlayerStateAction(state, cardId)),
    playCard: (cardId: CardId) =>
        set((state) => playCardPlayerStateAction(state, cardId)),
    freezeMinions: () => set(freezeTogglePlayerStateAction),
}));

export const initPlayerSelector = ({ initPlayer }: PlayGamePlayerStoreApi) =>
    initPlayer;

export const updateTavernTierSelector = ({
    updateTavernTier,
}: PlayGamePlayerStoreApi) => updateTavernTier;

export const increaseGoldAmountSelector = ({
    increaseGoldAmount,
}: PlayGamePlayerStoreApi) => increaseGoldAmount;
export const decreaseGoldAmountSelector = ({
    decreaseGoldAmount,
}: PlayGamePlayerStoreApi) => decreaseGoldAmount;

export const updateTavernCardsSelector = ({
    updateTavernCards,
}: PlayGamePlayerStoreApi) => updateTavernCards;
export const purchaseCardSelector = ({
    purchaseCard,
}: PlayGamePlayerStoreApi) => purchaseCard;
export const sellCardSelector = ({ sellCard }: PlayGamePlayerStoreApi) =>
    sellCard;
export const playCardSelector = ({ playCard }: PlayGamePlayerStoreApi) =>
    playCard;
export const freezeMinionsSelector = ({
    freezeMinions,
}: PlayGamePlayerStoreApi) => freezeMinions;

export const tavernTierSelector = ({ tavernTier }: PlayGamePlayerState) =>
    tavernTier;

export const tavernCardIdsSelector = ({ tavernCardIds }: PlayGamePlayerState) =>
    tavernCardIds;
export const handCardIdsSelector = ({ handCardIds }: PlayGamePlayerState) =>
    handCardIds;
export const deskCardIdsSelector = ({ deskCardIds }: PlayGamePlayerState) =>
    deskCardIds;
export const frozenCardIdsSelector = ({ frozenCardIds }: PlayGamePlayerState) =>
    frozenCardIds;

export const cardSelector =
    (cardId: CardId) =>
    ({ cards }: PlayGamePlayerState) =>
        cards.find((card) => card.cardId === cardId) as unknown as Card;

export const goldAmountSelector = ({ goldAmount }: PlayGamePlayerState) =>
    goldAmount;
export const minionsRollPriceSelector = ({
    minionsRollPrice,
}: PlayGamePlayerState) => minionsRollPrice;
