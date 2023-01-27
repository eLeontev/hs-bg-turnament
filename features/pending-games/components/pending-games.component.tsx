import { Center, Group, Title } from '@mantine/core';

import { PendingGameComponent } from './pending-game.component';
import { LabelTrans } from '../../../i18n/i18n.trans.component';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

import { PendingGame, PendingGames } from '../pending-games.models';

export type PendingGamesProps = {
    pendingGames: PendingGames;
    isInGame: boolean;
};

export const PendingGamesComponent = ({
    pendingGames,
    isInGame,
}: PendingGamesProps) =>
    pendingGames.length ? (
        <Group>{getPendingGames(pendingGames, isInGame)}</Group>
    ) : (
        <Center>
            <Title order={3}>
                <LabelTrans
                    i18nKey={labelI18nKeys.pendingGameNoGamesFound}
                ></LabelTrans>
            </Title>
        </Center>
    );

export const getPendingGames = (
    pendingGames: PendingGames,
    isInGame: boolean
) =>
    pendingGames.map((pendingGame: PendingGame) => (
        <PendingGameComponent
            key={pendingGame.gameId}
            isInGame={isInGame}
            pendingGame={pendingGame}
        ></PendingGameComponent>
    ));
