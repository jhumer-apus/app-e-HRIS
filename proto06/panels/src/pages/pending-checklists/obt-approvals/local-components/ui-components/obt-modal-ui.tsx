import React, { useEffect, useState } from 'react';
import { OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveOBTModal from '../main-modals/inner-modals/approve-obt-modal';
import DenyOBTModal from '../main-modals/inner-modals/deny-obt-modal';
import { useSelector } from 'react-redux';
import { RootState, globalDateTime } from '@/store/configureStore';
import { ApprovalStateInterface } from '@/types/index';

//LIBARIES
import { Typography } from "@material-tailwind/react";
import axios from 'axios'

//REDUX
import { APILink } from '@/store/configureStore';
import axiosInstance from '@/helpers/axiosConfig';

interface OBTModalUIInterface {
    singleOBTDetailsData: OBTViewInterface;
    multiplePayslipMode?: boolean;
    setSingleOBTDetailsData: React.Dispatch<React.SetStateAction<OBTViewInterface>>;
    setSingleOBTOpenModal:any
}

function OBTModalUI(props: OBTModalUIInterface) {
    const [ approveOBTOpenModal, setApproveOBTOpenModal ] = useState(false);
    const [ denyOBTOpenModal, setDenyOBTOpenModal ] = useState(false);
    const [ approvalState, setApprovalState ] = useState<ApprovalStateInterface>({
        buttonDisabled: false,
        message1Show: true,
    })
    const { setSingleOBTDetailsData, singleOBTDetailsData, setSingleOBTOpenModal } = props;
    const ThisProps = props.singleOBTDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const [data, setData] = useState(
        {
            cuttOffPeriod: null
        }
    )

    const updateRemarksWithEmpNo = () => {
        setSingleOBTDetailsData((curr:any) => ({
            ...curr,
            obt_remarks: singleOBTDetailsData.obt_remarks + ` (${curr_user?.emp_no})`
        }))
    }

    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: 
                updateRemarksWithEmpNo()
                setApproveOBTOpenModal(true);
                break;

            case 1: 
                updateRemarksWithEmpNo()
                setDenyOBTOpenModal(true);
                break;
        }   
        
    };
    useEffect(() => {
        setSingleOBTDetailsData((curr:any) => ({
            ...curr,
            added_by: curr_user?.emp_no
        }))
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

    const UserApprover1 = curr_user?.emp_no === ThisProps.obt_approver1_empno
    const UserApprover2 = curr_user?.emp_no === ThisProps.obt_approver2_empno
    const fileHasTwoApprovers = ThisProps.obt_approver1_empno && ThisProps.obt_approver2_empno
    const fileApprover1Approved = ThisProps.obt_date_approved1
    const fileApprover2Approved = ThisProps.obt_date_approved2
    const userIsHigherRank =  ((curr_user?.rank_data?.hierarchy as number) > singleOBTDetailsData?.applicant_rank)
    const isHrSuperAdmin = curr_user?.rank_hierarchy == 5 || curr_user?.rank_code == 6;
    
    useEffect(()=> {
        if(fileHasTwoApprovers){
            if(UserApprover1 && fileApprover1Approved && fileApprover2Approved){
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            ...prevState,
                            buttonDisabled: true,
                            message1Show: true,
                        }
                    )
                })
            }else if (UserApprover2 && fileApprover1Approved && !fileApprover2Approved) {
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            ...prevState,
                            buttonDisabled: false,
                        }
                    )
                })
            }else if (!UserApprover1 && !UserApprover2 && !fileApprover1Approved && userIsHigherRank ){
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            buttonDisabled: false,
                            message1Show: false,
                        }
                    )
                })
            }else if(isHrSuperAdmin) {
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            buttonDisabled: false,
                            message1Show: false,
                        }
                    )
                })
            
            }else if((UserApprover1 && !fileApprover1Approved) || (UserApprover2 && !fileApprover2Approved)) {
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            buttonDisabled: false,
                            message1Show: true,
                        }
                    )
                })
            }
            else {
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            buttonDisabled: true,
                            message1Show: true,
                        }
                    )
                })
            }
        }else if (UserApprover1 || UserApprover2) {
            setApprovalState((prevState: ApprovalStateInterface) => {
                return (
                    {
                        buttonDisabled: false,
                        message1Show: false,
                    }
                )
            })
        }else if(!UserApprover1 && !UserApprover2 && isHrSuperAdmin) {
            setApprovalState((prevState: ApprovalStateInterface) => {
                return (
                    {
                        buttonDisabled: false,
                        message1Show: false,
                    }
                )
            })
        } else {
            setApprovalState((prevState: ApprovalStateInterface) => {
                return (
                    {
                        buttonDisabled: true,
                        message1Show: false,
                    }
                )
            })
        }

    }, [])

    const obtTotalHours = (!ThisProps.obt_total_hours || Number.isNaN(ThisProps.obt_total_hours))? "-" : (ThisProps.obt_total_hours / 60).toFixed(2)

    return (
        <React.Fragment>
            <ApproveOBTModal setSingleOBTOpenModal={setSingleOBTOpenModal} singleOBTDetailsData={singleOBTDetailsData} setSingleOBTDetailsData={setSingleOBTDetailsData} approveOBTOpenModal={approveOBTOpenModal} setApproveOBTOpenModal={setApproveOBTOpenModal}/>
            <DenyOBTModal singleOBTDetailsData={singleOBTDetailsData} setSingleOBTDetailsData={setSingleOBTDetailsData} denyOBTOpenModal={denyOBTOpenModal} setDenyOBTOpenModal={setDenyOBTOpenModal}/>
            <div className='flex flex-col md:flex-row gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date & Time Filed:' value={ThisProps.obt_date_filed ? dayjs(ThisProps.obt_date_filed).format(`${globalDateTime}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Total hrs:' value={obtTotalHours} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cutoff Period:' value={data.cuttOffPeriod || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Cutoff Code:' value={ThisProps.cutoff_code || '-'} InputProps={{readOnly: true,}} variant='standard'/> */}
                    <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps?.obt_approver1_empno? `${ThisProps?.obt_approver1_empno} - ${ThisProps?.approver1_name}`: ""} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps?.obt_approver2_empno? `${ThisProps?.obt_approver2_empno} - ${ThisProps?.approver2_name}`: ""} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps.obt_approver1_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps.obt_approver2_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/> */}
                    {/* <TextField sx={{width: '100%'}} label='OBT Description:' value={ThisProps.obt_remarks || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/> */}
                    <TextField sx={{width: '100%'}} label='Location:' value={ThisProps.obt_remarks || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={2}/>

                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Status:' value={ThisProps.obt_approval_status || '-'} InputProps={{readOnly: true,}} color={ThisProps.obt_approval_status === 'APD' ? 'success' : ThisProps.obt_approval_status === 'DIS' ? 'error' : 'warning'} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Business Date:' value={ThisProps?.obt_business_date? dayjs(ThisProps.obt_business_date).format('MM-DD-YYYY') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date From:' value={ThisProps.obt_date_from? dayjs(ThisProps.obt_date_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Until:' value={ThisProps.obt_date_to? dayjs(ThisProps.obt_date_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #1' value={ThisProps.obt_date_approved1? dayjs(ThisProps.obt_date_approved1).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.obt_date_approved1} color={ThisProps.obt_date_approved1 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #2' value={ThisProps.obt_date_approved2? dayjs(ThisProps.obt_date_approved2).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.obt_date_approved2} color={ThisProps.obt_date_approved2 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Location:' value={ThisProps.obt_remarks || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={2}/> */}
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee Name:' value={ThisProps.emp_name || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    {/* <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/> */}
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='OBT Type:' value={ThisProps.obt_type_name || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.obt_reason_disapproval} color={'error'} label='Reason for Disapproval:' value={ThisProps.obt_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                    {ThisProps.obt_approval_status === 'APD' && <img src={ '/img/stampApproved2.png' } style={{height: '200px', bottom: '0', right: '0', transform: 'rotate(0)', position: 'absolute'}}></img>}
                    {ThisProps.obt_approval_status === 'DIS' && <img src={ '/img/stampRejected.png' } style={{height: '200px', bottom: '0', right: '0', transform: 'rotate(0)', position: 'absolute'}}></img>}
                </div>

            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='obt_buttons_container'>
                <div className='flex md:justify-between md:flex-row flex-col gap-4 px-12 md:p-0 md:w-96' container-name='obt_buttons'>
                    <Button disabled={approvalState.buttonDisabled} variant='contained' onClick={()=> onClickModal(0)}>Approve OBT</Button>
                    <Button disabled={approvalState.buttonDisabled} variant='outlined' onClick={()=> onClickModal(1)}>Deny OBT</Button>
                </div>
                
            </div>
            { approvalState.message1Show &&
                <i className='w-6/12 text-center mt-4' style={{color: 'gray'}}>All listed approver must approve - Status: Pending </i>
            }
            { !approvalState.message1Show &&
                <i className='w-6/12 text-center mt-4' style={{color: 'gray'}}>Your action is needed as eligible approver - Status: Pending </i>
            }
            </div>


        </React.Fragment>
    );
}

export default OBTModalUI;