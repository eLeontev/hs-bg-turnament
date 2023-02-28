import { Card as CardFromDB } from '@prisma/client';

import { getPlayerAndAwailableCards } from './play-game.server.service';

import {
    markCardAvailableOperation,
    markCardsAvailableOperation,
    markCardsInUseOperation,
} from '../operations/play-game.operations';
import {
    addCardToPlayerHandCardsOperation,
    sellPlayerCardOperation,
    updateFrozenPlayerCardsOperation,
    updatePlayerCardsOperation,
    upgradePlayerTavernTierOperation,
} from '../operations/play-game.player.operations';

import { countOfCardPertavernTier } from '../../../constants/play-game.config.constants';

import {
    CardId,
    CardIds,
    Cards,
} from '../../../data/minions/battle-cries/minions.battle-cries';
import { PlayGameBaseInput } from '../models/play-game.models';
import { tavernTiers } from '../models/play-game.tavern.models';
import {
    FreezeMinionsPlayerInput,
    PurchasePlayerInput,
    SellMinionsPlayerInput,
    UpgradeTavernPlayerInput,
} from '../models/play-game.player-actions.models';

import { getExcludedRandom } from '../../../utils.ts/random.utils';
import {
    purchaseCardValidator,
    rollMinionsValidator,
    sellCardValidator,
    tavernTierUpgradeValidator,
} from '../validators/play-game.player-actions.validators';
import {
    freezeTogglePlayerStateAction,
    noFrozenCardIds,
    purchaseCardPlayerStateAction,
    rollMinionsPlayerStateAction,
    sellCardPlayerStateAction,
    tavernTierUpgradePlayerStateAction,
} from '../utils/play-game.player-actions.utils';

export class TavernCardsService {
    async rollTavernMinions(baseInput: PlayGameBaseInput): Promise<Cards> {
        const { player, availableCards } = await getPlayerAndAwailableCards(
            baseInput,
            true
        );
        const { tavernTier, tavernCardIds } = player;

        rollMinionsValidator(player);

        const { goldAmount } = rollMinionsPlayerStateAction(player);

        await markCardsAvailableOperation(tavernCardIds);
        return await this.getCardsToPlayer(
            baseInput,
            availableCards,
            tavernTier,
            goldAmount,
            noFrozenCardIds
        );
    }

    async assignCardsOnPhaseInit(baseInput: PlayGameBaseInput): Promise<Cards> {
        const {
            player: { tavernTier, goldAmount, tavernCardIds, frozenCardIds },
            availableCards,
        } = await getPlayerAndAwailableCards(baseInput, true);

        const frozenCardIdsSet = new Set(frozenCardIds);
        const availableTavernCardsCards = tavernCardIds.filter(
            (cardId) => !frozenCardIdsSet.has(cardId)
        );

        await markCardsAvailableOperation(availableTavernCardsCards);
        return await this.getCardsToPlayer(
            baseInput,
            availableCards,
            tavernTier,
            goldAmount,
            frozenCardIds
        );
    }

    async purchaseCard({
        cardId,
        ...baseInput
    }: PurchasePlayerInput): Promise<void> {
        const { player } = await getPlayerAndAwailableCards(baseInput);

        purchaseCardValidator(player, cardId);

        const { tavernCardIds, handCardIds, frozenCardIds, goldAmount } =
            purchaseCardPlayerStateAction(player, cardId);

        await addCardToPlayerHandCardsOperation(
            player.playerIdInGame,
            tavernCardIds,
            handCardIds,
            frozenCardIds,
            goldAmount
        );
    }

    async sellCard({
        cardId,
        ...baseInput
    }: SellMinionsPlayerInput): Promise<void> {
        const { player } = await getPlayerAndAwailableCards(baseInput);

        sellCardValidator(player, cardId);

        const { deskCardIds, goldAmount } = sellCardPlayerStateAction(
            player,
            cardId
        );

        await sellPlayerCardOperation(
            baseInput.playerIdInGame,
            deskCardIds,
            goldAmount
        );
        await markCardAvailableOperation(cardId);
    }

    async upgradeTavern(input: UpgradeTavernPlayerInput): Promise<void> {
        const { player } = await getPlayerAndAwailableCards(input);

        tavernTierUpgradeValidator(player);

        const { goldAmount, tavernTier } =
            tavernTierUpgradePlayerStateAction(player);

        await upgradePlayerTavernTierOperation(
            input.playerIdInGame,
            tavernTier,
            goldAmount
        );
    }

    async freezeMinionsMutation(
        input: FreezeMinionsPlayerInput
    ): Promise<void> {
        const { player } = await getPlayerAndAwailableCards(input);

        const { frozenCardIds } = freezeTogglePlayerStateAction(player);

        await updateFrozenPlayerCardsOperation(
            player.playerIdInGame,
            frozenCardIds
        );
    }

    private async getCardsToPlayer(
        baseInput: PlayGameBaseInput,
        availableCards: CardFromDB[],
        tavernTier: tavernTiers,
        goldAmount: number,
        frozenCardIds: CardIds
    ): Promise<Cards> {
        const cardsForPlayer = this.formCards(
            availableCards,
            tavernTier,
            frozenCardIds.length
        );

        const playerTavernCardIds = [
            ...frozenCardIds,
            ...cardsForPlayer.map(({ cardId }): CardId => cardId),
        ];

        await this.updateAvailableCards(playerTavernCardIds);
        await this.updatePlayerCardsData(
            baseInput,
            playerTavernCardIds,
            goldAmount
        );

        return cardsForPlayer;
    }

    private formCards(
        availableCards: CardFromDB[],
        playerTavernTier: tavernTiers,
        countOfFrozenCards: number
    ) {
        let availableCardsForPlayer = availableCards.filter(
            ({ tavernTier, isInUse }: CardFromDB) =>
                playerTavernTier >= tavernTier && !isInUse
        );

        let countOfCards =
            countOfCardPertavernTier[playerTavernTier] - countOfFrozenCards;
        const cardsForPlayer: Cards = [];
        const cardsForPlayerSet = new Set();

        let randomCardForPlayer: CardFromDB;

        while (countOfCards) {
            [randomCardForPlayer, availableCardsForPlayer] = getExcludedRandom(
                availableCardsForPlayer
            );

            // TODO: limitation to prevent cases where we have not enough cards for players
            if (randomCardForPlayer) {
                cardsForPlayer.push({ ...randomCardForPlayer, buffs: [] });
                cardsForPlayerSet.add(randomCardForPlayer.cardId);
            }

            countOfCards = countOfCards - 1;
        }

        return cardsForPlayer;
    }

    private async updatePlayerCardsData(
        input: PlayGameBaseInput,
        playerTavernCardIds: CardIds,
        goldAmount: number
    ): Promise<void> {
        await updatePlayerCardsOperation(
            input.playerIdInGame,
            playerTavernCardIds,
            goldAmount
        );
    }

    private async updateAvailableCards(
        playerTavernCardIds: CardIds
    ): Promise<void> {
        await markCardsInUseOperation(playerTavernCardIds);
    }
}

export const tavernCardsService = new TavernCardsService();
