'use client';

import useSWR from 'swr';

import { getPlayerIdsRequest } from './player.service';

import { playerIdApiUrl } from '../../constants/urls';

import { getPlayerId, setPlayerId } from '../../utils.ts/storage.utils';

export const useSetPlayerId = () => {
    const { data } = useSWR(playerIdApiUrl, getPlayerIdsRequest);

    if (!getPlayerId() && data) {
        const { playerId } = data;

        setPlayerId(playerId);
    }
};
