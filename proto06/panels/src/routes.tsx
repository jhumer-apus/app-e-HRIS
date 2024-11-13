import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  HeartIcon,
  DocumentIcon,
  SpeakerWaveIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/solid";
import SummarizeIcon from '@mui/icons-material/Summarize';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MergeIcon from '@mui/icons-material/Merge';
import TableViewIcon from '@mui/icons-material/TableView';
import HRISDashboard from "./pages/dashboard/hris-portal/hrisPortal";
import AdminPortal from "./pages/dashboard/admin-portal/adminPortal";
import { SignIn, SignUp } from "@/pages/auth";
import { IRoute } from "./types";
import ViewDtrReports from "./pages/dtr/view-dtr-reports/view-dtr-reports";
import UploadDtrLogs from "./pages/dtr/upload-dtr-logs/upload-dtr-logs";
import MergeDtrLogs from "./pages/dtr/merge-dtr-logs/merge-dtr-logs";
import CreateSummaryPage from "./pages/dtr/create-summary/create-summary";
import ViewPayroll from "./pages/payroll/view-all-payroll/view-all-payroll";
import ProcessPayrollPage from "./pages/payroll/process-payroll/process-payroll";
import ApprovalOutlinedIcon from '@mui/icons-material/ApprovalOutlined';
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import AppsOutageOutlinedIcon from '@mui/icons-material/AppsOutageOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';  
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SurfingOutlinedIcon from '@mui/icons-material/SurfingOutlined';
import HolidaysPage from "./pages/procedurals/holidays/holidays-page";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import NoCrashOutlinedIcon from '@mui/icons-material/NoCrashOutlined';
import ProceduralOBTPage from "./pages/procedurals/obt/procedural-obt-page";
import ProceduralOvertimePage from "./pages/procedurals/overtime/procedural-overtime-page";
import ProceduralLEAVEPage from "./pages/procedurals/leaves/procedural-leave-page";
import ProceduralUAPage from "./pages/procedurals/ua/procedural-ua-page";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import ApprovalUAPage from "./pages/pending-checklists/ua-approvals/approval-ua-page";
import ApprovalOvertimePage from "./pages/pending-checklists/ot-approvals/approval-overtime-page";
import ApprovalLEAVEPage from "./pages/pending-checklists/leave-approvals/approval-leave-page";
import ApprovalOBTPage from "./pages/pending-checklists/obt-approvals/approval-obt-page";
import CloudSyncSharpIcon from '@mui/icons-material/CloudSyncSharp';
import SettingsAccessibilitySharpIcon from '@mui/icons-material/SettingsAccessibilitySharp';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import FileOBTPage from "./pages/quick-accesses/file-obt/file-obt-page";
import FileOVERTIMEPage from "./pages/quick-accesses/file-ot/file-ot-page";
import FileUAPage from "./pages/quick-accesses/file-ua/file-ua-page";
import FileLEAVEPage from "./pages/quick-accesses/file-leave/file-leave-page";
import ProceduralLEAVECREDITPage from "./pages/procedurals/leave-credits/procedural-leave-credit-page";
import ProceduralLEAVETYPEPage from "./pages/procedurals/leave-types/procedural-leave-type-page";
import ProceduralCUTOFFPERIODPage from "./pages/procedurals/cutoff-periods/procedural-cutoff-period-page";
import ProceduralSCHEDULESHIFTSPage from "./pages/procedurals/schedule-shifts/procedural-schedule-shifts-page";
import ProceduralSCHEDULEDAILYpage from "./pages/procedurals/schedule-dailies/procedural-schedule-daily";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import YourSCHEDULEDAILYpage from "./pages/quick-accesses/your-schedule/your-schedule-daily";
import TestView from "./pages/announcement/test-view/test1";
import { useSelector } from "react-redux";
import { RootState } from "./store/configureStore";
import CategoriesManagement from "./pages/dashboard/admin-portal/first-inner-pages/categories-management";
import ManageBranch from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-branch/manage-branch";
import ManageDEPARTMENT from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-department/manage-department";
import ManageDIVISION from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-division/manage-division";
import ManagePAYROLLGROUP from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-payrollgroup/manage-payrollgroup";
import ManagePOSITION from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-position/manage-position";
import ManageRANK from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-rank/manage-rank";
import ManageUSERS from "./pages/dashboard/admin-portal/first-inner-pages/manage-users/manage-users";
import PayrollVariablesMonthly from "./pages/dashboard/admin-portal/first-inner-pages/payroll-variables-monthly";
import PVMTAX from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-tax/pvm-tax";
import PVMPAGIBIG from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-pagibig/pvm-pagibig";
import PVMSSS from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-sss/pvm-sss";
import PVMPHILHEALTH from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-philhealth/pvm-philhealth";
import PVMCASHADVANCE from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-cash-advance/pvm-cash-advance";
import PVMALLOWANCETYPE from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-allowance-type/pvm-allowance-type";
import PVMALLOWANCEENTRY from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/pvm-allowance-entry/pvm-allowance-entry";
import EOYBONUSLIST from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/eoy-bonus-list/eoy-bonus-list";
import PayrollEOY from "./pages/dashboard/admin-portal/first-inner-pages/payroll-eoy";
import EOYBonusEntry from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/eoy-bonus-entry/eoy-bonus-entry";
import EOYPAY13TH from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/eoy-pay-13th/eoy-pay-13th";
import EOYTAXCOLLECTEDPage from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/eoy-tax-collected/eoy-tax-collected-page";
import AssetAndAnnouncement from "./pages/dashboard/admin-portal/first-inner-pages/asset-and-announcement";
import AAASSETLIST from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/aa-asset-list/aa-asset-list";
import AAASSETACCOUNT from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/aa-asset-account/aa-asset-account";
import AAANNOUNCEMENT from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/aa-announcement-configurations/aa-announcement-configuration";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RuleFolderOutlinedIcon from '@mui/icons-material/RuleFolderOutlined';
import { EmployeeAndApplicants } from "./pages/dashboard/admin-portal/first-inner-pages/employee-and-applicants";
import EAKPIEVAL from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-kpi-evaluation/ea-kpi-evaluation";
import EAEVALQUESTIONS from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-kpi-questions/ea-eval-questions";
import EACORECOMPE from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-core-competencies/ea-core-competencies";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import EAONBOARDINGSTATUS from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-initialize-onboarding/ea-initialize-onboarding";
import EAOFFBOARDINGSTATUS from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-initialize-offboarding/ea-initialize-offboarding";
import EAONBOARDINGREQUIREMENTS from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-onboarding-requirements/ea-onboarding-requirements";
import EAOFFBOARDINGREQUIREMENTS from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-offboarding-requirements/ea-offboarding-requirements";
import DataTable from "./pages/employee/201-files/Employee201";
import EmployeesAppraisalPage from "./pages/employee/appraisals/employees-appraisal";
import YourKPICOREPage from "./pages/quick-accesses/your-evaluation/your-evaluation";
import AppraisalConfirmationKPICOREPage from "./pages/pending-checklists/kpi-appraisal-confirmations/pending-evaluation";
// import Test01 from "./pages/testing_pages/test01";
import APPRAISALDETAILSPage from "./pages/employee/appraisals/inner-page/appraisal-details-page/appraisal-details";
import AboutAppraisalsPage from "./pages/employee/about-appraisals/about-appraisals";
import EAAPPLICANTSLIST from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-applicants-list/ea-applicants-list";
import EAJOBPOSTINGS from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/ea-job-postings/ea-job-postings";
import OnboardingCF from "./pages/pending-checklists/onboarding-cf/onboarding-cf";
import OffboardingCF from "./pages/pending-checklists/offboarding-cf/offboarding-cf";
import B1Forms from "./pages/forms/b1-forms/b1-forms";
import B2Forms from "./pages/forms/b2-forms/b2-forms";
import { INTERNAL_USER_ROLE } from "./types/types-store";
import { Profile } from "./pages";
import ViewSpecificPayroll from "./pages/payroll/view-specific-payroll/view-specific-payroll";
import EmploymentHistoryPage from "./pages/employee/employment-history/employment-history";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';

