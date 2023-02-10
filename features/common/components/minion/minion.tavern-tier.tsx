import Image from 'next/image';

import { Box, createStyles, MantineTheme } from '@mantine/core';
import { tavernTiers } from '../../../play-game/models/play-game.tavern.models';

const useMinionTavernTierStyles = createStyles<string, boolean>(
    (theme: MantineTheme, isTriple) => ({
        minionTavernTierContainer: {
            position: 'absolute',
            width: 53,
            height: 55,
            left: isTriple ? 15 : 12,
            top: 30,
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

export type MinionTavernTierProps = {
    tavernTier: tavernTiers;
    isTriple: boolean;
};
export const MinionTavernTier = ({
    tavernTier,
    isTriple,
}: MinionTavernTierProps) => {
    const { classes } = useMinionTavernTierStyles(isTriple);

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
