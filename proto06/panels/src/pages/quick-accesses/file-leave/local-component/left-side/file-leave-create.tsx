import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button, FormHelperText } from '@mui/material';
import {TextField} from '@mui/material';
import { Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import LEAVETypeAutoComplete from './inner-ui-components/leave-type-autocomplete';
import DateFromToLEAVECreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { LEAVECreateInterface } from '@/types/types-pages';
import { LEAVECreateAction, LEAVECreateActionFailureCleanup, LEAVEViewFilterEmployeeAction } from '@/store/actions/procedurals';
import { APILink } from '@/store/configureStore';
import axios, {AxiosResponse, AxiosError} from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { create } from 'lodash';

//LIBRARIES
import FormControl, { useFormControl } from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { beautifyJSON } from '@/helpers/utils';
import dayjs from 'dayjs';
import { HandleAlertAction } from '@/store/actions/components';
import axiosInstance from '@/helpers/axiosConfig';
import { validateImage } from '@/helpers/validator/employee_information';


interface CreateLEAVEModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

interface EmergencyReasons {
    id:number,
    name:string
}

interface LeaveType {
    name: string | null,
    is_vl: boolean | null,
    is_sl: boolean | null,
    is_el: boolean | null,
    is_paid: boolean | null
}

function QuickAccessLEAVECreate(props: CreateLEAVEModalInterface) {

    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.auth.employee_detail);

    //STATES
    const [disableOption, setDisableOption] = useState<boolean>(false)
    const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);
    const LEAVECreatestate = useSelector((state: RootState)=> state.procedurals.LEAVECreate);
    const [leaveCredits, setLeaveCredits] = useState<any>([])
    const [leaveType, setLeaveType] = useState<LeaveType>({
        name: null,
        is_vl: null,
        is_sl: null,
        is_el: null,
        is_paid: null
    }) 
    const [createLEAVE, setCreateLEAVE] = useState<LEAVECreateInterface>({
        emp_no: NaN,
        leave_credit: null,
        leave_remarks: '',
        leave_date_from: null,
        leave_date_to: null,
        added_by: userData?.emp_no,
        uploaded_file: "",
        emergency_reasons: null,
        option:null
    });

    useEffect(() => {

        const dateDifference = getDateDifference(createLEAVE.leave_date_from, createLEAVE.leave_date_to)

        if(dateDifference > 0) {
            setCreateLEAVE(curr => ({
                ...curr,
                option:'whole'
            }))
            setDisableOption(curr => true)
        }else{
            setDisableOption(curr => false)
        }

    },[createLEAVE.leave_date_from, createLEAVE.leave_date_to])


    // const [remainingLeaveCredits, setRemainingLeaveCredits] = useState(
    //     {
    //         vacationLeave: 0,
    //         sickLeave: 0,
    //         emergencyLeave: 0
    //     }
    // )

    const validateLeaveCredit = () => {

        let errors:any = {}
        
        if((leaveType.is_sl && !leaveType.is_vl && !leaveType.is_el) || leaveType.name=="Sick Leave"){
            !validateImage(createLEAVE?.uploaded_file) && (errors["Supporting Document"] = "Supporting Document is not an image")
        }
        !createLEAVE.emp_no && (errors["Employee Number"] = "Employee Number is Required")
        !createLEAVE.leave_credit?.id && (createLEAVE.leave_credit?.id == undefined) && (errors["Leave Type"] = "Leave Type is Required")
        !createLEAVE.leave_remarks && (errors["Leave Description"] = "Leave Description is Required")
        !createLEAVE.leave_date_from && (errors["Date Time From"] = "Leave Date Start is Required")
        !createLEAVE.emergency_reasons && ((leaveType.is_el && !leaveType.is_vl && !leaveType.is_sl) || leaveType.name=="Emergency Leave") && (errors["Emergency Reasons"] = "Emergency Reason is Required")
        !createLEAVE.option && (errors["Leave Option"] = "Leave Option is Required")

        if(Object.keys(errors).length > 0) {
            window.alert(beautifyJSON(errors))
            return true
        }
        return false
    }

    const onClickSubmit = (e:any) => {

        e.preventDefault()

        const formData = new FormData();
        if(validateLeaveCredit()) {
            return
        }

        formData.append('emp_no', createLEAVE.emp_no);
        formData.append('leave_credit', createLEAVE.leave_credit?.id);
        formData.append('leave_remarks', createLEAVE.leave_remarks);
        formData.append('leave_date_from', createLEAVE.leave_date_from);
        formData.append('leave_date_to', createLEAVE.leave_date_to);
        formData.append('added_by', createLEAVE.added_by);
        formData.append('uploaded_file', createLEAVE.uploaded_file);
        formData.append('emergency_reasons', createLEAVE.emergency_reasons);
        formData.append('option', createLEAVE.option);

        // for(const key in createLEAVE) {

        //     if (Object.prototype.hasOwnProperty.call(createLEAVE, key)) {
        //         const value = createLEAVE[key as keyof LEAVECreateInterface];
        //         // Check if the value is not null and not undefined
        //         console.log(value)
        //         if (value !== null && value !== undefined) {
        //             formData.append(key, value);
        //         }
        //     }
        // }
        
        submitNewFileLeave(formData)
        // dispatch(LEAVECreateAction(formData))
    };
    
    const formReseter = (): void => {
        setCreateLEAVE((prevState) => ({
            ...prevState,
            leave_credit: null,
            leave_remarks: '',
            leave_date_from: null,
            leave_date_to: null,
            uploaded_file: "",
            emergency_reasons: null,
            option:null
        }))
    }

    const submitNewFileLeave = async (formData:FormData) => {

        setIsSubmittingRequest(true)
        await axiosInstance.post(`leave/`, formData).then((res:AxiosResponse) => {

            setIsSubmittingRequest(false)
            fetchLeaveCredits(userData?.emp_no)
            dispatch(LEAVEViewFilterEmployeeAction({emp_no: userData?.emp_no}))
            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message:"File Leave Successfully"
            }))
            
            sendEmail(createLEAVE.emp_no, res.data.leave_ids)
            formReseter();
        }).catch((err:any) => {

            setIsSubmittingRequest(false)
            fetchLeaveCredits(userData?.emp_no)
            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                message:beautifyJSON(err.response?.data)
            }))
        })
    }

    //USE EFFECTS
    // useEffect(()=>{

    //     if(LEAVECreatestate.status === 'succeeded'){

    //         setIsSubmittingRequest(false)
    //         window.alert('Request Successful');
    //         window.location.reload();

    //     }else if(LEAVECreatestate.status === 'failed'){

    //         setIsSubmittingRequest(false)

    //         window.alert(`Request Failed, ${LEAVECreatestate.error}`)

    //         setTimeout(()=> {
    //             dispatch(LEAVECreateActionFailureCleanup());
    //         }, 1000)

    //     }
    // }, [LEAVECreatestate.status])

    useEffect(() => {
        // getRemeainingLeaveCredits()
        fetchLeaveCredits(userData?.emp_no)
    },[])

    useEffect(() => {
        if(createLEAVE.leave_credit) {
            fetchSpecificLeave(createLEAVE.leave_credit.leave_type_code)
        }
    },[createLEAVE.leave_credit])

    const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>) => {

        const selectedFile: File | null = e.target.files && e.target.files[0];
        const MAX_FILE_SIZE_MB = 3;

        if (selectedFile) {

            if(selectedFile.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {

                setCreateLEAVE((curr:any) => ({
                    ...curr,
                    uploaded_file: selectedFile
                }))

            } else {
                window.alert('Image should be not more than 3MB');
            }

        }
    }

    // const getRemeainingLeaveCredits = async () => {
    //     axiosInstance.get(`leave_credit/${userData?.emp_no}`).then(res => {

    //         if(res && res.data && res.data.length > 0) {

    //             let vacationLeave = remainingLeaveCredits.vacationLeave
    //             let sickLeave = remainingLeaveCredits.sickLeave
    //             let emergencyLeave = remainingLeaveCredits.emergencyLeave

    //             res.data.forEach((leave:any) => {

    //                 switch(leave.leave_name) {

    //                     case "Vacation Leave":
    //                         vacationLeave = leave.credit_remaining
    //                         break;
                        
    //                     case "Sick Leave":
    //                         sickLeave = leave.credit_remaining
    //                         break;
                        
    //                     case "Emergency Leave":
    //                         emergencyLeave = leave.credit_remaining
    //                         break;
                        
    //                 }
    //                 setRemainingLeaveCredits((curr:any) => ({
    //                     vacationLeave: vacationLeave,
    //                     sickLeave: sickLeave,
    //                     emergencyLeave: emergencyLeave
    //                 }))
    //             })
    //         }
    //     })
    // }

    const emergencyReasons: EmergencyReasons[] = [
        {
            id:1,
            name:"Natural Calamity"
        },
        {
            id:2,
            name:"Sickness of Immediate Family(Parents, children, spouse, siblings)"
        },
        {
            id:3,
            name:"Government-declared non-working day due to calamity"
        },
        {
            id:4,
            name:"Man-made calamity"
        },
        {
            id:5,
            name:"Burial of Immediate Family"
        },
        {
            id:6,
            name:"Accident (documentary evidence)"
        },
        {
            id:7,
            name:"Personal medical emergencies"
        },
        {
            id:8,
            name:"Security Issues (documentary evidence)"
        },
    ]

    const handleChangeEmergencyReasons = (e:any, value:EmergencyReasons | null) => {
        if(value) {
            setCreateLEAVE(curr => (
                {
                    ...curr,
                    emergency_reasons: value?.name
                }
            ))
        }
    }
    const fetchSpecificLeave = async (leave_id: number) => {
        await axiosInstance.get(`leave_type/${leave_id}/`).then(res => {
            setLeaveType(curr => ({
                name: res.data.name,
                is_vl: res.data.is_vl,
                is_sl: res.data.is_sl,
                is_el: res.data.is_el,
                is_paid: res.data.is_paid
            }))
        })
    }

    const fetchLeaveCredits = async (emp_no:number | string) => {
        if(emp_no) {

            await axiosInstance.get(`leave_credit/${emp_no}`).then((res:AxiosResponse) => {

                const leaveCredits =  Array.isArray(res.data)? res.data: []
                setLeaveCredits((curr:any) => leaveCredits)
    
            }).catch((err:AxiosError) => {
                console.log(err)
            })
        }
    }

    const sendEmail = (emp_no:string | number, app_pk: number[]) => {

        try {
            app_pk.forEach(leave_id => {

                const body = {
                    emp_no: emp_no,
                    email_type: "application",
                    new_password: null,
                    application_type: 'leave',
                    application_pk: leave_id
                  }
                  
                  axiosInstance.post(`reset_password_email/`, body)
            })

            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message:"Application has been sent to the approver through email"
            }))

        } catch(err) {

            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                message:"Failed to email the approver"
            }))

        }
        
    }

    const getDateDifference = (dateFrom: string | Date | null, dateTo: string | Date | null) => {

        if(dateFrom && dateTo) {
            const start = dayjs(createLEAVE.leave_date_from)
            const end = dayjs(createLEAVE.leave_date_to)
            return end.diff(start, 'day')
        }
        return 0;
    }

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '2px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Leave Data</Typography>

            {/* <div className='my-4'>
                <Typography fontSize="xl" fontWeight="lg">
                    Remaining Leave Credits
                </Typography>
                <div className='flex flex-col md:flex-row md:space-x-4'>
                    <Typography fontWeight="lg">
                        Vacation Leave: {remainingLeaveCredits.vacationLeave}
                    </Typography>
                    <Typography fontWeight="lg">
                        Sick Leave: {remainingLeaveCredits.sickLeave}
                    </Typography>
                    <Typography fontWeight="lg">
                        Emergency Leave: {remainingLeaveCredits.emergencyLeave}
                    </Typography>
                </div>
            </div> */}
            <form onSubmit={onClickSubmit} className='flex flex-col gap-6 overflow-auto relative'>
                <div className='flex flex-wrap gap-3 pt-4'>
                    <div className='flex flex-col gap-3' style={{width:'100%'}}>
                        <EmployeeAutoComplete createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/>
                        {/* {createLEAVE.leave_type} */}
                        <Autocomplete
                            // disableCloseOnSelect
                            noOptionsText={'No Leave Credits'}
                            options={leaveCredits}
                            getOptionLabel={(option:any) => `${option.leave_type_data.name} ${option.leave_type_data.is_paid?`(Remaining - ${option.credit_remaining})` : `(Unpaid)`}`}
                            onChange={((e:any, newValue:any) => {
                                setCreateLEAVE(curr => ({
                                    ...curr,
                                    leave_credit: newValue
                                }))
                            })}
                            sx={{ width: '100%' }}
                            value={createLEAVE.leave_credit}
                            // isOptionEqualToValue={isOptionEqualToValue}
                            renderInput={(params) => 
                                {   
                                    return (
                                        <>
                                            <TextField {...params} label="Leave Types"/>
                                        </>
                                    )
                                }
                            }
                        />

                        {/* <LEAVETypeAutoComplete createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/> */}
                        {((leaveType.is_el && !leaveType.is_vl && !leaveType.is_sl) || leaveType.name=="Emergency Leave") && 
                            <Autocomplete
                                onChange={handleChangeEmergencyReasons}
                                disablePortal
                                id="emergency_reasons"
                                options={emergencyReasons}
                                getOptionLabel={(option:EmergencyReasons) => option.name}
                                renderInput={(params:any) => <TextField {...params} label="Emergency Reasons" />}
                            />
                        }
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='LEAVE Description:'  
                            variant='outlined' 
                            multiline rows={2}
                            value={createLEAVE.leave_remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateLEAVE((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            leave_remarks: event.target.value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-6' style={{width:'100%'}}>
                        <DateFromToLEAVECreate createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/>
                    </div>
                    {disableOption? 
                        <TextField
                            required
                            value='Whole Day'
                            label="Leave Option"
                            className='w-full'
                            InputProps={{
                                readOnly: true,
                            }}
                        />: 
                        <FormControl fullWidth>
                            <InputLabel htmlFor="options">Leave Option</InputLabel>
                            <Select
                                labelId="options"
                                id="options"
                                label="Leave Option"
                                value={createLEAVE.option}
                                onChange={(e) => setCreateLEAVE(curr => ({
                                    ...curr,
                                    option: e.target.value
                                }))}
                                disabled={disableOption}
                                required
                            >
                                <MenuItem value="early">Early Half Day</MenuItem>
                                <MenuItem value="late">Late Half Day</MenuItem>
                                <MenuItem value="whole">Whole Day</MenuItem>
                            </Select>
                            {disableOption && <FormHelperText>Multiple Days will be automatically set to Whole Day</FormHelperText>}
                        </FormControl>
                    }
                    
                    {/* <FormControl fullWidth>
                        <InputLabel htmlFor="options" shrink={Boolean(createLEAVE.option)}>Leave Option</InputLabel>
                        <Select
                            labelId="options"
                            id="options"
                            value={createLEAVE.option}
                            // label="Leave Option"
                            onChange={(e) => setCreateLEAVE(curr => ({
                                ...curr,
                                option: e.target.value
                            }))}
                            // inputProps={{
                            //     id:'options'
                            // }}
                            disabled={disableOption}
                        >
                            <MenuItem value="early">Early Half Day</MenuItem>
                            <MenuItem value="late">Late Half Day</MenuItem>
                            <MenuItem value="whole">Whole Day</MenuItem>
                        </Select>
                        {disableOption && <FormHelperText>Multiple Days will be automatically set to Whole Day</FormHelperText>}
                    </FormControl> */}
                </div>
                {/* <Input 
                    type="file"
                    accept="image/*"
                    label=" Supporting Documents(Image)"
                    onChange={handleChangeImage}
                /> */}
                {((leaveType.is_sl && !leaveType.is_vl && !leaveType.is_el) || leaveType.name=="Sick Leave") &&    
                    <Input 
                        type="file"
                        accept="image/*"
                        label=" Supporting Documents(Image)"
                        onChange={handleChangeImage}
                        required
                    />
                }
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' type='submit'>Create LEAVE</Button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default QuickAccessLEAVECreate;

