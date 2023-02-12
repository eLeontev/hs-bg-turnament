import { Minion } from '../../../play-game/models/play-game.minion.models';

export type MinionAbilitiesProps = { minion: Minion };
export const MinionAbilities = ({ minion }: MinionAbilitiesProps) => {
    const {
        hasBattleCry,
        hasDeathRattle,
        hasDivineShield,
        hasReborn,
        hasWindFury,
        hasUniqueBehavior,
    } = minion;

    return null;
};
