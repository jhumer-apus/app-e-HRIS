import { useSelector } from "react-redux";
import { INTERNAL_USER_ROLE } from "../types/types-store";
import { RootState } from "../store/configureStore";
import { DocumentIcon } from "@heroicons/react/24/solid";
import ViewMonthlySchedule from "../pages/reports/view-monthly-schedule";
import ViewEmployeeLeaves from "../pages/reports/view-employee-leaves";
import ViewEmployeeOvertime from "../pages/reports/view-employee-overtime/ot-by-cutoff";
import ViewEmployeeObt from "../pages/reports/view-employee-obt";
import ViewPerfectAttendance from "../pages/reports/view-attendance/perfect-attendance";
import ViewImperfectAttendance from "../pages/reports/view-attendance/imperfect-attendance";

const icon = { className: "w-5 h-5 text-inherit" };

export const routesReports = (currentUserRole: number) => {

  return currentUserRole !== INTERNAL_USER_ROLE.Employee && currentUserRole !== INTERNAL_USER_ROLE.Manager ?
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
    } : {};
}