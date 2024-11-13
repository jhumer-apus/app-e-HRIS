import dayjs, { Dayjs } from "dayjs";
import { Internal_User_Role } from "../types-store";

export type previewDtrCsvItem = {
    bio_id: string;
    date_time: string;
    work_status: string;
};


export type DTRCutoffSummaryType = {
    id: number;
    business_date_from: string;
    business_date_to: string;
    paid_leaves_total: number;
    reg_ot_total: number;
    nd_ot_total: number;
    sp_holiday_total: number;
    sp_holiday_total_hours: number;
    reg_holiday_total: number;
    absent_total: number;
    leaves_type_used?: string | null;
    overbreak_total?: string | number | null;
    lates_total: number;
    undertime_total: number;
    total_hours: number;
    is_processed: boolean;
    date_deleted?: string | null;
    emp_no: number;
    cutoff_code: number;
};

export type DTRCutoffListType = {
    id: number;
    co_name: string;
    co_description: string;
    co_date_from: string;
    co_date_to: string;
    reg_days_total: number;
    co_is_processed: boolean;
    credit_date: string;
    payroll_group_code: number;
    division_code: number;
}

export type DTRCutoffListEmployees = {
    id: number;
    user: object | null;
    employee_image: string | null;
    emp_no: number;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    suffix: string | null;
    birthday: string;
    birth_place: string | null;
    civil_status: string;
    gender: string;
    address: string;
    provincial_address: string | null;
    mobile_phone: string;
    email_address: string;
    bio_id: number | null;
    date_hired: string;
    date_separation: string | null;
    approver: number;
    date_added: string;
    date_deleted: string | null;
    city_code: number | null;
    branch_code: number | null;
    department_code: number | null;
    division_code: number | null;
    position_code: number | null;
    rank_code: number | null;
    payroll_group_code: number;
    tax_code: string | null;
    pagibig_code: string | null;
    sssid_code: string | null;
    philhealth_code: string | null;
}


export type CutoffListMergeSelectionState = {
    emp_no: number[],
    cutoff_code: number,
}



export type ViewPayrollPayPerEmployee = {
    id: number;
    cutoff: DTRCutoffListType;
    dtr_cutoff: DTRCutoffSummaryType;
    emp_cname: string;
    run_date: string;
    accnt_no: string;
    salary_basic: number;
    salary_allowance: number;
    salary_other: number;
    salary_type: string;
    work_days_total: number;
    daily_salary_basic: number;
    daily_salary_allowance: number;
    daily_salary_other: number;
    leaves_amount_a: number;
    ot_amount_a: number;
    nd_amount_a: number;
    reg_holiday_amount_a: number;
    sp_holiday_amount_a: number;
    lates_amount_d: number;
    utime_amount_d: number;
    sssc_amount_d: number;
    sss_cashloan_d: number;
    sss_calloan_d: number;
    pagibigc_amount_d: number;
    pagibig_cloan_d: number;
    pagibig_hloan_d: number;
    pagibig_calloan_d: number;
    philhealthc_amount_d: number;
    cash_advance_amount_d: number;
    insurance_d: number;
    other_d: number;
    gross_pay: number;
    tax_amount_d: number;
    net_pay: number;
    absent_amount: number;
    date_deleted: string | null;
    is_payslip_printed: boolean;
    pr_cutoff_code: number;
    emp_no: number;
    cutoff_summary_code: number;
}


