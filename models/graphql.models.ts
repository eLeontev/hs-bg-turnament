import { FetchResult, MutationFunctionOptions } from '@apollo/client';

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
