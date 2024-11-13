import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/widgets/layout";
import routes from "@/routes";
import { SignIn } from "@/pages/auth";

export function Auth() {
  const navbarRoutes = [
    {
      name: "dashboard",
      path: "/dashboard/home",
      icon: ChartPieIcon,
    },
    {
      name: "Payroll System",
      path: "/dashboard/home",
      icon: UserIcon,
    },
    {
      name: "Employee Management",
      path: "/auth/sign-up",
      icon: UserPlusIcon,
    },
    {
      name: "Timekeeping",
      path: "/auth/sign-in",
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  return (
    <div 
      className="flex flex-col justify-around h-screen sign-in-outer-container"
      style={
        {
          backgroundImage: "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      }
    >
      {/* <div className="container relative z-40 mx-auto p-4">
        <Navbar routes={navbarRoutes} />
      </div> */}
      <SignIn/>
      <div 
        // className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white"
        className="text-white"
      >
        <Footer />
      </div>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.tsx";

export default Auth;
