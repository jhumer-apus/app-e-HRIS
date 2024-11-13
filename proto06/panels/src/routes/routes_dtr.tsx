import { useSelector } from "react-redux"
import { RootState } from "../store/configureStore"
import { INTERNAL_USER_ROLE } from "../types/types-store";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ViewDtrReports from "../pages/dtr/view-dtr-reports/view-dtr-reports";
import UploadFileIcon from "@mui/icons-material/UploadFile"; 
import UploadDtrLogs from "../pages/dtr/upload-dtr-logs/upload-dtr-logs";
import MergeIcon from "@mui/icons-material/Merge"; 
import MergeDtrLogs from "../pages/dtr/merge-dtr-logs/merge-dtr-logs";
import TableViewIcon from "@mui/icons-material/TableView"; 
import CreateSummaryPage from "../pages/dtr/create-summary/create-summary";

const icon = { className: "w-5 h-5 text-inherit" };

export const routesDTR = (currentUserRole: number) => {
  const isAdmin = currentUserRole !== INTERNAL_USER_ROLE.Employee && currentUserRole !== INTERNAL_USER_ROLE.Manager;

  return {
    id: 16000,
    icon: null,
    name: isAdmin ? "Admin DTR" : "DTR",
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
      ...(currentUserRole !== INTERNAL_USER_ROLE.Employee && currentUserRole !== INTERNAL_USER_ROLE.Manager) ? [
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
      ] : []
    ]
  }
}
