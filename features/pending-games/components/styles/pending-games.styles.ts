import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    pendingGame: {
        flexGrow: 1,
        overflow: 'visible',
    },
    timer: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
    },
}));
