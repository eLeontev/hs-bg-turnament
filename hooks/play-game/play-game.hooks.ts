import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { getPlayGameVariables } from '../../services/play-game.service';

import { playGameQuery } from '../../graphql/queries';

import { PlayGame } from '../../models/play-game/play-game.models';

export const usePlayGameQuery = () => {
    const [playGame, setPlayGame] = useState<PlayGame | null>(null);
    const [requestPlayGame] = useLazyQuery<PlayGame>(playGameQuery, {
        fetchPolicy: 'network-only',
        variables: getPlayGameVariables(),
    });

    useEffect(() => {
        requestPlayGame().then(({ data }) => {
            if (data) {
                setPlayGame(data);
            }
        });
    }, [requestPlayGame, setPlayGame]);

    return playGame;
};
