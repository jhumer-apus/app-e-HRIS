import { RankDataInterface, USERViewInterface } from "../types-pages";
import { PAGIBIGViewInterface, PHILHEALTHViewInterface, SSSViewInterface, TAXViewInterface } from "../types-payroll-variables";

export const INTERNAL_USER_ROLE = {
    Developer: 6,
    HR_Super_Admin: 5,
    HR_Director_Manager: 4,
    HR_Staff: 3,
    Manager: 2,
    Employee: 1,
} as const;

export type ObjectValues<T> = T[keyof T];
export type Internal_User_Role = ObjectValues<typeof INTERNAL_USER_ROLE>

// Enum is said to be dangerous and risky as it is unpredictable, please refer to this link:
// https://www.youtube.com/watch?v=jjMbPt_H3RQ
// export enum Internal_User_Role {
//     Developer = 6,
//     HR_Super_Admin = 5,
//     HR_Director_Manager = 4,
//     HR_Staff = 3,
//     Manager = 2,
//     Employee = 1,
// }

/** 
 * Order of Field is based on the postman tests of API response.
 * Do check with the backend team. 
 * @member Marc Rovic Baja
*/
export interface EMPLOYEESViewInterface {
    [key: string]: any,
    readonly id?: number
    rank_hierarchy: number
    user: USERViewInterface | null
    employee_image: string | null
    age: number | null //new 
    tax_data: TAXViewInterface | null | string  //new 
    pagibig_data: PAGIBIGViewInterface | null | string //new 
    sss_data:  SSSViewInterface | null | string //new 
    philhealth_data: PHILHEALTHViewInterface | null | string //new 
    emp_no: number
    first_name: string
    middle_name: string | null
    last_name: string
    suffix: string
    birthday: string | null
    birth_place: string | null
    civil_status: string
    gender: "M" | "F" | null
    address: string
    provincial_address: string | null
    mobile_phone: string
    email_address: string
    bio_id: EMPLOYEESViewInterface["emp_no"]
    telephone: string | null //new
    blood_type: string | null //new
    graduated_school: string | null //new
    profession: string | null //new 
    license_no: string | null //new 
    emergency_contact_person: string | null //new
    emergency_contact_number: string | null //new
    hmo: string | null
    other_duties_responsibilities: string | null //new
    payroll_no: string | null //new
    date_hired: string
    date_separation: string | null
    date_added: string
    date_deleted: string | null
    accnt_no: string
    emp_salary_basic: number
    emp_salary_type: string
    insurance_life: string | number | null
    other_deductible: string | number | null
    ecola: number | string | null
    approver1: number
    approver2: number | null 
    province_code: string | number,
    city_code: string | null 
    branch_code: number |null
    department_code: string | null
    division_code: string | null
    position_code: string | null
    rank_code: number
    payroll_group_code: number | string | null
    tax_code: string | null
    pagibig_code: string | null
    sssid_code: string
    philhealth_code: string | null
    separation_type: string | null
    // rank_data: RankDataInterface //deprecated
}

export interface ViewAllDtrLogsType {
    [key: string]: number | string | Date | boolean | undefined,
    readonly id?: number,
    datetime_bio: Date,
    flag1_in_out: boolean,
    flag2_lout_lin: boolean,
    entry_type: string,
    date_uploaded: Date,
    is_processed: boolean,
    emp_no: number,
    bio_id: number,
    branch_code: number,
    schedule_daily_code: number,
}

export interface ViewFilterDtrLogsType extends ViewAllDtrLogsType {}

export interface ViewMergedDtrLogsType {
    [key: string]: number | string | Date | boolean | null | undefined,
    readonly id?: number,
    business_date: Date,
    shift_name: string,
    duty_in: Date,
    dutiy_out: Date,
    sched_timein: string,
    sched_timeout: string,
    is_sched_restday: boolean,
    lunch_out: string | boolean,
    lunch_in: string | boolean,
    is_paid_leave: boolean,
    paid_leave_type: string | null,
    reg_ot_total: number,
    nd_ot_total: number,
    is_obt: boolean,
    is_sp_holiday: boolean,
    is_reg_holiday: boolean,
    is_ua: boolean,
    is_absent: boolean,
    overbreak: number | boolean,
    lates: number,
    undertime: number,
    total_hours: number,
    adjusted_timein: number | null,
    adjusted_timeout: number | null,
    is_computed: boolean,
    emp_no: number,
    cutoff_code: number,
}

export interface ViewMergedFilterDtrLogsType extends ViewMergedDtrLogsType{}

export interface ViewCutoffDtrSummaryType {
    [key: string]: number | Date | string | null | boolean | undefined,
    readonly id?: number,
    business_date_from: Date,
    business_date_to: Date,
    paid_leaves_total: number,
    reg_ot_total: number,
    nd_ot_total: number,
    sp_holiday_total: number,
    reg_holiday_total: number,
    absent_total: number,
    leaves_type_used: number | string | null,
    overbreak_total: number | null,
    lates_total: number,
    undertime_total: number,
    total_hours: number,
    is_processed: boolean,
    date_deleted: Date | null,
    emp_no: number,
    cutoff_code: number,
}


export type DtrData = Array<ViewAllDtrLogsType> | Array<ViewMergedDtrLogsType> | Array<ViewCutoffDtrSummaryType> | [];