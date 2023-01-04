import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    pendingGame: {
        flexGrow: 1,
        alignItems: 'center',
    },
    pendingGameCard: {
        height: '68px',
        flexGrow: 1,
        marginLeft: `${theme.spacing.md}px`,
    },
}));
