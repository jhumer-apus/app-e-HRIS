import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import Cookies from 'js-cookie';
import { 
  viewAllDtrLogs, 
  viewAllDtrLogsSuccess, 
  viewAllDtrLogsFailure,
  viewMergedDtrLogs,
  viewMergedDtrLogsSuccess,
  viewMergedDtrLogsFailure,
  viewCutoffDtrSummary,
  viewCutoffDtrSummarySuccess,
  viewCutoffDtrSummaryFailure,
  getCutoffList,
  getCutoffListSuccess,
  getCutoffListFailure,
  getCutoffListEmployee,
  getCutoffListEmployeeSuccess,
  getCutoffListEmployeeFailure,
  mergeCutoffListAndEmployee,
  mergeCutoffListAndEmployeeSuccess,
  mergeCutoffListAndEmployeeProgress,
  mergeCutoffListAndEmployeeFailure,
  summarizeCutoffListAndEmployee,
  summarizeCutoffListAndEmployeeFailure,
  summarizeCutoffListAndEmployeeSuccess,
  summarizeCutoffListAndEmployeeProgress
} from '../actions/dtr';
import { Epic } from 'redux-observable';
import { CutoffListMergeSelectionState } from '@/types/types-pages';
import store from '../configureStore';

const viewAllDtrLogsApiCall = async () => {
    const response = await axios.get("http://172.16.168.155:8000/api/dtr");
    return response.data;
};

const viewMergedDtrLogsApiCall = async () => {
    const response = await axios.get("http://172.16.168.155:8000/api/dtr_summary/");
    return response.data;
};

const viewCutoffDtrSummaryApiCall = async () => {
    const response = await axios.get("http://172.16.168.155:8000/api/dtr_cutoff_summary/");
    return response.data;
};

const getCutoffDTRListApiCall = async () => {
  const response = await axios.get("http://172.16.168.155:8000/api/cutoff_period/");
  return response.data;
};

const getCutoffDTRListEmployeeApiCall = async (cutoff_code: number) => {
  // console.log(cutoff_code, "haaaaa?")
  if(Number.isNaN(cutoff_code)){
    return;
  }
  const response = await axios.get(`http://172.16.168.155:8000/api/cutoff_period/${cutoff_code}`
  , {
    onDownloadProgress: (progressEvent) => {
      if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(progress, "maattttyy", progressEvent.loaded, "ma?", progressEvent.total)
      }
    }
  }
  );
  console.log(response, "ajajaja?")
  return response.data;
};

const mergeCutoffListAndEmployeeApiCall = async ( {emp_no, cutoff_code} : CutoffListMergeSelectionState ) => {

  // const response = await axios.post("https://bitverse-api.herokuapp.com/login", {
  // const response = await axios.post("http://172.16.168.144:8888/login", {
  const response = await axios.post(`http://172.16.168.155:8000/api/mergedtr/`, {
  emp_no,
  cutoff_code,
  }
  ,
  {
    onDownloadProgress: (progressEvent) => {
      if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log("Merge progress:", progress, "Loaded:", progressEvent.loaded, "Total:", progressEvent.total)
        store.dispatch(mergeCutoffListAndEmployeeProgress(progress))
      }
    }
  }
);
// console.log(response, "aaa");
return response.data.message;
};


const summarizeCutoffListAndEmployeeApiCall = async ( {emp_no, cutoff_code} : CutoffListMergeSelectionState ) => {

  console.log(emp_no, cutoff_code, "haha????")
  const response = await axios.post(`http://172.16.168.155:8000/api/create_summary/`, {
  emp_no,
  cutoff_code,
  }
  ,
  {
    onDownloadProgress: (progressEvent) => {
      if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log("Merge progress:", progress, "Loaded:", progressEvent.loaded, "Total:", progressEvent.total)
        store.dispatch(summarizeCutoffListAndEmployeeProgress(progress))
      }
    }
  }
);
// console.log(response, "aaa");
return response.data.message;
};

export const viewAllDtrLogsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(viewAllDtrLogs.type),
    switchMap(() =>
      from(
        viewAllDtrLogsApiCall()
      ).pipe(
        map((data) => {
          // console.log("asdasdasdasd")
          // Save the token in a secure cookie with an expiration time of 1 hour
          // Cookies.set('token', data.jwt, { expires: 1 / 24, secure: true });
          // Cookies.set('user', JSON.stringify(data.user), { expires: 1 / 24, secure: true });
          // Cookies.set('employee_detail', JSON.stringify(data.employee_detail), { expires: 1 / 24, secure: true });
          // console.log(data, "viewAllDtrLogsSuccess");
          return viewAllDtrLogsSuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(viewAllDtrLogsFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(viewAllDtrLogsFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const viewMergedDtrLogsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(viewMergedDtrLogs.type),
    switchMap(() =>
      from(
        viewMergedDtrLogsApiCall()
      ).pipe(
        map((data) => {
          return viewMergedDtrLogsSuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(viewMergedDtrLogsFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(viewMergedDtrLogsFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const viewCutoffDtrSummaryEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(viewCutoffDtrSummary.type),
    switchMap(() =>
      from(
        viewCutoffDtrSummaryApiCall()
      ).pipe(
        map((data) => {
          return viewCutoffDtrSummarySuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(viewCutoffDtrSummaryFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(viewCutoffDtrSummaryFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const getCutoffDTRListEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getCutoffList.type),
    switchMap(() =>
      from(
        getCutoffDTRListApiCall()
      ).pipe(
        map((data) => {
          return getCutoffListSuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(getCutoffListFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(getCutoffListFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const getCutoffDTRListEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getCutoffListEmployee.type),
    switchMap((action: ReturnType<typeof getCutoffListEmployee>) =>
      from(
        getCutoffDTRListEmployeeApiCall(action?.payload?.cutoff_period)
      ).pipe(
        map((data) => {
          return getCutoffListEmployeeSuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(getCutoffListEmployeeFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(getCutoffListEmployeeFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const mergeCutoffListAndEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(mergeCutoffListAndEmployee.type),
    switchMap((action: ReturnType<typeof mergeCutoffListAndEmployee>) =>
      from(
        mergeCutoffListAndEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return mergeCutoffListAndEmployeeSuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(mergeCutoffListAndEmployeeFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(mergeCutoffListAndEmployeeFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const summarizeCutoffListAndEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(summarizeCutoffListAndEmployee.type),
    switchMap((action: ReturnType<typeof mergeCutoffListAndEmployee>) =>
      from(
        summarizeCutoffListAndEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return summarizeCutoffListAndEmployeeSuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(summarizeCutoffListAndEmployeeFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(summarizeCutoffListAndEmployeeFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);