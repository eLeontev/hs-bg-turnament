import useSWR from 'swr';

import { getPlayerIdRequest } from '../services/player-id.service';

import { playerIdApiUrl } from '../constants/urls';

import { getPlayerId, setPlayerId } from '../utils.ts/storage.utils';

export const useSetPlayerId = () => {
    const { data: playerId } = useSWR(playerIdApiUrl, getPlayerIdRequest);

    if (!getPlayerId() && playerId) {
        setPlayerId(playerId);
    }
};
