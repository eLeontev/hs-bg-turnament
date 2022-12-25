import { gql } from '@apollo/client';

export const createPendingGameMutation = gql`
    mutation createPendingGame($authorId: String!, $authorLogin: String!) {
        createPendingGameRequest(
            authorId: $authorId
            authorLogin: $authorLogin
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
