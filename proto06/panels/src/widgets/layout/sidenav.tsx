import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { SideNavProps } from "@/types/index";
import styles from './custom-styles/sideNav.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { UAViewFilterApproverAction, LEAVEViewFilterApproverAction, OVERTIMEViewFilterApproverAction, OBTViewFilterApproverAction } from "@/store/actions/procedurals";
import { KPICOREViewAction, OFFBOARDINGSTATUSViewAction, ONBOARDINGSTATUSViewAction } from "@/store/actions/employee-and-applicants";
import { INTERNAL_USER_ROLE } from "@/types/types-store";
import RouterWrapper from "@/public-components/side-nav/RouterWrapper";

export function Sidenav({ brandImg, brandName, routes }: SideNavProps) {
  const dispatchRedux = useDispatch();  
  const currUserState = useSelector((state: RootState)=> state.auth.employee_detail);
  const proceduralState = useSelector((state: RootState)=> state.procedurals);
  const EAState = useSelector((state:RootState) => state.employeeAndApplicants)
  const currUserEmpNo = currUserState?.emp_no as number;
  const PendingKPICore = EAState.KPICOREView.data.length > 0 ? EAState?.KPICOREView?.data?.filter((item)=> item?.status ==='Pending' && item?.emp_no_approver === currUserEmpNo) : [];
  const PendingOffboarding = EAState.OFFBOARDINGSTATUSView.data.length > 0 ? EAState?.OFFBOARDINGSTATUSView?.data?.filter((item)=> item?.status ==='Pending' && item?.emp_offboard_reqs?.some((item) => item.offboarding_facilitator === currUserEmpNo)) : [];
  const PendingOnboarding = EAState.ONBOARDINGSTATUSView.data.length > 0 ? EAState?.ONBOARDINGSTATUSView?.data?.filter((item)=> item?.status ==='Pending' && item?.emp_onboard_reqs?.some((item) => item.onboarding_facilitator === currUserEmpNo)) : [];

  const proceduralActions = [
    UAViewFilterApproverAction,
    LEAVEViewFilterApproverAction,
    OVERTIMEViewFilterApproverAction,
    OBTViewFilterApproverAction,
  ];
  const employeeAndApplicantsActions = [
    OFFBOARDINGSTATUSViewAction,
    ONBOARDINGSTATUSViewAction,
    KPICOREViewAction,
  ]

  const dispatchActions = useCallback(() => {
    proceduralActions.forEach((action) => {
      const stringifiedAction = `${action}`
      const formattedString = stringifiedAction.replace(/Action$/, '')
      if (!proceduralState[formattedString]?.data) {
        dispatchRedux(action({ emp_no: currUserEmpNo }));
      }
    });
    employeeAndApplicantsActions.forEach((action) => {
      const stringifiedAction = `${action}`
      const formattedString = stringifiedAction.replace(/Action$/, '')
      if (!proceduralState[formattedString]?.data) {
        dispatchRedux(action());
      }
    });
  }, [currUserEmpNo]);

  useEffect(() => {
    // role === 1 is Employee only
    if (currUserState?.user?.role === INTERNAL_USER_ROLE.Employee || !currUserState){
      return
    } else {
      dispatchActions();
    }
  }, [dispatchActions]);

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes: Record<string, string> = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 overflow-y-scroll`}
    >
      <div className={`relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"}`}>
        <div className="py-6 px-4">
          <Link to="/" className="flex w-fit items-center gap-4">
            <Avatar src={brandImg} size="sm" />
            <Typography
              variant="h6"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
            >
              {brandName}
            </Typography>
          </Link>
        </div>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}  
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className={styles.sideNavItemsWrap} style={{margin: '1rem'}}data-name="list">
        <RouterWrapper />
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Bit HR",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.tsx";

export default Sidenav;
