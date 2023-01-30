import { getPlayGameOperation } from '../operations/play-game.operations';
import { setHeroToPlayers } from '../operations/play-game.player.operations';

import { GameId } from '../../../models/common.models';
import {
    PlayGamePlayer,
    PlayGamePlayerWithSelectedHeros,
} from '../../player/player.models';

import { getRandom } from '../../../utils.ts/random.utils';

export const finishHeroSelection = async (gameId: GameId) => {
    const { players } = await getPlayGameOperation(gameId);

    const playerWithSelectedHeroes: PlayGamePlayerWithSelectedHeros = players
        .filter(({ selectedHeroId }: PlayGamePlayer) => !selectedHeroId)
        .map(({ playerIdInGame, heroIds }: PlayGamePlayer) => ({
            playerIdInGame,
            selectedHeroId: getRandom(heroIds),
        }));

    await setHeroToPlayers(playerWithSelectedHeroes);
};
