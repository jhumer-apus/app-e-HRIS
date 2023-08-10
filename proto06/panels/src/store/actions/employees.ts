import { createAction } from '@reduxjs/toolkit';
import { GetEmployeesListsType } from '@/types/types-store';


export const getEmployeesList = createAction("GET_EMPLOYEES");
export const getEmployeesListSuccess = createAction("GET_EMPLOYEES_LIST_SUCCESS", (list: Array<GetEmployeesListsType>) => { 
    return({ payload: {list} })});
export const getEmployeesListFailure = createAction<String>("GET_EMPLOYEES_LIST_FAILURE");


export const getSpecificEmployeeInfo = createAction<{employee_id: number}>("GET_SPECIFIC_EMPLOYEE_INFO");
export const getSpecificEmployeeInfoSuccess = createAction("GET_SPECIFIC_EMPLOYEE_INFO_SUCCESS", (list: GetEmployeesListsType) => ({ payload: {list} }));
export const getSpecificEmployeeInfoFailure = createAction<String>("GET_SPECIFIC_EMPLOYEE_INFO_FAILURE");