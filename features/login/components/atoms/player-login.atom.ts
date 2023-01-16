import { atom } from 'recoil';
import { noLogin } from '../../login.constants';

export const playerLoginState = atom({
    key: 'playerLogin',
    default: noLogin,
});
