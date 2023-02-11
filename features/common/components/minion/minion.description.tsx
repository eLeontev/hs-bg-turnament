import Image from 'next/image';

import { Box, Text, createStyles, MantineTheme, Space } from '@mantine/core';

import { minionTypes } from '@prisma/client';

import { MinionTrans } from '../../../../i18n/i18n.trans.component';

import { minionTypesI18nKeys } from '../../../../i18n/i18n.constants';

import { Minion } from '../../../play-game/models/play-game.minion.models';
import { minionI18nKeys } from '../../../../i18n/enums/i18n.minion.enums';

const useMinionPowerDescriptionStyles = createStyles<string, boolean>(
    (theme: MantineTheme, isTriple: boolean) => ({
        minionPowerDescriptionContainer: {
            position: 'absolute',
            width: 147,
            height: 91,
            left: 30,
            top: 182,
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
            left: '50%',
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
            bottom: '0',
            left: '50%',
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

export type MinionDescriptionProps = {
    minion: Minion;
    minionType: minionTypes;
};
export const MinionDescription = ({
    minionType,
    minion,
}: MinionDescriptionProps) => {
    const { powerDescription, tripleCardPowerDescription, isTriple } = minion;

    const { classes } = useMinionPowerDescriptionStyles(isTriple);
    const nameBackgroundImageUrl = isTriple
        ? '/minion-power-description.triple.png'
        : '/minion-power-description.regular.png';

    const powerDescriptionI18nKey = isTriple
        ? tripleCardPowerDescription
        : powerDescription;

    return (
        <Box className={classes.minionPowerDescriptionContainer}>
            <Image
                className={classes.minionPowerDescriptionImage}
                priority
                width={147}
                height={90}
                src={nameBackgroundImageUrl}
                alt=""
            ></Image>
            <Text className={classes.minionPowerDescription}>
                <DescriptionPrefix minion={minion}></DescriptionPrefix>
                <MinionTrans i18nKey={powerDescriptionI18nKey}></MinionTrans>
            </Text>
            <Text className={classes.minionType}>
                <MinionTrans
                    i18nKey={minionTypesI18nKeys[minionType]}
                ></MinionTrans>
            </Text>
        </Box>
    );
};
