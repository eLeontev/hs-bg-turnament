import { FetchResult, MutationFunctionOptions } from '@apollo/client';

import { PlayerId } from './common.models';

export type UseGraphQLResponse<R> = Promise<{
    data: R;
    loading: boolean;
    error: any;
}>;
export type MutationFn<TData, TVariables> = (
    options?: MutationFunctionOptions<TData, TVariables>
) => Promise<FetchResult<TData>>;

export type Message = {
    message: string;
};

export type PlayerIdInGameResponse = {
    playerIdInGame: PlayerId;
};

export type CreatePendingGameMutationResponse = {
    createPendingGameRequest: PlayerIdInGameResponse;
};

export type JoinPendingGameMutationResponse = {
    joinPendingGameRequest: PlayerIdInGameResponse;
};
