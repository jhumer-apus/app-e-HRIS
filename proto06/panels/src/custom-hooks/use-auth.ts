import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { APILink, RootState } from '@/store/configureStore';
import { userLoginActionSuccess, userLogout } from '@/store/actions/auth';
import axios from 'axios'
import axiosInstance from '@/helpers/axiosConfig';

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, employee_detail, status }= useSelector((state:RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const token = Cookies.get('access_token');
    // const userCookie = JSON.parse(Cookies.get('user') || '{}');
    // const employeeCookie = JSON.parse(Cookies.get('emp_deetz') || '{}');

    // fetchEmployeeDetails(token, userCookie)
    fetchEmployeeDetails()
    // dispatch(userLoginActionSuccess(token, userCookie, employeeCookie));
    dispatch(userLogout());
    

    // setTimeout(() => {
    //     setLoading(false);
    // }, 200);
    

  }, [dispatch]);

  // useEffect(() => {
  //   if(["logged_in", "logged_out"].includes(status)) {
  //     setLoading(false)
  //   }
  // }, [status])

  const fetchEmployeeDetails = async()  => {

    setLoading(true)



      const user:any = Cookies.get('user')

      if(!user) {
        setLoading(false);
        return
      }


      const userObject = JSON.parse(user)

      console.log(userObject)

      const accessToken:any = Cookies.get('access_token')

      await axiosInstance.get(`employees/${userObject?.emp_id}`).then(res => {
        
        const employeeDetail = res.data
  
        dispatch(userLoginActionSuccess(accessToken, user, employeeDetail));
        setLoading(false);
  
      }).catch(err => setLoading(false))
    
  }

  return { isAuthenticated, loading, user, employee_detail };
}


export default useAuth;