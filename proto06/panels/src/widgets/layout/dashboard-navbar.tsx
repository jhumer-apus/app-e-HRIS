import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";

//Functionalities for Logout
import { useDispatch } from "react-redux";
import { fetchUserData, userLogout } from "@/store/actions/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { APILink, RootState } from "@/store/configureStore";
import { useEffect } from "react";
import { UnderDevelopmentMsg } from "@/pages/dashboard/hris-portal/local-components/projects-card";


export function DashboardNavbar() {
  const navigate = useNavigate();
  const dispatchV2 = useDispatch();  
  const { employee_detail }= useSelector((state: RootState) => state.auth);

  useEffect(()=>{
    if(employee_detail?.emp_no){
      dispatchV2(fetchUserData({emp_no: employee_detail?.emp_no}))
    }
  }, [])

  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page, innermostpage, firstInner, secondInner ] = pathname.split("/").filter((el) => el !== "");  
  
  const updatedImage = employee_detail?.employee_image;
  const handleLogout = () => {
    // Perform logout actions here
    const removals = ['token', 'user', 'employee_detail'];
    removals.forEach((el) => {
      Cookies.remove(el);
    });
    setTimeout(()=> {
      dispatchV2(userLogout());
    }, 200)
    window.location.reload();
    window.location.replace('/')
  };
  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            {page && !innermostpage? 
            <Link to={`/${layout}/${page}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {page?.replaceAll("-", " ")}
              </Typography>
            </Link>
            :
            page ? 
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page?.replaceAll("-", " ")}
            </Typography>
            :
            null
            }
            {innermostpage ? 
            <Link to={`/${layout}/${page}/${innermostpage}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {innermostpage?.replaceAll("-", " ")}
                </Typography>
            </Link>
            :
            null
            }
            {firstInner ? 
            <Link to={`/${layout}/${page}/${innermostpage}/${firstInner}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {firstInner?.replaceAll("-", " ")}
                </Typography>
            </Link>
            :
            null
            }
            {secondInner ? 
            <Link to={`/${layout}/${page}/${innermostpage}/${firstInner}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {secondInner?.replace("-", " ")}
                </Typography>
                
            </Link>
            :
            null
            }
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {secondInner? secondInner.replaceAll("-", " ") : firstInner? firstInner.replaceAll("-", " ") : innermostpage ? innermostpage?.replaceAll("-", " ") : page?.replaceAll("-", " ")}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            {/* <Input label="Type here" /> */}
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Menu>
            <MenuHandler>
              <Button variant="text" color="blue-gray" className="items-center gap-1 px-4 xl:flex">
                 {!employee_detail?.employee_image ? 
                 <UserCircleIcon className="h-7 w-7 text-blue-gray-500" /> 
                  :
                  <img className="h-7 w-7 text-blue-gray-500" src={`${APILink.replace(/\/api\/v1\//, '')}${updatedImage}`} style={{borderRadius: "10px", objectFit: "cover", border: "1px solid white", marginRight: "2px", boxShadow: "1px 1px 1px gray"}}/> 
                } 
                 <p className="hidden xl:flex"> Welcome, {employee_detail?.first_name} </p>
              </Button>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <Link
                // to="" 
                to="/home/profile"
              >
                <MenuItem className="flex items-center gap-3">
                  {/* <Avatar
                    src="/img/team-2.jpeg"
                    alt="item-1"
                    size="sm"
                    variant="circular"
                  /> */}
                  <UserIcon className="h-8 w-8 text-blue-gray-500" />
                  <div className="relative w-full">
                    <UnderDevelopmentMsg fontSize={8} borderRadius={4}/>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                    >
                      Profile
                    </Typography>
                  </div>
                </MenuItem>
              </Link>
              <MenuItem className="flex items-center gap-4" onClick={handleLogout}>
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >Logout
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          {/* <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton> */}
          {/* <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="/img/team-2.jpeg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="/img/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu> */}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.tsx";

export default DashboardNavbar;
