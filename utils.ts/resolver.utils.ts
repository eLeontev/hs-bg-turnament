import { GraphQLError } from 'graphql';
import { unknownGrapgQLErrorMessage } from '../constants/graphql.constants';
import { Parent, RequestHandler } from '../models/resolver.models';

export const withoutParent =
    <T, B>(requestHandler: RequestHandler<T, B>) =>
    (_: Parent, body: B): T =>
        requestHandler(body);

export const withErrorHandler =
    <T, B>(requestHandler: RequestHandler<T, B>) =>
    async (body: B) => {
        try {
            return await requestHandler(body);
        } catch ({ message }) {
            return new GraphQLError(
                String(message) || unknownGrapgQLErrorMessage
            );
        }
    };
