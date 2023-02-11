import Image from 'next/image';

import { Box, createStyles, MantineTheme } from '@mantine/core';
import { tavernTiers } from '../../../play-game/models/play-game.tavern.models';
import { minionIds } from '@prisma/client';
import { summonedMinionsSet } from '../../../../data/summoned-minions';

const useMinionTavernTierStyles = createStyles<
    string,
    MinionTavernTierStyleProps
>(
    (
        theme: MantineTheme,
        { isTriple, isSummoned }: MinionTavernTierStyleProps
    ) => ({
        minionTavernTierContainer: {
            position: 'absolute',
            width: 53,
            height: 55,
            left: isSummoned ? (isTriple ? 28 : 25) : isTriple ? 15 : 12,
            top: isSummoned ? 31 : 30,
        },
        minionTavernTierStarsContainer: {
            position: 'absolute',
            width: 35,
            top: '46%',
            left: '50%',
            textAlign: 'center',
            transform: 'translate(-50%, -50%)',
        },
    })
);
type MinionTavernTierStyleProps = {
    isSummoned: boolean;
    isTriple: boolean;
};
export type MinionTavernTierProps = {
    minionId: minionIds;
    tavernTier: tavernTiers;
    isTriple: boolean;
};
export const MinionTavernTier = ({
    minionId,
    tavernTier,
    isTriple,
}: MinionTavernTierProps) => {
    const isSummoned = summonedMinionsSet.has(minionId);
    const { classes } = useMinionTavernTierStyles({ isTriple, isSummoned });

    return (
        <Box className={classes.minionTavernTierContainer}>
            <Image
                priority
                width={53}
                height={55}
                src="/tier-shield.png"
                alt=""
            ></Image>
            <section className={classes.minionTavernTierStarsContainer}>
                {new Array(tavernTier).fill('').map((_, i) => (
                    <Image
                        priority
                        key={i}
                        width={12}
                        height={12}
                        src="/tier-star.png"
                        alt=""
                    ></Image>
                ))}
            </section>
        </Box>
    );
};
