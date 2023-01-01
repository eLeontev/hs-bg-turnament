import { atom } from 'recoil';
import { noLogin } from '../../constants/login.constants';

export const playerLoginState = atom({
    key: 'playerLogin',
    default: noLogin,
});
