import {
    PlayGamePlayerDetails,
    PlayGameStorePlayers,
} from '../components/store/play-game.players.store';

import {
    PlayerKey,
    PlayerIdInGame,
    PlayerLogin,
} from '../../../models/common.models';
import { PlayGameHeroSelected } from '../models/play-game.models';
import {
    initialRound,
    defaultMinionsRollPrice,
    defaultMinionPurchasePrice,
    defaultCountOfHitPoints,
    initialTavernTier,
    defaultMinionSellPrice,
} from '../../../constants/play-game.config.constants';
import { PlayGamePlayer } from '../../player/player.models';
import { HeroIds } from '../models/play-game.hero.models';
import { getAmountOfGoldOnRoundStart } from '../utils/gold-amount.utils';

export const formPlayGamePlayers = (players: Array<PlayGamePlayerDetails>) =>
    players.reduce(
        (
            map: Map<PlayerKey, PlayGamePlayerDetails>,
            player: PlayGamePlayerDetails
        ): Map<PlayerKey, PlayGamePlayerDetails> =>
            map.set(player.playerKey, { ...player }),
        new Map<PlayerKey, PlayGamePlayerDetails>()
    );

export const setPlayerHeroIdReducer = (
    players: PlayGameStorePlayers,
    { playerKey, selectedHeroId }: PlayGameHeroSelected
): PlayGameStorePlayers => {
    const player = players.get(playerKey) as PlayGamePlayerDetails;
    players.set(playerKey, { ...player, selectedHeroId });

    return new Map(players); // TODO: investigate zustand immutable flow
};

export const initPlayGamePlayer = ({
    playerLogin,
    playerIdInGame,
    playerKey,
    heroIds,
}: {
    playerLogin: PlayerLogin;
    playerIdInGame: PlayerIdInGame;
    playerKey: PlayerKey;
    heroIds: HeroIds;
}): PlayGamePlayer => ({
    playerIdInGame,
    playerLogin,
    playerKey,
    heroIds,
    goldAmount: getAmountOfGoldOnRoundStart(initialRound),
    minionsRollPrice: defaultMinionsRollPrice,
    minionPurchasePrice: defaultMinionPurchasePrice,
    minionSellPrice: defaultMinionSellPrice,
    selectedHeroId: null,
    countOfArmor: 0,
    countOfHitPoints: defaultCountOfHitPoints,
    tavernTier: initialTavernTier,
    isWonLastTime: null,
    opponentId: null,
    opponentKey: null,
    tavernCardIds: [],
    handCardIds: [],
    deskCardIds: [],
});
