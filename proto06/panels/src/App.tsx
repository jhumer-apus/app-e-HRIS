import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, ChangePassword } from "@/layouts";
// Authentication Related Imports
import useAuth from "./custom-hooks/use-auth";
import LoadingComponent from "./widgets/layout/custom-effects/LoadingComponent/LoadingComponent";
import { Profile } from "./pages";
import AlertMessage from "./public-components/AlertMessage";
import { Fragment } from "react";
import Test from "./pages/test";

function App() {
  const { isAuthenticated, loading, user, employee_detail } = useAuth();
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <Fragment>
      <AlertMessage />
      <Routes>
        {/* <Route path="/" element={ <ChangePassword/>} /> */}
        <Route path="/test" element={<Test />}/>
        <Route path="/" element={ isAuthenticated ? <Navigate to="/home"/> : <Auth/>} />
        {/* <Route path="/home/*" element={ isAuthenticated ? (<Dashboard/>) : <Auth/>}/> */}
        <Route path="/home/*" element={ isAuthenticated ? (user?.is_temp || employee_detail?.user?.is_temp? <ChangePassword/>: <Dashboard/>) : <Auth/>}/>
        <Route path="/site/*" element={ <h1>This is the website for job posting</h1> }/>
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </Fragment>
  );
}
 
export default App;
