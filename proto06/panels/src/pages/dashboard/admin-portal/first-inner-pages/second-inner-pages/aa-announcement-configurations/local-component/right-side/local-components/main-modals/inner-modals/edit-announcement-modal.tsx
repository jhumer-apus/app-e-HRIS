import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ANNOUNCEMENTViewInterface } from '@/types/types-payroll-eoy';
import { Button, Stack, Switch, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalReducerFailed, globalReducerSuccess } from '@/store/configureStore';
import { ANNOUNCEMENTEditAction, ANNOUNCEMENTEditActionFailureCleanup, ANNOUNCEMENTViewAction } from '@/store/actions/payroll-eoy';
import DateAssignedANNOUNCEMENTEdit from './fields/date-fields-right';
import MultiDepartmentAutoCompleteLeft from '../../../../left-side/inner-ui-components/multiple-departments-choose-modal';
import DepartmentListFieldAnnouncement from '@/public-components/DepartmentListFieldAnnouncement';
import RankListFieldAnnouncement from '@/public-components/RankListFieldAnnouncement';

interface EditANNOUNCEMENTModalInterface {
    singleANNOUNCEMENTDetailsData: ANNOUNCEMENTViewInterface;
    editANNOUNCEMENTOpenModal: boolean;
    setSingleANNOUNCEMENTOpenModal: Dispatch<SetStateAction<boolean>>;
    setEditANNOUNCEMENTOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleANNOUNCEMENTDetailsData: Dispatch<SetStateAction<ANNOUNCEMENTViewInterface>>;
}

export default function EditANNOUNCEMENTModal(props: EditANNOUNCEMENTModalInterface) {
  const dispatch = useDispatch();
  const ANNOUNCEMENTEditState = useSelector((state: RootState)=> state.payrollEOY.ANNOUNCEMENTEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {
    editANNOUNCEMENTOpenModal, 
    setEditANNOUNCEMENTOpenModal, 
    singleANNOUNCEMENTDetailsData, 
    setSingleANNOUNCEMENTDetailsData,
    setSingleANNOUNCEMENTOpenModal
  } = props;


  const editANNOUNCEMENT = (e:any) => { 
    e.preventDefault()

    dispatch(ANNOUNCEMENTEditAction({
      ...singleANNOUNCEMENTDetailsData,
      emp_no: curr_user || NaN,

    }))
  }

  const handleChangeDepartments = (e:any, value:any) => {
    setSingleANNOUNCEMENTDetailsData(curr => ({
      ...singleANNOUNCEMENTDetailsData,
      for_departments_code: value.map((val:any) => val.id)
    }))
  }

  const handleChangeRanks = (e:any, value:any) => {
    setSingleANNOUNCEMENTDetailsData(curr => ({
      ...singleANNOUNCEMENTDetailsData,
      for_ranks_code: value.map((val:any) => val.id)
    }))
  }

  // const currentDepartments = 
  //   Object
  //     .keys(singleANNOUNCEMENTDetailsData?.departments)
  //     .map((key:any) => (
  //       {
  //         id: Number(key),
  //         dept_name: singleANNOUNCEMENTDetailsData?.departments[key]
  //       }
  //     ));
  

  //   const currentRanks = 
  //     Object
  //       .keys(singleANNOUNCEMENTDetailsData?.ranks)
  //       .map((key:any) => (
  //         {
  //           id: Number(key),
  //           rank_name: singleANNOUNCEMENTDetailsData?.ranks[key]
  //         }
  //       ))

  useEffect(()=>{
    if(ANNOUNCEMENTEditState.status){      
      if(ANNOUNCEMENTEditState.status === `${globalReducerSuccess}`){
        window.alert(`${ANNOUNCEMENTEditState.status.charAt(0).toUpperCase()}${ANNOUNCEMENTEditState.status.slice(1)}`)
        // window.location.reload();
        setEditANNOUNCEMENTOpenModal(false);
        setSingleANNOUNCEMENTOpenModal(false);
        dispatch(ANNOUNCEMENTViewAction());
        setTimeout(()=>{
          dispatch(ANNOUNCEMENTEditActionFailureCleanup());
        }, 200)
      }else if(ANNOUNCEMENTEditState.status === `${globalReducerFailed}`){
        window.alert(`${ANNOUNCEMENTEditState.error}`)
        setTimeout(()=>{
          dispatch(ANNOUNCEMENTEditActionFailureCleanup());
        }, 200)
      }
    }
  }, [ANNOUNCEMENTEditState.status])
  return (
    <Fragment>
      <Transition in={editANNOUNCEMENTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditANNOUNCEMENTOpenModal(false);
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
              ...editANNOUNCEMENTArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing ANNOUNCEMENT Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <form onSubmit={editANNOUNCEMENT} className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-6'>
                      <DateAssignedANNOUNCEMENTEdit editANNOUNCEMENT={singleANNOUNCEMENTDetailsData} setEditANNOUNCEMENT={setSingleANNOUNCEMENTDetailsData}/>
                      <div>
                          <Typography>Pin announcement?</Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                              <Typography>No</Typography>
                              <Switch
                                checked={singleANNOUNCEMENTDetailsData.is_pinned}
                                onChange={(e:any) => {
                                    const checkValue:boolean = e.target.checked
                                    setSingleANNOUNCEMENTDetailsData((prevState:any)=> {
                                        return (
                                            {
                                                ...prevState,
                                                is_pinned: checkValue
                                            }
                                        )
                                    })
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                              <Typography>Yes</Typography>
                            </Stack>
                        </div>
                        
                        {/* <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Order By No.'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleANNOUNCEMENTDetailsData?.order_by_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleANNOUNCEMENTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            order_by_no: value
                                        }
                                    )
                                })
                            }}
                        /> */}
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Announcement Message:'
                            aria-required  
                            variant='outlined' 
                            multiline
                            rows={4}
                            type="text"
                            helperText={`${singleANNOUNCEMENTDetailsData?.message.length}/1000`}
                            inputProps = {
                              {
                                  maxLength:1000
                              }
                          }
                            value={singleANNOUNCEMENTDetailsData?.message}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setSingleANNOUNCEMENTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            message: value
                                        }
                                    )
                                })
                            }}
                        />
                        <DepartmentListFieldAnnouncement
                          currentDepartments={singleANNOUNCEMENTDetailsData.for_departments_code}
                          handleChange={handleChangeDepartments}
                        />
                        <RankListFieldAnnouncement
                          currentRanks={singleANNOUNCEMENTDetailsData.for_ranks_code}
                          handleChange={handleChangeRanks}
                        />
                        {/* <MultiDepartmentAutoCompleteLeft createANNOUNCEMENT={singleANNOUNCEMENTDetailsData} setCreateANNOUNCEMENT={setSingleANNOUNCEMENTDetailsData}/> */}
                      </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} type="submit">Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditANNOUNCEMENTOpenModal(false)}}>Cancel</Button>
              </div>
            </form>
          </div>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const editANNOUNCEMENTArea = {
  height: '165.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};