import Image from 'next/image';

import { Box, Text, createStyles, MantineTheme, Space } from '@mantine/core';

import {
    playerTavernTierSelector,
    usePlayersStore,
} from '../../../play-game/components/store/play-game.players.store';

import { MinionTrans } from '../../../../i18n/i18n.trans.component';

import { useI18nMinionTranslate } from '../../../../i18n/i18n.hooks';

import { minionTypesI18nKeys } from '../../../../i18n/i18n.constants';

import { minionI18nKeys } from '../../../../i18n/enums/i18n.minion.enums';

import { Minion } from '../../../play-game/models/play-game.minion.models';

import { tavernTiers } from '../../../play-game/models/play-game.tavern.models';

import { minionsWithSummonMap } from '../../../../data/summoned-minions';
import { summonedMinions } from '../../../../data/minions';

const useMinionPowerDescriptionStyles = createStyles<
    string,
    MinionDescriptionStyleProps
>(
    (
        theme: MantineTheme,
        { isTriple, isSummoned }: MinionDescriptionStyleProps
    ) => ({
        minionPowerDescriptionContainer: {
            position: 'absolute',
            width: 147,
            height: 91,
            left: isSummoned ? 45 : 30,
            top: isSummoned ? 178 : 182,
        },
        minionPowerDescriptionImage: {
            position: 'absolute',
            left: 0,
            top: 0,
        },
        minionPowerDescription: {
            color: isTriple ? theme.colors.gray[3] : theme.colors.dark[7],
            fontFamily: 'Roboto',
            fontSize: 12,
            letterSpacing: -1,
            lineHeight: 1,
            position: 'absolute',
            top: '40%',
            left: isSummoned ? '44%' : '50%',
            transform: 'translate(-50%, -50%)',
            width: '85%',
            textAlign: 'center',
            zIndex: 1,
        },
        minionType: {
            color: theme.colors.gray[3],
            fontFamily: 'Rubik',
            fontWeight: 600,
            fontSize: 13,
            lineHeight: 1,
            position: 'absolute',
            bottom: isSummoned ? '3%' : '0',
            left: isSummoned ? '46%' : '50%',
            transform: 'translate(-50%, -50%)',
            width: '85%',
            textAlign: 'center',
            textShadow: '0 0 4px black',
        },
    })
);

type DescriptionPrefixProps = { minion: Minion };
const DescriptionPrefix = ({ minion }: DescriptionPrefixProps) => {
    const { hasBattleCry, hasDeathRattle } = minion;
    const i18nKey = hasBattleCry
        ? minionI18nKeys.battlecry
        : hasDeathRattle
        ? minionI18nKeys.deathrattle
        : null;

    return i18nKey ? (
        <Box>
            <Text fw="700">
                <MinionTrans i18nKey={i18nKey}></MinionTrans>
            </Text>
            <Space w="sm"></Space>
        </Box>
    ) : null;
};

const getDescription = (
    t: (i18nKey: minionI18nKeys) => string,
    minion: Minion,
    playerTavernTier: tavernTiers
): string => {
    const { isTriple, tripleCardPowerDescription, powerDescription, minionId } =
        minion;
    const powerDescriptionI18nKey = isTriple
        ? tripleCardPowerDescription
        : powerDescription;

    let powerDesciprion = t(powerDescriptionI18nKey);

    const getSummonedMinionDetails = minionsWithSummonMap.get(minionId);

    if (getSummonedMinionDetails) {
        const summonedMinionsFromAbility = getSummonedMinionDetails(
            minion,
            playerTavernTier
        );
        powerDesciprion = powerDesciprion.replace(
            '$(count)',
            `${summonedMinionsFromAbility.length}`
        );

        const [{ minionId, minionType, tavernTier }] =
            summonedMinionsFromAbility;
        const summonedMinion =
            summonedMinions[tavernTier][minionType].get(minionId);

        if (summonedMinion) {
            const {
                attackPower,
                countOfHitPoints,
                tripleAttackPower,
                tripleCountOfHitPoints,
            } = summonedMinion;
            const hp = isTriple ? tripleCountOfHitPoints : countOfHitPoints;
            const attack = isTriple ? tripleAttackPower : attackPower;

            return powerDesciprion.replace('$(attack/hp)', `+${attack}/+${hp}`);
        }
    }
    return powerDesciprion;
};

type MinionDescriptionStyleProps = {
    isTriple: boolean;
    isSummoned: boolean;
};

export type MinionDescriptionProps = MinionDescriptionStyleProps & {
    minion: Minion;
};
export const MinionDescription = ({
    isSummoned,
    isTriple,
    minion,
}: MinionDescriptionProps) => {
    const {
        types: [minionType],
    } = minion;

    const t = useI18nMinionTranslate();
    const { classes } = useMinionPowerDescriptionStyles({
        isTriple,
        isSummoned,
    });
    const playerTavernTier = usePlayersStore(playerTavernTierSelector);

    const nameBackgroundImageUrl = isTriple
        ? '/minion-power-description.triple.png'
        : '/minion-power-description.regular.png';

    const description = getDescription(t, minion, playerTavernTier);

    return (
        <Box className={classes.minionPowerDescriptionContainer}>
            <Image
                className={classes.minionPowerDescriptionImage}
                priority
                width={isSummoned ? 132 : 147}
                height={isSummoned ? 87 : 90}
                src={nameBackgroundImageUrl}
                alt=""
            ></Image>
            <Text className={classes.minionPowerDescription}>
                <DescriptionPrefix minion={minion}></DescriptionPrefix>
                {description}
            </Text>
            <Text className={classes.minionType}>
                <MinionTrans
                    i18nKey={minionTypesI18nKeys[minionType]}
                ></MinionTrans>
            </Text>
        </Box>
    );
};
