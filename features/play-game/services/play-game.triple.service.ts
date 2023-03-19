import { CardId } from '../../../data/minions/battle-cries/minions.battle-cries';
import { PlayGamePlayer } from '../../player/player.models';
import {
    createTripleCardOperation,
    getCardOperation,
    selectedCardsOperation,
} from '../operations/play-game.operations';
import { getHash } from '../../../utils.ts/hash-server.utils';
import { Card } from '@prisma/client';
import { playPlayerCardOperation } from '../operations/play-game.player.operations';

export type TripleCardTemplate = Omit<Card, 'id'>;

export class PlayGameTripleService {
    async tripleCard(
        {
            deskCardIds,
            handCardIds,
            countOfCardsToTriple,
            playerIdInGame,
        }: PlayGamePlayer,
        cardId: CardId
    ): Promise<TripleCardTemplate | void> {
        const card = await getCardOperation(cardId);
        const { minionId } = card;

        const playerCards = await selectedCardsOperation([
            ...deskCardIds,
            ...handCardIds,
        ]);

        const cardsToTriple: Array<Card> = [card];
        playerCards.forEach((card: Card): void => {
            if (card.minionId === minionId) {
                cardsToTriple.push(card);
            }
        });

        if (cardsToTriple.length === countOfCardsToTriple) {
            const tripleCard = await this.formTripleCard(cardsToTriple);
            const { fromCardIds } = tripleCard;

            const handCardIdsAfterTriple = [
                ...handCardIds.filter((cardId: CardId) =>
                    fromCardIds.includes(cardId)
                ),
                cardId,
            ];

            const deskCardIdsAfterTriple = deskCardIds.filter((cardId) =>
                fromCardIds.includes(cardId)
            );

            await createTripleCardOperation(tripleCard);
            await playPlayerCardOperation(
                playerIdInGame,
                handCardIdsAfterTriple,
                deskCardIdsAfterTriple
            );

            return tripleCard;
        }
    }

    private async formTripleCard([thirdCard, ...existingCards]: Array<Card>) {
        const cardId = await getHash(String(Math.random()));
        const tripleCardTemplate = this.getCardTemplate(thirdCard, cardId);

        return existingCards.reduce(
            (template: TripleCardTemplate, card: Card): TripleCardTemplate => ({
                ...template,
                baseHP: template.baseHP + card.baseHP,
                baseAttack: template.baseAttack + card.baseAttack,
                hp: template.hp + card.hp - card.baseHP,
                attack: template.attack + card.attack - card.baseAttack,
                isTriple: template.isTriple || card.isTriple,
                isTaunt: template.isTaunt || card.isTriple,
                hasWindFury: template.hasWindFury || card.hasWindFury,
                hasReborn: template.hasReborn || card.hasReborn,
                hasDivineShield:
                    template.hasDivineShield || card.hasDivineShield,
                hasDeathRattle: template.hasDeathRattle || card.hasDeathRattle,
                fromCardIds: [...template.fromCardIds, card.cardId],
            }),
            tripleCardTemplate
        );
    }

    private getCardTemplate = (
        {
            minionId,
            minionTypes,
            playGameGameId,
            tavernTier,
            baseHP,
            baseAttack,
            hp,
            attack,
            ...card
        }: Card,
        cardId: CardId
    ): TripleCardTemplate => ({
        cardId,
        minionId,
        minionTypes,
        tavernTier,
        playGameGameId,
        isInUse: true,
        baseHP: 0,
        baseAttack: 0,
        hp: hp - baseHP,
        attack: attack - baseAttack,
        isTriple: true,
        isTaunt: false,
        hasWindFury: false,
        hasReborn: false,
        hasDivineShield: false,
        hasDeathRattle: false,
        fromCardIds: [card.cardId],
    });
}

export const tripleService = new PlayGameTripleService();
