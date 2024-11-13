import AdminPortal from "../pages/dashboard/admin-portal/adminPortal";
import CategoriesManagement from "../pages/dashboard/admin-portal/first-inner-pages/categories-management";
import ManageBRANCH from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-branch/manage-branch";
import ManageDEPARTMENT from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-department/manage-department";
import ManageDIVISION from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-division/manage-division";
import ManagePAYROLLGROUP from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-payrollgroup/manage-payrollgroup";
import ManagePOSITION from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-position/manage-position";
import ManageRANK from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-rank/manage-rank";
import ManageEmploymentStatusTypes from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-employment-status-type/manage-emp-status-type";
import ManageUSERS from "../pages/dashboard/admin-portal/first-inner-pages/manage-users/manage-users";
import PayrollVariablesMonthly from "../pages/dashboard/admin-portal/first-inner-pages/payroll-variables-monthly";
import PVMTAX from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-tax/pvm-tax";
import PVMPAGIBIG from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-pagibig/pvm-pagibig";
import PVMSSS from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-sss/pvm-sss";
import PVMPHILHEALTH from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-philhealth/pvm-philhealth";
import PVMCASHADVANCE from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-cash-advance/pvm-cash-advance";
import PVMALLOWANCEENTRY from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-allowance-entry/pvm-allowance-entry";
import PVMALLOWANCETYPE from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-allowance-type/pvm-allowance-type";
import PayrollEOY from "../pages/dashboard/admin-portal/first-inner-pages/payroll-eoy";
import EOYTAXCOLLECTEDPage from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/eoy-tax-collected/eoy-tax-collected-page";
import EOYPAY13TH from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/eoy-pay-13th/eoy-pay-13th";
import EOYBONUSLIST from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/eoy-bonus-list/eoy-bonus-list";
import EOYBonusEntry from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/eoy-bonus-entry/eoy-bonus-entry";
import AssetAndAnnouncement from "../pages/dashboard/admin-portal/first-inner-pages/asset-and-announcement";
import AAASSETACCOUNT from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/aa-asset-account/aa-asset-account";
import AAASSETLIST from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/aa-asset-list/aa-asset-list";
import AAANNOUNCEMENT from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/aa-announcement-configurations/aa-announcement-configuration";
import EmployeeAndApplicants from "../pages/dashboard/admin-portal/first-inner-pages/employee-and-applicants";
import EAKPIEVAL from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-kpi-evaluation/ea-kpi-evaluation";
import EAONBOARDINGSTATUS from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-initialize-onboarding/ea-initialize-onboarding";
import EAOFFBOARDINGSTATUS from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-initialize-offboarding/ea-initialize-offboarding";
import EAEVALQUESTIONS from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-kpi-questions/ea-eval-questions";
import EACORECOMPE from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-core-competencies/ea-core-competencies";
import EAONBOARDINGREQUIREMENTS from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-onboarding-requirements/ea-onboarding-requirements";
import EAOFFBOARDINGREQUIREMENTS from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-offboarding-requirements/ea-offboarding-requirements";
import EAAPPLICANTSLIST from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-applicants-list/ea-applicants-list";
import EAJOBPOSTINGS from "../pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-job-postings/ea-job-postings";
import { HomeIcon } from "@heroicons/react/24/solid";
import { INTERNAL_USER_ROLE } from "@/types/types-store";
import ManageViolationType from "@/pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-violation-type";

const icon = { className: "w-5 h-5 text-inherit" };

