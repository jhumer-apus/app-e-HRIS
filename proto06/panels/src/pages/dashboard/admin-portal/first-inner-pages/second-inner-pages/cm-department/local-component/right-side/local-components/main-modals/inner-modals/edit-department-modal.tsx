import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { DEPARTMENTViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { DEPARTMENTEditAction } from '@/store/actions/categories';
import EmployeeAutoCompleteRight from './autocomplete-fields/employee-autocomplete-right';
import BranchAutoCompleteRight from './autocomplete-fields/branch-autocomplete-right';



interface AllowedDaysDEPARTMENTModalInterface {
    singleDEPARTMENTDetailsData: DEPARTMENTViewInterface;
    allowedDaysDEPARTMENTOpenModal: boolean; 
    setAllowedDaysDEPARTMENTOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleDEPARTMENTDetailsData: Dispatch<SetStateAction<DEPARTMENTViewInterface>>;
}

export default function AllowedDaysDEPARTMENTModal(props: AllowedDaysDEPARTMENTModalInterface) {
  const dispatch = useDispatch();
  const DEPARTMENTAllowedDaysState = useSelector((state: RootState)=> state.categories.DEPARTMENTEdit.status)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {allowedDaysDEPARTMENTOpenModal, setAllowedDaysDEPARTMENTOpenModal, singleDEPARTMENTDetailsData, setSingleDEPARTMENTDetailsData} = props;


  const allowedDaysDEPARTMENT = () => { 
    dispatch(DEPARTMENTEditAction({
      ...singleDEPARTMENTDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(DEPARTMENTAllowedDaysState){      
      if(DEPARTMENTAllowedDaysState === 'succeeded'){
        window.alert(`${DEPARTMENTAllowedDaysState.charAt(0).toUpperCase()}${DEPARTMENTAllowedDaysState.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }
    }
  }, [DEPARTMENTAllowedDaysState])
  return (
    <Fragment>
      <Transition in={allowedDaysDEPARTMENTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setAllowedDaysDEPARTMENTOpenModal(false);
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
              ...allowedDaysDEPARTMENTArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing Department Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col justify-center items-center gap-5'>
                <TextField
                sx={{width: '90%'}}
                  label='Branch Name'
                  type='text'
                  required
                  value={singleDEPARTMENTDetailsData.dept_name}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleDEPARTMENTDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        dept_name: value,
                      })
                    })
                  }}
                />
                <EmployeeAutoCompleteRight createDEPARTMENT={singleDEPARTMENTDetailsData} setCreateDEPARTMENT={setSingleDEPARTMENTDetailsData}/>
                <BranchAutoCompleteRight createDEPARTMENT={singleDEPARTMENTDetailsData} setCreateDEPARTMENT={setSingleDEPARTMENTDetailsData}/>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={allowedDaysDEPARTMENT}>Submit</Button>
                <Button 
                  variant={'outlined'} 
                  onClick={()=>{
                    setAllowedDaysDEPARTMENTOpenModal(false)
                  }}
                >
                Cancel
                </Button>
              </div>
            </div>
          </div>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const allowedDaysDEPARTMENTArea = {
  height: '164.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};