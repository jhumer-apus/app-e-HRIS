import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap, tap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import Cookies from 'js-cookie'
import { userLoginAction, userLoginActionSuccess, userLoginActionProgress, userLoginActionFailure } from '../actions/auth';
import { Epic } from 'redux-observable';
import { APILink } from '../configureStore';
import store from '../configureStore';

import { fetchUserData, fetchUserDataSuccess, fetchUserDataFailure, } from '../actions/auth';
import axiosInstance from '@/helpers/axiosConfig';

const loginApiCall = async (username: string, password: string, twoFactorToken?: string) => {
    // const response = await axiosInstance.post("https://bitverse-api.herokuapp.com/login", {
    // const response = await axiosInstance.post("http://172.16.168.144:8888/login", {
    const response = await axios.post(`${APILink}/api/v1/login/`, 
      {
        username,
        password,
        ...(twoFactorToken ? { twoFactorToken } : {}),
      },
      {
        onDownloadProgress: (progressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(userLoginActionProgress(progress));
          }
        }
    }
  );
  return response.data;
};

export const authEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(userLoginAction.type),
    switchMap((action: ReturnType<typeof userLoginAction>) =>
      from(
        loginApiCall(action.payload.username, action.payload.password, action.payload.twoFactorToken)
      ).pipe(
        map((data) => {
          // Save the token in a secure cookie with an expiration time of 6 hour

          const isSecure = import.meta.env.VITE_APP_STATUS != "development"

          console.log(" Is Secure:" + isSecure)
          const {access , refresh, user, employee_detail} = data

          Cookies.set('user', JSON.stringify(user), { expires: 6 / 24, secure: isSecure });
          Cookies.set('access_token', access, { expires: 6 / 24, secure: isSecure });
          Cookies.set('refresh_token', refresh, { expires: 6 / 24, secure: isSecure });
          // Cookies.set('employee_detail', JSON.stringify(employee_detail), { expires: 6 / 24, secure: isSecure });
          // Cookies.set('emp_deez', employeeDetailJson, { expires: 6 / 24, secure: isSecure });

          
          return userLoginActionSuccess(access, user, employee_detail);
        }),
        catchError((error) => {

          console.log(error)
          if (error.response && error.response.data && error.response?.data) {
            return of(userLoginActionFailure(error.response.data?.detail || error.response.data["Error Message"] || "Error Logging In Please Contact IT Support")); // Extract error message from the response
          } else {
            return of(userLoginActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// New API call function
const fetchUserDataApiCall = async (id: number | undefined | null) => {
  const response = await axiosInstance.get(`employees/${id}/`);
  return response.data;
};

// New Epic
export const fetchUserDataEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(fetchUserData.type),
    // tap(action => console log here('Received action in Epic:', action)), // Console logger
    switchMap((action: ReturnType<typeof fetchUserData>) =>
      from(fetchUserDataApiCall(action.payload.id)).pipe(
        map((data) => {

          const isSecure = import.meta.env.VITE_APP_STATUS != "development"

          Cookies.set('emp_', JSON.stringify(data), { expires: 6 / 24, secure: isSecure });
          // Cookies.set('token', data.jwt, { expires: 6 / 24, secure: false});
          // Cookies.set('emp_deetz', JSON.stringify(data.employee_detail), { expires: 6 / 24, secure: false })
          Cookies.set('user', JSON.stringify(data.user), { expires: 6 / 24, secure: isSecure });
          return fetchUserDataSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            return of(fetchUserDataFailure(error.response.data.error)); 
          } else {
            return of(fetchUserDataFailure(error.message)); 
          }
        })
      )
    )
  );
