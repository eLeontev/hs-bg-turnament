import Image from 'next/image';

import { createStyles, MantineTheme } from '@mantine/core';
import { tavernTiers } from '../../../play-game/models/play-game.tavern.models';

const useMinionTavernTierStyles = createStyles<string, number>(
    (theme: MantineTheme) => ({
        minionTavernTierContainer: {
            position: 'absolute',
            width: 53,
            height: 55,
            left: 12,
            top: 30,
        },
        minionTavernTierTextContainer: {
            position: 'absolute',
            textAlign: 'center',
            width: 53,
            height: 55,
            left: 12,
            top: 30,
            fontSize: 12,
            wordBreak: 'break-all',
            lineHeight: 1.1,
            verticalAlign: 'center',
            color: theme.colors.green[4],
        },
        minionTavernTierText: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    })
);

const tavernTierRepresentaion = {
    [tavernTiers['☆']]: '★',
    [tavernTiers['☆☆']]: '★★',
    [tavernTiers['☆☆☆']]: '★★ ★',
    [tavernTiers['☆☆☆☆']]: '★★ ★★',
    [tavernTiers['☆☆☆☆☆']]: '★★ ★★ ★',
    [tavernTiers['☆☆☆☆☆☆']]: '★★ ★★ ★★',
};

export type MinionTavernTierProps = { tavernTier: tavernTiers };
export const MinionTavernTier = ({ tavernTier }: MinionTavernTierProps) => {
    const { classes } = useMinionTavernTierStyles(tavernTier);

    return (
        <>
            <Image
                className={classes.minionTavernTierContainer}
                priority
                width={50}
                height={70}
                src="/tier-shield.png"
                alt=""
            ></Image>
            <section className={classes.minionTavernTierTextContainer}>
                <span className={classes.minionTavernTierText}>
                    {tavernTierRepresentaion[tavernTier]}
                </span>
            </section>
        </>
    );
};
