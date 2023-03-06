import { GraphQLError } from 'graphql';
import { NextApiResponse } from 'next';
import { unknownGraphQlErrorMessage } from '../constants/graphql.constants';
import { Parent, RequestHandler } from '../models/resolver.models';

export const withoutParent =
    <T, B>(requestHandler: RequestHandler<T, B>) =>
    (_: Parent, body: B, { res }: { res: NextApiResponse }): T =>
        requestHandler(body, res);

export const withErrorHandler =
    <T, B>(requestHandler: RequestHandler<T, B>) =>
    async (...args: [B, NextApiResponse]) => {
        try {
            return await requestHandler(...args);
        } catch ({ message }) {
            throw new GraphQLError(
                String(message) || unknownGraphQlErrorMessage
            );
        }
    };
