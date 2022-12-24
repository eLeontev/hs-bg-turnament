import { pendingGameApiUrl } from '../constants/urls';
import { CreatePendingGameBody } from '../models/pending-games.models';
import { getLogin, getPlayerId } from '../utils.ts/storage.utils';
import { postEndoint } from './http.service';

export const createPendingGame = () =>
    postEndoint<any, CreatePendingGameBody>(pendingGameApiUrl, {
        authorId: getPlayerId() as string,
        authorLogin: getLogin() as string,
    });
