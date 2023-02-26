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

import {
    countOfCardPertavernTier,
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
    FreezeMinionsPlayerInput,
    PurchasePlayerInput,
    SellMinionsPlayerInput,
    UpgradeTavernPlayerInput,
} from '../models/play-game.player-actions.models';

import { getExcludedRandom } from '../../../utils.ts/random.utils';
import {
    purchaseCardValidator,
    sellCardValidator,
} from '../validators/play-game.player-actions.validators';
import {
    purchaseCardPlayerStateAction,
    sellCardPlayerStateAction,
} from '../utils/play-game.player-actions.utils';

const noFrozenCardIds: CardIds = [];
export class TavernCardsService {
    async rollTavernMinions(baseInput: PlayGameBaseInput): Promise<Cards> {
        const { player, availableCards } = await getPlayerAndAwailableCards(
            baseInput,
            true
        );
        const { tavernTier, goldAmount, minionsRollPrice, tavernCardIds } =
            player;

        if (minionsRollPrice > goldAmount) {
            throw new Error('Invalid amount of currency');
        }

        const goldAmountAfterCardsUpdate = goldAmount - minionsRollPrice;

        await markCardsAvailableOperation(tavernCardIds);
        return await this.getCardsToPlayer(
            baseInput,
            availableCards,
            tavernTier,
            goldAmountAfterCardsUpdate,
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

        const { tavernCardIds, handCardIds } = purchaseCardPlayerStateAction(
            player,
            cardId
        );

        await addCardToPlayerHandCardsOperation(
            player.playerIdInGame,
            tavernCardIds,
            handCardIds
        );
    }

    async sellCard({
        cardId,
        ...baseInput
    }: SellMinionsPlayerInput): Promise<void> {
        const { player } = await getPlayerAndAwailableCards(baseInput);
        const { goldAmount, minionSellPrice } = player;

        const { deskCardIds } = sellCardPlayerStateAction(player, cardId);

        sellCardValidator(player, cardId);

        await sellPlayerCardOperation(
            baseInput.playerIdInGame,
            deskCardIds,
            goldAmount + minionSellPrice
        );
        await markCardAvailableOperation(cardId);
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
            restGoldAmount
        );
    }

    async freezeMinionsMutation(
        input: FreezeMinionsPlayerInput
    ): Promise<void> {
        const { player } = await getPlayerAndAwailableCards(input);
        const { tavernCardIds, playerIdInGame } = player;

        const frozenCardIds = player.frozenCardIds.length
            ? noFrozenCardIds
            : [...tavernCardIds];

        await updateFrozenPlayerCardsOperation(playerIdInGame, frozenCardIds);
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
