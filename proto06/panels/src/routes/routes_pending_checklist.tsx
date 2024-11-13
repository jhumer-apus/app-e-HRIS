import { INTERNAL_USER_ROLE } from "../types/types-store";
import NoCrashOutlinedIcon from '@mui/icons-material/NoCrashOutlined';
import ApprovalOBTPage from "../pages/pending-checklists/obt-approvals/approval-obt-page";
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import ApprovalOvertimePage from "../pages/pending-checklists/ot-approvals/approval-overtime-page";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ApprovalLEAVEPage from "../pages/pending-checklists/leave-approvals/approval-leave-page";
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import ApprovalUAPage from "../pages/pending-checklists/ua-approvals/approval-ua-page";

const icon = { className: "w-5 h-5 text-inherit" };

export const routesPendingChecklist = (currentUserRole: number) => {

  return currentUserRole !== INTERNAL_USER_ROLE.Employee ? 
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
      ]
    }
  : {};
}