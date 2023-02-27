import {
    CardId,
    CardIds,
} from '../../../data/minions/battle-cries/minions.battle-cries';
import { PlayGamePlayer } from '../../player/player.models';

// TODO: imrove types to pass only required values
// that should imrove performance on FE (to prevent update component on each state change)

export const noFrozenCardIds: CardIds = [];

export const purchaseCardPlayerStateAction = (
    { tavernCardIds, handCardIds, frozenCardIds }: PlayGamePlayer,
    cardId: CardId
): {
    handCardIds: CardIds;
    tavernCardIds: CardIds;
    frozenCardIds: CardIds;
} => ({
    frozenCardIds: frozenCardIds.filter(
        (frozenCardId) => frozenCardId !== cardId
    ),
    handCardIds: [...handCardIds, cardId],
    tavernCardIds: tavernCardIds.filter(
        (tavernCardId) => tavernCardId !== cardId
    ),
});

export const sellCardPlayerStateAction = (
    { deskCardIds }: PlayGamePlayer,
    cardId: CardId
): {
    deskCardIds: CardIds;
} => ({
    deskCardIds: deskCardIds.filter((deskCardId) => deskCardId !== cardId),
});

export const playCardPlayerStateAction = (
    { deskCardIds, handCardIds }: PlayGamePlayer,
    cardId: CardId
): {
    deskCardIds: CardIds;
    handCardIds: CardIds;
} => ({
    deskCardIds: [...deskCardIds, cardId],
    handCardIds: handCardIds.filter((deskCardId) => deskCardId !== cardId),
});

export const freezeTogglePlayerStateAction = ({
    tavernCardIds,
    frozenCardIds,
}: PlayGamePlayer): { frozenCardIds: CardIds } => ({
    frozenCardIds: frozenCardIds.length ? noFrozenCardIds : [...tavernCardIds],
});
