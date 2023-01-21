import { z } from 'zod';
import { playGamePhases } from '@prisma/client';

import {
    playGameBaseInputSchema,
    playGameDetailsOutputSchema,
    playGameJoinLeavePayloadSchema,
    playGamePlayerDetailsWithSelectedHeroIdSchema,
    playGameSelectHeroSchema,
} from '../schemas/play-game.schemas';

import { playGameActions } from '../play-game.enums';

import { PlayGamePlayers } from '../../player/player.models';
import { HeroId } from './play-game.hero.models';

export type PlayGameData = {
    phase: playGamePhases;
};

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
    type: playGamePhases;
    duration: DurationInMs;
};

export type PlayGameHeroSelected = {
    playerKey: string;
    heroId: HeroId;
};

type PlayGameActionPayload = {
    [playGameActions.phaseChangedTo]: PlayGamePhases;
    [playGameActions.heroSelected]: PlayGameHeroSelected;
};

export type PlayGameAction<T extends playGameActions> = {
    action: T;
    payload: PlayGameActionPayload[T];
};

export type PlayGameActions = Array<PlayGameAction<playGameActions>>;

export type PlayGameDetailsOutput = z.infer<typeof playGameDetailsOutputSchema>;
export type PlayGameDetailsPlayers = PlayGameDetailsOutput['players'];

export type PlayGamePlayerWithSelectedHeroId = Required<
    z.infer<typeof playGamePlayerDetailsWithSelectedHeroIdSchema>
>;
