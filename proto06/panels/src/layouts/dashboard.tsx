import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { Profile } from "@/pages/dashboard";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout !== "auth" &&
              pages.map(({ path: parentPath, element: parentElement, hasSubItems, subItems }) => 
              {
                if(hasSubItems){
                  return (subItems?.map(({ path: childPath, element: childElement }) => {
                    return(
                    <Fragment>
                    <Route path={parentPath} element={parentElement} />
                    <Route path={childPath} element={childElement} />
                    </Fragment>
                    )}
                    ))
                }else if (!hasSubItems) {
                  return (
                    <Route path={parentPath} element={parentElement} />
                  )
                }
                
              }
              )
          )}
          <Route path="/" element={<strong style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">HOME PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>} />
          <Route path="/profile" element={<Profile/>} />
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
