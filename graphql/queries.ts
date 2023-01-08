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

export const playGameQuery = gql`
    query playGame($gameId: String!, $playerId: String!) {
        playGame(gameId: $gameId, playerId: $playerId) {
            phase
        }
    }
`;
