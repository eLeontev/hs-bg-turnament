import { PairComponent } from '../../common/components/pair.component';

import { useI18nTranslate } from '../../../i18n/i18n.hooks';

import { maxCountOfPlayers } from '../../../constants/game-config.constants';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

import { PublicPlayers } from '../../player/player.models';

export type PlayersCounterProps = { players: PublicPlayers };

export const PlayersCounter = ({ players }: PlayersCounterProps) => {
    const t = useI18nTranslate();
    return (
        <PairComponent
            label={t(labelI18nKeys.pendingGameCountOfPlayers)}
            value={`${players.length}/${maxCountOfPlayers}`}
        ></PairComponent>
    );
};
