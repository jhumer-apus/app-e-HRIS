import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import OBTTypeAutoComplete from './inner-ui-components/obt-type-autocomplete';
import DateFromToOBTCreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { OBTCreateInterface } from '@/types/types-pages';
import { OBTCreateAction, OBTCreateActionFailureCleanup } from '@/store/actions/procedurals';

interface CreateOBTModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function QuickAccessOBTCreate(props: CreateOBTModalInterface) {

    const dispatch = useDispatch();
    const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);
    const OBTCreatestate = useSelector((state: RootState)=> state.procedurals.OBTCreate);
    const userData = useSelector((state: RootState) => state.auth.employee_detail);
    const [createOBT, setCreateOBT] = useState<OBTCreateInterface>({
        emp_no: NaN,
        obt_type: null,
        obt_location: '',
        obt_remarks: null,
        obt_date_from: null,
        obt_date_to: null,
        added_by: userData?.emp_no,
    });
    const onClickSubmit = () => {
        console.log(createOBT)
        setIsSubmittingRequest(true)
        dispatch(OBTCreateAction(createOBT))
    };
    useEffect(()=>{
        if(OBTCreatestate.status === 'succeeded'){
            setIsSubmittingRequest(false)
            window.alert('Request Successful');
            window.location.reload();
        }else if(OBTCreatestate.status === 'failed'){
            setIsSubmittingRequest(false)
            window.alert(`Request Failed, ${OBTCreatestate.error}`)
            setTimeout(()=> {
                dispatch(OBTCreateActionFailureCleanup());
            }, 1000)
        }
    }, [OBTCreatestate.status])
    
    console.log(OBTCreatestate.status, "124124create_obt")
    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '2px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create an Official Business Time/Trip Data</Typography>
            <div className='flex flex-col gap-3 overflow-auto relative'>
                <div className='flex flex-wrap gap-3 pt-4'>
                    <div className='flex flex-col gap-3' style={{width: '100%'}}>
                        <EmployeeAutoComplete createOBT={createOBT} setCreateOBT={setCreateOBT}  />
                        <OBTTypeAutoComplete createOBT={createOBT} setCreateOBT={setCreateOBT}/>
                        {/* <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='OBT Description:'  
                            variant='outlined' 
                            multiline rows={2}
                            value={createOBT?.obt_remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateOBT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            obt_remarks: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        /> */}
                    </div>
                    <div className='flex flex-col gap-3' style={{width: '100%'}}>
                        <DateFromToOBTCreate createOBT={createOBT} setCreateOBT={setCreateOBT}/>
                        <TextField 
                            required
                            sx={{width: '100%'}} 
                            label='Location:'  
                            variant='outlined' 
                            multiline rows={2}
                            value={createOBT?.obt_location}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateOBT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            obt_location: event.target.value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='obt_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='obt_buttons'>
                        <Button 
                            variant='contained' 
                            onClick={onClickSubmit}
                            disabled={isSubmittingRequest}
                        >
                            Create OBT
                        </Button>
                        {/* <Button variant='outlined' onClick={()=> setOpen(false)}>Cancel</Button> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuickAccessOBTCreate;

