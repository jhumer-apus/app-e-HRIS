import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { LEAVEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import SinglePayslip from './leaves-modal-component';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { LEAVEEditAction, LEAVEViewFilterApproverAction } from '@/store/actions/procedurals';
import axios from 'axios';
import { HandleAlertAction, HandleModalAction } from '@/store/actions/components';
import { beautifyJSON } from '@/helpers/utils';
import { useState } from 'react';
import axiosInstance from '@/helpers/axiosConfig';



interface ApproveLEAVEModalInterface {
    singleLEAVEDetailsData: LEAVEViewInterface;
    approveLEAVEOpenModal: boolean; 
    setApproveLEAVEOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleLEAVEDetailsData: React.Dispatch<React.SetStateAction<LEAVEViewInterface>>;
}

export default function ApproveLEAVEModal(props: ApproveLEAVEModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const LEAVEApproveData = useSelector((state: RootState)=> state.procedurals.LEAVEEdit)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {approveLEAVEOpenModal, setApproveLEAVEOpenModal, singleLEAVEDetailsData, setSingleLEAVEDetailsData} = props;

  const apiApproveLeave = async (payload:any) => {

    setIsLoading(curr => true)

    await axiosInstance.put(`leave_new/${singleLEAVEDetailsData.id}/`, payload)
      .then(res => {

        setIsLoading(curr => false)
        dispatch(LEAVEViewFilterApproverAction({
          emp_no: state?.emp_no
        }))
        
        dispatch(HandleAlertAction({
          open:true,
          status:"success",
          message:"Approve Leave Successfully"
        }))

        dispatch(HandleModalAction({
          name: "viewLeaveModal",
          value: false
        }))
      })

      .catch((err:any) => {

        setIsLoading(curr => false)
        dispatch(LEAVEViewFilterApproverAction({
          emp_no: state?.emp_no
        }))

        dispatch(HandleAlertAction({
          open:true,
          status:"error",
          message: beautifyJSON(err.response.data)
        }))

        dispatch(HandleModalAction({
          name: "viewLeaveModal",
          value: false
        }))
      })
  }

  const approveLEAVE = () => { 
    const DateNow = new Date();
    const approvedDate = dayjs(DateNow).format('YYYY-MM-DDTHH:mm:ss');

    const payload = {
      ...singleLEAVEDetailsData,
      approver_emp_no: state?.emp_no,
      status: "approve",
      leave_reason_disapproval: null,
      added_by: state?.emp_no
    }

    if(state?.emp_no === singleLEAVEDetailsData.leave_approver1_empno || state?.rank_code as number > singleLEAVEDetailsData?.applicant_rank || state?.rank_hierarchy == 6){
      
      payload.leave_date_approved1 = approvedDate
      apiApproveLeave(payload)
      setSingleLEAVEDetailsData((curr:any) => ({
        ...payload
      }))

    } else if((state?.emp_no === singleLEAVEDetailsData.leave_approver2_empno)){

      payload.leave_date_approved2 = approvedDate
      apiApproveLeave(payload)
      setSingleLEAVEDetailsData((curr:any) => ({
        ...payload
      }))

    } else {

      dispatch(HandleAlertAction({
        open: true,
        status: "error",
        message: "You are not one of the approvers"
      }))
    }

  }

  // React.useEffect(()=>{
  //   if(LEAVEApproveData.status === 'succeeded' && approveLEAVEOpenModal){
  //     window.alert(`${LEAVEApproveData.status.charAt(0).toUpperCase()}${LEAVEApproveData.status.slice(1)}`)
  //     setTimeout(()=>{
  //       window.location.reload();
  //     }, 800)
  //   } else if(LEAVEApproveData.status === 'failed' && approveLEAVEOpenModal){
  //     window.alert(LEAVEApproveData.error)
  //   }
  // }, [LEAVEApproveData.status])
  return (
    <React.Fragment>
      <Transition in={approveLEAVEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setApproveLEAVEOpenModal(false);
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
                <Typography>Are you sure you want to approve this LEAVE?</Typography>
              </div>
              <div className='flex justify-around'>
                <Button disabled={isLoading} variant={'contained'} onClick={() => approveLEAVE}>Submit</Button>
                <Button disabled={isLoading} variant={'outlined'} onClick={()=>{setApproveLEAVEOpenModal(false)}}>Cancel</Button>
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