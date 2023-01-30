import { getPlayGameOperation } from '../operations/play-game.operations';
import { setHeroToPlayers } from '../operations/play-game.player.operations';

import { GameId } from '../../../models/common.models';
import {
    PlayGamePlayer,
    PlayGamePlayerWithSelectedHeros,
} from '../../player/player.models';
import { PlayGameHeroesSelected } from '../models/play-game.models';

import { getRandom } from '../../../utils.ts/random.utils';

export const finishHeroSelection = async (gameId: GameId) => {
    const { players } = await getPlayGameOperation(gameId);

    const serverPlayerWithSelectedHeros: PlayGamePlayerWithSelectedHeros = [];
    const clientPlayerWithSelectedHeros: PlayGameHeroesSelected = [];

    players
        .filter(({ selectedHeroId }: PlayGamePlayer) => Boolean(selectedHeroId))
        .forEach(({ playerIdInGame, playerKey, heroIds }: PlayGamePlayer) => {
            const selectedHeroId = getRandom(heroIds);
            serverPlayerWithSelectedHeros.push({
                playerIdInGame,
                selectedHeroId,
            });
            clientPlayerWithSelectedHeros.push({ playerKey, selectedHeroId });
        });

    await setHeroToPlayers(serverPlayerWithSelectedHeros);
};
