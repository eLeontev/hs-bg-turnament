import { gql } from '@apollo/client';

export type User = {
    name: string;
    id: string;
};
export type UsersQuery = { users: Array<User> };

export const getUsersQuery = gql`
    query getUsers {
        users {
            name
        }
    }
`;

export const getPendingGamesQuery = gql`
    query getPendingGamesQuery {
        pendingGames {
            gameId
            authorId
            authorLogin
            createdDate
            countOfPlayers
        }
    }
`;
