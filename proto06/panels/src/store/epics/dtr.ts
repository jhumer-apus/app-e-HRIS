import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import Cookies from 'js-cookie';
import { APILink } from '../configureStore';
import { 
  viewAllDtrLogs, 
  viewAllDtrLogsSuccess, 
  viewAllDtrLogsFailure,
  viewFilterDtrLogs, 
  viewFilterDtrLogsSuccess, 
  viewFilterDtrLogsFailure,
  viewMergedDtrLogs,
  viewMergedDtrLogsSuccess,
  viewMergedDtrLogsFailure,
  viewFilterMergedDtrLogs,
  viewFilterMergedDtrLogsSuccess,
  viewFilterMergedDtrLogsFailure,
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
import { beautifyJSON } from '@/helpers/utils';
import axiosInstance from '@/helpers/axiosConfig';

const viewAllDtrLogsApiCall = async () => {
    const response = await axiosInstance.get(`dtr/`);
    return response.data;
};

const viewFilterDtrLogsApiCall = async (payload:any) => {
  const response = await axiosInstance.get(`dtr/`, {
    params: {
      month: payload.month,
      year: payload.year,
      emp_no: payload.emp_no
    }
  });
  return response.data;
};

const viewMergedDtrLogsApiCall = async () => {
  const response = await axiosInstance.get(`dtr_summary/`);
  return response.data;
};

const viewFilterMergedDtrLogsApiCall = async (payload:any) => {
  const response = await axiosInstance.get(`dtr_summary/`, {
    params: {
      cutoff: payload.cutoff_id,
      emp_no: payload.emp_no
    }
  });
  return response.data;
};

const viewCutoffDtrSummaryApiCall = async (payload:any) => {

    const emp_no = payload.emp_no
    const cutoff_id = payload?.cutoff_id

    if(emp_no){

      const response = await axiosInstance.get(`dtr_cutoff_summary/${emp_no}`);
      return response.data;

    } else{

      const response = await axiosInstance.get(`dtr_cutoff_summary`,{
        params: {
          cutoff_code: cutoff_id
        }
      });
      return response.data;

    }

};

const getCutoffDTRListApiCall = async () => {
  const response = await axiosInstance.get(`cutoff_period/`);
  return response.data;
};

const getCutoffDTRListEmployeeApiCall = async (cutoff_code: number) => {
  if(Number.isNaN(cutoff_code)){
    return;
  }
  const response = await axiosInstance.get(`dtr_summary/cutoff_period/${cutoff_code}/`
  , {
    onDownloadProgress: (progressEvent) => {
      if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      }
    }
  }
  );
  return response.data;
};

const mergeCutoffListAndEmployeeApiCall = async ( {emp_no, cutoff_code} : CutoffListMergeSelectionState ) => {

  // const response = await axiosInstance.post(`https://bitverse-api.herokuapp.com/login`, {
  // const response = await axiosInstance.post(`http://172.16.168.144:8888/login`, {
  const response = await axiosInstance.post(`mergedtr/`, {
  emp_no,
  cutoff_code,
  }
  ,
  {
    onDownloadProgress: (progressEvent) => {
      if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(mergeCutoffListAndEmployeeProgress(progress))
      }
    }
  }
);
return response.data.message;
};


const summarizeCutoffListAndEmployeeApiCall = async ( {emp_no, cutoff_code} : CutoffListMergeSelectionState ) => {
  const response = await axiosInstance.post(`create_summary/`, {
  emp_no,
  cutoff_code,
  }
  ,
  {
    onDownloadProgress: (progressEvent) => {
      if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(summarizeCutoffListAndEmployeeProgress(progress))
      }
    }
  }
);
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
          return viewAllDtrLogsSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            return of(viewAllDtrLogsFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(viewAllDtrLogsFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const viewFilterDtrLogsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(viewFilterDtrLogs.type),
    switchMap((action) =>
      from(
        viewFilterDtrLogsApiCall(action.payload)
      ).pipe(
        map((data) => {
          return viewFilterDtrLogsSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            return of(viewFilterDtrLogsFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(viewFilterDtrLogsFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const viewFilterMergedDtrLogsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(viewFilterMergedDtrLogs.type),
    switchMap((action) =>
      from(
        viewFilterMergedDtrLogsApiCall(action.payload)
      ).pipe(
        map((data) => {
          return viewFilterMergedDtrLogsSuccess(data);
        }),
        catchError((error) => {

          if (error.response && error.response.data && error.response.data.error) {
            return of(viewFilterMergedDtrLogsFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(viewFilterMergedDtrLogsFailure(error.message)); // If there is no custom error message, use the default one
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
    switchMap((action) =>
      from(
        viewCutoffDtrSummaryApiCall(action.payload)
      ).pipe(
        map((data) => {
          return viewCutoffDtrSummarySuccess(data);
        }),
        catchError((error) => {
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
          if (error.response && error.response.data && (error.response.data.error || error.response.data['Error Message'])) {
            return of(mergeCutoffListAndEmployeeFailure((error.response.data.error || error.response.data['Error Message']))); // Extract error message from the response
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
    switchMap((action: ReturnType<typeof summarizeCutoffListAndEmployee>) =>
      from(
        summarizeCutoffListAndEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return summarizeCutoffListAndEmployeeSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && (error.response.data.error || error.response.data['Error Message'])) {
            return of(summarizeCutoffListAndEmployeeFailure((error.response.data.error || error.response.data['Error Message']))); // Extract error message from the response
          } else {
            return of(summarizeCutoffListAndEmployeeFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);