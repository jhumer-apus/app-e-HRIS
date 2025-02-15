import React, { useState, useEffect } from 'react';
import { UAViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveUAModal from '../main-modals/inner-modals/approve-ua-modal';
import DenyUAModal from '../main-modals/inner-modals/deny-ua-modal';
import { useSelector } from 'react-redux';
import { RootState, globalDateTime } from '@/store/configureStore';
import { ApprovalStateInterface } from '@/types/index';

//LIBRARIES
import axios from 'axios'

//REDUX
import { APILink } from '@/store/configureStore';
import axiosInstance from '@/helpers/axiosConfig';
interface UAModalUIInterface {
    singleUADetailsData: UAViewInterface;
    multiplePayslipMode?: boolean;
    setSingleUADetailsData: React.Dispatch<React.SetStateAction<UAViewInterface>>;
}

function UAModalUI(props: UAModalUIInterface) {
    const [ approveUAOpenModal, setApproveUAOpenModal ] = useState(false);
    const [ denyUAOpenModal, setDenyUAOpenModal ] = useState(false);
    const { setSingleUADetailsData, singleUADetailsData } = props;
    const ThisProps = props.singleUADetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const [data, setData] = useState(
        {
            cuttOffPeriod: null
        }
    )

    const updateRemarksWithEmpNo = () => {
        setSingleUADetailsData(curr => ({
            ...curr,
            ua_description: singleUADetailsData.ua_description + ` (${curr_user?.emp_no})`
        }))
    }

    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: 
                updateRemarksWithEmpNo()
                setApproveUAOpenModal(true);
                break;

            case 1: 
                updateRemarksWithEmpNo()
                setDenyUAOpenModal(true);
                break;
        }   
        
    };

    useEffect(() => {
        setSingleUADetailsData(curr => ({
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

    const [ approvalState, setApprovalState ] = useState<ApprovalStateInterface>({
        buttonDisabled: false,
        message1Show: true,
    })
    const UserApprover1 = curr_user?.emp_no === ThisProps.ua_approver1_empno
    const UserApprover2 = curr_user?.emp_no === ThisProps.ua_approver2_empno
    const fileHasTwoApprovers = ThisProps.ua_approver1_empno && ThisProps.ua_approver2_empno
    const fileApprover1Approved = ThisProps.ua_date_approved1
    const fileApprover2Approved = ThisProps.ua_date_approved2
    const userIsHigherRank =  ((curr_user?.rank_data?.hierarchy as number) > singleUADetailsData?.applicant_rank)
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
            } else if((UserApprover1 && !fileApprover1Approved) || (UserApprover2 && !fileApprover2Approved)) {
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            buttonDisabled: false,
                            message1Show: true,
                        }
                    )
                })
            } else {
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
        }else {
            setApprovalState((prevState: ApprovalStateInterface) => {
                return (
                    {
                        buttonDisabled: true,
                        message1Show: false,
                    }
                )
            })
        }

    }, [approvalState])

    return (
        <React.Fragment>
            <ApproveUAModal singleUADetailsData={singleUADetailsData} setSingleUADetailsData={setSingleUADetailsData} approveUAOpenModal={approveUAOpenModal} setApproveUAOpenModal={setApproveUAOpenModal}/>
            <DenyUAModal singleUADetailsData={singleUADetailsData} setSingleUADetailsData={setSingleUADetailsData} denyUAOpenModal={denyUAOpenModal} setDenyUAOpenModal={setDenyUAOpenModal}/>
            <div className='flex md:flex-row flex-col gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date & Time Filed:' value={ThisProps.ua_date_filed ? dayjs(ThisProps.ua_date_filed).format(`${globalDateTime}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Total hrs:' value={(ThisProps.ua_total_hours / 60).toFixed(2) || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cutoff Period:' value={data.cuttOffPeriod || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Cutoff Code:' value={ThisProps.cutoff_code || '-'} InputProps={{readOnly: true,}} variant='standard'/> */}
                    <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps.ua_approver1_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/>
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
                <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee Name:' value={ThisProps.emp_name || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    {/* <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/> */}
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='UA Type:' value={ThisProps.ua_type || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.ua_reason_disapproval} color={'error'} label='Reason for Disapproval:' value={ThisProps.ua_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>

                </div>
                {ThisProps.ua_approval_status === 'APD' && <img src={ '/img/stampApproved2.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
                {ThisProps.ua_approval_status === 'DIS' && <img src={ '/img/stampRejected.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
            </div>

            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6 w-full' container-name='ua_buttons_container'>
                <div className='flex justify-between flex-col sm:flex-row xs:w-[70%] gap-5 md:w-96' container-name='ua_buttons'>
                    <Button disabled={approvalState.buttonDisabled} variant='contained' onClick={()=> onClickModal(0)}>Approve UA</Button>
                    <Button disabled={approvalState.buttonDisabled} variant='outlined' onClick={()=> onClickModal(1)}>Deny UA</Button>
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

export default UAModalUI;
