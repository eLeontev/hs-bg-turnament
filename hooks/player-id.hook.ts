'use client';

import useSWR from 'swr';

import { getPlayerIdsRequest } from '../services/player-id.service';

import { playerIdApiUrl } from '../constants/urls';

import {
    getPlayerId,
    setPlayerId,
    setPrivatePlayerId,
} from '../utils.ts/storage.utils';

export const useSetPlayerId = () => {
    const { data } = useSWR(playerIdApiUrl, getPlayerIdsRequest);

    if (!getPlayerId() && data) {
        const { playerId, privatePlayerId } = data;

        setPlayerId(playerId);
        setPrivatePlayerId(privatePlayerId);
    }
};
