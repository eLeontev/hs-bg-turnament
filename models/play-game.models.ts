import { z } from 'zod';
import { playGameActions, playGamePhases } from '../enums/play-game.enums';

import { playGameBodySchema } from '../schemas/play-game.schemas';

import { Players } from './player-id.models';

export type PlayGameData = {
    phase: playGamePhases;
};

export type PlayGame = {
    gameID: string;
    players: Players;
} & PlayGameData;

export type PlayGameBody = z.infer<typeof playGameBodySchema>;

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
