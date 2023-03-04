import { createStyles, MantineTheme } from '@mantine/core';

export const useNotificationStyles = createStyles((theme: MantineTheme) => ({
    notifications: {
        position: 'absolute',
        zIndex: 10000,
        top: theme.spacing.sm,
        right: theme.spacing.md,
        maxWidth: 300,
    },
    notification: {
        marginBottom: theme.spacing.sm,
    },
}));
