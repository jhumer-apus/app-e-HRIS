// Bagong simula
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";

// SideNav routes
import { routesAdmin } from "./routes_dashboards";
import { routesEmployee } from "./routes_employees";
import { routesQuickAccess } from "./routes_quick_accesses";
import { routesPendingChecklist } from "./routes_pending_checklist";
import { routesProcedurals } from "./routes_procedurals";
import { routesForms } from "./routes_forms";
import { routesDTR } from "./routes_dtr";
import { routesReports } from "./routes_reports";

import { UserPlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { SignIn, SignUp } from "../pages/auth";
import JSXRouteWrapper from "../routes";
import { IRoute } from "../types";

const icon = { className: "w-5 h-5 text-inherit" };

export const compiledRoutes = () => {
  const state: any = useSelector((state: RootState) => state.auth);
  // Available sidenavroutes 
  let sideNavRoutes: any = [];

  // Compiled Routes
  const allRoutes = [routesAdmin, routesEmployee, routesQuickAccess, routesPendingChecklist, routesProcedurals, routesForms, routesDTR, routesReports];

  allRoutes.map((route) => { 
    let routee = route(state.user.role);
    if (Object.keys(routee).length !== 0) `${sideNavRoutes.push(routee)}`;
  });

  const routes: Array<IRoute> = [ 
    {
      id: 10000,
      layout: 'home',
      pages: sideNavRoutes,
    }, 
    {
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
    }
  ];

  return routes;
}
