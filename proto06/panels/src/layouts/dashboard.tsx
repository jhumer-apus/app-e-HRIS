import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { Profile } from "@/pages/dashboard";
import JSXRouteWrapper from "@/routes";
import UseDashboardRoute from "./dashboard-route";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { getEmployeesList } from "@/store/actions/employees";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { FirstInnerRoutePath, SecondInnerRoutePath, ThirdInnerRoutePath, UndeclaredRouteReplace } = UseDashboardRoute();
  const dispatch2 = useDispatch();
  const state = useSelector((state:RootState) => state.employees);

  /**
   * Initialize Employee List for all auto complete fields (Saves Time / Memory)
   */
  useEffect(()=> {
      if(state.employees_list?.length === 0){ 
          dispatch2(getEmployeesList());
      }
  }, []); 

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={JSXRouteWrapper().routes}
        // brandImg={
        //   sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        // }
        brandImg={import.meta.env.VITE_ICON_PATH ?? "/img/bitverse-icon.png"}
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          style={{display: 'none'}}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {FirstInnerRoutePath}
          {SecondInnerRoutePath}
          {ThirdInnerRoutePath}
          {UndeclaredRouteReplace}
          {/* Declare page routes here if you don't want to have the options to appear on the side navigation*/}
          <Route path="/profile/*" element={<Profile/>}/>
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.tsx";

export default Dashboard;