export const routesAdmin = (currentUserRole: number) => {

  return currentUserRole !== INTERNAL_USER_ROLE.Employee && currentUserRole !== INTERNAL_USER_ROLE.Manager ? {
    id: 11000,
    icon: null,
    name: "Dashboards",
    path: "/Dashboards",
    element: <strong style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}} className="text-red-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">YOU SHALL NOT PASS!!</strong>,
    hasSubItems: true,
    subItems: [
      {
        id: 11200,
        icon: <HomeIcon {...icon} />,
        name: "Admin Portal",
        path: "/Dashboards/Admin-Portal",
        element: <AdminPortal/>,
        hasSubItems: true,
        subItems: 
        [
          {
            id: 111000,
            icon: null,
            name: "Categories",
            path: "/Dashboards/Admin-Portal/Categories",
            element: <CategoriesManagement/>,
            hasSubItems: true,
            subItems: [
              {
                id: 1120000,
                icon: null,
                name: "Branch",
                path: "/Dashboards/Admin-Portal/Categories/Branch",
                element: <ManageBRANCH />,
                hasSubItems: false,
              },
              {
                id: 1120001,
                icon: null,
                name: "Department",
                path: "/Dashboards/Admin-Portal/Categories/Department",
                element: <ManageDEPARTMENT/>,
                hasSubItems: false,
              },
              {
                id: 1120002,
                icon: null,
                name: "Division",
                path: "/Dashboards/Admin-Portal/Categories/Division",
                element: <ManageDIVISION/>,
                hasSubItems: false,
              },
              {
                id: 1120003,
                icon: null,
                name: "Payroll Group",
                path: "/Dashboards/Admin-Portal/Categories/Payrollgroup",
                element: <ManagePAYROLLGROUP/>,
                hasSubItems: false,
              },
              {
                id: 1120004,
                icon: null,
                name: "Position",
                path: "/Dashboards/Admin-Portal/Categories/Position",
                element: <ManagePOSITION/>,
                hasSubItems: false,
              },
              {
                id: 1120005,
                icon: null,
                name: "Rank",
                path: "/Dashboards/Admin-Portal/Categories/Rank",
                element: <ManageRANK/>,
                hasSubItems: false,
              },
              {
                id: 1120006,
                icon: null,
                name: "Employment Status Type",
                path: "/Dashboards/Admin-Portal/Categories/Employment-Status-Type",
                element: <ManageEmploymentStatusTypes />,
                hasSubItems: false,
              },
              {
                id: 1120007,
                icon: null,
                name: "Violation Type",
                path: "/Dashboards/Admin-Portal/Categories/Violation-Type",
                element: <ManageViolationType />,
                hasSubItems: false,
              },
            ]
          },
          {
            id: 112000,
            icon: null,
            name: "Users",
            path: "/Dashboards/Admin-Portal/Users",
            element: <ManageUSERS/>,
            hasSubItems: false,
            subItems: []
          },
          {
            id: 113000,
            icon: null,
            name: "PVM",
            path: "/Dashboards/Admin-Portal/Payroll-Variables-Monthly",
            element: <PayrollVariablesMonthly/>,
            hasSubItems: true,
            subItems: [
              {
                id: 1120000,
                icon: null,
                name: "Tax",
                path: "/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Tax",
                element: <PVMTAX/>,
                hasSubItems: false,
              },
              {
                id: 1120001,
                icon: null,
                name: "PAGIBIG",
                path: "/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Pagibig",
                element: <PVMPAGIBIG/>,
                hasSubItems: false,
              },
              {
                id: 1120002,
                icon: null,
                name: "SSS",
                path: "/Dashboards/Admin-Portal/Payroll-Variables-Monthly/SSS",
                element: <PVMSSS/>,
                hasSubItems: false,
              },
              {
                id: 1120003,
                icon: null,
                name: "Philhealth",
                path: "/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Philhealth",
                element: <PVMPHILHEALTH/>,
                hasSubItems: false,
              },
              {
                id: 1120004,
                icon: null,
                name: "Cash Advance",
                path: "/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Cash-Advance",
                element: <PVMCASHADVANCE/>,
                hasSubItems: false,
              },
              {
                id: 1120005,
                icon: null,
                name: "Allowance Entry",
                path: "/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Allowance-Entry",
                element: <PVMALLOWANCEENTRY/>,
                hasSubItems: false,
              },
              {
                id: 1120006,
                icon: null,
                name: "Allowance Type",
                path: "/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Allowance-Type",
                element: <PVMALLOWANCETYPE/>,
                hasSubItems: false,
              },
            ]
          },
          {
            id: 114000,
            icon: null,
            name: "EOY",
            path: "/Dashboards/Admin-Portal/Payroll-EOY",
            element: <PayrollEOY/>,
            hasSubItems: true,
            subItems: [
              {
                id: 1140000,
                icon: null,
                name: "Tax Collected",
                path: "/Dashboards/Admin-Portal/Payroll-EOY/Tax-Collected",
                element: <EOYTAXCOLLECTEDPage/>,
                hasSubItems: false,
              },
              {
                id: 1140001,
                icon: null,
                name: "13th Month Pay",
                path: "/Dashboards/Admin-Portal/Payroll-EOY/13th-Month-pay",
                element: <EOYPAY13TH/>,
                hasSubItems: false,
              },
              {
                id: 1140002,
                icon: null,
                name: "Bonus List",
                path: "/Dashboards/Admin-Portal/Payroll-EOY/Bonus-List",
                element: <EOYBONUSLIST/>,
                hasSubItems: false,
              },
              {
                id: 1140003,
                icon: null,
                name: "Bonus Entries",
                path: "/Dashboards/Admin-Portal/Payroll-EOY/Bonus-Entries",
                element: <EOYBonusEntry/>,
                hasSubItems: false,
              },
            ]
          },
          {
            id: 115000,
            icon: null,
            name: "AAA",
            path: "/Dashboards/Admin-Portal/Assets-And-Announcement",
            element: <AssetAndAnnouncement/>,
            hasSubItems: true,
            subItems: [
              {
                id: 1150000,
                icon: null,
                name: "Asset Account",
                path: "/Dashboards/Admin-Portal/Assets-And-Announcement/Asset-Account",
                element: <AAASSETACCOUNT/>,
                hasSubItems: false,
              },
              {
                id: 1150001,
                icon: null,
                name: "Asset List",
                path: "/Dashboards/Admin-Portal/Assets-And-Announcement/Asset-List",
                element: <AAASSETLIST/>,
                hasSubItems: false,
              },
              {
                id: 1150002,
                icon: null,
                name: "Announcements",
                path: "/Dashboards/Admin-Portal/Assets-And-Announcement/Announcement-Configurations",
                element: <AAANNOUNCEMENT/>,
                hasSubItems: false,
              },
            ]
          },
          {
            id: 116000,
            icon: null,
            name: "Employee & Applicant Variables",
            path: "/Dashboards/Admin-Portal/Employee-And-Applicants",
            element: <EmployeeAndApplicants/>,
            hasSubItems: true,
            subItems: [
              {
                id: 1160000,
                icon: null,
                name: "KPI Evaluation",
                path: "/Dashboards/Admin-Portal/Employee-And-Applicants/KPI-Evaluation",
                element: <EAKPIEVAL/>,
                hasSubItems: false,
              },
              {
                id: 1160001,
                icon: null,
                name: "Initialize Onboarding",
                path: "/Dashboards/Admin-Portal/Employee-And-Applicants/Initialize-Onboarding",
                element: <EAONBOARDINGSTATUS/>,
                hasSubItems: false,
              },
              {
                id: 1160002,
                icon: null,
                name: "Initialize Offboarding",
                path: "/Dashboards/Admin-Portal/Employee-And-Applicants/Initialize-Offboarding",
                element: <EAOFFBOARDINGSTATUS/>,
                hasSubItems: false,
              },
              {
                id: 1160003,
                icon: null,
                name: "KPI Questions",
                path: "/Dashboards/Admin-Portal/Employee-And-Applicants/KPI-Questions",
                element: <EAEVALQUESTIONS/>,
                hasSubItems: false,
              },
              {
                id: 1160004,
                icon: null,
                name: "Core Competencies",
                path: "/Dashboards/Admin-Portal/Employee-And-Applicants/Core-Competencies",
                element: <EACORECOMPE/>,
                hasSubItems: false,
              },
              {
                id: 1160005,
                icon: null,
                name: "Onboarding Requirements",
                path: "/Dashboards/Admin-Portal/Employee-And-Applicants/Onboarding-Requirements",
                element: <EAONBOARDINGREQUIREMENTS/>,
                hasSubItems: false,
              },
              {
                id: 1160006,
                icon: null,
                name: "Offboarding",
                path: "/Dashboards/Admin-Portal/Employee-And-Applicants/Offboarding-Requirements",
                element: <EAOFFBOARDINGREQUIREMENTS/>,
                hasSubItems: false,
              },
              {
                id: 1160007,
                icon: null,
                name: "Applicants",
                path: "/Dashboards/Admin-Portal/Employee-And-Applicants/Applicants",
                element: <EAAPPLICANTSLIST/>,
                hasSubItems: false,
              },
              {
                id: 1160008,
                icon: null,
                name: "Job Posting",
                path: "/Dashboards/Admin-Portal/Employee-And-Applicants/Job-Posting",
                element: <EAJOBPOSTINGS/>,
                hasSubItems: false,
              },
            ]
          },
        ]
      },
    ]
  } : {}
}