export const PaySlipDataInitialState: ViewPayrollPayPerEmployee = {
    id: 0,
    cutoff: {
        id: 0,
        co_name: '',
        co_description: '',
        co_date_from: '',
        co_date_to: '',
        reg_days_total: 0,
        co_is_processed: false,
        credit_date: '',
        payroll_group_code: 0,
        division_code: 0,
    },
    dtr_cutoff: {
        id: 0,
        business_date_from: '',
        business_date_to: '',
        paid_leaves_total: 0,
        reg_ot_total: 0,
        nd_ot_total: 0,
        sp_holiday_total: 0,
        sp_holiday_total_hours: 0,
        reg_holiday_total: 0,
        absent_total: 0,
        leaves_type_used: '',
        overbreak_total: '',
        lates_total: 0,
        undertime_total: 0,
        total_hours: 0,
        is_processed: false,
        date_deleted: '',
        emp_no: 0,
        cutoff_code: 0,
    },
    emp_cname: '',
    run_date: '',
    accnt_no: '',
    salary_basic: 0,
    salary_allowance: 0,
    salary_other: 0,
    salary_type: '',
    work_days_total: 0,
    daily_salary_basic: 0,
    daily_salary_allowance: 0,
    daily_salary_other: 0,
    leaves_amount_a: 0,
    ot_amount_a: 0,
    nd_amount_a: 0,
    reg_holiday_amount_a: 0,
    sp_holiday_amount_a: 0,
    lates_amount_d: 0,
    utime_amount_d: 0,
    sssc_amount_d: 0,
    sss_cashloan_d: 0,
    sss_calloan_d: 0,
    pagibigc_amount_d: 0,
    pagibig_cloan_d: 0,
    pagibig_hloan_d: 0,
    pagibig_calloan_d: 0,
    philhealthc_amount_d: 0,
    cash_advance_amount_d: 0,
    insurance_d: 0,
    other_d: 0,
    gross_pay: 0,
    tax_amount_d: 0,
    net_pay: 0,
    absent_amount: 0,
    date_deleted: '',
    is_payslip_printed: false,
    pr_cutoff_code: 0,
    emp_no: 0,
    cutoff_summary_code: 0,
}

export type ProcessPayroll = {
    emp_no: number[] | null,
    cutoff_code: number,
    is_disabled_loan: boolean,
    is_ca: boolean,
    is_pagibig_house: boolean,
    is_pagibig_cal: boolean,
    is_pagibig_cash: boolean,
    is_sss_cal: boolean,
    is_sss_cash: boolean,
    is_disabled_deduction: boolean,
    is_30: boolean,
    is_70: boolean,
}


export type HolidayLocationType = 'city' | 'City' | 'province' | 'Province' | 'national' | 'National' | '' | string;

export type HolidayGetType = {
    id?: number,
    holiday_date: string | null,
    holiday_description: string | null,
    holiday_type: string,
    holiday_location: HolidayLocationType,
    province_ref: number | null,
    city_ref: number | null,
    added_by: number
};


export interface OBTCreateInterface {
    emp_no: number | null;
    obt_type: string | null;
    obt_type_id: number | null;
    obt_remarks: string | null;
    obt_business_date: string | null;
    obt_date_from: Dayjs | string | null;
    obt_date_to: Dayjs | string | null;
    added_by?: string | number | null
}

export interface OBTViewInterface extends OBTCreateInterface { 
    [key: string]: string | number | null | Dayjs;
    id: number,
    obt_date_filed: string;
    obt_approval_status: string;
    obt_total_hours: number;
    obt_reason_disapproval: string | null,
    obt_date_approved1: string | null;
    obt_date_approved2: string | null,
    obt_approver1_empno: number | null;
    obt_approver2_empno: number | null,
    cutoff_code: number;
    applicant_rank: number;
}

export interface OBTEditInterface extends OBTViewInterface {}

export const OBTViewFilterEmployeeInitialState: OBTViewInterface = {
    id: 0,
    obt_reason_disapproval: null,
    obt_date_approved1: null,
    obt_date_approved2: null,
    obt_date_filed: '',
    obt_type: '',
    obt_remarks: null,
    obt_date_from: '',
    obt_date_to: '',
    obt_approval_status: '',
    obt_total_hours: 0,
    obt_approver1_empno: null,
    obt_approver2_empno: null,
    emp_no: 0,
    cutoff_code: 0,
    applicant_rank: NaN,
}


export interface OVERTIMECreateInterface {
    emp_no: number;
    ot_type: string | null;
    ot_remarks: string | null;
    ot_date_from: string | null;
    ot_date_to: string | null;
    ot_business_date: string | null;
    added_by?: string | number | null
}

export interface OVERTIMEViewInterface extends OVERTIMECreateInterface { 
    id: number,
    ot_reason_disapproval: string | null,
    ot_reason_cancelled: string | null,
    approver1_name: string | null,
    approver2_name: string | null,
    ot_date_approved1: string | null;
    ot_date_approved2: string | null;
    ot_approver1_empno: number | null;
    ot_approver2_empno: number | null;
    ot_date_filed: string;
    cutoff_code: number;
    applicant_rank: number;
    ot_approval_status: string;
    ot_total_hours: number;
    emp_name: string
}

