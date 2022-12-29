import { gql } from '@apollo/client';

export const getPendingGamesQuery = gql`
    query getPendingGamesQuery {
        pendingGames {
            gameId
            authorId
            gameName
            authorLogin
            createdDate
            players {
                playerId
                playerLogin
            }
        }
    }
`;

export const initPlayGameQuery = gql`
    query initPlayGame(
        $gameId: String!
        $playerId: String
        $privatePlayerId: String
    ) {
        initPlayGameRequest(
            gameId: $gameId
            playerId: $playerId
            privatePlayerId: $privatePlayerId
        ) {
            message
        }
    }
`;
