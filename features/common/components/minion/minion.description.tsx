import Image from 'next/image';

import { Box, Text, createStyles, MantineTheme } from '@mantine/core';

import { minionTypes } from '@prisma/client';

import { MinionTrans } from '../../../../i18n/i18n.trans.component';

import { minionTypesI18nKeys } from '../../../../i18n/i18n.constants';

import { Minion } from '../../../play-game/models/play-game.minion.models';

const useMinionPowerDescriptionStyles = createStyles<string>(
    (theme: MantineTheme) => ({
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
            color: theme.colors.dark[7],
            fontFamily: 'Rubik',
            fontSize: 12,
            letterSpacing: -1.1,
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

export type MinionDescriptionProps = {
    minion: Minion;
    minionType: minionTypes;
};
export const MinionDescription = ({
    minionType,
    minion: { powerDescription, tripleCardPowerDescription, isTriple },
}: MinionDescriptionProps) => {
    const { classes } = useMinionPowerDescriptionStyles();
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
