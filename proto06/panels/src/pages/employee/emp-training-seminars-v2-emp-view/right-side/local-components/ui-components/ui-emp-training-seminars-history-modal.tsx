import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { EMPSEMINARSViewInterface } from '@/types/types-employee-and-applicants';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import EditEMPSEMINARSModal from '../main-modals/inner-modals/edit-emp-training-seminars-modal';
import { RootState, globalDate } from '@/store/configureStore';
import DeactivateEMPSEMINARSModal from '../main-modals/inner-modals/delete-emp-training-seminars-modal';
import { useSelector } from 'react-redux';

interface EMPSEMINARSModalUIInterface {
    singleEMPSEMINARSDetailsData: EMPSEMINARSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleEMPSEMINARSOpenModal: Dispatch<SetStateAction<boolean>>, 
    setSingleEMPSEMINARSDetailsData: Dispatch<SetStateAction<EMPSEMINARSViewInterface>>;
}

function EMPSEMINARSModalUI(props: EMPSEMINARSModalUIInterface) {
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const [ DeactivateEMPSEMINARSOpenModal, setDeactivateEMPSEMINARSOpenModal ] = useState(false);
    const [ EditEMPSEMINARSOpenModal, setEditEMPSEMINARSOpenModal ] = useState(false);
    const { setSingleEMPSEMINARSDetailsData, singleEMPSEMINARSDetailsData, setSingleEMPSEMINARSOpenModal } = props;
    const ThisProps = props.singleEMPSEMINARSDetailsData;
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setDeactivateEMPSEMINARSOpenModal(true);
            break;
            case 1: setEditEMPSEMINARSOpenModal(true);
            break;
        }
    };


    return (
        <Fragment>
            { singleEMPSEMINARSDetailsData &&
                <EditEMPSEMINARSModal 
                    setSingleEMPSEMINARSOpenModal={setSingleEMPSEMINARSOpenModal}
                    singleEMPSEMINARSDetailsData={singleEMPSEMINARSDetailsData} 
                    setSingleEMPSEMINARSDetailsData={setSingleEMPSEMINARSDetailsData} 
                    EditEMPSEMINARSOpenModal={EditEMPSEMINARSOpenModal} 
                    setEditEMPSEMINARSOpenModal={setEditEMPSEMINARSOpenModal}
                />
            }
            <DeactivateEMPSEMINARSModal 
                DeactivateEMPSEMINARSOpenModal={DeactivateEMPSEMINARSOpenModal} 
                setDeactivateEMPSEMINARSOpenModal={setDeactivateEMPSEMINARSOpenModal} 
                singleEMPSEMINARSDetailsData={singleEMPSEMINARSDetailsData} 
                setSingleEMPSEMINARSDetailsData={setSingleEMPSEMINARSDetailsData} 
                setSingleEMPSEMINARSOpenModal={setSingleEMPSEMINARSOpenModal}

            />
            <div className='flex flex-col gap-10 relative'>
                <div className='flex gap-6 flex-col mt-4'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Accomplished Date:' value={ThisProps.date_accomplished ? dayjs(ThisProps.date_accomplished).format(`${globalDate}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Employee #' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Subject:' value={ThisProps.subject || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Category:' value={ThisProps.category || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-12' container-name='leave_buttons_container'>
                {![2,3].includes(currUser?.rank_code) &&
                    <div className='flex justify-between' style={{width:'300px', marginTop: '20px'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Details</Button>
                        <Button variant='outlined' color={"error"} onClick={() => onClickModal(0)}>Delete</Button>
                    </div>
                }
            </div>
            </div>
        </Fragment>
    );
}

export default EMPSEMINARSModalUI;