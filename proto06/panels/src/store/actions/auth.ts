import { createAction } from '@reduxjs/toolkit';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import { USERViewInterface } from '@/types/types-pages';


export const userLoginAction = createAction<{username: string, password: string, twoFactorToken?: string}>('USER_LOGIN_ACTION');
// export const userLoginSuccess = createAction<string>('USER_LOGIN_SUCCESS');
export const userLoginActionProgress = createAction<number>("USER_LOGIN_ACTION_PROGRESS");
export const userLoginActionFailure = createAction<string>('USER_LOGIN_ACTION_FAILURE');


export const userLogout = createAction('USER_LOGOUT');
export const userLoginActionSuccess = createAction(
    "USER_LOGIN_SUCCESS",
    (jwt: string, user: USERViewInterface, employee_detail: EMPLOYEESViewInterface) => ({ payload: { jwt, user, employee_detail } })
);

// New actions
export const fetchUserData = createAction<{id: number | undefined | null}>('FETCH_USER_DATA');
export const fetchUserDataSuccess = createAction(
  'FETCH_USER_DATA_SUCCESS',
  (employee_detail: EMPLOYEESViewInterface) => ({ payload: { employee_detail } })
);
export const fetchUserDataFailure = createAction('FETCH_USER_DATA_FAILURE');

