import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { OFFBOARDINGREQUIREMENTSViewInterface } from '@/types/types-employee-and-applicants';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import dayjs from 'dayjs';
import EditSubmitOFFBOARDINGREQUIREMENTSModal from '../main-modals/inner-modals/submit-changes-offboarding-req-modal';
import DeactivateOFFBOARDINGREQUIREMENTSModal from '../main-modals/inner-modals/delete-offboarding-req-modal';

interface OFFBOARDINGREQUIREMENTSModalUIInterface {
    singleOFFBOARDINGREQUIREMENTSDetailsData: OFFBOARDINGREQUIREMENTSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleOFFBOARDINGREQUIREMENTSOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleOFFBOARDINGREQUIREMENTSDetailsData: Dispatch<SetStateAction<OFFBOARDINGREQUIREMENTSViewInterface>>;
}

function OFFBOARDINGREQUIREMENTSModalUI(props: OFFBOARDINGREQUIREMENTSModalUIInterface) {


    const { 
        setSingleOFFBOARDINGREQUIREMENTSDetailsData, 
        singleOFFBOARDINGREQUIREMENTSDetailsData,
        setSingleOFFBOARDINGREQUIREMENTSOpenModal
    } = props;
    const ThisProps = props.singleOFFBOARDINGREQUIREMENTSDetailsData;

    const [ submitModalOpen, setSubmitModalOpen ] = useState(false);
    const [ deleteModalOpen, setDeleteModalOpen ] = useState(false);

    const [ editDetailsMode, setEditDetailsMode ] = useState(false);
    return (
        <Fragment>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <EditSubmitOFFBOARDINGREQUIREMENTSModal 
                        initialState={singleOFFBOARDINGREQUIREMENTSDetailsData} 
                        setInitialState={setSingleOFFBOARDINGREQUIREMENTSDetailsData}
                        openModal={submitModalOpen}
                        setOpenModal={setSubmitModalOpen}
                        setSingleOFFBOARDINGREQUIREMENTSOpenModal={setSingleOFFBOARDINGREQUIREMENTSOpenModal}
                    />
                    <DeactivateOFFBOARDINGREQUIREMENTSModal
                        initialState={singleOFFBOARDINGREQUIREMENTSDetailsData} 
                        setInitialState={setSingleOFFBOARDINGREQUIREMENTSDetailsData}
                        openModal={deleteModalOpen}
                        setOpenModal={setDeleteModalOpen}
                        setSingleOFFBOARDINGREQUIREMENTSOpenModal={setSingleOFFBOARDINGREQUIREMENTSOpenModal}
                    />
                    <TextField 
                        sx={{width: '100%', minWidth: '160px'}} 
                        label='Offboarding Requirement ID:' 
                        value={ThisProps.id ? ThisProps.id : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='filled'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Offboarding Requirement Title:' 
                        multiline 
                        rows={5} 
                        value={ThisProps?.offboarding_title} 
                        onChange={(event) => {
                            setSingleOFFBOARDINGREQUIREMENTSDetailsData((prevState)=> {
                                const value = event.target.value;
                                return({
                                    ...prevState,
                                    offboarding_title: value
                                })
                            })
                        }}
                        InputProps={{readOnly: !editDetailsMode,}} 
                        variant='outlined'
                        focused={editDetailsMode}
                    />
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField 
                        sx={{width: '100%', minWidth: '160px', color: 'green'}} 
                        label='Facilitator Emp #:' 
                        type='number'
                        value={ThisProps.facilitator} 
                        onChange={(event)=> {
                            setSingleOFFBOARDINGREQUIREMENTSDetailsData((prevState) => {
                                const value = event.target.value;
                                return({
                                    ...prevState,
                                    facilitator: +(value) 
                                })
                            })
                        }}
                        InputProps={{readOnly: !editDetailsMode,}} 
                        variant='filled'
                        focused={editDetailsMode}
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Date Deleted:' 
                        value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='standard'
                    />
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField 
                        sx={{width: '100%', minWidth: '160px'}} 
                        label='Added By Emp:' 
                        value={ThisProps.added_by || '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='filled'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Date Added:' 
                        value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='standard'
                    />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-center gap-6' style={{width:'400px', marginTop: '20px'}} container-name='leave_buttons'>
                        {
                            !editDetailsMode &&
                            <Button variant='contained' onClick={()=> setEditDetailsMode(true)}>Edit Details</Button>

                        }
                        {
                            editDetailsMode &&
                            <>
                            <Button variant='contained' onClick={()=> setSubmitModalOpen(true)}>Submit Changes</Button>
                            <Button variant='contained' color="warning" onClick={()=> setEditDetailsMode(false)}>Cancel</Button>
                            <Button variant='outlined' color="error" onClick={()=> setDeleteModalOpen(true)}>Delete</Button>

                            </>
                        }
                        {/* <Button variant='outlined' color={'error'} onClick={()=> onClickModal(0)}>Reset Password</Button> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default OFFBOARDINGREQUIREMENTSModalUI;