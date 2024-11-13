import { useSelector } from "react-redux"
import { RootState } from "../store/configureStore"
import { INTERNAL_USER_ROLE } from "../types/types-store";
import SurfingOutlinedIcon from "@mui/icons-material/SurfingOutlined";
import HolidaysPage from "../pages/procedurals/holidays/holidays-page";
import ApprovalOutlinedIcon from "@mui/icons-material/AppBlockingOutlined";
import ProceduralOBTPage from "../pages/procedurals/obt/procedural-obt-page";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmAddOutlined";
import ProceduralOvertimePage from "../pages/procedurals/overtime/procedural-overtime-page";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import ProceduralLEAVEPage from "../pages/procedurals/leaves/procedural-leave-page";
import BadgeOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import ProceduralUAPage from "../pages/procedurals/ua/procedural-ua-page";
import AppsOutageOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
import ProceduralLEAVECREDITPage from "../pages/procedurals/leave-credits/procedural-leave-credit-page";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
import ProceduralLEAVETYPEPage from "../pages/procedurals/leave-types/procedural-leave-type-page";
import OBTtypes from "../pages/procedurals/obt-types";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ProceduralCUTOFFPERIODPage from "../pages/procedurals/cutoff-periods/procedural-cutoff-period-page";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ProceduralSCHEDULESHIFTSPage from "../pages/procedurals/schedule-shifts/procedural-schedule-shifts-page";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ProceduralSCHEDULEDAILYpage from "../pages/procedurals/schedule-dailies/procedural-schedule-daily";

const icon = { className: "w-5 h-5 text-inherit" };

export const routesProcedurals = (currentUserRole: number) => {

  const manager = INTERNAL_USER_ROLE.Manager;
  
  return currentUserRole !== INTERNAL_USER_ROLE.Employee ? 
    {
      id: 15000,
      icon: null,
      name: "Procedurals",
      path: "/procedurals",
      element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
      hasSubItems: true,
      subItems: [
        // cannot compile all the objects that would return true for this condition since it will affect the order of the layout in the sidenav. 
        // NOTE if layout can be changed we can just put all the objects that would return true to this condition scope
        ...(currentUserRole !== manager) ? [
          {
            id: 15100,
            icon: <SurfingOutlinedIcon {...icon}/>,
            name: "Holidays",
            path: "/procedurals/holidays",
            element: <HolidaysPage/>, 
            hasSubItems: false,
          }] : [],
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
          id: 15800,
          icon: <BadgeOutlinedIcon {...icon} />,
          name: "Unaccounted Attendances",
          path: "/procedurals/unaccounted-attendances",
          element: <ProceduralUAPage/>,
          hasSubItems: false,
        },

        ...(currentUserRole !== manager) ? [
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
            hasSubItems: false,
          }] : [],
      ]
    }
  : {}; 
}