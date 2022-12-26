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
