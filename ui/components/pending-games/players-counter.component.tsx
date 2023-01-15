import { PairComponent } from '../pair.component';

import { maxCountOfPlayers } from '../../../constants/game-config.constants';

import { PublicPlayers } from '../../../models/player.models';

export type PlayersCounterProps = { players: PublicPlayers };

export const PlayersCounter = ({ players }: PlayersCounterProps) => (
    <PairComponent
        label="Count of players"
        value={`${players.length}/${maxCountOfPlayers}`}
    ></PairComponent>
);
