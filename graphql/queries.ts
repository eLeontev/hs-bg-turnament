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
    query playGame($gameId: String!, $playerIdInGame: String!) {
        playGame(gameId: $gameId, playerIdInGame: $playerIdInGame) {
            phase
        }
    }
`;
