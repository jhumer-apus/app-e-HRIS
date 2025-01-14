import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import DateFromToEMPSEMINARSCreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
// import { EMPSEMINARSCreateInterface } from '@/types/types-pages';
import { EMPSEMINARSCreateInterface } from '@/types/types-employee-and-applicants';
import { EMPSEMINARSCreateAction, EMPSEMINARSCreateActionFailureCleanup, EMPSEMINARSViewSpecificAction } from '@/store/actions/employee-and-applicants';
import EmployeeAutoCompleteFull from './inner-ui-components/employee-autocomplete-full';
import EmployeeListField from '@/public-components/EmployeeListField';

interface CreateEMPSEMINARSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
    currEmployee: number;
    setCurrEmployee: Dispatch<React.SetStateAction<number>>
}

function EMPSEMINARSCreate(props: CreateEMPSEMINARSModalInterface) {
    const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)
    const dispatch = useDispatch();
    const EMPSEMINARSCreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.EMPSEMINARSCreate);
    const [createEMPSEMINARS, setCreateEMPSEMINARS] = useState<EMPSEMINARSCreateInterface>({
        subject: '',
        date_accomplished: null,
        category: '',
        emp_no: NaN,
        added_by: NaN
    });
    useEffect(()=> {
        if(curr_user){
            setCreateEMPSEMINARS((prevState)=> {
                return({
                    ...prevState,
                    added_by: curr_user,
                })
            })
        }
    }, [curr_user])
    const onClickSubmit = () => {
        dispatch(EMPSEMINARSCreateAction(createEMPSEMINARS))
    };
    useEffect(()=>{
        if(EMPSEMINARSCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            props.setCurrEmployee(createEMPSEMINARS.emp_no)
            dispatch((EMPSEMINARSViewSpecificAction(({emp_no: createEMPSEMINARS.emp_no}))))
            setTimeout(()=> {
                dispatch(EMPSEMINARSCreateActionFailureCleanup());
            }, 300)
            // window.location.reload();
        }else if(EMPSEMINARSCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${EMPSEMINARSCreatestate.error}`)
            setTimeout(()=> {
                dispatch(EMPSEMINARSCreateActionFailureCleanup());
            }, 300)
        }
    }, [EMPSEMINARSCreatestate.status])

    const handleChangeCategory = (e: any, newVal: any) => {
        if(newVal) {
            setCreateEMPSEMINARS(curr => ({
                ...curr,
                category: newVal.label
            }))
        }
    }
    
    const options = [
        {
            label: 'Training'
        },
        {
            label: 'Seminar'
        },
    ]

    const handleChangeEmpField = (e:any, newValue:any) => {
        if(newValue) {
            setCreateEMPSEMINARS((prevState:any)=> 
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
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '2px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a record of Training/Seminar for Data</Typography>
            <div className='flex flex-col gap-3 overflow-auto relative'>
                <div className='flex flex-wrap gap-3 pt-4 mt-6'>
                    <div className='flex flex-col gap-3' style={{ width: '100%' }}>
                        {/* <EmployeeAutoCompleteFull currEmployee={props.currEmployee} createEMPSEMINARS={createEMPSEMINARS} setCreateEMPSEMINARS={setCreateEMPSEMINARS}/> */}
                        <EmployeeListField 
                            label="For Employee No.:" 
                            handleChange={handleChangeEmpField} 
                            currentValue={createEMPSEMINARS.emp_no} 
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Subject'  
                            variant='outlined' 
                            multiline rows={4}
                            value={createEMPSEMINARS?.subject}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateEMPSEMINARS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            subject: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        />
                    </div>
                    <div className='flex flex-col gap-6' style={{ width: '100%' }}>
                        <DateFromToEMPSEMINARSCreate createEMPSEMINARS={createEMPSEMINARS} setCreateEMPSEMINARS={setCreateEMPSEMINARS}/>
                        <Autocomplete
                            className="w-full mb-4"
                            disablePortal
                            options={options}
                            onChange={(handleChangeCategory)}
                            renderInput={(params) => <TextField {...params} label={'Training or Seminar'} />}
                        />
                        {/* <Autocomplete
                            disablePortal
                            id="training_seminar"
                            options={top100Films}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Movie" />}
                        /> */}
                        {/* <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Training or Seminar'
                            placeholder='Declare whether a "Training" or a "Seminar" (Case Sensitive)'  
                            variant='outlined' 
                            multiline rows={4}
                            value={createEMPSEMINARS?.category}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateEMPSEMINARS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            category: event.target.value
                                        }
                                    )
                                })
                            }}
                        /> */}
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='ot_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='ot_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create a Record of Training/Seminar</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EMPSEMINARSCreate;

