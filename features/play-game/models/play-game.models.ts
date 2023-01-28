import { z } from 'zod';
import { heroIds, playGamePhases } from '@prisma/client';

import {
    playGameBaseInputSchema,
    playGameDetailsOutputSchema,
    playGameJoinLeavePayloadSchema,
    playGamePlayerDetailsWithSelectedHeroIdSchema,
    playGameSelectHeroSchema,
} from '../schemas/play-game.schemas';

import { playGameActions } from '../play-game.enums';

import { PlayGamePlayers } from '../../player/player.models';

export type PlayGamePhaseData = {
    phase: playGamePhases;
    phaseDurationInMs: number;
    phaseStartDate: string;
    round: number;
};

export type PlayGameData = PlayGamePhaseData & {};

export type PlayGame = {
    gameId: string;
    players: PlayGamePlayers;
} & PlayGameData;

export type PlayGameBaseInput = z.infer<typeof playGameBaseInputSchema>;

export type PlayGameSelectHeroInput = z.infer<typeof playGameSelectHeroSchema>;

export type PlayGameJoinLeavePayload = z.infer<
    typeof playGameJoinLeavePayloadSchema
>;

export type DurationInMs = number;

export type PlayGamePhases = {
    phase: playGamePhases;
    phaseDurationInMs: DurationInMs;
};

export type PlayGameHeroSelected = {
    playerKey: string;
    selectedHeroId: heroIds;
};

type PlayGameActionPayload = {
    [playGameActions.phaseChangedTo]: PlayGamePhases;
    [playGameActions.heroSelected]: PlayGameHeroSelected;
};

export type PlayGameAction<T extends playGameActions> = {
    action: T;
    payload: PlayGameActionPayload[T];
};

export type GameActionHandlers = {
    [A in playGameActions]: (payload: PlayGameActionPayload[A]) => void;
};

export type PlayGameDetailsOutput = z.infer<typeof playGameDetailsOutputSchema>;
export type PlayGameDetailsPlayers = PlayGameDetailsOutput['players'];

export type PlayGamePlayerWithSelectedHeroId = Required<
    z.infer<typeof playGamePlayerDetailsWithSelectedHeroIdSchema>
>;
