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
                playerKey
                playerLogin
            }
        }
    }
`;