export interface OVERTIMEEditInterface extends OVERTIMEViewInterface {}


export interface LEAVECreateInterface {
    leave_type: number | null;
    leave_type_name?: string
    leave_remarks: string | null;
    leave_date_from: string | null;
    leave_date_to: string | null;
    emp_no: number | null;
    uploaded_file: File | null;
    added_by: string | number | null;
    emergency_reasons?: string | null;
    leave_credit: any,
    option: string
}

export interface LEAVEViewInterface extends LEAVECreateInterface { 
    id: number;
    leave_reason_disapproval: string | null;
    leave_reason_cancelled: string | null;
    leave_date_approved1: string | null;
    leave_date_approved2: string | null;
    leave_date_filed: string;
    leave_approval_status: string;
    leave_total_hours: number;
    leave_approver1_empno: number | null;
    leave_approver2_empno: number | null;
    leave_number_days: number;
    cutoff_code: number;
    applicant_rank: number;
    emp_name:string,
    leave_file_path:string|null;
    // added_by: string | number | null | undefined;
    is_sl: boolean,
    is_vl: boolean,
    is_el: boolean,
    approver1_name: string | null,
    approver2_name: string | null
}

export interface LEAVEEditInterface extends LEAVEViewInterface {}




export interface UACreateInterface {
    ua_description: string | null;
    ua_date_from: string | null;
    ua_date_to: string | null;
    emp_no: number;
    added_by?: string | number | null
}

export interface UAViewInterface extends UACreateInterface { 
    id: number;
    ua_date_filed: string;
    ua_approval_status: string;
    ua_reason_disapproval: string | null;
    ua_total_hours: number;
    ua_approver1_empno: number | null;
    ua_date_approved1: string | null;
    ua_approver2_empno: number | null;
    ua_date_approved2: string | null;
    cutoff_code: number;
    applicant_rank: number;
    emp_name: string
    ua_type: string
}

export interface UAEditInterface extends UAViewInterface {}


// Cases:

// Case 1: Newly Created Leaves: PENDING
// ua_approval_status: "PND"; ** default is Pending ** 
// ua_approver1_empno: number | null; ** auto generated based on emp_profile ** 
// ua_approver2_empno: number | null; ** auto generated based on emp_profile ** 
// ua_reason_disapproval: null; ** default is null - meaning newly created ** 
// ua_date_approved1: string | null; ** remains null because - denied(IF HAS REMARK)/(OTHERWISE)pending ** YES UI Frontend Edit Access **
// ua_date_approved2: string | null; ** remains null because - denied(IF HAS REMARK)/(OTHERWISE)pending ** YES UI Frontend Edit Access **


// Case 2: Denied Leaves: (if 1 approver)
// ua_approval_status: "PND"; ** default is Pending ** No UI Frontend Edit Access ** Backend will change the status to DSP due to remark **
// ua_approver1_empno: number; ** auto generated based on emp_profile **  No UI Frontend Edit Access **
// ua_approver2_empno: number | null; ** auto generated based on emp_profile ** No UI Frontend Edit Access **
// ua_reason_disapproval: string; ** if has remark, meaning, approver 1 denied ** Yes UI Frontend Edit Access **
// ua_date_approved1: string | null; ** remains null because - denied(IF HAS REMARK)/(OTHERWISE)pending ** YES UI Frontend Edit Access **
// ua_date_approved2: string | null; ** remains null because - NO APPROVER2 ** YES UI Frontend Edit Access **

// Case 3: Denied Leaves: (if 2 approver - approver 1 ignored? approver 2 denied)
// ua_approval_status: "PND"; ** default is Pending ** No UI Frontend Edit Access ** Backend will change the status to DSP due to remark **
// ua_approver1_empno: number; ** auto generated based on emp_profile **  No UI Frontend Edit Access **
// ua_approver2_empno: number | null; ** auto generated based on emp_profile ** No UI Frontend Edit Access **
// ua_reason_disapproval: string; ** if has remark, meaning, approver 1 ignored but approver 2 denied** Yes UI Frontend Edit Access **
// ua_date_approved1: string | null; ** remains null because - denied(IF HAS REMARK)/(OTHERWISE)pending ** YES UI Frontend Edit Access **
// ua_date_approved2: string | null; ** remains null because - denied(IF HAS REMARK)/(OTHERWISE)pending ** YES UI Frontend Edit Access **

