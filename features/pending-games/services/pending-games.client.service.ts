import { FetchResult } from '@apollo/client';

import {
    createPendingGameBodyValidator,
    deletePendingGameBodyValidator,
    joinPendingGameBodyValidator,
    leavePendingGameBodyValidator,
} from '../pending-games.validators';

import { pendingGameNameErrorMessage } from '../pending-games.constants';

import { gameNameSchema } from '../pending-games.schemas';

import {
    CreatePendingGameMutationResponse,
    JoinPendingGameMutationResponse,
    MutationFn,
    PlayerIdInGameResponse,
} from '../../../models/graphql.models';
import {
    CreatePendingGameBody,
    DeletePendingGameBody,
    JoinPendingGameBody,
    LeavePendingGameBody,
    PendingGames,
} from '../pending-games.models';

import {
    getPlayerId,
    getLogin,
    setPlayerIdInGame,
    setPlayerKey,
} from '../../../utils.ts/storage.utils';

import { Message } from '../../../__generated__/resolvers-types';
import { GameId, PlayerId, PlayerKey } from '../../../models/common.models';

export const createPendingGame = (
    createPendingGameHandler: MutationFn<
        CreatePendingGameMutationResponse,
        CreatePendingGameBody
    >,
    gameName: string
) =>
    createPendingGameHandler({
        variables: createPendingGameBodyValidator({
            gameName,
            playerId: getPlayerId(),
            playerLogin: getLogin(),
        }),
    });

export const deletePendingGame = (
    deletePendingGameHandler: MutationFn<Message, DeletePendingGameBody>,
    gameId: string
) =>
    deletePendingGameHandler({
        variables: deletePendingGameBodyValidator({
            gameId,
            playerId: getPlayerId(),
        }),
    });

export const joinPendingGame = (
    joinPendingGameHandler: MutationFn<
        JoinPendingGameMutationResponse,
        JoinPendingGameBody
    >,
    gameId: GameId
) =>
    joinPendingGameHandler({
        variables: joinPendingGameBodyValidator({
            gameId,
            playerId: getPlayerId(),
            playerLogin: getLogin(),
        }),
    });

export const leavePendingGame = (
    leavePendingGameHandler: MutationFn<Message, LeavePendingGameBody>,
    gameId: GameId
) =>
    leavePendingGameHandler({
        variables: leavePendingGameBodyValidator({
            gameId,
            playerId: getPlayerId(),
        }),
    });

export const createPendingGameValidator = (value: string) =>
    gameNameSchema.safeParse(value.trim()).success
        ? null
        : pendingGameNameErrorMessage;

export const isPlayerInGame = (
    pendingGames: PendingGames,
    playerKey: PlayerKey
) =>
    pendingGames.some(({ players }) =>
        players.some((player) => player.playerKey === playerKey)
    );

const playerIdInGameResponseHandler = (
    response: PlayerIdInGameResponse | undefined
) => {
    if (response) {
        setPlayerIdInGame(response.playerIdInGame);
        setPlayerKey(response.playerKey);
    }
};

export const createPendingGameResponseHandler = (
    value: FetchResult<CreatePendingGameMutationResponse> | undefined
) => playerIdInGameResponseHandler(value?.data?.createPendingGameRequest);

export const joinPendingGameResponseHandler = (
    value: FetchResult<JoinPendingGameMutationResponse> | undefined
) => playerIdInGameResponseHandler(value?.data?.joinPendingGameRequest);
