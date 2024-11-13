import { useSelector } from "react-redux"
import { RootState } from "../store/configureStore"
import { INTERNAL_USER_ROLE } from "../types/types-store";
import { TableCellsIcon } from "@heroicons/react/24/solid";
import RecruitmentForms from "../pages/forms/recruitment-forms/recruitment-forms";
import PerformanceAppraisalForms from "../pages/forms/performance-forms/performance-appraisal-forms";
import TrainingForms from "../pages/forms/training-forms/training-forms";
import AttendanceForms from "../pages/forms/attendance-forms/attendance-forms";
import OtherForms from "../pages/forms/other-forms/other-forms";
import ExitForms from "../pages/forms/exit-forms/exit-forms";

const icon = { className: "w-5 h-5 text-inherit" };

export const routesForms = (currentUserRole: number) => {

  return currentUserRole !== INTERNAL_USER_ROLE.Manager && currentUserRole !== INTERNAL_USER_ROLE.Employee ? 
    {
      id: 18000,
      icon: null,
      name: "Forms",
      path: "/forms",
      element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">FORMS PRINTING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
      hasSubItems: true,
      subItems: [
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
    } : {};
}