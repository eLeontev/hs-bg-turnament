import { PairComponent } from '../pair.component';

import { maxCountOfPlayers } from '../../../constants/game-config.constants';

import { Players } from '../../../models/player-id.models';

export type PlayersCounterProps = { players: Players };

export const PlayersCounter = ({ players }: PlayersCounterProps) => (
    <PairComponent
        label="Count of players"
        value={`${players.length}/${maxCountOfPlayers}`}
    ></PairComponent>
);
