import { gql } from '@apollo/client';

export const createPendingGameMutation = gql`
    mutation createPendingGame(
        $playerId: String!
        $playerLogin: String!
        $gameName: String!
    ) {
        createPendingGameRequest(
            playerId: $playerId
            playerLogin: $playerLogin
            gameName: $gameName
        ) {
            playerIdInGame
        }
    }
`;

export const deletePendingGameMutation = gql`
    mutation deletePendingGame($gameId: String!, $playerId: String!) {
        deletePendingGameRequest(gameId: $gameId, playerId: $playerId) {
            message
        }
    }
`;

export const joinPendingGameMutation = gql`
    mutation joinPendingGame(
        $gameId: String!
        $playerId: String
        $playerLogin: String
    ) {
        joinPendingGameRequest(
            gameId: $gameId
            playerId: $playerId
            playerLogin: $playerLogin
        ) {
            playerIdInGame
        }
    }
`;

export const leavePendingGameMutation = gql`
    mutation leavePendingGame($gameId: String!, $playerId: String) {
        leavePendingGameRequest(gameId: $gameId, playerId: $playerId) {
            message
        }
    }
`;

export const startPlayGameMutation = gql`
    mutation startPlayGame($gameId: String!, $playerId: String) {
        startPlayGameRequest(gameId: $gameId, playerId: $playerId) {
            message
        }
    }
`;
