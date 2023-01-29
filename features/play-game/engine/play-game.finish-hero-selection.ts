import { Server } from 'Socket.IO';

import { getPlayGameOperation } from '../operations/play-game.operations';
import { setHeroToPlayers } from '../operations/play-game.player.operations';

import { notifyPlayersInPlayGame } from '../sockets/play-game.notification.socket';

import { GameId } from '../../../models/common.models';
import {
    PlayGamePlayer,
    PlayGamePlayerWithSelectedHeros,
} from '../../player/player.models';
import { PlayGameHeroesSelected } from '../models/play-game.models';

import { getRandom } from '../../../utils.ts/random.utils';

import { playGameActions } from '../play-game.enums';

export const finishHeroSelection = async (io: Server, gameId: GameId) => {
    const { players } = await getPlayGameOperation(gameId);

    const serverPlayerWithSelectedHeros: PlayGamePlayerWithSelectedHeros = [];
    const clientPlayerWithSelectedHeros: PlayGameHeroesSelected = [];

    players.forEach(
        ({ playerIdInGame, playerKey, heroIds }: PlayGamePlayer) => {
            const selectedHeroId = getRandom(heroIds);
            serverPlayerWithSelectedHeros.push({
                playerIdInGame,
                selectedHeroId,
            });
            clientPlayerWithSelectedHeros.push({ playerKey, selectedHeroId });
        }
    );

    await setHeroToPlayers(serverPlayerWithSelectedHeros);

    notifyPlayersInPlayGame(io, gameId, {
        action: playGameActions.heroesSelected,
        payload: clientPlayerWithSelectedHeros,
    });
};
