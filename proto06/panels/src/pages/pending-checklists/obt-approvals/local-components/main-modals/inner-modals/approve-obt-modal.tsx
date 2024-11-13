import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import SinglePayslip from './obt-modal-component';
import { Alert, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { OBTEditAction, OBTEditActionFailureCleanup, OBTViewAction, OBTViewFilterApproverAction } from '@/store/actions/procedurals';
import axios from 'axios';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import AlertMessage from '@/public-components/AlertMessage';
import { AlertType } from '@/types/index';
import { HandleAlertAction, HandleModalAction } from '@/store/actions/components';
import { beautifyJSON } from '@/helpers/utils';
import axiosInstance from '@/helpers/axiosConfig';



interface ApproveOBTModalInterface {
    singleOBTDetailsData: OBTViewInterface;
    approveOBTOpenModal: boolean; 
    setApproveOBTOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleOBTDetailsData: React.Dispatch<React.SetStateAction<OBTViewInterface>>;
    setSingleOBTOpenModal: any
}

export default function ApproveOBTModal(props: ApproveOBTModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const OBTApproveData = useSelector((state: RootState)=> state.procedurals.OBTEdit)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {approveOBTOpenModal, setApproveOBTOpenModal, singleOBTDetailsData, setSingleOBTDetailsData, setSingleOBTOpenModal} = props;


  
  const apiApproveOBT = async (payload:any) => {
    setIsLoading(curr => true)

    await axiosInstance.put(`obt_new/${singleOBTDetailsData.id}/`, payload)
      .then(res => {
          dispatch(OBTViewFilterApproverAction({emp_no: state?.emp_no}))
          
          dispatch(HandleAlertAction({
            open:true,
            status:"success",
            message:"Approve OBT Successfully"
          }))

          dispatch(HandleModalAction({
            name: "viewObtModal",
            value: false
          }))
          setIsLoading(curr => false)
        } 
      )
      .catch(err => {

          dispatch(OBTViewFilterApproverAction({emp_no: state?.emp_no}))

          dispatch(HandleAlertAction({
            open:true,
            status:"error",
            message:beautifyJSON(err.response.data)
          }))

          dispatch(HandleModalAction({
            name: "viewObtModal",
            value: false
          }))
          setIsLoading(curr => false)
        }
      )
  }

  const approveOBT = () => { 
    const DateNow = new Date();
    const approvedDate = dayjs(DateNow).format('YYYY-MM-DDTHH:mm:ss');
    
    const payload = {
      ...singleOBTDetailsData,
      status: "approve",
      approver_emp_no: state?.emp_no,
      obt_reason_cancelled: null
    }

    if(state?.emp_no === singleOBTDetailsData.obt_approver1_empno  || ((state?.rank_code as number) > singleOBTDetailsData?.applicant_rank)){

      payload.obt_date_approved1 = approvedDate

      setSingleOBTDetailsData((curr:any) => ({
        ...payload
      }))

      apiApproveOBT(payload)


    } else if(state?.emp_no === singleOBTDetailsData.obt_approver2_empno){

      payload.obt_date_approved2 = approvedDate

      setSingleOBTDetailsData((curr:any) => ({
        ...payload
      }))

      apiApproveOBT(payload)

    } else {

      dispatch(HandleAlertAction({
        open:true,
        status:"error",
        message:"You are not one of the approvers"
      }))

    }

  }

  // React.useEffect(()=>{
  //   if(OBTApproveData.status === 'succeeded' && approveOBTOpenModal){
  //     window.alert(`${OBTApproveData.status.charAt(0).toUpperCase()}${OBTApproveData.status.slice(1)}`)
  //     window.location.reload();
  //     dispatch(OBTEditActionFailureCleanup())
  //     // setTimeout(()=>{

  //     // }, 200)
  //   } else if(OBTApproveData.status === 'failed' && approveOBTOpenModal){
  //     window.alert(OBTApproveData.error)
  //     dispatch(OBTEditActionFailureCleanup())
  //   }
  // }, [OBTApproveData.status])
  
  return (
    <React.Fragment>
      <Transition in={approveOBTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        // keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setApproveOBTOpenModal(false);
        }}
        slotProps={{
            backdrop: {
              sx: {
                opacity: 0,
                backdropFilter: 'none',
                transition: `opacity 400ms, backdrop-filter 400ms`,
                ...{
                  entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                  entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                }[state],
              },
            },
          }}
          sx={{
            visibility: state === 'exited' ? 'hidden' : 'visible',
          }}
      >
        <ModalDialog 
            aria-labelledby="dialog-vertical-scroll-title" 
            layout={'center'}
            sx={{
              ...paySlipArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
            size='sm'
        > 
          <Typography variant='h6' className='border-b-2 border-green-700'>Confirmation</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-between w-full h-2/4'>
              <div className='flex justify-center item-center'>
                <Typography>Are you sure you want to approve this OBT?</Typography>
              </div>
              <div className='flex justify-around'>
                <Button disabled={isLoading} variant={'contained'} onClick={()=>approveOBT}>Submit</Button>
                <Button disabled={isLoading} variant={'outlined'} onClick={()=>{setApproveOBTOpenModal(false)}}>Cancel</Button>
              </div>
            </div>
          </div>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}


// Styles
const paySlipArea = {
  height: '74.5mm',
  width: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};