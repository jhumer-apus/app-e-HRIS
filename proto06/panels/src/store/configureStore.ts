import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { authReducer } from './reducers/auth';
import { employeesReducer } from './reducers/employees';
import { authEpic, fetchUserDataEpic } from './epics/auth';
import { employeesListEpic, employeesSpecificEpic } from './epics/employees';
import { dtrReducer } from './reducers/dtr';
import { viewAllDtrLogsEpic, viewMergedDtrLogsEpic, viewCutoffDtrSummaryEpic, getCutoffDTRListEpic, getCutoffDTRListEmployeeEpic, mergeCutoffListAndEmployeeEpic, summarizeCutoffListAndEmployeeEpic } from './epics/dtr';
import { payrollReducer } from './reducers/payroll';
import { processPayrollEpic, viewPayrollListEpic } from './epics/payroll';
import { 
  HolidayCreateEpic, 
  HolidayEditSubmitEpic, 
  HolidaysGetEpic, 
  //OBT SECTION
  OBTCreateEpic, 
  OBTEditEpic, 
  OBTViewEpic, 
  OBTViewFilterApproverEpic, 
  OBTViewFilterEmployeeAndOBTEpic, 
  OBTViewFilterEmployeeEpic,
  //OVERTIME SECTION
  OVERTIMECreateEpic, 
  OVERTIMEEditEpic, 
  OVERTIMEViewEpic, 
  OVERTIMEViewFilterApproverEpic, 
  OVERTIMEViewFilterEmployeeAndOVERTIMEEpic, 
  OVERTIMEViewFilterEmployeeEpic,
  //LEAVE SECTION
  LEAVECreateEpic, 
  LEAVEEditEpic, 
  LEAVEViewEpic, 
  LEAVEViewFilterApproverEpic, 
  LEAVEViewFilterEmployeeAndLEAVEEpic, 
  LEAVEViewFilterEmployeeEpic,
  //UA SECTION
  UACreateEpic, 
  UAEditEpic, 
  UAViewEpic, 
  UAViewFilterApproverEpic, 
  UAViewFilterEmployeeAndUAEpic, 
  UAViewFilterEmployeeEpic,
  //LEAVECREDIT SECTION
  LEAVECREDITCreateEpic, 
  LEAVECREDITEditEpic, 
  LEAVECREDITViewEpic, 
  LEAVECREDITViewFilterEmployeeEpic,
  //LEAVETYPE SECTION
  LEAVETYPECreateEpic, 
  LEAVETYPEEditEpic, 
  LEAVETYPEViewEpic, 
  LEAVETYPEViewFilterEmployeeEpic,
  LEAVETYPEDeleteEpic,
  //CUTOFFPERIOD SECTION
  CUTOFFPERIODCreateEpic, 
  CUTOFFPERIODEditEpic, 
  CUTOFFPERIODViewEpic, 
  CUTOFFPERIODViewFilterCUTOFFPERIODEpic,
  //SCHEDULESHIFT SECTION
  SCHEDULESHIFTCreateEpic, 
  SCHEDULESHIFTEditEpic, 
  SCHEDULESHIFTViewEpic, 
  SCHEDULESHIFTViewFilterSCHEDULESHIFTEpic,
  SCHEDULESHIFTDeleteEpic,  
  //SCHEDULEDAILY SECTION
  SCHEDULEDAILYCreateEpic, 
  SCHEDULEDAILYEditEpic, 
  SCHEDULEDAILYViewEpic, 
  SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYEpic, 
  SCHEDULEDAILYViewFilterEmployeeEpic,
} from './epics/procedurals';
import {
  BRANCHCreateEpic,
  BRANCHEditEpic,
  BRANCHViewEpic,
  BRANCHViewSpecificEpic,
  DEPARTMENTCreateEpic,
  DEPARTMENTEditEpic,
  DEPARTMENTViewEpic,
  DEPARTMENTViewSpecificEpic,
  DIVISIONEditEpic,
  DIVISIONCreateEpic,
  DIVISIONViewEpic,
  DIVISIONViewSpecificEpic,
  PAYROLLGROUPCreateEpic,
  PAYROLLGROUPEditEpic,
  PAYROLLGROUPViewEpic,
  PAYROLLGROUPViewSpecificEpic,
  POSITIONCreateEpic,
  POSITIONEditEpic,
  POSITIONViewEpic,
  POSITIONViewSpecificEpic,
  RANKCreateEpic,
  RANKEditEpic,
  RANKViewEpic,
  RANKViewSpecificEpic,
} from './epics/categories';
import { proceduralsReducer } from './reducers/procedurals';
import { categoriesReducer } from './reducers/categories';
import { USERCreateEpic, USEREditEpic, USERResetPasswordEpic, USERViewEpic, USERViewSpecificEpic } from './epics/users';
import { usersReducer } from './reducers/users';
import { ALLOWANCEENTRYCreateEpic, ALLOWANCEENTRYEditEpic, ALLOWANCEENTRYViewEpic, ALLOWANCEENTRYViewSpecificEpic, ALLOWANCETYPECreateEpic, ALLOWANCETYPEEditEpic, ALLOWANCETYPEViewEpic, ALLOWANCETYPEViewSpecificEpic, CASHADVANCECreateEpic, CASHADVANCEEditEpic, CASHADVANCEViewEpic, CASHADVANCEViewSpecificEmployeeEpic, CASHADVANCEViewSpecificEpic, PAGIBIGCreateEpic, PAGIBIGEditEpic, PAGIBIGViewEpic, PAGIBIGViewSpecificEpic, PHILHEALTHCreateEpic, PHILHEALTHEditEpic, PHILHEALTHViewEpic, PHILHEALTHViewSpecificEpic, SSSCreateEpic, SSSEditEpic, SSSViewEpic, SSSViewSpecificEpic, TAXCreateEpic, TAXEditEpic, TAXViewEpic, TAXViewSpecificEpic } from './epics/payroll-variables';
import { payrollVariablesReducer } from './reducers/payroll-variables';
import { payrollEOYReducer } from './reducers/payroll-eoy';
import { ACTIVEANNOUNCEMENTViewEpic, ANNOUNCEMENTCreateEpic, ANNOUNCEMENTEditEpic, ANNOUNCEMENTViewEpic, ANNOUNCEMENTViewSpecificEpic, ASSETACCOUNTCreateEpic, ASSETACCOUNTEditEpic, ASSETACCOUNTViewEpic, ASSETACCOUNTViewSpecificEmployeeEpic, ASSETACCOUNTViewSpecificEpic, ASSETLISTCreateEpic, ASSETLISTEditEpic, ASSETLISTViewEpic, ASSETLISTViewSpecificEpic, BONUSENTRYCreateEpic, BONUSENTRYEditEpic, BONUSENTRYViewEpic, BONUSENTRYViewSpecificEmployeeEpic, BONUSENTRYViewSpecificEpic, BONUSLISTCreateEpic, BONUSLISTEditEpic, BONUSLISTViewEpic, BONUSLISTViewSpecificEpic, PAY13THCreateEpic, PAY13THViewEpic, PAY13THViewSpecificEpic, TAXCOLLECTEDViewEpic, TAXCOLLECTEDViewSpecificEmployeeEpic } from './epics/payroll-eoy';

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  dtr: dtrReducer,
  payroll: payrollReducer,
  procedurals: proceduralsReducer,
  categories: categoriesReducer,
  users: usersReducer,
  payrollVariables: payrollVariablesReducer,
  payrollEOY: payrollEOYReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(combineEpics(
  authEpic, 
  fetchUserDataEpic, 
  employeesListEpic, 
  employeesSpecificEpic,
  viewAllDtrLogsEpic, 
  viewMergedDtrLogsEpic, 
  viewCutoffDtrSummaryEpic,
  getCutoffDTRListEpic,
  getCutoffDTRListEmployeeEpic,
  mergeCutoffListAndEmployeeEpic,
  summarizeCutoffListAndEmployeeEpic,
  viewPayrollListEpic,
  processPayrollEpic,
  HolidayCreateEpic,
  HolidaysGetEpic,
  HolidayEditSubmitEpic,
  //OBT SECTION
  OBTViewEpic,
  OBTViewFilterEmployeeEpic,
  OBTViewFilterEmployeeAndOBTEpic,
  OBTViewFilterApproverEpic,
  OBTCreateEpic,
  OBTEditEpic,
  //OVERTIME SECTION
  OVERTIMEViewEpic,
  OVERTIMEViewFilterEmployeeEpic,
  OVERTIMEViewFilterEmployeeAndOVERTIMEEpic,
  OVERTIMEViewFilterApproverEpic,
  OVERTIMECreateEpic,
  OVERTIMEEditEpic,
  //LEAVE SECTION
  LEAVEViewEpic,
  LEAVEViewFilterEmployeeEpic,
  LEAVEViewFilterEmployeeAndLEAVEEpic,
  LEAVEViewFilterApproverEpic,
  LEAVECreateEpic,
  LEAVEEditEpic,
  //UA SECTION
  UAViewEpic,
  UAViewFilterEmployeeEpic,
  UAViewFilterEmployeeAndUAEpic,
  UAViewFilterApproverEpic,
  UACreateEpic,
  UAEditEpic,
  //LEAVECREDIT SECTION
  LEAVECREDITViewEpic,
  LEAVECREDITViewFilterEmployeeEpic,
  LEAVECREDITCreateEpic,
  LEAVECREDITEditEpic,
  //LEAVETYPE SECTION
  LEAVETYPEViewEpic,
  LEAVETYPEViewFilterEmployeeEpic,
  LEAVETYPECreateEpic,
  LEAVETYPEEditEpic,
  LEAVETYPEDeleteEpic,
  //CUTOFFPERIOD SECTION
  CUTOFFPERIODViewEpic,
  CUTOFFPERIODViewFilterCUTOFFPERIODEpic,
  CUTOFFPERIODCreateEpic,
  CUTOFFPERIODEditEpic,
  //SCHEDULESHIFT SECTION
  SCHEDULESHIFTViewEpic,
  SCHEDULESHIFTViewFilterSCHEDULESHIFTEpic,
  SCHEDULESHIFTCreateEpic,
  SCHEDULESHIFTEditEpic,
  SCHEDULESHIFTDeleteEpic,
  //SCHEDULEDAILY SECTION
  SCHEDULEDAILYViewEpic,
  SCHEDULEDAILYViewFilterEmployeeEpic,
  SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYEpic,
  SCHEDULEDAILYCreateEpic,
  SCHEDULEDAILYEditEpic,
  BRANCHCreateEpic,
  BRANCHEditEpic,
  BRANCHViewEpic,
  BRANCHViewSpecificEpic,
  DEPARTMENTCreateEpic,
  DEPARTMENTEditEpic,
  DEPARTMENTViewEpic,
  DEPARTMENTViewSpecificEpic,
  DIVISIONEditEpic,
  DIVISIONCreateEpic,
  DIVISIONViewEpic,
  DIVISIONViewSpecificEpic,
  PAYROLLGROUPCreateEpic,
  PAYROLLGROUPEditEpic,
  PAYROLLGROUPViewEpic,
  PAYROLLGROUPViewSpecificEpic,
  POSITIONCreateEpic,
  POSITIONEditEpic,
  POSITIONViewEpic,
  POSITIONViewSpecificEpic,
  RANKCreateEpic,
  RANKEditEpic,
  RANKViewEpic,
  RANKViewSpecificEpic,
  USERCreateEpic,
  USERViewEpic,
  USEREditEpic,
  USERViewSpecificEpic,
  USERResetPasswordEpic,
  PHILHEALTHViewEpic,
  PHILHEALTHViewSpecificEpic,
  PHILHEALTHCreateEpic,
  PHILHEALTHEditEpic,
  SSSViewEpic,
  SSSViewSpecificEpic,
  SSSCreateEpic,
  SSSEditEpic,
  PAGIBIGViewEpic,
  PAGIBIGViewSpecificEpic,
  PAGIBIGCreateEpic,
  PAGIBIGEditEpic,
  TAXViewEpic,
  TAXViewSpecificEpic,
  TAXCreateEpic,
  TAXEditEpic,
  CASHADVANCEViewEpic,
  CASHADVANCEViewSpecificEpic,
  CASHADVANCEViewSpecificEmployeeEpic,
  CASHADVANCECreateEpic,
  CASHADVANCEEditEpic,
  ALLOWANCETYPEViewEpic,
  ALLOWANCETYPEViewSpecificEpic,
  ALLOWANCETYPECreateEpic,
  ALLOWANCETYPEEditEpic,
  ALLOWANCEENTRYViewEpic,
  ALLOWANCEENTRYViewSpecificEpic,
  ALLOWANCEENTRYCreateEpic,
  ALLOWANCEENTRYEditEpic,
  ASSETACCOUNTViewEpic,
  ASSETACCOUNTViewSpecificEpic,
  ASSETACCOUNTViewSpecificEmployeeEpic,
  ASSETACCOUNTCreateEpic,
  ASSETACCOUNTEditEpic,
  ASSETLISTViewEpic,
  ASSETLISTViewSpecificEpic,
  ASSETLISTCreateEpic,
  ASSETLISTEditEpic,
  ANNOUNCEMENTViewEpic,
  ANNOUNCEMENTViewSpecificEpic,
  ANNOUNCEMENTCreateEpic,
  ANNOUNCEMENTEditEpic,
  TAXCOLLECTEDViewEpic,
  TAXCOLLECTEDViewSpecificEmployeeEpic,
  PAY13THViewEpic,
  PAY13THViewSpecificEpic,
  PAY13THCreateEpic,
  BONUSLISTViewEpic,
  BONUSLISTViewSpecificEpic,
  BONUSLISTCreateEpic,
  BONUSLISTEditEpic,
  BONUSENTRYViewEpic,
  BONUSENTRYViewSpecificEpic,
  BONUSENTRYViewSpecificEmployeeEpic,
  BONUSENTRYCreateEpic,
  BONUSENTRYEditEpic,
  ACTIVEANNOUNCEMENTViewEpic
));

export type RootState = ReturnType<typeof rootReducer>;
// export const APILink = 'http://18.141.159.149:8000/api/v1/';
// export const APILink = 'https://mercovsk1.pythonanywhere.com/api/v1/';
export const APILink = 'http://192.168.0.101:8000/api/v1/';
export default store;