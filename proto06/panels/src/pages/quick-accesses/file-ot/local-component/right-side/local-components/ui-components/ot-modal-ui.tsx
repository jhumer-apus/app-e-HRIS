import React, { useState, useEffect } from 'react';
import { OVERTIMEViewInterface } from '@/types/types-pages';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import { globalDateTime } from '@/store/configureStore';

import axios from 'axios'

//REDUX
import { APILink } from '@/store/configureStore';
import axiosInstance from '@/helpers/axiosConfig';

interface OVERTIMEModalUIInterface {
    singleOVERTIMEDetailsData: OVERTIMEViewInterface;
    multiplePayslipMode?: boolean;
    setSingleOVERTIMEDetailsData: React.Dispatch<React.SetStateAction<OVERTIMEViewInterface>>;
}

function OVERTIMEModalUI(props: OVERTIMEModalUIInterface) {
    const ThisProps = props.singleOVERTIMEDetailsData;  
    const [data, setData] = useState(
        {
            cuttOffPeriod: null
        }
    )

    useEffect(() => {
        fetchCutOffPeriod()
    },[])

    const fetchCutOffPeriod = async () => {
        await axiosInstance.get(`cutoff_period/${ThisProps.cutoff_code}`).then(res => {
            setData(curr => ({
                ...curr,
                cuttOffPeriod: res.data.co_name
            }))
        })
    }

    return (
        <React.Fragment>
            <div className='flex gap-10 md:flex-row flex-col overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date & Time Filed:' value={ThisProps.ot_date_filed ? dayjs(ThisProps.ot_date_filed).format(`${globalDateTime}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Total hrs:' value={(ThisProps.ot_total_hours / 60).toFixed(2) || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cutoff Period:' value={data.cuttOffPeriod || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Cutoff Code:' value={ThisProps.cutoff_code || '-'} InputProps={{readOnly: true,}} variant='standard'/> */}
                    <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps?.ot_approver1_empno? `${ThisProps?.ot_approver1_empno} - ${ThisProps?.approver1_name}`: ""} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps?.ot_approver2_empno? `${ThisProps?.ot_approver2_empno} - ${ThisProps?.approver2_name}`: ""} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps.ot_approver1_empno || 'Any Higher Ranking Officer'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps.ot_approver2_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/> */}
                    <TextField sx={{width: '100%'}} label='OVERTIME Description:' value={ThisProps.ot_remarks || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Status:' value={ThisProps.ot_approval_status || '-'} InputProps={{readOnly: true,}} color={ThisProps.ot_approval_status === 'APD' ? 'success' : ThisProps.ot_approval_status === 'DIS' ? 'error' : 'warning'} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Business Date:' value={ThisProps?.ot_business_date? dayjs(ThisProps.ot_business_date).format('MM-DD-YYYY') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date From:' value={ThisProps.ot_date_from? dayjs(ThisProps.ot_date_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Until:' value={ThisProps.ot_date_to? dayjs(ThisProps.ot_date_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #1' value={ThisProps.ot_date_approved1? dayjs(ThisProps.ot_date_approved1).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.ot_date_approved1} color={ThisProps.ot_date_approved1 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #2' value={ThisProps.ot_date_approved2? dayjs(ThisProps.ot_date_approved2).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.ot_date_approved2} color={ThisProps.ot_date_approved2 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee Name:' value={ThisProps.emp_name || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    {/* <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/> */}
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='OVERTIME Type:' value={ThisProps.ot_type || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    
                    {
                        ThisProps.ot_approval_status == "DIS" && 
                        <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.ot_reason_disapproval} color={'error'} label='Reason for Disapproval:' value={ThisProps.ot_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                    }
                                        {
                        ThisProps.ot_approval_status == "CX" && 
                        <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.ot_reason_cancelled} color={'error'} label='Cancel Reason:' value={ThisProps.ot_reason_cancelled || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>                    
                    }
                </div>
                {ThisProps.ot_approval_status === 'APD' && <img src={ '/img/stampApproved2.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
                {ThisProps.ot_approval_status === 'DIS' && <img src={ '/img/stampRejected.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
                {ThisProps.ot_approval_status === 'CX' && <img src={ '/img/stampCancel.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
            </div>
        </React.Fragment>
    );
}

export default OVERTIMEModalUI;