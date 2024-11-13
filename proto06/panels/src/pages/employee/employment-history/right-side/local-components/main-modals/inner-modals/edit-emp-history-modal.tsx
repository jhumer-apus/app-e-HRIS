import {useEffect, Dispatch, SetStateAction, useState, Fragment, CSSProperties}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalAPIDate } from '@/store/configureStore';
import dayjs from 'dayjs';
import { EMPHISTORYEditInterface, EMPHISTORYViewInterface } from '@/types/types-employee-and-applicants';
import { EMPHISTORYCreateActionFailureCleanup, EMPHISTORYEditAction, EMPHISTORYEditActionFailureCleanup, EMPHISTORYViewSpecificAction} from '@/store/actions/employee-and-applicants';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SCHEDULESHIFTFetchAutoCompleteOnEMPHISTORYEditPage from './schedule-shift-autocomplete/schedule-shift-autocomplete';


import { Box } from '@mui/material';
import { CircularProgress } from '@mui/material';

interface EditEMPHISTORYModalInterface {
    singleEMPHISTORYDetailsData: EMPHISTORYViewInterface
    EditEMPHISTORYOpenModal: boolean 
    setSingleEMPHISTORYOpenModal: Dispatch<SetStateAction<boolean>> 
    setEditEMPHISTORYOpenModal: Dispatch<SetStateAction<boolean>>
    setSingleEMPHISTORYDetailsData: Dispatch<SetStateAction<EMPHISTORYViewInterface>>
}

export default function EditEMPHISTORYModal(props: EditEMPHISTORYModalInterface) {
  const dispatch = useDispatch();
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const EMPHISTORYEditState = useSelector((state: RootState)=> state.employeeAndApplicants.EMPHISTORYEdit)
  const {EditEMPHISTORYOpenModal, setEditEMPHISTORYOpenModal, singleEMPHISTORYDetailsData, setSingleEMPHISTORYDetailsData, setSingleEMPHISTORYOpenModal} = props;
  const [ circular, setCircular ] = useState({
    show: true,
    transition: true,
  });
  const CircularProgressStyle: CSSProperties = {
    display: circular.show? 'flex' : 'none', 
    zIndex: "999", 
    position: "absolute", 
    top: "0", 
    left: "0", 
    background: "white", 
    height: "100%", 
    width: "100%", 
    opacity: circular.transition? '1': '0', 
    transition: 'opacity 0.5s ease',
  };

  const [ initialEditState, setInitialEditState ] = useState<EMPHISTORYEditInterface>(
    {
      id: singleEMPHISTORYDetailsData.id,
      employment_position: singleEMPHISTORYDetailsData.employment_position,
      date_promoted: singleEMPHISTORYDetailsData.date_promoted,
      emp_no: singleEMPHISTORYDetailsData.emp_no,
      added_by: curr_user as number
    }
  );

  const nullValues = Object.values(singleEMPHISTORYDetailsData).filter(
    value => typeof value === null
  );
  const EditEMPHISTORY = () => { 

    setEditEMPHISTORYOpenModal(false)

    dispatch(EMPHISTORYEditAction(initialEditState))

  };

  useEffect(()=>{
    if(EMPHISTORYEditState.status){      
      if(EMPHISTORYEditState.status === 'succeeded'){
        window.alert(`${EMPHISTORYEditState.status.charAt(0).toUpperCase()}${EMPHISTORYEditState.status.slice(1)}`)
        setTimeout(()=>{
          dispatch(EMPHISTORYViewSpecificAction({emp_no: singleEMPHISTORYDetailsData.emp_no}))
          // window.location.reload(); //Old version and slow version is to reload the whole page to refresh the data... not good.
        }, 400)
        setTimeout(() => {
          dispatch(EMPHISTORYEditActionFailureCleanup());
        }, 500)
        setSingleEMPHISTORYOpenModal(false)
      }else if (EMPHISTORYEditState.status === 'failed'){
        window.alert(`${EMPHISTORYEditState.error}`)
        dispatch(EMPHISTORYEditActionFailureCleanup());
      }
    };

    if(EMPHISTORYEditState.status === 'loading' || EMPHISTORYEditState.status === 'refreshed'){
      return
    } else {
      setInitialEditState({
        id: singleEMPHISTORYDetailsData.id,
        employment_position: singleEMPHISTORYDetailsData.employment_position,
        date_promoted: singleEMPHISTORYDetailsData.date_promoted,
        emp_no: singleEMPHISTORYDetailsData.emp_no,
        added_by: curr_user as number,
      });
    };
  }, [EMPHISTORYEditState.status, singleEMPHISTORYDetailsData]);

  useEffect(()=> {

    setTimeout(()=> {
      setCircular((prevState) => ({
        ...prevState,
        show: false
      }));
    }, 2600);
    setTimeout(()=> {
      setCircular((prevState) => ({
        ...prevState,
        transition: false
      }));
    }, 2000);

    return(()=>{
      setCircular(() => ({
        show: true,
        transition: true
      }));
    })

  }, [EditEMPHISTORYOpenModal])

  return (
    <Fragment>
      <Transition in={EditEMPHISTORYOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditEMPHISTORYOpenModal(false);
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
              ...EditEMPHISTORYArea,
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography variant='h6' className='border-b-2 border-green-700'>Editing Employment History Details</Typography>
              <div>
                {/* <Box sx={CircularProgressStyle}>
                    <span style={{marginLeft: "50%", marginTop: "20%"}}><CircularProgress /></span>
                </Box> */}
                <div className='flex flex-col gap-10 overflow-auto relative mt-2 p-4'>
                    <DatePicker
                      label="Date Promoted:"
                      value={dayjs(initialEditState.date_promoted)}
                      onChange={(newValue) => {
                          const formattedDate = dayjs(newValue).format(`${globalAPIDate}`);
                          return (
                            setInitialEditState((prevState)=> {
                              return (
                                {
                                  ...prevState,
                                  date_promoted: formattedDate,
                                }
                              )
                            })
                          )
                      }}
                    />
                    {/* <SCHEDULESHIFTFetchAutoCompleteOnEMPHISTORYEditPage createEMPHISTORYEdit={initialEditState} setEMPHISTORYEdit={setInitialEditState}/> */}
                    {/* <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Is Restday</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={`${initialEditState.date_promoted}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = (event.target.value=== 'true' ? true : false);
                                setInitialEditState((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            date_promoted: value
                                        }
                                    )
                                })
                            }}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl> */}
                    <TextField 
                      sx={{width: '100%'}} 
                      label='Employment Position:'
                      value={(initialEditState.employment_position)}
                      type='text'
                      multiline
                      rows={3}
                      onChange={(newValue)=> {
                        const value = newValue.target.value;
                        setInitialEditState((prevState)=> {
                          return (
                            {
                              ...prevState,
                              employment_position: value,
                            }
                          )
                        })
                      }}
                      variant='outlined'
                    />
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <div className='flex justify-center' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                      <Button variant={'contained'} onClick={EditEMPHISTORY}>Submit</Button>
                      <Button variant={'outlined'} onClick={()=>{setEditEMPHISTORYOpenModal(false)}}>Cancel</Button>
                    </div>
                  </div>
                </div>
              </div>
          </LocalizationProvider>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const EditEMPHISTORYArea = {
  height: '110mm',
  width: '120mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};