// Case 4: Denied Leaves: (if 2 approver - approver 1 denied? approver 2 not necessary?)
// ua_approval_status: "PND"; ** default is Pending ** No UI Frontend Edit Access ** Backend will change the status to DSP due to remark **
// ua_approver1_empno: number; ** auto generated based on emp_profile **  No UI Frontend Edit Access **
// ua_approver2_empno: number | null; ** auto generated based on emp_profile ** No UI Frontend Edit Access **
// ua_reason_disapproval: string; ** if has remark, meaning, approver 1 denied and approver 2 dont need to change** Yes UI Frontend Edit Access **
// ua_date_approved1: null; ** remains null because - denied(IF HAS REMARK)/(OTHERWISE)pending ** YES UI Frontend Edit Access **
// ua_date_approved2: null; ** remains null because - denied(IF HAS REMARK)/(OTHERWISE)pending ** YES UI Frontend Edit Access **

// Case 5: Approved Leaves: (if 2 approver - approver 1 approved? approver 2 approved?)
// ua_approval_status: "PND"; ** default is Pending ** No UI Frontend Edit Access ** Backend will change the status to APD due to remark **
// ua_approver1_empno: number; ** auto generated based on emp_profile **  No UI Frontend Edit Access **
// ua_approver2_empno: number | null; ** auto generated based on emp_profile ** No UI Frontend Edit Access **
// ua_reason_disapproval: string | null; ** if NULL remark, meaning, approver 1 APPROVED and approver 2 ALSO APPROVED** Yes UI Frontend Edit Access **
// ua_date_approved1: string | null; ** if has STRING - Meaning approver1 APPROVED ** YES UI Frontend Edit Access **
// ua_date_approved2: string | null; ** if has STRING - Meaning approver2 APPROVED ** YES UI Frontend Edit Access **

// Case 6: Pending Leaves: (if 2 approver - approver 1 approved? approver 2 Pending?)
// ua_approval_status: "PND"; ** default is Pending ** No UI Frontend Edit Access ** Backend will change the status to APD due to remark **
// ua_approver1_empno: number; ** auto generated based on emp_profile **  No UI Frontend Edit Access **
// ua_approver2_empno: number | null; ** auto generated based on emp_profile ** No UI Frontend Edit Access **
// ua_reason_disapproval: string; ** if Null remark, meaning, approver 1 APPROVED and approver 2 is PENDING** Yes UI Frontend Edit Access **
// ua_date_approved1: string | null; ** if has STRING - Meaning approver1 APPROVEDE ** YES UI Frontend Edit Access **
// ua_date_approved2: string | null; ** remains null because - approver2 denied(if has remarks)/(otherwise)pending ** YES UI Frontend Edit Access **

// Case 7: Approved Leaves: (if 1 approver - approver 1 approved?)
// ua_approval_status: "PND"; ** default is Pending ** No UI Frontend Edit Access ** Backend will change the status to APD due to remark **
// ua_approver1_empno: number; ** auto generated based on emp_profile **  No UI Frontend Edit Access **
// ua_approver2_empno: number | null; ** auto generated based on emp_profile ** No UI Frontend Edit Access **
// ua_reason_disapproval: string; ** if NULL remark, meaning, approver 1 APPROVED and approver 2 is NULL** Yes UI Frontend Edit Access **
// ua_date_approved1: string | null; ** if has STRING - Meaning approver1 APPROVED ** YES UI Frontend Edit Access **
// ua_date_approved2: string | null; ** remains null because - NO APPROVER2 ** YES UI Frontend Edit Access **




export interface LEAVECREDITCreateInterface {
    // allowed_days: number | null,
    expiry: string | null,
    emp_no: number | null,
    leave_type_code: number | null,
    credit_max: number | null,
    added_by: number | string | null | undefined
    credit_remaining: number | null
}

