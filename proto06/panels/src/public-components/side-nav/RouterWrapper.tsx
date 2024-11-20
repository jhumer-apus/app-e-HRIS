import JSXRouteWrapper from "@/routes";
import { Link, NavLink, Route } from "react-router-dom";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import CollapsibleSection from "@/widgets/layout/custom-effects/CollapsibleSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { LEAVEViewInterface, OBTViewInterface, OVERTIMEViewInterface, UAViewInterface } from "@/types/types-pages";
import { compiledRoutes } from "@/routes/compiled_routes";

const RouterWrapper = () => {
  const proceduralState = useSelector((state: RootState)=> state.procedurals);
  const [controller, dispatch] = useMaterialTailwindController();
  const { UAViewFilterApprover, LEAVEViewFilterApprover, OVERTIMEViewFilterApprover, OBTViewFilterApprover } = proceduralState;
  const { sidenavColor, sidenavType, openSidenav } = controller;
  
  const approvalNames = ['OBT Approvals', 'OT Approvals', 'LEAVE Approvals', 'UA Approvals', 'KPI Confirmations', 'Onboarding CF', 'Offboarding CF'];

  // view compiledRoutes for route reference
  const routes = compiledRoutes();

  const arrayLengthChecker = (key: string) => {
    type objectChecker = {
      [key: string]: number;
    }
    const keyProcessor: objectChecker = {
      'OBT Approvals': (OBTViewFilterApprover?.data as OBTViewInterface[])?.length,
      'OT Approvals': (OVERTIMEViewFilterApprover?.data as OVERTIMEViewInterface[])?.length,
      'LEAVE Approvals': (LEAVEViewFilterApprover?.data as LEAVEViewInterface[])?.length,
      'UA Approvals': (UAViewFilterApprover?.data as UAViewInterface[])?.length,
      'Pending Checklists': (OBTViewFilterApprover?.data as OBTViewInterface[])?.length 
        + (OVERTIMEViewFilterApprover?.data as OVERTIMEViewInterface[])?.length 
        + (LEAVEViewFilterApprover?.data as LEAVEViewInterface[])?.length 
        + (UAViewFilterApprover?.data as UAViewInterface[])?.length,
      'default': 0
    };
    return keyProcessor[key] || keyProcessor['default']
  };

  return (
    <div data-name="list">
      {routes.map(({ layout, title, pages }, index) => {
        if (layout === "auth") return null;
        return (
          // {function && element}
          <ul key={index} className="mb-4 flex flex-col gap-1">
          {/* title property is undefined */}
          {/* line 163 to 174 idk the usage */}
          {title && (
            <li key={index} className="mx-3.5 mt-4 mb-2">
              <Typography
                variant="small"
                color={sidenavType === "dark" ? "white" : "blue-gray"}
                className="font-black uppercase opacity-75"
                key={`${index}_li_sidenav`}
              >
                {title}
              </Typography>
            </li>
          )}
        {pages.map(({ id, icon, name, path, hasSubItems, subItems }, index) => { 
          if (hasSubItems) {
            return (
              <li key={index}>
                <CollapsibleSection
                  header={
                    <Button
                      variant={ "gradient" }
                      color={ sidenavType === "dark" ? "indigo" : "blue-gray" }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize flex justify-between w-full"
                      >
                        <p className="flex justify-center items-center">{name}</p>
                        {name === 'Pending Checklists' && ( arrayLengthChecker(name) > 0 ) && <p 
                          className="flex justify-center items-center" 
                          style={{
                            fontSize: '12px',
                            height: '30px', 
                            width: '30px', 
                            background: 'rgb(98 0 255)',
                            borderRadius: '30px', 
                            textAlign: 'center',
                          }}
                        >
                          {arrayLengthChecker(name)}
                        </p>}
                      </Typography>
                    </Button>
                  }
                >
                {subItems?.map(({ icon, name, path, badgeAccessor }) => (
                  <NavLink to={`/${layout}${path}`} data-link={path}>
                  {({ isActive }) => (
                    <li key={name}>
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={ isActive ? sidenavColor : sidenavType === "dark" ? "white" : "blue-gray" }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                        button-toggle="toggleable"
                        onClick={() => setOpenSidenav(dispatch, false)}
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize text-start flex justify-between"
                          style={{width: '100%'}}
                        >
                          <p className="flex justify-center items-center">{name}</p> 
                          {approvalNames.includes(name) && arrayLengthChecker(name) !== 0 && 
                            <p 
                              className="flex justify-center items-center" 
                              style={{
                                fontSize: '12px',
                                height: '30px', 
                                width: '30px', 
                                background: '#7509eb',
                                mixBlendMode: 'difference', 
                                borderRadius: '30px', 
                                textAlign: 'center',
                              }}
                            >
                              {arrayLengthChecker(name)}
                            </p>}
                        </Typography>
                        </Button>
                      </li>
                    )}
                  </NavLink>
                ))}
                </CollapsibleSection>
              </li>
            );
          } else {
            return (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={ isActive ? "gradient" : "text" }
                      color={ isActive ? sidenavColor : sidenavType === "dark" ? "white" : "blue-gray" }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                      {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            )
          }}
        )}
      </ul>
      )})}
    </div>
  );
}

export default RouterWrapper;


