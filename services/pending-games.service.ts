import { FetchResult } from '@apollo/client';

import {
    createPendingGameBodyValidator,
    deletePendingGameBodyValidator,
    joinPendingGameBodyValidator,
    leavePendingGameBodyValidator,
} from '../validators/pending-games.validators';

import { pendingGameNameErrorMessage } from '../constants/pending-games.constants';

import { gameNameSchema } from '../schemas/pending-games.schemas';

import {
    CreatePendingGameMutationResponse,
    JoinPendingGameMutationResponse,
    MutationFn,
} from '../models/graphql.models';
import {
    CreatePendingGameBody,
    DeletePendingGameBody,
    JoinPendingGameBody,
    LeavePendingGameBody,
    PendingGames,
} from '../models/pending-games.models';

import {
    getPlayerId,
    getLogin,
    setPlayerIdInGame,
} from '../utils.ts/storage.utils';

import { Message } from '../__generated__/resolvers-types';
import { Player, StartPlayGameBody } from '../models/player.models';
import { GameId, PlayerId } from '../models/common.models';

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

export const isPlayerInGame = (pendingGames: PendingGames, playerId: string) =>
    pendingGames.some(({ players }) =>
        players.some((player: Player) => player.playerId === playerId)
    );

const setPlayerIdInGameHandler = (playerId: PlayerId | undefined) =>
    playerId && setPlayerIdInGame(playerId);

export const createPendingGameResponseHandler = (
    value: FetchResult<CreatePendingGameMutationResponse> | undefined
) =>
    setPlayerIdInGameHandler(
        value?.data?.createPendingGameRequest.playerIdInGame
    );

export const joinPendingGameResponseHandler = (
    value: FetchResult<JoinPendingGameMutationResponse> | undefined
) =>
    setPlayerIdInGameHandler(
        value?.data?.joinPendingGameRequest.playerIdInGame
    );