export interface LEAVECREDITViewInterface extends LEAVECREDITCreateInterface { 
    id: number | null;
    leave_name: string | null;
    date_deleted: string | null;
    credit_used: number | null,
    credit_remaining: number | null,
    is_converted: boolean | null,
    date_added: string | null,
    added_by: string | number | null
    leave_type_data: any
}

export interface LEAVECREDITEditInterface extends LEAVECREDITViewInterface {}



export interface LEAVETYPECreateInterface {
    name: string | null,
    is_paid: boolean | null,
    is_sl: boolean | null
    is_vl: boolean | null
    is_el: boolean | null
    added_by: number | string
}

export interface LEAVETYPEViewInterface extends LEAVETYPECreateInterface { 
    id: number | null;
    date_added: string | null;
    date_deleted: string | null;
}

export interface LEAVETYPEEditInterface extends LEAVETYPEViewInterface {}




export interface CUTOFFPERIODCreateInterface {
    co_name: string | null;
    co_description: string | null;
    co_date_from: string | null;
    co_date_to: string | null;
    reg_days_total: number | null;
    credit_date: string | null;
    payroll_group_code: number | null;
    division_code: number | null;
}

export interface CUTOFFPERIODViewInterface extends CUTOFFPERIODCreateInterface { 
    id: number;
    co_is_processed: boolean;
    payroll_group_name: string | null
    division_name: string | null
}

export interface CUTOFFPERIODEditInterface extends CUTOFFPERIODViewInterface {}


export interface SCHEDULESHIFTCreateInterface {
    name: string | null;
    time_in: string | null;
    time_out: string | null;
    grace_period: number | null;
    with_overtime: boolean | null;
    lunch_time_start: Date | string | null | Dayjs;
    lunch_time_end: Date | string | null | Dayjs;
    lunch_break_start: Date | string | null | Dayjs;
    lunch_break_end: Date | string | null | Dayjs;
    added_by: number | string
}

export interface SCHEDULESHIFTViewInterface extends SCHEDULESHIFTCreateInterface { 
    [key: string]: boolean | string | number | null;
    id: number;
    is_night_shift: boolean;
    date_deleted: string;
}

export interface SCHEDULESHIFTEditInterface extends SCHEDULESHIFTViewInterface {}



export interface SCHEDULEDAILYGeneric {
    is_restday: boolean;
    sched_default: boolean | null;
}

export interface SCHEDULEDAILYCreateInterface extends SCHEDULEDAILYGeneric{
    business_date_from: string | null;
    business_date_to: string | null;  
    emp_no: number[] | [];
    schedule_shift_code: number;
    day_off: string[];
    added_by?:number | string | null
}

export interface SCHEDULEDAILYViewInterface extends SCHEDULEDAILYGeneric { 
    readonly id: number
    full_name: string
    schedule_shift_code: SCHEDULESHIFTViewInterface
    business_date: string
    is_processed: boolean | null
    emp_no: number,
    holiday_type: "LH" | "SH" | null
    holiday:any
    lunch_break_start: Date | string | Dayjs | null
    lunch_break_end: Date | string | Dayjs | null
}

export interface SCHEDULEDAILYEditInterface extends SCHEDULEDAILYGeneric {
    id: number;
    schedule_shift_code: number | null;
    business_date: string;
    emp_no: number;
}

// ============================================
export interface BRANCHGenericInterface {
    branch_name: string,
    branch_address: string,
    branch_email: string,
    branch_contact_number: string,
    branch_city: number | null,
    branch_province: number | null,
    branch_oic: number,
    branch_province: number | null,
    branch_city: number | null
}

export interface BRANCHViewInterface extends BRANCHGenericInterface{
    readonly id: number,
    readonly date_added: string,
    readonly date_deleted: string | null,
}

export interface BRANCHCreateInterface extends BRANCHGenericInterface{
    added_by?: number,
}

export interface BRANCHEditInterface extends BRANCHGenericInterface, BRANCHCreateInterface, BRANCHViewInterface {}

// ============================================
export interface DEPARTMENTGenericInterface {
    dept_name: string,
    dept_lead: number,
    dept_branch_code: number,
}

