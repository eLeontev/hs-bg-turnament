import { minionIds, minionTypes } from '@prisma/client';

import { Minion } from '../../../features/play-game/models/play-game.minion.models';
import { tavernTiers } from '../../../features/play-game/models/play-game.tavern.models';

export enum battleCries {
    increaseHP = 'increaseHP',
    increaseAttack = 'increaseAttack',
    increaseStats = 'increaseStats',
    setStats = 'setStats',
    addWindFury = 'addWindFury',
    addTaunt = 'addTaunt',
    addReborn = 'addReborn',
    summon = 'summon',
}

export type StatsBuffValues = { hp: number; attack: number };
export type CardValues = {
    [battleCries.increaseHP]: number;
    [battleCries.increaseAttack]: number;
    [battleCries.increaseStats]: StatsBuffValues;
    [battleCries.setStats]: StatsBuffValues;
    [battleCries.addWindFury]: never;
    [battleCries.addTaunt]: never;
    [battleCries.addReborn]: never;
    [battleCries.summon]: never;
};

export type CardId = string;
export type CardIds = Array<string>;

export type Buff<B extends battleCries> = {
    battleCry: B;
    value: CardValues[B];
    source: any;
};
export type BaseCard = {
    cardId: CardId;
    minionId: minionIds;
    minionTypes: Array<minionTypes>;
    tavernTier: tavernTiers;
};

export type Card = BaseCard & {
    buffs: Array<Buff<battleCries>>;
};

export type BaseCards = Array<BaseCard>;
export type Cards = Array<Card>;

export type BattleCryHandlerArgs = {
    minion: Minion;
    targetCardId?: CardId;
    tableCards: Cards;
};
export type BattleCryHandler = (
    battleCryHandlerArgs: BattleCryHandlerArgs
) => void;

export const alleyCatBattleCryHandler = ({
    minion,
    tableCards,
}: BattleCryHandlerArgs) => {
    // TODO
};

export const minionsBattleCries = new Map<minionIds, BattleCryHandler>([
    [minionIds.alleycat, alleyCatBattleCryHandler],
]);
