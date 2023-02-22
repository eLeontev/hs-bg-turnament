import { minionTypes } from '@prisma/client';

import { Cards } from '../../../data/minions/battle-cries/minions.battle-cries';

import { allMinionTypes } from '../constants/minion.constants';
import { countOfMinionsPerDeck } from '../../../constants/play-game.config.constants';

import { getExcludedRandom } from '../../../utils.ts/random.utils';
import { getHashes } from '../../../utils.ts/hash-server.utils';

import { minions } from '../../../data/minions';

export const getSelectedMinionTypes = () => {
    // TODO: update to forming minion types once all types are allowed or at least min count of them to select
    const [randomMinionType] = getExcludedRandom(allMinionTypes);
    return [randomMinionType, minionTypes.all, minionTypes.noType];
};

export const getAvailableMinions = async (minionTypes: Array<minionTypes>) => {
    let availableCards: Cards = [];
    const availableMinionTypesSet = new Set(minionTypes);

    Object.entries(minions).forEach(([tavernTier, minionsInTavernByType]) => {
        Object.entries(minionsInTavernByType)
            .filter(([minionType]) =>
                availableMinionTypesSet.has(minionType as minionTypes)
            )
            .forEach(([minionType, minionsInSelectedTavernByType]) =>
                Array.from(minionsInSelectedTavernByType).forEach(
                    ([minionId]) =>
                        availableCards.push(
                            ...new Array(countOfMinionsPerDeck).fill({
                                minionId,
                                tavernTier: Number(tavernTier),
                                minionTypes: [minionType],
                                cardId: '',
                            })
                        )
                )
            );
    });

    const allCardsIds = await getHashes(availableCards.length);
    availableCards = availableCards.map((card, i) => ({
        ...card,
        cardId: allCardsIds[i],
    }));

    return availableCards;
};
