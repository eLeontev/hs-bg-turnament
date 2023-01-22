import { MantineTheme, MantineThemeOverride } from '@mantine/core';

const components = {
    Title: {
        styles: (theme: MantineTheme) => ({
            root: {
                '&:is(h4)': {
                    textShadow: `0px 0px 2px ${theme.colors.teal[9]}`,
                    color: theme.colors.orange[0],
                },
            },
        }),
    },
    Text: {
        styles: (theme: MantineTheme) => ({
            root: {
                '&:is(p)': {
                    textShadow: `0px 0px 1px ${theme.colors.teal[9]}`,
                    color: theme.colors.gray[0],
                },
            },
        }),
    },
};

export const theme: MantineThemeOverride = {
    components,
    colorScheme: 'dark',
    loader: 'dots',
};
