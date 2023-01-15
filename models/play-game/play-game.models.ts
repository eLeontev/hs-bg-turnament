import { z } from 'zod';
import { playGamePhases } from '@prisma/client';

import {
    playGameBodySchema,
    playGameJoinLeavePayloadSchema,
} from '../../schemas/play-game.schemas';

import { playGameActions } from '../../enums/play-game.enums';

import { PlayGamePlayers } from '../player.models';

export type PlayGameData = {
    phase: playGamePhases;
};

export type PlayGame = {
    gameId: string;
    players: PlayGamePlayers;
} & PlayGameData;

export type PlayGameBody = z.infer<typeof playGameBodySchema>;

export type PlayGameJoinLeavePayload = z.infer<
    typeof playGameJoinLeavePayloadSchema
>;

export type DurationInMs = number;

export type PlayGamePhases = {
    type: playGamePhases;
    duration: DurationInMs;
};

type PlayGameActionPayload = {
    [playGameActions.phaseChangedTo]: PlayGamePhases;
};

export type PlayGameAction<T extends playGameActions> = {
    action: T;
    payload: PlayGameActionPayload[T];
};

export type PlayGameActions = Array<PlayGameAction<playGameActions>>;
