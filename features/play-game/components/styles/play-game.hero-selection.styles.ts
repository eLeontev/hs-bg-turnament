import { createStyles, MantineTheme } from '@mantine/core';

export const useStyles = createStyles<string, boolean>(
    (theme: MantineTheme) => ({
        heroCard: {
            cursor: 'pointer',
            padding: 8,
            margin: 8,
            width: 232,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 8,
            backdropFilter: 'blur(1px)',
        },
        heroCardSelected: {
            boxShadow: `0 0 10px ${theme.colors.teal[8]}`,
            backgroundColor: `${theme.colors.dark[9]}CC`,
        },
        powerDescription: {
            paddingTop: 8,
            textAlign: 'center',
        },
    })
);
