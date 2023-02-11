import Image from 'next/image';

import { Box, createStyles, MantineTheme } from '@mantine/core';

const useMinionNameStyles = createStyles<string, MinionNameStyleProps>(
    (theme: MantineTheme, { name, isSummoned }: MinionNameStyleProps) => ({
        minionNameContainer: {
            position: 'absolute',
            width: isSummoned ? 160 : 180,
            height: 30,
            left: isSummoned ? 42 : 26,
            top: isSummoned ? 143 : 146,
        },
        minionNameImage: {
            position: 'absolute',
            left: 0,
            top: 0,
        },
        minionNameSvgContainer: {
            position: 'relative',
        },
        minionName: {
            position: 'relative',
            fill: theme.colors.gray[2],
            font: `600 ${name.length > 19 ? 10 : 13}px Rubik`,
            stroke: theme.colors.dark[5],
            strokeWidth: 2,
            paintOrder: 'stroke',
        },
    })
);

export type MinionNameStyleProps = {
    name: string;
    isSummoned: boolean;
};

export type MinionNameProps = MinionNameStyleProps & {
    isTriple: boolean;
};
export const MinionName = ({ name, isTriple, isSummoned }: MinionNameProps) => {
    const { classes } = useMinionNameStyles({ isSummoned, name });
    const nameBackgroundImageUrl = isTriple
        ? '/minion-name.triple.png'
        : '/minion-name.regular.png';

    return (
        <Box className={classes.minionNameContainer}>
            <Image
                className={classes.minionNameImage}
                priority
                width={isSummoned ? 140 : 157}
                height={37}
                src={nameBackgroundImageUrl}
                alt=""
            ></Image>
            <svg
                className={classes.minionNameSvgContainer}
                viewBox="0 0 180 30"
            >
                <path
                    id="MinionName"
                    fill="none"
                    stroke="none"
                    d={`m ${isSummoned ? 6 : 4} ${
                        isSummoned ? 30 : 28
                    } c 18 3 28 -3 52 -6 c 63 -10 77 -4 94 3`}
                />
                <text>
                    <textPath
                        className={classes.minionName}
                        startOffset="50%"
                        textAnchor="middle"
                        href="#MinionName"
                    >
                        {name}
                    </textPath>
                </text>
            </svg>
        </Box>
    );
};
