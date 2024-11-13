import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Autocomplete, Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import ExpiryDateLEAVECREDITCreate from './inner-ui-components/expiry-date-field';
import { Typography } from '@mui/joy';
import { LEAVECREDITCreateInterface } from '@/types/types-pages';
import { LEAVECREDITCreateAction, LEAVECREDITCreateActionFailureCleanup } from '@/store/actions/procedurals';
import LEAVETYPEFetchAutoCompleteOnLEAVECREDITPage from './inner-ui-components/leave-type-autocomplete';
import useFetchLeaveTypes from '@/custom-hooks/use-fetch-leave-types';
import EmployeeListField from '@/public-components/EmployeeListField';

interface CreateLEAVECREDITModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ProceduralLEAVECREDITCreate(props: CreateLEAVECREDITModalInterface) {

    const {data:leaveTypesData, status, error} = useFetchLeaveTypes();
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)

    const dispatch = useDispatch();
    const LEAVECREDITCreatestate = useSelector((state: RootState)=> state.procedurals.LEAVECREDITCreate);

    const [selectedLeaveDetails, setSelectedLeaveDetails] = useState<any>(null)
    const [maxInitialCredit, setMaxInitialCredit] = useState<number| null>(null)
    const [leaveCompensationType, setLeaveCompensationType] = useState<boolean>(true)

    const [createLEAVECREDIT, setCreateLEAVECREDIT] = useState<LEAVECREDITCreateInterface>({
        credit_max: null,
        expiry: null,
        emp_no: null,
        leave_type_code: null,
        credit_remaining: null,
        added_by: currUser?.emp_no
    });
    useEffect(() => {
        console.log(createLEAVECREDIT.credit_remaining)
    },[createLEAVECREDIT])

    const onClickSubmit = (e:any) => {
        e.preventDefault()
        dispatch(LEAVECREDITCreateAction(createLEAVECREDIT))
    };
    useEffect(()=>{
        if(LEAVECREDITCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(LEAVECREDITCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${LEAVECREDITCreatestate.error}`)
            setTimeout(()=> {
                dispatch(LEAVECREDITCreateActionFailureCleanup());
            }, 1000)
        }
    }, [LEAVECREDITCreatestate.status])

    useEffect(() => {

    }, [createLEAVECREDIT.leave_type_code])

    const handleChange = (event: any, newValue: any) => {
        if(newValue) {
            
            setSelectedLeaveDetails((curr:any) => newValue)
            setCreateLEAVECREDIT((curr:any) => ({
                ...curr,
                leave_type_code: newValue.id,
                credit_remaining: newValue.is_paid? null: 0,
                credit_max: newValue.is_paid? null: 0

            }))

            if((newValue.is_vl || newValue.is_sl) && newValue.is_paid){

                setMaxInitialCredit(curr => 30)

            } else if ((newValue.is_el) && newValue.is_paid) {

                setMaxInitialCredit(curr => 5)

            } else {

                setMaxInitialCredit(curr => null)

            }
        }
        
    };

    const handleChangeEmpField = (e:any, newValue:any) => {
        if(newValue) {
            setCreateLEAVECREDIT((prevState:any)=> 
                (
                    {
                        ...prevState,
                        emp_no: newValue.emp_no
                    }
                )
            )
        }
    }

    return (
        <div>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Leave Credit Data</Typography>
            <Typography sx={{ textAlign: 'center', marginTop: 3}}>After Creating a Leave for an Employee, Edit on the right and put "Max Credit"</Typography>
            <form onSubmit={onClickSubmit} className='flex w-full flex-col gap-6 overflow-auto relative'>
                <div className='flex flex-col gap-6 pt-4'>
                    <div className='flex flex-col gap-6'>
                        {/* <EmployeeAutoComplete createLEAVECREDIT={createLEAVECREDIT} setCreateLEAVECREDIT={setCreateLEAVECREDIT}/> */}
                        <EmployeeListField 
                            label="For Employee No.:" 
                            handleChange={handleChangeEmpField} 
                            currentValue={createLEAVECREDIT.emp_no} 
                        />
                        <Autocomplete
                            // disableCloseOnSelect
                            noOptionsText={'Loading... Please Wait.'}
                            options={leaveTypesData}
                            getOptionLabel={(option:any) => `${option.name} (${option.is_paid? 'Paid': 'Unpaid'})`}
                            onChange={handleChange}
                            sx={{ width: 'inherit' }}
                            // isOptionEqualToValue={isOptionEqualToValue}
                            renderInput={(params) => 
                                {   
                                    return(
                                        <TextField {...params} label="Leave Types" />
                                    )

                                }

                        }
                        />
                        {/* <LEAVETYPEFetchAutoCompleteOnLEAVECREDITPage createLEAVECREDIT={createLEAVECREDIT} setCreateLEAVECREDIT={setCreateLEAVECREDIT}/> */}
                    </div>
                    <div className='flex flex-col gap-6'>
                        <ExpiryDateLEAVECREDITCreate createLEAVECREDIT={createLEAVECREDIT} setCreateLEAVECREDIT={setCreateLEAVECREDIT}/>
                        <TextField
                            required={selectedLeaveDetails?.is_paid} 
                            disabled={!selectedLeaveDetails?.is_paid}
                            sx={{width: '100%'}} 
                            label='Max Credit:'  
                            variant='outlined' 
                            InputProps={{
                                inputProps:{
                                    min:0,
                                    max:maxInitialCredit,
                                    type:"number"
                                }
                                
                            }}
                            value={createLEAVECREDIT?.credit_max}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateLEAVECREDIT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            credit_max: value
                                        }
                                    )
                                })
                            }}
                            
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                        <TextField
                            required={selectedLeaveDetails?.is_paid} 
                            disabled={!selectedLeaveDetails?.is_paid}
                            label='Initial Credit:'
                            InputProps={{
                                inputProps:{
                                    min:0,
                                    max:createLEAVECREDIT?.credit_max,
                                    type:"number",
                                    step: 0.01
                                }
                            }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setCreateLEAVECREDIT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            credit_remaining: parseFloat(event.target.value)
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' type="submit">Create LEAVE CREDIT</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProceduralLEAVECREDITCreate;

