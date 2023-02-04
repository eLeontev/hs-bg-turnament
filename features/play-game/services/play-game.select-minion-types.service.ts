import { allMinionTypes } from '../constants/minion.constants';

import { getExcludedRandom } from '../../../utils.ts/random.utils';

export const getSelectMinionTypes = () => {
    // TODO: update to forming minion types once all types are allowed or at least min count of them to select
    const [randomMinionType] = getExcludedRandom(allMinionTypes);
    return [randomMinionType];
};
