import { createStyles, MantineTheme } from '@mantine/core';
import { tavernTiers } from '../../../play-game/models/play-game.tavern.models';

const useMinionTavernTierStyles = createStyles<string, number>(
    (theme: MantineTheme) => ({
        minionTavernTierContainer: {
            position: 'absolute',
            width: 50,
            height: 70,
            left: 10,
            top: 32,
        },
        minionTavernTierTextContainer: {
            position: 'absolute',
            textAlign: 'center',
            top: 34,
            left: 9,
            width: 60,
            height: 40,
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
            <svg
                viewBox="-3 3 50 70"
                className={classes.minionTavernTierContainer}
            >
                <path
                    filter="blur(1px)"
                    fill="#5f0459"
                    d="M 7 5 L 23 5 L 24 6 L 30 6 L 31 5 L 44 5 L 44 34 L 46 38 C 41 44 29 50 26 50 C 15 47 9 42 6 38 L 7 34"
                />
                <path
                    id="TavernTier"
                    fill="none"
                    stroke="none"
                    d="M 7 5 L 23 5 L 24 6 L 30 6 L 31 5 L 44 5 L 44 34 L 46 38 C 41 44 29 50 26 50 C 15 47 9 42 6 38 L 7 34"
                />
            </svg>
            <section className={classes.minionTavernTierTextContainer}>
                <span className={classes.minionTavernTierText}>
                    {tavernTierRepresentaion[tavernTier]}
                </span>
            </section>
        </>
    );
};
