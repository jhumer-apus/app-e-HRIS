import { useState, Dispatch, SetStateAction, Fragment, useEffect } from 'react';
import { UAViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveUAModal from '../main-modals/inner-modals/approve-ua-modal';
import DenyUAModal from '../main-modals/inner-modals/deny-ua-modal';
import { useSelector } from 'react-redux';
import { APILink, RootState, globalDateTime } from '@/store/configureStore';
import axios from 'axios';
import axiosInstance from '@/helpers/axiosConfig';

interface UAModalUIInterface {
    singleUADetailsData: UAViewInterface;
    multiplePayslipMode?: boolean;
    setSingleUADetailsData: Dispatch<SetStateAction<UAViewInterface>>;
}

function UAModalUI(props: UAModalUIInterface) {
    const [ approveUAOpenModal, setApproveUAOpenModal ] = useState(false);
    const [ denyUAOpenModal, setDenyUAOpenModal ] = useState(false);
    const { setSingleUADetailsData, singleUADetailsData } = props;
    const ThisProps = props.singleUADetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const [data, setData] = useState(ThisProps)
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveUAOpenModal(true);
            break;
            case 1: setDenyUAOpenModal(true);
            break;
        }   
        
    };

    useEffect(() => {
        fetchCutOffPeriod()
    },[])
    
    const fetchCutOffPeriod = async () => {
        await axiosInstance.get(`cutoff_period/${ThisProps.cutoff_code}`).then(res => {
            setData(curr => ({
                ...curr,
                cutOffPeriod: res.data.co_name
            }))
        })
    }

    const userIsApprover = curr_user?.emp_no === ThisProps.ua_approver1_empno || curr_user?.emp_no === ThisProps.ua_approver2_empno || ((curr_user?.rank_data?.hierarchy as number) > singleUADetailsData?.applicant_rank);
    return (
        <Fragment>
            <ApproveUAModal singleUADetailsData={singleUADetailsData} setSingleUADetailsData={setSingleUADetailsData} approveUAOpenModal={approveUAOpenModal} setApproveUAOpenModal={setApproveUAOpenModal}/>
            <DenyUAModal singleUADetailsData={singleUADetailsData} setSingleUADetailsData={setSingleUADetailsData} denyUAOpenModal={denyUAOpenModal} setDenyUAOpenModal={setDenyUAOpenModal}/>
            <div className='flex md:flex-row flex-col gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date & Time Filed:' value={ThisProps.ua_date_filed ? dayjs(ThisProps.ua_date_filed).format(`${globalDateTime}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Total hrs:' value={(ThisProps.ua_total_hours / 60).toFixed(2) || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cutoff Period:' value={data?.cutOffPeriod || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Cutoff Code:' value={ThisProps.cutoff_code || '-'} InputProps={{readOnly: true,}} variant='standard'/> */}
                    <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps.ua_approver1_empno || 'Any Higher Ranking Officer'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps.ua_approver2_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='UA Description:' value={ThisProps.ua_description || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Status:' value={ThisProps.ua_approval_status || '-'} InputProps={{readOnly: true,}} color={ThisProps.ua_approval_status === 'APD' ? 'success' : ThisProps.ua_approval_status === 'DIS' ? 'error' : 'warning'} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date From:' value={ThisProps.ua_date_from? dayjs(ThisProps.ua_date_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Until:' value={ThisProps.ua_date_to? dayjs(ThisProps.ua_date_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #1' value={ThisProps.ua_date_approved1? dayjs(ThisProps.ua_date_approved1).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.ua_date_approved1} color={ThisProps.ua_date_approved1 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #2' value={ThisProps.ua_date_approved2? dayjs(ThisProps.ua_date_approved2).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.ua_date_approved2} color={ThisProps.ua_date_approved2 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.ua_reason_disapproval} color={'error'} label='Reason for Disapproval:' value={ThisProps.ua_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
                <div id='stamp-mobile-container'>
                    {ThisProps.ua_approval_status === 'APD' && <img className='stamp-mobile' src={ '/img/stampApproved2.png' } style={{height: '200px', bottom: '0', right: '0', transform: 'rotate(0)', position: 'absolute'}}></img>}
                    {ThisProps.ua_approval_status === 'DIS' && <img className='stamp-mobile' src={ '/img/stampRejected.png' } style={{height: '200px', bottom: '0', right: '0', transform: 'rotate(0)', position: 'absolute'}}></img>}
                </div>
            </div>
            {/* {(ThisProps.ua_approval_status.includes('1') || ThisProps.ua_approval_status.includes('2')) && 
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='ua_buttons_container'>
                    <div className='flex justify-between' style={{width:'400px'}} container-name='ua_buttons'>
                        <Button disabled={!userIsApprover} variant='contained' onClick={()=> onClickModal(0)}>Approve UA</Button>
                        <Button disabled={!userIsApprover} variant='outlined' onClick={()=> onClickModal(1)}>Deny UA</Button>
                    </div>
                    
                </div>
                { !userIsApprover &&
                    <i className='w-6/12 text-center mt-4 ' style={{color: 'gray', marginBottom: '-200px'}}>You are not listed as one of the approverss</i>
                }
            </div>
            } */}


        </Fragment>
    );
}

export default UAModalUI;