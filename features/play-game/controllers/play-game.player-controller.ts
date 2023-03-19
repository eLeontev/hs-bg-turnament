import { Cards } from '../../../data/minions/battle-cries/minions.battle-cries';
import { TRCPProps } from '../../../models/trcp.models';
import { PlayGamePlayerWithCards } from '../../player/player.models';
import { PlayGameBaseInput } from '../models/play-game.models';
import {
    FreezeMinionsPlayerInput,
    PlayMinionPlayerInput,
    PurchasePlayerInput,
    RearrangeCardsOrderPlayerInput,
    RollTavernMinionsPlayerInput,
    SellMinionsPlayerInput,
    UpgradeTavernPlayerInput,
} from '../models/play-game.player-actions.models';
import { playCardService } from '../services/play-game.play-card.service';
import { getPlayGamePlayer } from '../services/play-game.server.service';
import { tavernCardsService } from '../services/play-game.tavern-cards.service';
import { orderService } from '../services/play-game.order.service';

export class PlayGamePlayerController {
    private playCardService = playCardService;
    private tavernCardsService = tavernCardsService;
    private orderService = orderService;

    async playerDataQuery({
        input,
    }: TRCPProps<PlayGameBaseInput>): Promise<PlayGamePlayerWithCards> {
        return getPlayGamePlayer(input);
    }

    async playMinionMutation({
        input,
    }: TRCPProps<PlayMinionPlayerInput>): Promise<void> {
        await this.playCardService.playCard(input);
    }

    async purchaseMinionMutation({
        input,
    }: TRCPProps<PurchasePlayerInput>): Promise<void> {
        await this.tavernCardsService.purchaseCard(input);
    }

    async sellMinionMutation({
        input,
    }: TRCPProps<SellMinionsPlayerInput>): Promise<void> {
        await this.tavernCardsService.sellCard(input);
    }

    async rollTavernMinionsMutation({
        input,
    }: TRCPProps<RollTavernMinionsPlayerInput>): Promise<Cards> {
        return await this.tavernCardsService.rollTavernMinions(input);
    }

    async upgradeTavernMutation({
        input,
    }: TRCPProps<UpgradeTavernPlayerInput>): Promise<void> {
        await this.tavernCardsService.upgradeTavern(input);
    }

    async freezeMinionsMutation({
        input,
    }: TRCPProps<FreezeMinionsPlayerInput>): Promise<void> {
        await this.tavernCardsService.freezeMinionsMutation(input);
    }

    async rearrangeCardsOrderMutation({
        input,
    }: TRCPProps<RearrangeCardsOrderPlayerInput>): Promise<void> {
        await this.orderService.rearrangeCardsOrderMutation(input);
    }
}

export const playerController = new PlayGamePlayerController();
