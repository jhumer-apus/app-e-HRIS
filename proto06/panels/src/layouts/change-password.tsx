import { Routes, Route, useNavigate } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  PowerIcon
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";

import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment, useState}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { USERResetPasswordInterface } from '@/types/types-pages';
import { Button, TextField, Typography, hexToRgb } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import { USERResetPasswordAction } from '@/store/actions/users';
import { clearFields } from '@/helpers/utils';
import { userLogout } from "@/store/actions/auth";
import Cookies from 'js-cookie';

//LIBRARIES
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import axios from 'axios'
import { beautifyJSON } from '@/helpers/utils';
import axiosInstance from "@/helpers/axiosConfig";
import { HandleAlertAction, HandleModalAction } from "@/store/actions/components";

// interface ResetPasswordUSERModalInterface {
//   primaryKey: number,
//   resetPasswordUSEROpenModal: boolean; 
//   setResetPasswordUSEROpenModal: Dispatch<SetStateAction<boolean>>;
// }

export function ChangePassword() {
  const dispatch = useDispatch();
  const USERResetPasswordState = useSelector((state: RootState)=> state.users.USERResetPassword.status)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail);
  const [singleUSERDetailsData, setSingleUSERDetailsData] = useState<Omit<USERResetPasswordInterface, "id" | "added_by">>({
    new_password: '',
    repeat_new_password: '',
    is_temp: false
  })

  const navigate = useNavigate();

  const resetPasswordUSERSubmit = async () => { 

    if(singleUSERDetailsData.new_password == singleUSERDetailsData.repeat_new_password) {

      if(curr_user) {

        const passwordData = {
          ...singleUSERDetailsData,
          id: curr_user.user?.id as number,
          added_by: curr_user.emp_no || NaN

        }
        await axiosInstance.post(`reset-password/${passwordData.id}/`, passwordData)
          .then(res => window.alert("success"))
          .then(res => handleLogout())
          .catch(err => window.alert(beautifyJSON(err.response.data)))

      } else {

        window.alert("User does not exist. Try to reload your page")

      }
    } else {

      window.alert("Password Mismatch")

    }

  }

  const handleLogout = async () => {

    const refreshToken = Cookies.get("refresh_token")

    await axiosInstance.post(`logout/`, { refresh: refreshToken}).then(res => {

      dispatch(userLogout())

      // window.location.replace('/')

    }).catch(err => {
      dispatch(HandleAlertAction(
        {
          open:true,
          status: "error",
          message: "Error Logging Out Please Contact Your IT Support"
        }
      ))
    })

    const removals = ['refresh_token', 'access_token', 'user', 'employee_detail'];
    removals.forEach((el) => {Cookies.remove(el)});
    navigate("/");
  };

  useEffect(()=>{
    if(USERResetPasswordState){      
      if(USERResetPasswordState === 'succeeded'){
        window.alert(`${USERResetPasswordState.charAt(0).toUpperCase()}${USERResetPasswordState.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }
    }
  }, [USERResetPasswordState])
  return (
    <Fragment
    >
      <div className="w-full h-screen bg-white-400" style={{width:"100%" ,height: "100%" , backdropFilter: "blur(100px)" , backgroundColor: "rgba(255, 255, 255, 0.5)"}}>
        <div className="flex justify-end md:p-8 p-2">
          <Button onClick={handleLogout}>
            <Typography variant='h6' className='border-b-2 border-orange-700 text-black hover:text-blue-300 text-center'>Logout</Typography>
            {/* <PowerIcon className="h-10 w-10 text-white hover:text-blue-500" /> */}
          </Button>
        </div>
      <Card 
          className="w-fit border m-auto border-slate-500 mt-6 md:p-12 p-4"
        >
          <Typography variant='h6' className='border-b-2 border-orange-700 text-center'>Change Password</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <CardBody className='flex flex-col justify-center items-center gap-5'>
                <div className='flex justify-center item-center'>
                  <Typography>Please Change Your Password First Before Proceeding To The Dashboard</Typography>
                </div>
                <TextField
                  sx={{width: '90%'}}
                  label='New Password'
                  type='password'
                  required
                  value={singleUSERDetailsData.new_password}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleUSERDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        new_password: value.replace(/ /g, ""),
                      })
                    })
                  }}
                />
                <TextField
                  sx={{width: '90%'}}
                  label='Repeat New Password'
                  type='password'
                  required
                  value={singleUSERDetailsData.repeat_new_password}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleUSERDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        repeat_new_password: value.replace(/ /g, ""),
                      })
                    })
                  }}
                />
              </CardBody>
              <CardFooter className='flex flex-col md:flex-row gap-4 m-auto justify-around'>
                <Button 
                  variant={'contained'} 
                  color={"warning"} 
                  className="w-40"
                  onClick={resetPasswordUSERSubmit}>
                    Reset Password
                </Button>
                <Button 
                  variant={'outlined'} 
                  color={"warning"}
                  className="w-40"
                  onClick={()=>{
                    clearFields(setSingleUSERDetailsData, ['new_password', 'repeat_new_password'], ['', ''])
                  }}
                >
                Clear
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
          
    </Fragment>
  );
}


// Styles
const resetPasswordUSERArea = {
height: '164.5mm',
width: '180mm',
margin: '0 auto',
background: 'white',
boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
overflow: 'hidden',
};

ChangePassword.displayName = "/src/layout/change-password.tsx";

export default ChangePassword;
