import {
    goldAmountSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { Badge, Flex, Rating } from '@mantine/core';
import { maxAmountOfGoldPerRound } from '../../../../constants/play-game.config.constants';
import { IconMoon, IconSun } from '@tabler/icons';

export const GoldAmount = () => {
    const goldAmount = usePlayerStore(goldAmountSelector);

    return (
        <Flex>
            <Rating
                size="lg"
                value={goldAmount}
                count={maxAmountOfGoldPerRound}
                emptySymbol={<IconSun />}
                fullSymbol={<IconMoon />}
                color="yellow"
            ></Rating>
            <Badge color="yellow" size="lg">
                {goldAmount}
            </Badge>
        </Flex>
    );
};
