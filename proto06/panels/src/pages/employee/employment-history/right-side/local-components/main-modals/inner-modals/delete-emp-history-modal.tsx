import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { EMPHISTORYViewInterface } from '@/types/types-employee-and-applicants';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { EMPHISTORYDeleteAction, EMPHISTORYDeleteActionFailureCleanup, EMPHISTORYViewSpecificAction } from '@/store/actions/employee-and-applicants';



interface DeactivateEMPHISTORYModalInterface {
    singleEMPHISTORYDetailsData: EMPHISTORYViewInterface;
    setSingleEMPHISTORYOpenModal: React.Dispatch<React.SetStateAction<boolean>>; 
    DeactivateEMPHISTORYOpenModal: boolean; 
    setDeactivateEMPHISTORYOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleEMPHISTORYDetailsData: React.Dispatch<React.SetStateAction<EMPHISTORYViewInterface>>;
}

export default function DeactivateEMPHISTORYModal(props: DeactivateEMPHISTORYModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const EMPHISTORYDeactivateState = useSelector((state: RootState)=> state.employeeAndApplicants.EMPHISTORYDelete)
  const {DeactivateEMPHISTORYOpenModal, setDeactivateEMPHISTORYOpenModal, singleEMPHISTORYDetailsData, setSingleEMPHISTORYOpenModal, setSingleEMPHISTORYDetailsData} = props;

  const DeactivateEMPHISTORY = () => {
    setDeactivateEMPHISTORYOpenModal(false) //to close the second modal
    dispatch(EMPHISTORYDeleteAction({eh_id: singleEMPHISTORYDetailsData.id, added_by: (state?.emp_no as number)}))
  }

  React.useEffect(()=>{
    if(EMPHISTORYDeactivateState.status === 'succeeded'){
      window.alert(`Success: ${EMPHISTORYDeactivateState.status?.charAt(0).toUpperCase()}${EMPHISTORYDeactivateState.status.slice(1)}`)
      setTimeout(()=>{
        dispatch((EMPHISTORYViewSpecificAction({emp_no: singleEMPHISTORYDetailsData.emp_no})))
        // window.location.reload();
      }, 200) //let's reduce the waiting time and do the func
      setTimeout(()=> {
        dispatch((EMPHISTORYDeleteActionFailureCleanup()));
      }, 300)
      setSingleEMPHISTORYOpenModal(false) //to close the first modal
    } else if(EMPHISTORYDeactivateState.status === 'failed') {
      window.alert(`Error: ${EMPHISTORYDeactivateState.error}`)
      dispatch(EMPHISTORYDeleteActionFailureCleanup());
    }
  }, [EMPHISTORYDeactivateState])

  return (
    <React.Fragment>
      <Transition in={DeactivateEMPHISTORYOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDeactivateEMPHISTORYOpenModal(false);
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
              ...modalArea,
              opacity: 0,
              transition: `opacity 300ms`,
              ...{
                entering: { opacity: 1 },
                entered: { opacity: 1 },
              }[state],
              overflow: 'auto',
              height: 'auto',
            }}
            size='sm'
        > 
          <Typography variant='h6' className='border-b-2 border-red-700'>Confirmation</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-between w-full h-2/4'>
              <div className='flex justify-center flex-col items-center gap-2 mb-4'>
                <Typography>Are you sure you want to deactivate this Employee History?</Typography>
                <Typography className='italic' variant='caption'>Users can no longer see this in the tables afterwards.</Typography>
                <Typography className='italic' variant='caption'>Assigned ID will be skipped and recorded on audit trail.</Typography>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} color="error" onClick={DeactivateEMPHISTORY}>Confirm</Button>
                <Button variant={'outlined'} color="warning" onClick={()=>{setDeactivateEMPHISTORYOpenModal(false)}}>Cancel</Button>
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
const modalArea = {
  height: '74.5mm',
  width: '130mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};