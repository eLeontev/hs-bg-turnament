import { getPlayGameOperation } from '../operations/play-game.operations';
import {
    setHeroToPlayersOperation,
    setPlayersOpponentsOperation,
} from '../operations/play-game.player.operations';

import { buildPlayerPairs } from '../services/play-game.build-pairs.service';

import { GameId } from '../../../models/common.models';
import {
    PlayGamePlayer,
    PlayGamePlayers,
    PlayGamePlayerWithSelectedHeroes,
} from '../../player/player.models';

import { getRandom } from '../../../utils.ts/random.utils';

const assignHeroToPlayers = async (players: PlayGamePlayers) => {
    const playerWithSelectedHeroes: PlayGamePlayerWithSelectedHeroes = players
        .filter(({ selectedHeroId }: PlayGamePlayer) => !selectedHeroId)
        .map(({ playerIdInGame, heroIds }: PlayGamePlayer) => ({
            playerIdInGame,
            selectedHeroId: getRandom(heroIds),
        }));

    await setHeroToPlayersOperation(playerWithSelectedHeroes);
};

export const setPlayerPairs = async (players: PlayGamePlayers) => {
    const playersWithOpponent = buildPlayerPairs(players);
    await setPlayersOpponentsOperation(playersWithOpponent);
};

export const finishHeroSelection = async (gameId: GameId) => {
    const { players } = await getPlayGameOperation(gameId);

    await assignHeroToPlayers(players);
    await setPlayerPairs(players);
};
