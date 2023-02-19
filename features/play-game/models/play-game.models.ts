import { z } from 'zod';
import { heroIds, minionTypes } from '@prisma/client';

import {
    playGameBaseInputSchema,
    playGameDetailsOutputSchema,
    playGameJoinLeavePayloadSchema,
    playGamePhaseDataSchema,
    playGamePlayerDetailsWithSelectedHeroIdSchema,
} from '../schemas/play-game.schemas';

import { playGameActions } from '../play-game.enums';

import { PlayGamePlayers } from '../../player/player.models';
import { PlayerKey } from '../../../models/common.models';
import { BaseCards } from '../../../data/minions/battle-cries/minions.battle-cries';

export type DurationInMs = number;

export type PlayGamePhaseData = z.infer<typeof playGamePhaseDataSchema>;

export type PlayGameData = PlayGamePhaseData & {
    minionTypes: Array<minionTypes>;
    availableCards: BaseCards;
};

export type PlayGame = {
    gameId: string;
    players: PlayGamePlayers;
} & PlayGameData;

export type PlayGameBaseInput = z.infer<typeof playGameBaseInputSchema>;

export type PlayGameJoinLeavePayload = z.infer<
    typeof playGameJoinLeavePayloadSchema
>;

export type PlayGameHeroSelected = {
    playerKey: string;
    selectedHeroId: heroIds;
};

export type PlayGameHeroesSelected = Array<PlayGameHeroSelected>;

export type PlayGameGameOver = {
    playerKey: PlayerKey;
    cards: Array<unknown>;
};

type PlayGameActionPayload = {
    [playGameActions.phaseChangedTo]: PlayGamePhaseData;
    [playGameActions.heroSelected]: PlayGameHeroSelected;
    [playGameActions.heroesSelected]: PlayGameHeroesSelected;
    [playGameActions.gameOver]: PlayGameGameOver;
};

export type PlayGameAction<T extends playGameActions> = {
    action: T;
    payload: PlayGameActionPayload[T];
};

export type GameActionHandlers = {
    [A in playGameActions]: (payload: PlayGameActionPayload[A]) => void;
};

export type PlayGameDetailsOutput = z.infer<typeof playGameDetailsOutputSchema>;
export type PlayGameDetailsPlayer =
    PlayGameDetailsOutput['players'] extends Array<infer R> ? R : never;
export type PlayGameDetailsPlayers = Array<PlayGameDetailsPlayer>;

export type PlayGamePlayerWithSelectedHeroId = Required<
    z.infer<typeof playGamePlayerDetailsWithSelectedHeroIdSchema>
>;
