import { minionIds } from '@prisma/client';
import { Minion } from '../../../features/play-game/models/play-game.minion.models';
import { summonedMinions } from '../../minions';

export enum battleCries {
    increseHP = 'increseHP',
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
    [battleCries.increseHP]: number;
    [battleCries.increaseAttack]: number;
    [battleCries.increaseStats]: StatsBuffValues;
    [battleCries.setStats]: StatsBuffValues;
    [battleCries.addWindFury]: never;
    [battleCries.addTaunt]: never;
    [battleCries.addReborn]: never;
    [battleCries.summon]: never;
};

export type CardId = string;

export type Buff<B extends battleCries> = {
    battleCry: B;
    value: CardValues[B];
    source: any;
};
export type Card = {
    cardId: CardId;
    minionId: minionIds;
    buffs: Array<Buff<battleCries>>;
};
export type Cards = Array<Card>;

export type BattleCryHandlerArgs = {
    minion: Minion;
    targetCardId?: CardId;
    tableCards: Cards;
};
export type BattleCryHanlder = (
    battleCryHandlerArgs: BattleCryHandlerArgs
) => void;

export const alleyCatBattleCryHandler = ({
    minion,
    tableCards,
}: BattleCryHandlerArgs) => {
    // TODO
};

export const minionsBattleCries = new Map<minionIds, BattleCryHanlder>([
    [minionIds.alleycat, alleyCatBattleCryHandler],
]);
