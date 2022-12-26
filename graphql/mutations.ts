import { gql } from '@apollo/client';

export const createPendingGameMutation = gql`
    mutation createPendingGame(
        $authorId: String!
        $authorLogin: String!
        $gameName: String!
    ) {
        createPendingGameRequest(
            authorId: $authorId
            authorLogin: $authorLogin
            gameName: $gameName
        ) {
            message
        }
    }
`;

export const deletePendingGameMutation = gql`
    mutation deletePendingGame($authorId: String!) {
        deletePendingGameRequest(authorId: $authorId) {
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
            message
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
