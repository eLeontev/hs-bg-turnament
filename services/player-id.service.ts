import { playerIdApiUrl } from '../constants/urls';
import { PlayerId } from '../models/common.models';

let playerIds: PlayerIds;

export type PlayerIds = {
    playerId: PlayerId;
};

export const getPlayerIdsRequest = (
    ...args: [RequestInfo | URL, RequestInit | undefined]
): Promise<PlayerIds> =>
    playerIds
        ? Promise.resolve(playerIds)
        : fetch(...args)
              .then((res) => res.json())
              .then((res: PlayerIds) => (playerIds = res));
