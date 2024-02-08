import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { EMPHISTORYViewInterface } from '@/types/types-employee-and-applicants';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import EditEMPHISTORYModal from '../main-modals/inner-modals/edit-emp-history-modal';
import { globalDate } from '@/store/configureStore';

interface EMPHISTORYModalUIInterface {
    singleEMPHISTORYDetailsData: EMPHISTORYViewInterface;
    multiplePayslipMode?: boolean;
    setSingleEMPHISTORYDetailsData: Dispatch<SetStateAction<EMPHISTORYViewInterface>>;
}

function EMPHISTORYModalUI(props: EMPHISTORYModalUIInterface) {
    const [ approveEMPHISTORYOpenModal, setApproveEMPHISTORYOpenModal ] = useState(false);
    const [ EditEMPHISTORYOpenModal, setEditEMPHISTORYOpenModal ] = useState(false);
    const { setSingleEMPHISTORYDetailsData, singleEMPHISTORYDetailsData } = props;
    const ThisProps = props.singleEMPHISTORYDetailsData;
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveEMPHISTORYOpenModal(true);
            break;
            case 1: setEditEMPHISTORYOpenModal(true);
            break;
        }
    };


    return (
        <Fragment>
            { singleEMPHISTORYDetailsData &&
                <EditEMPHISTORYModal 
                    singleEMPHISTORYDetailsData={singleEMPHISTORYDetailsData} 
                    setSingleEMPHISTORYDetailsData={setSingleEMPHISTORYDetailsData} 
                    EditEMPHISTORYOpenModal={EditEMPHISTORYOpenModal} 
                    setEditEMPHISTORYOpenModal={setEditEMPHISTORYOpenModal}
                />
            }
            <div className='flex flex-col gap-10 relative'>
                <div className='flex gap-6 flex-col mt-4'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Business Date:' value={ThisProps.date_promoted ? dayjs(ThisProps.date_promoted).format(`${globalDate}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='emp_no' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employment Position:' value={ThisProps.employment_position || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-12' container-name='leave_buttons_container'>
                <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                    <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Daily Schedule</Button>
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default EMPHISTORYModalUI;