export interface DEPARTMENTViewInterface extends DEPARTMENTGenericInterface{
    readonly id: number,
    readonly date_added: string,
    readonly date_deleted: string | null,
}

export interface DEPARTMENTCreateInterface extends DEPARTMENTGenericInterface{
    added_by?: number,
}

export interface DEPARTMENTEditInterface extends DEPARTMENTGenericInterface, DEPARTMENTCreateInterface, DEPARTMENTViewInterface {}

// ============================================
export interface DIVISIONGenericInterface {
    div_name: string,
    div_lead: number,
    div_branch_code: number,
}

export interface DIVISIONViewInterface extends DIVISIONGenericInterface{
    readonly id: number,
    readonly date_added: string,
    readonly date_deleted: string | null,
}

export interface DIVISIONCreateInterface extends DIVISIONGenericInterface{
    added_by?: number,
}

export interface DIVISIONEditInterface extends DIVISIONGenericInterface, DIVISIONCreateInterface, DIVISIONViewInterface {}

// ============================================
export interface PAYROLLGROUPGenericInterface {
    name: string,
    payroll_description: string | null,
    payroll_freq: number | null,
}

export interface PAYROLLGROUPViewInterface extends PAYROLLGROUPGenericInterface{
    readonly id: number,
    readonly date_added: string,
    readonly date_deleted: string | null,
    used_account: number,
}

export interface PAYROLLGROUPCreateInterface extends PAYROLLGROUPGenericInterface, Pick<PAYROLLGROUPViewInterface, "used_account">{
    added_by?: number,
}

export interface PAYROLLGROUPEditInterface extends PAYROLLGROUPGenericInterface, PAYROLLGROUPCreateInterface, PAYROLLGROUPViewInterface {}


// ============================================
export interface POSITIONGenericInterface {
    pos_name: string,
    pos_description: string | null,
}

export interface POSITIONViewInterface extends POSITIONGenericInterface{
    readonly id: number,
    readonly date_added: string,
    readonly date_deleted: string | null,
}

export interface POSITIONCreateInterface extends POSITIONGenericInterface{
    added_by?: number,
}

export interface POSITIONEditInterface extends POSITIONGenericInterface, POSITIONCreateInterface, POSITIONViewInterface {}

// ============================================ 
export interface RankDataInterface { 
    date_added: string;
    date_deleted: string | null;
    hierarchy: number;
    id: number;
    is_approver: boolean;
    rank_description: string;
    rank_name: string;
}


export interface RANKGenericInterface {
    rank_name: string,
    rank_description: string,
    is_approver: boolean,
    hierarchy: number,
}

export interface RANKViewInterface extends RANKGenericInterface{
    readonly id: number,
    date_added: string,
    date_deleted: string | null,
}

export interface RANKCreateInterface extends RANKGenericInterface{
    added_by?: number,
}

export interface RANKEditInterface extends RANKGenericInterface, RANKCreateInterface, RANKViewInterface {}


// ============================================ 

export interface USERGenericInterface {
    username: string
    role: Internal_User_Role
    emp_no: number
    added_by?: number
}

export interface USERViewInterface extends Omit<USERGenericInterface, "added_by?">{
    readonly id: number
    readonly is_superuser: boolean
    is_active: boolean
    readonly is_logged_in: boolean
    is_locked: boolean
    readonly failed_login_attempts: number
    readonly last_login: string
    readonly old_password: string //writeonly on database
    readonly date_password_changed: string | null
    readonly date_added: string
    readonly date_deleted: string | null
    readonly groups: number[] | string[]
    readonly user_permissions: number[] | string []
    readonly is_temp: boolean
}


export interface USERCreateInterface extends USERGenericInterface{
    password: string,
    is_temp: boolean
}

export interface USEREditInterface extends USERGenericInterface, Pick<USERViewInterface, "is_active" | "is_locked" | "id"> {}

export interface USERResetPasswordInterface extends Pick<USERGenericInterface, "added_by">, Pick<USERViewInterface, "id">{
    new_password: string,
    repeat_new_password: string,
    is_temp: boolean
}

export interface ViolationType {
    id?: number | null
    name: string,
    description: string
}