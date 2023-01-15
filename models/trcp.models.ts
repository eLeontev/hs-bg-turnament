import {
    ProcedureParams,
    DefaultDataTransformer,
    RootConfig,
} from '@trpc/server';
import { ResolveOptions } from '@trpc/server/dist/core/internals/utils';

import { Context } from '../trpc/context';

import { Message } from './graphql.models';

export type TRCPProps<I, O = Message> = ResolveOptions<
    ProcedureParams<
        RootConfig<{
            ctx: Context;
            meta: Record<string, unknown>;
            errorShape: DefaultDataTransformer;
            transformer: any;
        }>,
        Context,
        O,
        I
    >
>;
