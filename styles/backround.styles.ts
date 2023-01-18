import { createStyles } from '@mantine/core';

import playGameBackground from '../public/backgrounds/background.desk.png';
import rootBackground from '../public/backgrounds/main-background.png';

export const useBackgroundStyles = createStyles<
    string,
    { isPlayGamePage: boolean }
>((theme, { isPlayGamePage }) => ({
    backroundConainer: {
        backgroundImage: `url(${
            isPlayGamePage ? playGameBackground.src : rootBackground.src
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
}));
