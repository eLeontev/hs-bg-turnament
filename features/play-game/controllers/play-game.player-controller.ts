import { TRCPProps } from '../../../models/trcp.models';
import {
    PlayMinionPlayerInput,
    PurchasePlayerInput,
    RollTavernMinionsPlayerInput,
    SellMinionsPlayerInput,
    UpgradeTavernPlayerInput,
} from '../models/play-game.player-actions.models';
import { playCardService } from '../services/play-game.play-card.service';
import { tavernCardsService } from '../services/play-game.tavern-cards.service';

export class PlayGamePlayerController {
    private playCardService = playCardService;
    private tavernCardsService = tavernCardsService;

    async playMinionMutation({
        input,
    }: TRCPProps<PlayMinionPlayerInput>): Promise<void> {
        await this.playCardService.playMinion(input);
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
    }: TRCPProps<RollTavernMinionsPlayerInput>): Promise<void> {
        await this.tavernCardsService.rollTavernMinions(input);
    }

    async upgradeTavernMutation({
        input,
    }: TRCPProps<UpgradeTavernPlayerInput>): Promise<void> {
        await this.tavernCardsService.upgradeTavern(input);
    }
}

export const playerController = new PlayGamePlayerController();