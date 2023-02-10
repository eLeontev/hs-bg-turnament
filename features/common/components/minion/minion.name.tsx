import Image from 'next/image';

import { Box, createStyles, MantineTheme } from '@mantine/core';

const useMinionNameStyles = createStyles<string, string>(
    (theme: MantineTheme, name: string) => ({
        minionNameContainer: {
            position: 'absolute',
            width: 180,
            height: 30,
            left: 26,
            top: 146,
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

export type MinionNameProps = { name: string; isTriple: boolean };
export const MinionName = ({ name, isTriple }: MinionNameProps) => {
    const { classes } = useMinionNameStyles(name);
    const nameBackgroundImageUrl = isTriple
        ? '/minion-name.triple.png'
        : '/minion-name.regular.png';

    return (
        <Box className={classes.minionNameContainer}>
            <Image
                className={classes.minionNameImage}
                priority
                width={157}
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
                    d="m 4 28 c 18 3 28 -3 52 -6 c 63 -10 77 -4 94 3"
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
