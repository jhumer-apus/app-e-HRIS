import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { DEPARTMENTViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
// import ApproveDEPARTMENTModal from '../main-modals/inner-modals/approve-leave-modal';
import EditDEPARTMENTModal from '../main-modals/inner-modals/edit-department-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface DEPARTMENTModalUIInterface {
    singleDEPARTMENTDetailsData: DEPARTMENTViewInterface;
    setSingleDEPARTMENTOpenModal: Dispatch<SetStateAction<boolean>>;
    multiplePayslipMode?: boolean;
    setSingleDEPARTMENTDetailsData: Dispatch<SetStateAction<DEPARTMENTViewInterface>>;
}

function DEPARTMENTModalUI(props: DEPARTMENTModalUIInterface) {
    const [ approveDEPARTMENTOpenModal, setApproveDEPARTMENTOpenModal ] = useState(false);
    const [ editDEPARTMENTOpenModal, setEditDEPARTMENTOpenModal ] = useState(false);
    const { 
        setSingleDEPARTMENTDetailsData, 
        singleDEPARTMENTDetailsData,
        setSingleDEPARTMENTOpenModal 
    } = props;
    const ThisProps = props.singleDEPARTMENTDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveDEPARTMENTOpenModal(true);
            break;
            case 1: setEditDEPARTMENTOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditDEPARTMENTModal 
                singleDEPARTMENTDetailsData={singleDEPARTMENTDetailsData} 
                setSingleDEPARTMENTDetailsData={setSingleDEPARTMENTDetailsData} 
                editDEPARTMENTOpenModal={editDEPARTMENTOpenModal} 
                setSingleDEPARTMENTOpenModal={setSingleDEPARTMENTOpenModal}
                setEditDEPARTMENTOpenModal={setEditDEPARTMENTOpenModal}
            />
            <div className='flex flex-col md:flex-row overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Department ID:' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Connected to Branch:' value={(ThisProps?.dept_branch_code || "-")} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Department Name' value={ThisProps.dept_name || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Department Lead' value={ThisProps.dept_lead || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Deactivated:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between mt-10' container-name='leave_buttons'>
                        <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Details</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default DEPARTMENTModalUI;