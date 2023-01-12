import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPendingGameRequest?: Maybe<PlayerIdInGameResponse>;
  deletePendingGameRequest?: Maybe<Message>;
  joinPendingGameRequest?: Maybe<PlayerIdInGameResponse>;
  leavePendingGameRequest?: Maybe<Message>;
  startPlayGameRequest?: Maybe<Message>;
};


export type MutationCreatePendingGameRequestArgs = {
  gameName?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['String']>;
  playerLogin?: InputMaybe<Scalars['String']>;
};


export type MutationDeletePendingGameRequestArgs = {
  gameId: Scalars['String'];
  playerId?: InputMaybe<Scalars['String']>;
};


export type MutationJoinPendingGameRequestArgs = {
  gameId: Scalars['String'];
  playerId?: InputMaybe<Scalars['String']>;
  playerLogin?: InputMaybe<Scalars['String']>;
};


export type MutationLeavePendingGameRequestArgs = {
  gameId: Scalars['String'];
  playerId?: InputMaybe<Scalars['String']>;
};


export type MutationStartPlayGameRequestArgs = {
  gameId: Scalars['String'];
  playerId?: InputMaybe<Scalars['String']>;
};

export type PendingGame = {
  __typename?: 'PendingGame';
  authorId: Scalars['String'];
  authorLogin: Scalars['String'];
  createdDate: Scalars['String'];
  gameId?: Maybe<Scalars['ID']>;
  gameName: Scalars['String'];
  players: Array<Player>;
};

export type PlayGame = {
  __typename?: 'PlayGame';
  gameId: Scalars['String'];
  phase?: Maybe<Scalars['String']>;
  players: Array<Maybe<PlayerInPlayGame>>;
};

export type Player = {
  __typename?: 'Player';
  playerId: Scalars['String'];
  playerLogin: Scalars['String'];
};

export type PlayerIdInGameResponse = {
  __typename?: 'PlayerIdInGameResponse';
  playerIdInGame: Scalars['String'];
};

export type PlayerInPlayGame = {
  __typename?: 'PlayerInPlayGame';
  playerIdInGame: Scalars['String'];
  playerLogin: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  pendingGames: Array<Maybe<PendingGame>>;
  playGame?: Maybe<PlayGame>;
};


export type QueryPlayGameArgs = {
  gameId: Scalars['String'];
  playerIdInGame: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  PendingGame: ResolverTypeWrapper<PendingGame>;
  PlayGame: ResolverTypeWrapper<PlayGame>;
  Player: ResolverTypeWrapper<Player>;
  PlayerIdInGameResponse: ResolverTypeWrapper<PlayerIdInGameResponse>;
  PlayerInPlayGame: ResolverTypeWrapper<PlayerInPlayGame>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Message: Message;
  Mutation: {};
  PendingGame: PendingGame;
  PlayGame: PlayGame;
  Player: Player;
  PlayerIdInGameResponse: PlayerIdInGameResponse;
  PlayerInPlayGame: PlayerInPlayGame;
  Query: {};
  String: Scalars['String'];
}>;

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPendingGameRequest?: Resolver<Maybe<ResolversTypes['PlayerIdInGameResponse']>, ParentType, ContextType, Partial<MutationCreatePendingGameRequestArgs>>;
  deletePendingGameRequest?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationDeletePendingGameRequestArgs, 'gameId'>>;
  joinPendingGameRequest?: Resolver<Maybe<ResolversTypes['PlayerIdInGameResponse']>, ParentType, ContextType, RequireFields<MutationJoinPendingGameRequestArgs, 'gameId'>>;
  leavePendingGameRequest?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationLeavePendingGameRequestArgs, 'gameId'>>;
  startPlayGameRequest?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationStartPlayGameRequestArgs, 'gameId'>>;
}>;

export type PendingGameResolvers<ContextType = any, ParentType extends ResolversParentTypes['PendingGame'] = ResolversParentTypes['PendingGame']> = ResolversObject<{
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authorLogin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gameId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  gameName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayGameResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayGame'] = ResolversParentTypes['PlayGame']> = ResolversObject<{
  gameId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phase?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['PlayerInPlayGame']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = ResolversObject<{
  playerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  playerLogin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerIdInGameResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerIdInGameResponse'] = ResolversParentTypes['PlayerIdInGameResponse']> = ResolversObject<{
  playerIdInGame?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerInPlayGameResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerInPlayGame'] = ResolversParentTypes['PlayerInPlayGame']> = ResolversObject<{
  playerIdInGame?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  playerLogin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  pendingGames?: Resolver<Array<Maybe<ResolversTypes['PendingGame']>>, ParentType, ContextType>;
  playGame?: Resolver<Maybe<ResolversTypes['PlayGame']>, ParentType, ContextType, RequireFields<QueryPlayGameArgs, 'gameId' | 'playerIdInGame'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PendingGame?: PendingGameResolvers<ContextType>;
  PlayGame?: PlayGameResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  PlayerIdInGameResponse?: PlayerIdInGameResponseResolvers<ContextType>;
  PlayerInPlayGame?: PlayerInPlayGameResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

