import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import DateFromToUACreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { UACreateInterface } from '@/types/types-pages';
import { UACreateAction, UACreateActionFailureCleanup } from '@/store/actions/procedurals';

// Components
import UAReasons from '../forms/UAReasons';

interface CreateUAModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function QuickAccessUACreate(props: CreateUAModalInterface) {

    const dispatch = useDispatch();
    const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);
    const UACreatestate = useSelector((state: RootState)=> state.procedurals.UACreate);
    const userData = useSelector((state: RootState) => state.auth.employee_detail);
    const [createUA, setCreateUA] = useState<UACreateInterface>({
        emp_no: NaN,
        ua_description: null,
        ua_date_from: null,
        ua_date_to: null,
        added_by: userData?.emp_no,
    });
    const onClickSubmit = () => {
        setIsSubmittingRequest(true)
        dispatch(UACreateAction(createUA))
    };
    useEffect(()=>{
        if(UACreatestate.status === 'succeeded'){
            setIsSubmittingRequest(false)
            window.alert('Request Successful');
            window.location.reload();
        }else if(UACreatestate.status === 'failed'){
            setIsSubmittingRequest(false)
            window.alert(`Request Failed, ${UACreatestate.error}`)
            setTimeout(()=> {
                dispatch(UACreateActionFailureCleanup());
            }, 1000)
        }
    }, [UACreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '2px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create an Unaccounted Attendance Data</Typography>
            <div className='flex flex-col gap-3 overflow-auto relative'>
                <div className='flex flex-wrap gap-3 pt-4'>
                    <div className='flex flex-col gap-3' style={{width:'100%'}}>
                        <EmployeeAutoComplete createUA={createUA} setCreateUA={setCreateUA}/>
                        <UAReasons setState={setCreateUA}/>
                        {/* <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='UA Description:'  
                            variant='outlined' 
                            multiline rows={2}
                            value={createUA?.ua_description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateUA((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            ua_description: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        /> */}
                    </div>
                    <div className='flex flex-col gap-6'>
                        <DateFromToUACreate createUA={createUA} setCreateUA={setCreateUA}/>
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='ua_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='ua_buttons'>
                        <Button 
                            variant='contained' 
                            onClick={onClickSubmit} 
                            disabled={isSubmittingRequest}
                        >
                                Create UA
                    </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuickAccessUACreate;

