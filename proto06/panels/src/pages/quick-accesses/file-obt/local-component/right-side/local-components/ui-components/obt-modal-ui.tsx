import { Dispatch, SetStateAction, Fragment, useState, useEffect } from 'react';
import { OBTViewInterface } from '@/types/types-pages';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import { APILink, globalDateTime } from '@/store/configureStore';
import axios from 'axios';

interface OBTModalUIInterface {
    singleOBTDetailsData: OBTViewInterface;
    multiplePayslipMode?: boolean;
    setSingleOBTDetailsData: Dispatch<SetStateAction<OBTViewInterface>>;
}

function OBTModalUI(props: OBTModalUIInterface) {
    const ThisProps = props.singleOBTDetailsData;
    
    const [data, setData] = useState(ThisProps)

    useEffect(() => {
        fetchCutOffPeriod()
    },[])
    
    const fetchCutOffPeriod = async () => {
        await axios.get(`${APILink}cutoff_period/${ThisProps.cutoff_code}`).then(res => {
            setData(curr => ({
                ...curr,
                cuttOffPeriod: res.data.co_name
            }))
        })
    }
    
    const obtTotalHours = (!ThisProps.obt_total_hours || Number.isNaN(ThisProps.obt_total_hours))? "-" : (ThisProps.obt_total_hours / 60).toFixed(2)

    return (
        <Fragment>
            <div className='flex flex-col md:flex-row gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date & Time Filed:' value={ThisProps.obt_date_filed ? dayjs(ThisProps.obt_date_filed).format(`${globalDateTime}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Total hrs:' value={obtTotalHours} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cutoff Period' value={data?.cuttOffPeriod || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Cutoff Code:' value={data?.cuttOffPeriod || '-'} InputProps={{readOnly: true,}} variant='standard'/> */}
                    <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps?.obt_approver1_empno? `${ThisProps?.obt_approver1_empno} - ${ThisProps?.approver1_name}`: ""} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps?.obt_approver2_empno? `${ThisProps?.obt_approver2_empno} - ${ThisProps?.approver2_name}`: ""} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Location:' value={ThisProps.obt_location || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={2}/>
                    <TextField sx={{width: '100%'}} label='OBT Description:' value={ThisProps.obt_remarks || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Status:' value={ThisProps.obt_approval_status || '-'} InputProps={{readOnly: true,}} color={ThisProps.obt_approval_status === 'APD' ? 'success' : ThisProps.obt_approval_status === 'DIS' ? 'error' : 'warning'} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Business Date:' value={ThisProps?.obt_business_date? dayjs(ThisProps.obt_business_date).format('MM-DD-YYYY') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date From:' value={ThisProps.obt_date_from? dayjs(ThisProps.obt_date_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Until:' value={ThisProps.obt_date_to? dayjs(ThisProps.obt_date_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #1' value={ThisProps.obt_date_approved1? dayjs(ThisProps.obt_date_approved1).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.obt_date_approved1} color={ThisProps.obt_date_approved1 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #2' value={ThisProps.obt_date_approved2? dayjs(ThisProps.obt_date_approved2).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.obt_date_approved2} color={ThisProps.obt_date_approved2 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='OBT Type:' value={ThisProps.obt_type_name || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.obt_reason_disapproval} color={'error'} label='Reason for Disapproval:' value={ThisProps.obt_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                    {ThisProps.obt_approval_status === 'APD' && <img src={ '/img/stampApproved2.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
                    {ThisProps.obt_approval_status === 'DIS' && <img src={ '/img/stampRejected.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
                </div>

            </div>
        </Fragment>
    );
}

export default OBTModalUI;