import ViewMonthlySchedule from "./pages/reports/view-monthly-schedule";
// import ViewEmployeeLeaves from "./pages/reports/view-employee-leaves";
import ViewEmployeeLeaves from "./pages/reports/view-employee-leaves/leaves-by-cutoff";
// import ViewEmployeeOvertime from "./pages/reports/view-employee-overtime";
import ViewEmployeeOvertime from "./pages/reports/view-employee-overtime/ot-by-cutoff";
// import ViewEmployeeObt from "./pages/reports/view-employee-obt";
import ViewEmployeeObt from "./pages/reports/view-employee-obt/obt-by-cutoff";
import ViewPerfectAttendance from "./pages/reports/view-attendance/perfect-attendance";

import EMPSEMINARSPageV2 from "./pages/employee/emp-training-seminars-v2/emp-training-seminars";
import EmploymentHistoryPageEmpView from "./pages/employee/employment-history-emp-view/employment-history-emp-view";
import EMPSEMINARSPageV2EmpView from "./pages/employee/emp-training-seminars-v2-emp-view/emp-training-seminars-emp-view";
import ViewImperfectAttendance from "./pages/reports/view-attendance/imperfect-attendance";
import RecruitmentForms from "./pages/forms/recruitment-forms/recruitment-forms";
import PerformanceAppraisalForms from "./pages/forms/performance-forms/performance-appraisal-forms";
import TrainingForms from "./pages/forms/training-forms/training-forms";
import AttendanceForms from "./pages/forms/attendance-forms/attendance-forms";
import OtherForms from "./pages/forms/other-forms/other-forms";
import ExitForms from "./pages/forms/exit-forms/exit-forms";
import ManageEmploymentStatusTypes from "./pages/dashboard/admin-portal/first-inner-pages/second-inner-pages/cm-employment-status-type/manage-emp-status-type";
import FamilyBackground from "./pages/employee/family-background";
import OBTtypes from "./pages/procedurals/obt-types";
import { EmployeeProvider } from "./context/employee/EmployeeContext";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const JSXRouteWrapper = () => {
  const state = useSelector((state: RootState) => state.auth.employee_detail)
  const isAdmin = state?.user?.role !== INTERNAL_USER_ROLE.Employee && state?.user?.role !== INTERNAL_USER_ROLE.Manager

  const isBasicEmployee = state?.user?.role == INTERNAL_USER_ROLE.Employee
  const isDepartmentManager = state?.user?.role == INTERNAL_USER_ROLE.Manager
  const isHrStaff = state?.user?.role !== INTERNAL_USER_ROLE.HR_Staff
  const isHrDirectorManager = state?.user?.role !== INTERNAL_USER_ROLE.HR_Director_Manager
  const isHrSuperAdmin = state?.user?.role !== INTERNAL_USER_ROLE.HR_Super_Admin

  const routes: Array<IRoute> = [
    {
      id: 10000,
      layout: "home",
      pages: [
        ...(state?.user?.role !== INTERNAL_USER_ROLE.Employee && state?.user?.role !== INTERNAL_USER_ROLE.Manager) ? 
        [
          {
            id: 11000,
            icon: null,
            name: "Dashboards",
            path: "/Dashboards",
            element: <strong style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}} className="text-red-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">YOU SHALL NOT PASS!!</strong>,
            hasSubItems: true,
            // function 
            subItems: [
              // HIDDEN BECAUSE OF REDUNDANCY
              // {
              //   id: 11100,
              //   icon: <HomeIcon {...icon} />,
              //   name: "HRIS Dashboard",
              //   path: "/Dashboards/HRIS-Dashboard",
              //   element: <HRISDashboard />,
              //   hasSubItems: false,
              // },
              {
                id: 11200,
                icon: <HomeIcon {...icon} />,
                name: "Admin Portal",
                path: "/Dashboards/Admin-Portal",
                element: <AdminPortal/>,
                hasSubItems: true,
                subItems: 
                // function param na route
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
                        element: <ManageBranch/>,
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
          },
        ] : [],
        {
          id: 12000,
          icon: null,
          name: "Employees",
          path: "/employees",
          element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
          hasSubItems: true,
          subItems: [
            ...(state?.user?.role !== INTERNAL_USER_ROLE.Employee && state?.user?.role !== INTERNAL_USER_ROLE.Manager ) ? [
              {
                id: 12100,
                icon: <PersonOutlineOutlinedIcon {...icon} />,
                name: "201 Files",
                path: "/employees/201-files",
                element: <EmployeeProvider>
                            <DataTable/>
                          </EmployeeProvider>, 
                hasSubItems: true,
                subItems: [
                  {
                    id: 121000,
                    icon: <UserCircleIcon {...icon} />,
                    name: "201 Files",
                    path: "/employees/201-files/extra",
                    element: <h1>testing</h1>, 
                    hasSubItems: false,
                  },
                ]
              },
              // {
              //   id: 12200,
              //   icon: <InsertChartOutlinedIcon {...icon} />,
              //   name: "KPI Appraisals",
              //   path: "/employees/KPI-Appraisals",
              //   element:<EmployeesAppraisalPage/>,
              //   hasSubItems: true,
              //   subItems: [
              //     {
              //       id: 121000,
              //       icon: <UserCircleIcon {...icon} />,
              //       name: "201 Files",
              //       path: "/employees/KPI-Appraisals/:emp_no",
              //       element: <APPRAISALDETAILSPage/>, 
              //       hasSubItems: false,
              //     },
              //   ]
              // },
              {
                id: 12400,
                icon: <AutoStoriesOutlinedIcon {...icon} />,
                name: "Employment History",
                path: "/employees/Employment-History",
                element:<EmploymentHistoryPage/>,
                hasSubItems: false,
                // subItems: [
                //   {
                //     id: 121000,
                //     icon: <UserCircleIcon {...icon} />,
                //     name: "201 Files",
                //     path: "/employees/KPI-Appraisals/:emp_no",
                //     element: <APPRAISALDETAILSPage/>, 
                //     hasSubItems: false,
                //   },
                // ]
              },
              {
                id: 12500,
                icon: <Diversity3OutlinedIcon {...icon} />,
                name: "Training & Seminars",
                path: "/employees/Training-and-Seminars",
                element:<EMPSEMINARSPageV2/>,
                hasSubItems: false,
                // subItems: [
                //   {
                //     id: 121000,
                //     icon: <UserCircleIcon {...icon} />,
                //     name: "201 Files",
                //     path: "/employees/KPI-Appraisals/:emp_no",
                //     element: <APPRAISALDETAILSPage/>, 
                //     hasSubItems: false,
                //   },
                // ]
              },
            ] : [],
              // {
              //   id: 12500,
              //   icon: <Diversity3OutlinedIcon {...icon} />,
              //   name: "Training & Seminars",
              //   path: "/employees/Training-and-Seminars",
              //   element:<EMPSEMINARSPageV2/>,
              //   hasSubItems: false,
              //   // subItems: [
              //   //   {
              //   //     id: 121000,
              //   //     icon: <UserCircleIcon {...icon} />,
              //   //     name: "201 Files",
              //   //     path: "/employees/KPI-Appraisals/:emp_no",
              //   //     element: <APPRAISALDETAILSPage/>, 
              //   //     hasSubItems: false,
              //   //   },
              //   // ]
              // },
            // {
            //   id: 12300,
            //   icon: <PrivacyTipOutlinedIcon {...icon} />,
            //   name: "About KPI",
            //   path: "/employees/About-KPI",
            //   element: <AboutAppraisalsPage/>,
            //   hasSubItems: false,
            // },
            ...(state?.user?.role === INTERNAL_USER_ROLE.Employee || state?.user?.role === INTERNAL_USER_ROLE.Manager ) ? [
              {
                id: 12400,
                icon: <AutoStoriesOutlinedIcon {...icon} />,
                name: "Employment History",
                path: "/employees/Employment-History-E1",
                element:<EmploymentHistoryPageEmpView/>,
                hasSubItems: false,
                // subItems: [
                //   {
                //     id: 121000,
                //     icon: <UserCircleIcon {...icon} />,
                //     name: "201 Files",
                //     path: "/employees/KPI-Appraisals/:emp_no",
                //     element: <APPRAISALDETAILSPage/>, 
                //     hasSubItems: false,
                //   },
                // ]
              },
              {
                id: 12500,
                icon: <Diversity3OutlinedIcon {...icon} />,
                name: "Training & Seminars",
                path: "/employees/Training-and-Seminars-E1",
                element:<EMPSEMINARSPageV2EmpView/>,
                hasSubItems: false,
                // subItems: [
                //   {
                //     id: 121000,
                //     icon: <UserCircleIcon {...icon} />,
                //     name: "201 Files",
                //     path: "/employees/KPI-Appraisals/:emp_no",
                //     element: <APPRAISALDETAILSPage/>, 
                //     hasSubItems: false,
                //   },
                // ]
              },
            ] : [],
            // {
            //   id: 12600,
            //   icon: <Diversity3OutlinedIcon {...icon} />,
            //   name: "Family Background",
            //   path: "/employees/family-background",
            //   element:<FamilyBackground/>,
            //   hasSubItems: false,
            //   // subItems: [
            //   //   {
            //   //     id: 121000,
            //   //     icon: <UserCircleIcon {...icon} />,
            //   //     name: "201 Files",
            //   //     path: "/employees/KPI-Appraisals/:emp_no",
            //   //     element: <APPRAISALDETAILSPage/>, 
            //   //     hasSubItems: false,
            //   //   },
            //   // ]
            // },
          ]
        },
        {
          id: 13000,
          icon: null,
          name: "Quick Accesses",
          path: "/quick-accesses",
          element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
          hasSubItems: true,
          subItems: [
            {
              id: 13100,
              icon: <WorkOutlineOutlinedIcon {...icon} />,
              name: "File OBT",
              path: "/quick-accesses/file-OBT",
              element: <FileOBTPage/>, 
              hasSubItems: false,
            },
            {
              id: 13200,
              icon: <DifferenceOutlinedIcon {...icon} />,
              name: isDepartmentManager? "File Allowance Time": "File OT",
              path: `/quick-accesses/${isDepartmentManager? "file-allowance-time": "file-ot"}`,
              element: <FileOVERTIMEPage/>, 
              hasSubItems: false,
            },
            {
              id: 13300,
              icon: <SettingsAccessibilitySharpIcon {...icon} />,
              name: "File LEAVE",
              path: "/quick-accesses/file-LEAVE",
              element: <FileLEAVEPage/>, 
              hasSubItems: false,
            },
            ...(!isBasicEmployee && !isDepartmentManager) ? [
              {
                id: 13400,
                icon: <CloudSyncSharpIcon {...icon} />,
                name: "File UA",
                path: "/quick-accesses/file-UA",
                element: <FileUAPage/>, 
                hasSubItems: false,
              },
            ] : [],
            {
              id: 13500,
              icon: <HistoryToggleOffOutlinedIcon {...icon} />,
              name: "Your Schedule",
              path: "/quick-accesses/your-schedule",
              element: <YourSCHEDULEDAILYpage/>, 
              hasSubItems: false,
            },
            // {
            //   id: 13600,
            //   icon: <InsertChartOutlinedIcon {...icon} />,
            //   name: "Your Evaluation",
            //   path: "/quick-accesses/Your-Evaluation",
            //   element: <YourKPICOREPage/>, 
            //   hasSubItems: false,
            // },
          ]
        },
        ...(state?.user?.role !== INTERNAL_USER_ROLE.Employee) ? [
          {
            id: 14000,
            icon: null,
            name: "Pending Checklists",
            path: "/pending-checklists",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: true,
            subItems: [
              {
                id: 14100,
                icon: <NoCrashOutlinedIcon {...icon} />,
                name: "OBT Approvals",
                path: "/pending-checklists/OBT-approvals",
                element: <ApprovalOBTPage/>, 
                badgeAccessor: 'OBTViewFilterApprover',
                hasSubItems: false,
              },
              {
                id: 14200,
                icon: <CreditScoreOutlinedIcon {...icon} />,
                name: "OT Approvals",
                path: "/pending-checklists/OT-approvals",
                element: <ApprovalOvertimePage/>, 
                badgeAccessor: 'OVERTIMEViewFilterApprover',
                hasSubItems: false,
              },
              // {
              //   id: 14100,
              //   icon: <NoCrashOutlinedIcon {...icon} />,
              //   name: "OBT Approvals",
              //   path: "/pending-checklists/OBT-approvals",
              //   element: <ApprovalOBTPage/>, 
              //   badgeAccessor: 'OBTViewFilterApprover',
              //   hasSubItems: false,
              // },
              // {
              //   id: 14200,
              //   icon: <CreditScoreOutlinedIcon {...icon} />,
              //   name: "OT Approvals",
              //   path: "/pending-checklists/OT-approvals",
              //   element: <ApprovalOvertimePage/>, 
              //   badgeAccessor: 'OVERTIMEViewFilterApprover',
              //   hasSubItems: false,
              // },
              {
                id: 14300,
                icon: <HowToRegOutlinedIcon {...icon} />,
                name: "LEAVE Approvals",
                path: "/pending-checklists/LEAVE-approvals",
                element: <ApprovalLEAVEPage/>, 
                badgeAccessor: 'LEAVEViewFilterApprover',
                hasSubItems: false,
              },

              {
                id: 14400,
                icon: <PublishedWithChangesOutlinedIcon {...icon} />,
                name: "UA Approvals",
                path: "/pending-checklists/UA-approvals",
                element: <ApprovalUAPage/>, 
                badgeAccessor: 'UAViewFilterApprover',
                hasSubItems: false,
              },
              // {
              //   id: 14500,
              //   icon: <RuleFolderOutlinedIcon {...icon} />,
              //   name: "KPI Confirmations",
              //   path: "/pending-checklists/KPI-Confirmations",
              //   element: <AppraisalConfirmationKPICOREPage/>, 
              //   badgeAccessor: 'UAViewFilterApprover',
              //   hasSubItems: false,
              // },
              // {
              //   id: 14600,
              //   icon: <AddLocationAltIcon {...icon} />,
              //   name: "Onboarding CF",
              //   path: "/pending-checklists/Onboarding-Confirmations",
              //   element: <OnboardingCF/>, 
              //   badgeAccessor: 'UAViewFilterApprover',
              //   hasSubItems: false,
              // },
              // {
              //   id: 14700,
              //   icon: <AlarmOffIcon {...icon} />,
              //   name: "Offboarding CF",
              //   path: "/pending-checklists/Offboarding-Confirmations",
              //   element: <OffboardingCF/>, 
              //   badgeAccessor: 'UAViewFilterApprover',
              //   hasSubItems: false,
              // },
            ]
          }
        ] : [],
        ...(state?.user?.role !== INTERNAL_USER_ROLE.Employee) ? [
          {
            id: 15000,
            icon: null,
            name: "Procedurals",
            path: "/procedurals",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: true,
            subItems: [
              ...(state?.user?.role !== INTERNAL_USER_ROLE.Manager) ? [
                {
                  id: 15100,
                  icon: <SurfingOutlinedIcon {...icon}/>,
                  name: "Holidays",
                  path: "/procedurals/holidays",
                  element: <HolidaysPage/>, 
                  hasSubItems: false,
                },
              ]: [],
              {
                id: 15200,
                icon: <ApprovalOutlinedIcon  {...icon} />,
                name: "OBT",
                path: "/procedurals/OBT",
                element:<ProceduralOBTPage/>,
                hasSubItems: false,
              },
              {
                id: 15300,
                icon: <AlarmOnOutlinedIcon  {...icon} />,
                name: "Overtime",
                path: "/procedurals/overtime",
                element:<ProceduralOvertimePage/>,
                hasSubItems: false,
              },
              // {
              //   id: 15100,
              //   icon: <SurfingOutlinedIcon {...icon}/>,
              //   name: "Holidays",
              //   path: "/procedurals/holidays",
              //   element: <HolidaysPage/>, 
              //   hasSubItems: false,
              // },
              // {
              //   id: 15200,
              //   icon: <ApprovalOutlinedIcon  {...icon} />,
              //   name: "OBT",
              //   path: "/procedurals/OBT",
              //   element:<ProceduralOBTPage/>,
              //   hasSubItems: false,
              // },
              // {
              //   id: 15300,
              //   icon: <AlarmOnOutlinedIcon  {...icon} />,
              //   name: "Overtime",
              //   path: "/procedurals/overtime",
              //   element:<ProceduralOvertimePage/>,
              //   hasSubItems: false,
              // },
              {
                id: 15400,
                icon: <AppRegistrationOutlinedIcon {...icon} />,
                name: "Leaves",
                path: "/procedurals/leaves",
                element: <ProceduralLEAVEPage/>,
                hasSubItems: false,
              },
              {
                id: 15800,
                icon: <BadgeOutlinedIcon {...icon} />,
                name: "Unaccounted Attendances",
                path: "/procedurals/unaccounted-attendances",
                element: <ProceduralUAPage/>,
                hasSubItems: false,
              },
              ...(state?.user?.role !== INTERNAL_USER_ROLE.Manager) ? [
                {
                  id: 15500,
                  icon: <AppsOutageOutlinedIcon {...icon} />,
                  name: "Leave Credits",
                  path: "/procedurals/leave-credits",
                  element:<ProceduralLEAVECREDITPage/>,
                  hasSubItems: false,
                },
                {
                  id: 15600,
                  icon: <AppsOutlinedIcon {...icon} />,
                  name: "Leave Types",
                  path: "/procedurals/leave-types",
                  element:<ProceduralLEAVETYPEPage/>,
                  hasSubItems: false,
                },
                {
                  id: 15600,
                  icon: <AppsOutlinedIcon {...icon} />,
                  name: "OBT Types",
                  path: "/procedurals/obt-types",
                  element: <OBTtypes />,
                  hasSubItems: false,
                },
                {
                  id: 15700,
                  icon: <AssignmentIndOutlinedIcon {...icon} />,
                  name: "Cutoff Periods",
                  path: "/procedurals/cutoff-periods",
                  element:<ProceduralCUTOFFPERIODPage/>,
                  hasSubItems: false,
                },
              ]: [],
                ...(state?.user?.role !== INTERNAL_USER_ROLE.Manager)? [
                  {
                    id: 15900,
                    icon: <CalendarTodayOutlinedIcon {...icon} />,
                    name: "Schedule Shifts",
                    path: "/procedurals/schedule-shifts",
                    element: <ProceduralSCHEDULESHIFTSPage/>,
                    hasSubItems: false,
                  },
                  {
                    id: 15110,
                    icon: <CalendarMonthOutlinedIcon {...icon} />,
                    name: "Daily Schedules",
                    path: "/procedurals/schedule-dailies",
                    element: <ProceduralSCHEDULEDAILYpage/>,
                    // element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">SCHEDULE DAILIES PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
                    hasSubItems: false,
                  },
                ] : []
              // {
              //   id: 15600,
              //   icon: <AppsOutlinedIcon {...icon} />,
              //   name: "Leave Types",
              //   path: "/procedurals/leave-types",
              //   element:<ProceduralLEAVETYPEPage/>,
              //   hasSubItems: false,
              // },
              // {
              //   id: 15700,
              //   icon: <AssignmentIndOutlinedIcon {...icon} />,
              //   name: "Cutoff Periods",
              //   path: "/procedurals/cutoff-periods",
              //   element:<ProceduralCUTOFFPERIODPage/>,
              //   hasSubItems: false,
              // },
              // {
              //   id: 15800,
              //   icon: <BadgeOutlinedIcon {...icon} />,
              //   name: "Unaccounted Attendances",
              //   path: "/procedurals/unaccounted-attendances",
              //   element: <ProceduralUAPage/>,
              //   hasSubItems: false,
              // },
              // {
              //   id: 15900,
              //   icon: <CalendarTodayOutlinedIcon {...icon} />,
              //   name: "Schedule Shifts",
              //   path: "/procedurals/schedule-shifts",
              //   element: <ProceduralSCHEDULESHIFTSPage/>,
              //   hasSubItems: false,
              // },
              // {
              //   id: 15110,
              //   icon: <CalendarMonthOutlinedIcon {...icon} />,
              //   name: "Daily Schedules",
              //   path: "/procedurals/schedule-dailies",
              //   element: <ProceduralSCHEDULEDAILYpage/>,
              //   // element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">SCHEDULE DAILIES PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
              //   hasSubItems: false,
              // },
            ]
          },
          ...(state?.user?.role !== INTERNAL_USER_ROLE.Manager ) ? [
            {
              id: 18000,
              icon: null,
              name: "Forms",
              path: "/forms",
              element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">FORMS PRINTING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
              hasSubItems: true,
              subItems: [
                // {
                //   id: 181000,
                //   icon: <TableCellsIcon {...icon} />,
                //   name: "B1 Forms",
                //   path: "/forms/B1-Forms",
                //   element: <B1Forms/>,
                //   hasSubItems: false,
                // },
                // {
                //   id: 182000,
                //   icon: <TableCellsIcon {...icon} />,
                //   name: "B2 Forms",
                //   path: "/forms/B2-Forms",
                //   element: <B2Forms/>,
                //   hasSubItems: false,
                // },
                {
                  id: 183000,
                  icon: <TableCellsIcon {...icon} />,
                  name: "Recruitment & Hiring",
                  path: "/forms/recruitment-and-hiring",
                  element: <RecruitmentForms />,
                  hasSubItems: false,
                },
                {
                  id: 184000,
                  icon: <TableCellsIcon {...icon} />,
                  name: "Performance Appraisal",
                  path: "/forms/performance-appraisal",
                  element: <PerformanceAppraisalForms />,
                  hasSubItems: false,
                },
                {
                  id: 185000,
                  icon: <TableCellsIcon {...icon} />,
                  name: "Training",
                  path: "/forms/training",
                  element: <TrainingForms />,
                  hasSubItems: false,
                },
                {
                  id: 186000,
                  icon: <TableCellsIcon {...icon} />,
                  name: "Attendance",
                  path: "/forms/attendance",
                  element: <AttendanceForms />,
                  hasSubItems: false,
                },
                {
                  id: 187000,
                  icon: <TableCellsIcon {...icon} />,
                  name: "Other Form of Application",
                  path: "/forms/others",
                  element: <OtherForms />,
                  hasSubItems: false,
                },
                {
                  id: 188000,
                  icon: <TableCellsIcon {...icon} />,
                  name: "Exit Forms",
                  path: "/forms/exit-forms",
                  element: <ExitForms />,
                  hasSubItems: false,
                },
              ]
            },
          ]: [],
        ]:[],
        {
          id: 16000,
          icon: null,
          name: isAdmin? "Admin DTR" : "DTR",
          path: "/DTR",
          element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-pink-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">DTR PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          hasSubItems: true,
          subItems: [
            {
              id: 16100,
              icon: <SummarizeIcon {...icon} />,
              name: "View DTR Reports",
              path: "/DTR/View-DTR",
              element: <ViewDtrReports/>,
              hasSubItems: false,
            },
            ...(state?.user?.role !== INTERNAL_USER_ROLE.Employee && state?.user?.role !== INTERNAL_USER_ROLE.Manager) ? [
              {
                id: 16200,
                icon: <UploadFileIcon {...icon} />,
                name: "Upload DTR Logs",
                path: "/DTR/upload-logs",
                element: <UploadDtrLogs/>,
                hasSubItems: false,
              },
              {
                id: 16300,
                icon: <MergeIcon {...icon} />,
                name: "Merge DTR Logs",
                path: "/DTR/Merge-DTR",
                element: <MergeDtrLogs/>,
                hasSubItems: false,
              },
              {
                id: 16400,
                icon: <TableViewIcon {...icon} />,
                name: "Create DTR Summary",
                path: "/DTR/create-summary",
                element: <CreateSummaryPage/>,
                hasSubItems: false,
              },
            ]:[]
            
          ]
        },
        
        ...(state?.user?.role !== INTERNAL_USER_ROLE.Employee && state?.user?.role !== INTERNAL_USER_ROLE.Manager ) ? [
          // {
          //   id: 19000,
          //   icon: null,
          //   name: "Payroll",
          //   path: "/payroll",
          //   element: null,
          //   hasSubItems: true,
          //   subItems: [
          //     {
          //       id: 19100,
          //       icon: <DocumentIcon {...icon} />,
          //       name: "View All Payroll",
          //       path: "/payroll/view-all-payroll",
          //       element: <ViewPayroll/>,
          //       hasSubItems: false,
          //     },
          //     {
          //       id: 19200,
          //       icon: <DocumentIcon {...icon} />,
          //       name: "Process Payroll",
          //       path: "/payroll/process-payroll",
          //       element: <ProcessPayrollPage/>,
          //       hasSubItems: false,
          //     },
          //     {
          //       id: 19300,
          //       icon: <DocumentIcon {...icon} />,
          //       name: "Payslip Sample",
          //       path: "/payroll/payslip-sample",
          //       element: <TestView/>,
          //       hasSubItems: false,
          //     },

          //     {
          //       id: 19100,
          //       icon: <DocumentIcon {...icon} />,
          //       name: "View Specific Payroll",
          //       path: "/payroll/view-specific-payroll",
          //       element: <ViewSpecificPayroll/>,
          //       hasSubItems: false,
          //     },
          //   ]
          // }
          
        ] : [],

        // {
        //   id: 19000,
        //   icon: null,
        //   name: "Payroll",
        //   path: "/payroll",
        //   element: null,
        //   hasSubItems: true,
        //   subItems: [
        //     ...(state?.user?.role !== INTERNAL_USER_ROLE.Employee && state?.user?.role !== INTERNAL_USER_ROLE.Manager ) ? [
        //       {
        //         id: 19100,
        //         icon: <DocumentIcon {...icon} />,
        //         name: "View All Payroll",
        //         path: "/payroll/view-all-payroll",
        //         element: <ViewPayroll/>,
        //         hasSubItems: false,
        //       },
        //       {
        //         id: 19200,
        //         icon: <DocumentIcon {...icon} />,
        //         name: "Process Payroll",
        //         path: "/payroll/process-payroll",
        //         element: <ProcessPayrollPage/>,
        //         hasSubItems: false,
        //       },
        //       {
        //         id: 19300,
        //         icon: <DocumentIcon {...icon} />,
        //         name: "Payslip Sample",
        //         path: "/payroll/payslip-sample",
        //         element: <TestView/>,
        //         hasSubItems: false,
        //       },
        //     ] : [],
        //     ...(state?.user?.role === INTERNAL_USER_ROLE.Employee || state?.user?.role === INTERNAL_USER_ROLE.Manager) ? [
        //       {
        //         id: 19100,
        //         icon: <DocumentIcon {...icon} />,
        //         name: "View Specific Payroll",
        //         path: "/payroll/view-specific-payroll",
        //         element: <ViewSpecificPayroll/>,
        //         hasSubItems: false,
        //       },
        //     ] : [],
        //   ]
        // },
        
        
        
        // {
        //   id: 20000,
        //   icon: null,
        //   name: "Announcement",
        //   path: "/announcements",
        //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ANNOUNCEMENT PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
        //   hasSubItems: true,
        //   subItems: [
        //     {
        //       id: 20100,
        //       icon: <SpeakerWaveIcon {...icon} />,
        //       name: "Post Announcements",
        //       path: "/announcements/post-announcements",
        //       element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">POST ANNOUNCEMENT PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
        //       hasSubItems: false,
        //     },
        //     ...(state?.emp_no !== undefined && state?.emp_no === 9990) ? [{
        //       id: 20200,
        //       icon: <SpeakerWaveIcon {...icon} />,
        //       name: "Test View",
        //       path: "/announcements/test-view",
        //       element: <TestView />,
        //       hasSubItems: false,
        //     }]:[] ,
        //   ]
        // },
        ...(state?.user?.role !== INTERNAL_USER_ROLE.Employee && state?.user?.role !== INTERNAL_USER_ROLE.Manager) ? [
            {
              id: 19000,
              icon: null,
              name: "Reports",
              path: "/reports",
              element: null,
              hasSubItems: true,
              subItems: [
                  {
                    id: 19100,
                    icon: <DocumentIcon {...icon} />,
                    name: "Monthly Schedule",
                    path: "/report/monthly-schedule",
                    element: <ViewMonthlySchedule/>,
                    hasSubItems: false,
                  },
                  // {
                  //   id: 19200,
                  //   icon: <DocumentIcon {...icon} />,
                  //   name: "Employee Leaves",
                  //   path: "/report/employee-leaves",
                  //   element: <ViewEmployeeLeaves/>,
                  //   hasSubItems: false,
                  // },
                  {
                    id: 19200,
                    icon: <DocumentIcon {...icon} />,
                    name: "Employee Leaves",
                    path: "/report/employee-leaves",
                    element: <ViewEmployeeLeaves/>,
                    hasSubItems: false,
                  },
                  {
                    id: 19200,
                    icon: <DocumentIcon {...icon} />,
                    name: "Employee Overtime",
                    path: "/report/employee-overtime",
                    element: <ViewEmployeeOvertime/>,
                    hasSubItems: false,
                  },
                  {
                    id: 19200,
                    icon: <DocumentIcon {...icon} />,
                    name: "Employee OBT",
                    path: "/report/employee-obt",
                    element: <ViewEmployeeObt/>,
                    hasSubItems: false,
                  },
                  {
                    id: 19200,
                    icon: <DocumentIcon {...icon} />,
                    name: "Perfect Attendance",
                    path: "/report/view-attendance/perfect-attendance",
                    element: <ViewPerfectAttendance/>,
                    hasSubItems: false,
                  },
                  {
                    id: 19200,
                    icon: <DocumentIcon {...icon} />,
                    name: "Imperfect Attendance",
                    path: "/report/view-attendance/imperfect-attendance",
                    element: <ViewImperfectAttendance/>,
                    hasSubItems: false,
                  }
              ]
            }
        ]: [],
        
        
      ],
    },
    {
      // title: "auth pages",
      id: 9000,
      layout: "auth",
      pages: [
        {
          id: 9100,
          icon: <ArrowRightOnRectangleIcon {...icon} />,
          name: "sign in",
          path: "/sign-in",
          element: <SignIn />,
          hasSubItems: false,
        },
        {
          id: 9200,
          icon: <UserPlusIcon {...icon} />,
          name: "sign up",
          path: "/sign-up",
          element: <SignUp />,
          hasSubItems: false,
        },
      ],
    },
  ];
  return {
    routes,
  }

};




export default JSXRouteWrapper;
