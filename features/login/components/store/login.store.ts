import { create } from 'zustand';
import { PlayerLogin } from '../../../../models/common.models';

import { noLogin } from '../../login.constants';

export type LoginState = {
    login: PlayerLogin;
};

export type LoginStateApi = {
    setLogin: (login: PlayerLogin) => void;
};

const initialState: LoginState = {
    login: noLogin,
};
export const useLoginStore = create<LoginState & LoginStateApi>((set) => ({
    ...initialState,

    setLogin: (login: PlayerLogin) => set({ login }),
}));

export const setLoginSelector = ({ setLogin }: LoginStateApi) => setLogin;

export const loginSelector = ({ login }: LoginState) => login;
export const isLoggedInSelector = (state: LoginState) =>
    Boolean(loginSelector(state));
