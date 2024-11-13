import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FileOBTPage from '../pages/quick-accesses/file-obt/file-obt-page';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import FileOVERTIMEPage from '../pages/quick-accesses/file-ot/file-ot-page';
import SettingsAccessibilitySharpIcon from '@mui/icons-material/SettingsAccessibilitySharp';
import FileLEAVEPage from '../pages/quick-accesses/file-leave/file-leave-page';
import CloudSyncSharpIcon from '@mui/icons-material/CloudSyncSharp';
import FileUAPage from '../pages/quick-accesses/file-ua/file-ua-page';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import YourSCHEDULEDAILYpage from '../pages/quick-accesses/your-schedule/your-schedule-daily';
import { INTERNAL_USER_ROLE } from "../types/types-store";

const icon = { className: "w-5 h-5 text-inherit" };

export const routesQuickAccess = (currentUserRole: number) => {
  const isBasicEmployee = currentUserRole == INTERNAL_USER_ROLE.Employee;
  const isDepartmentManager = currentUserRole == INTERNAL_USER_ROLE.Manager;
  
  return {
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
        name: isDepartmentManager ? "File Allowance Time": "File OT",
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
    ]
  }
}
