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
import DataTable from "./pages/employee/Employee201";
import { SignIn, SignUp } from "@/pages/auth";
import { IRoute } from "./types";
import ViewDtrReports from "./pages/dtr/view-dtr-reports/view-dtr-reports";
import UploadDtrLogs from "./pages/dtr/upload-dtr-logs/upload-dtr-logs";
import MergeDtrLogs from "./pages/dtr/merge-dtr-logs/merge-dtr-logs";
import CreateSummaryPage from "./pages/dtr/create-summary/create-summary";
import ViewPayroll from "./pages/payroll/view-payroll/view-payroll";
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
import ApprovalUAPage from "./pages/your-approvals/ua-approvals/approval-ua-page";
import ApprovalOvertimePage from "./pages/your-approvals/ot-approvals/approval-overtime-page";
import ApprovalLEAVEPage from "./pages/your-approvals/leave-approvals/approval-leave-page";
import ApprovalOBTPage from "./pages/your-approvals/obt-approvals/approval-obt-page";
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

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes: Array<IRoute> = [
  {
    id: 10000,
    layout: "home",
    pages: [
      {
        id: 11000,
        icon: null,
        name: "Dashboards",
        path: "/Dashboards",
        element: <strong style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}} className="text-red-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">YOU SHALL NOT PASS!!</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 11100,
            icon: <HomeIcon {...icon} />,
            name: "HRIS Dashboard",
            path: "/Dashboards/HRIS-Dashboard",
            element: <HRISDashboard />,
            hasSubItems: false,
          },
          {
            id: 11200,
            icon: <HomeIcon {...icon} />,
            name: "Admin Portal",
            path: "/Dashboards/Admin-Dashboard",
            element: <AdminPortal/>,
            hasSubItems: false,
          },
          // {
          //   id: 11300,
          //   icon: <HomeIcon {...icon} />,
          //   name: "Employee Portal",
          //   path: "/Dashboards/Employee-Dashboard",
          //   element: <strong style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}} className="text-red-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ADMIN DASHBOARD ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
        ]
      },
      {
        id: 12000,
        icon: null,
        name: "Employees",
        path: "/employees",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 12100,
            icon: <UserCircleIcon {...icon} />,
            name: "201 Files",
            path: "/employees/201-files",
            element: <DataTable/>, 
            hasSubItems: false,
          },
          {
            id: 12200,
            icon: <UserCircleIcon {...icon} />,
            name: "Appraisal",
            path: "/employees/appraisal",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
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
            name: "File OT",
            path: "/quick-accesses/file-OT",
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
          {
            id: 13400,
            icon: <CloudSyncSharpIcon {...icon} />,
            name: "File UA",
            path: "/quick-accesses/file-UA",
            element: <FileUAPage/>, 
            hasSubItems: false,
          },
        ]
      },
      {
        id: 14000,
        icon: null,
        name: "Your Approvals",
        path: "/your-approvals",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 14100,
            icon: <NoCrashOutlinedIcon {...icon} />,
            name: "OBT Approvals",
            path: "/your-approvals/OBT-approvals",
            element: <ApprovalOBTPage/>, 
            badgeAccessor: 'OBTViewFilterApprover',
            hasSubItems: false,
          },
          {
            id: 14200,
            icon: <CreditScoreOutlinedIcon {...icon} />,
            name: "OT Approvals",
            path: "/your-approvals/OT-approvals",
            element: <ApprovalOvertimePage/>, 
            badgeAccessor: 'OVERTIMEViewFilterApprover',
            hasSubItems: false,
          },
          {
            id: 14300,
            icon: <HowToRegOutlinedIcon {...icon} />,
            name: "LEAVE Approvals",
            path: "/your-approvals/LEAVE-approvals",
            element: <ApprovalLEAVEPage/>, 
            badgeAccessor: 'LEAVEViewFilterApprover',
            hasSubItems: false,
          },
          {
            id: 14400,
            icon: <PublishedWithChangesOutlinedIcon {...icon} />,
            name: "UA Approvals",
            path: "/your-approvals/UA-approvals",
            element: <ApprovalUAPage/>, 
            badgeAccessor: 'UAViewFilterApprover',
            hasSubItems: false,
          },
        ]
      },
      {
        id: 15000,
        icon: null,
        name: "Procedurals",
        path: "/procedurals",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 15100,
            icon: <SurfingOutlinedIcon {...icon}/>,
            name: "Holidays",
            path: "/procedurals/holidays",
            element: <HolidaysPage/>, 
            hasSubItems: false,
          },
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
          {
            id: 15400,
            icon: <AppRegistrationOutlinedIcon {...icon} />,
            name: "Leaves",
            path: "/procedurals/leaves",
            element: <ProceduralLEAVEPage/>,
            hasSubItems: false,
          },
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
            id: 15700,
            icon: <AssignmentIndOutlinedIcon {...icon} />,
            name: "Cutoff Periods",
            path: "/procedurals/cutoff-periods",
            element:<ProceduralCUTOFFPERIODPage/>,
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
          {
            id: 15900,
            icon: <CalendarTodayOutlinedIcon {...icon} />,
            name: "Schedule Shifts",
            path: "/procedurals/schedule-shifts",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">SCHEDULE SHIFTS ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 15110,
            icon: <CalendarMonthOutlinedIcon {...icon} />,
            name: "Schedule Dailies",
            path: "/procedurals/schedule-dailies",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">SCHEDULE DAILIES PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 16000,
        icon: null,
        name: "Admin DTR",
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
        ]
      },
      // {
      //   id: 17000,
      //   icon: null,
      //   name: "Reports",
      //   path: "/reports",
      //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">REPORTS PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
      //   hasSubItems: false,
      // },
      {
        id: 18000,
        icon: null,
        name: "Forms",
        path: "/forms",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">FORMS PRINTING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 18100,
            icon: <TableCellsIcon {...icon} />,
            name: "COE",
            path: "/forms/COE",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">CERTIFICATE OF EMPLOYMENT FILING AND PRINTING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 19000,
        icon: null,
        name: "Payroll",
        path: "/payroll",
        element: null,
        hasSubItems: true,
        subItems: [
          {
            id: 19100,
            icon: <DocumentIcon {...icon} />,
            name: "View Payroll",
            path: "/payroll/view-payroll",
            element: <ViewPayroll/>,
            hasSubItems: false,
          },
          {
            id: 19200,
            icon: <DocumentIcon {...icon} />,
            name: "Process Payroll",
            path: "/payroll/process-payroll",
            element: <ProcessPayrollPage/>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 20000,
        icon: null,
        name: "Announcement",
        path: "/announcements",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ANNOUNCEMENT PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 20100,
            icon: <SpeakerWaveIcon {...icon} />,
            name: "Post Announcements",
            path: "/announcements/post-announcements",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">POST ANNOUNCEMENT PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      // {
      //   id: 21200,
      //   icon: null,
      //   name: "Help",
      //   path: "/help",
      //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">HELP PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
      //   hasSubItems: false,
      // },
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

export default routes;
