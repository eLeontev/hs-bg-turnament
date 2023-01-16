import { PairComponent } from '../../common/components/pair.component';

import { maxCountOfPlayers } from '../../../constants/game-config.constants';

import { PublicPlayers } from '../../player/player.models';

export type PlayersCounterProps = { players: PublicPlayers };

export const PlayersCounter = ({ players }: PlayersCounterProps) => (
    <PairComponent
        label="Count of players"
        value={`${players.length}/${maxCountOfPlayers}`}
    ></PairComponent>
);
