import { createStyles, MantineTheme } from '@mantine/core';

export const useCommonStyles = createStyles<string, { labelFontSize?: number }>(
    (theme: MantineTheme, { labelFontSize }) => ({
        timerContainer: {
            position: 'relative',
            top: -15,
        },
        timerLabel: {
            position: 'absolute',
            fontSize: labelFontSize || 10,
            width: '100%',
            textAlign: 'center',
            top: -2,
            color: theme.colors.gray[0],
            fontWeight: 700,
        },
    })
);
