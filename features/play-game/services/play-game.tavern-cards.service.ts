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
    updatePlayerCardsOperation,
    upgradePlayerTavernTierOperation,
} from '../operations/play-game.player.operations';

import {
    countOfCardPertavernTier,
    defaultCountOfGoldForSell,
    initialTavernTierUpgradePrice,
} from '../../../constants/play-game.config.constants';

import {
    CardId,
    CardIds,
    Cards,
} from '../../../data/minions/battle-cries/minions.battle-cries';
import { PlayGameBaseInput } from '../models/play-game.models';
import { tavernTiers } from '../models/play-game.tavern.models';
import {
    PurchasePlayerInput,
    SellMinionsPlayerInput,
    UpgradeTavernPlayerInput,
} from '../models/play-game.player-actions.models';

import { getExcludedRandom } from '../../../utils.ts/random.utils';

export class TavernCardsService {
    async rollTavernMinions(baseInput: PlayGameBaseInput): Promise<Cards> {
        const { player, availableCards } = await getPlayerAndAwailableCards(
            baseInput,
            true
        );
        const { tavernTier, goldAmount, tavernUpdatePrice, tavernCardIds } =
            player;

        if (tavernUpdatePrice > goldAmount) {
            throw new Error('Invalid amount of currency');
        }

        const goldAmountAfterCardsUpdate = goldAmount - tavernUpdatePrice;

        await markCardsAvailableOperation(tavernCardIds);
        return await this.getCardsToPlayer(
            baseInput,
            availableCards,
            tavernTier,
            goldAmountAfterCardsUpdate
        );
    }

    async assignCardsOnPhaseInit(baseInput: PlayGameBaseInput): Promise<Cards> {
        const {
            player: { tavernTier, goldAmount, tavernCardIds },
            availableCards,
        } = await getPlayerAndAwailableCards(baseInput, true);

        await markCardsAvailableOperation(tavernCardIds);
        return await this.getCardsToPlayer(
            baseInput,
            availableCards,
            tavernTier,
            goldAmount
        );
    }

    async purchaseCard({
        cardId,
        ...baseInput
    }: PurchasePlayerInput): Promise<void> {
        const {
            player: {
                playerIdInGame,
                handCardIds,
                tavernCardIds,
                goldAmount,
                cardPurchasePrice,
            },
        } = await getPlayerAndAwailableCards(baseInput);

        if (!tavernCardIds.includes(cardId)) {
            throw new Error(
                'the card you are gonna purchase does not exist in your tavern cards collection'
            );
        }

        if (cardPurchasePrice > goldAmount) {
            throw new Error(
                'you do not have enough currency to purchase the card'
            );
        }

        const handCardsToUpdate = [...handCardIds, cardId];
        const tavernCardsToUpdate = tavernCardIds.filter(
            (tavernCardId) => tavernCardId !== cardId
        );

        await addCardToPlayerHandCardsOperation(
            playerIdInGame,
            tavernCardsToUpdate,
            handCardsToUpdate
        );
    }

    async sellCard(sellCardInput: SellMinionsPlayerInput): Promise<void> {
        const {
            player: { playerIdInGame, deskCardIds, goldAmount },
        } = await getPlayerAndAwailableCards(sellCardInput);

        const deskCardIdsWithotSoldCardId = deskCardIds.filter(
            (cardId) => cardId !== sellCardInput.cardId
        );

        if (deskCardIdsWithotSoldCardId.length === deskCardIds.length) {
            throw new Error(
                'the card you are gonna sell does not exist in your cards collection'
            );
        }

        await sellPlayerCardOperation(
            playerIdInGame,
            deskCardIdsWithotSoldCardId,
            goldAmount + defaultCountOfGoldForSell
        );
        await markCardAvailableOperation(sellCardInput.cardId);
    }

    async upgradeTavern(input: UpgradeTavernPlayerInput): Promise<void> {
        const {
            player: { tavernTier, goldAmount },
        } = await getPlayerAndAwailableCards(input);

        if (tavernTier === tavernTiers['☆☆☆☆☆☆']) {
            throw new Error('you tavern is already at max level');
        }

        // TODO: add logic to calculate tavern price based on round + reducing
        if (initialTavernTierUpgradePrice > goldAmount) {
            throw new Error(
                'you do not have enough currency to upgrade your tavern'
            );
        }

        const restGoldAmount = goldAmount - initialTavernTierUpgradePrice;

        await upgradePlayerTavernTierOperation(
            input.playerIdInGame,
            tavernTier + 1,
            goldAmount - restGoldAmount
        );
    }

    private async getCardsToPlayer(
        baseInput: PlayGameBaseInput,
        availableCards: CardFromDB[],
        tavernTier: tavernTiers,
        goldAmount: number
    ): Promise<Cards> {
        const cardsForPlayer = this.formCards(availableCards, tavernTier);
        const playerTavernCardIds = cardsForPlayer.map(
            ({ cardId }): CardId => cardId
        );

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
        playerTavernTier: tavernTiers
    ) {
        let availableCardsForPlayer = availableCards.filter(
            ({ tavernTier, isInUse }: CardFromDB) =>
                playerTavernTier >= tavernTier && !isInUse
        );

        let countOfCards = countOfCardPertavernTier[playerTavernTier];
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
