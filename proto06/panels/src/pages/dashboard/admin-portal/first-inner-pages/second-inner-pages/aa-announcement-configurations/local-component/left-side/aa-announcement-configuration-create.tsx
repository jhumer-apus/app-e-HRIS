import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button, InputLabel, MenuItem, Select, Stack, Switch } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalReducerFailed, globalReducerSuccess } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { ANNOUNCEMENTCreateInterface } from '@/types/types-payroll-eoy';
import { ANNOUNCEMENTCreateAction, ANNOUNCEMENTCreateActionFailureCleanup, ANNOUNCEMENTViewAction } from '@/store/actions/payroll-eoy';
import DateAssignedANNOUNCEMENTCreate from './inner-ui-components/date-fields';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MultiRankAutoCompleteLeft from './inner-ui-components/multiple-ranks-choose-modal';
import MultiDepartmentAutoCompleteLeft from './inner-ui-components/multiple-departments-choose-modal';
import { HandleAlertAction } from '@/store/actions/components';



interface CreateANNOUNCEMENTModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function AAANNOUNCEMENTCreate(props: CreateANNOUNCEMENTModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const ANNOUNCEMENTCreatestate = useSelector((state: RootState)=> state.payrollEOY.ANNOUNCEMENTCreate);
    const [createANNOUNCEMENT, setCreateANNOUNCEMENT] = useState<any>({
        emp_no: curr_user, // same as current_user. this field is the one who make the announcement
        date_posted: null,    
        date_expiry: null,
        is_pinned: false,
        message: null,
        for_departments_code: null,
        for_ranks_code: null
    });
    const [radioState, setRadioState] = useState<boolean | null>(null)

    const onClickSubmit = (e:any) => {
        e.preventDefault()
        console.log(createANNOUNCEMENT)
        dispatch(ANNOUNCEMENTCreateAction(createANNOUNCEMENT))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateANNOUNCEMENT((prevState) => {
                return (
                    {
                        ...prevState,
                        emp_no: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    useEffect(()=>{
        if(ANNOUNCEMENTCreatestate.status === `${globalReducerSuccess}`){
            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message: "Create Announcement successful"
            }))
            // window.location.reload();
            dispatch(ANNOUNCEMENTViewAction());
            setTimeout(()=> {
                dispatch(ANNOUNCEMENTCreateActionFailureCleanup());
            }, 200)
        }else if(ANNOUNCEMENTCreatestate.status === `${globalReducerFailed}`){

            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                message: ANNOUNCEMENTCreatestate.error
            }))
            setTimeout(()=> {
                dispatch(ANNOUNCEMENTCreateActionFailureCleanup());
            }, 200)
        }
    }, [ANNOUNCEMENTCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create an Announcement Data</Typography>
            <form onSubmit={onClickSubmit} className='flex flex-col gap-6 overflow-auto w-full sm:w-3/4'>
                    <div className='flex flex-col gap-6 pt-10 w-full'>
                        <DateAssignedANNOUNCEMENTCreate createANNOUNCEMENT={createANNOUNCEMENT} setCreateANNOUNCEMENT={setCreateANNOUNCEMENT}/>
                    </div>
                    <div className='flex flex-col gap-6 pt-4'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Announcement Message:'
                            aria-required  
                            variant='outlined' 
                            multiline
                            rows={4}
                            type="text"
                            helperText={`${createANNOUNCEMENT?.message?.length ?? 0}/1000`}
                            inputProps = {
                                {
                                    maxLength:1000
                                }
                            }
                            value={createANNOUNCEMENT?.message}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setCreateANNOUNCEMENT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            message: value
                                        }
                                    )
                                })
                            }}
                        />
                        <div className='flex flex-col justify-center items-center'>
                            <Typography>Pin announcement?</Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography>No</Typography>
                                <Switch
                                    onChange={(e:any) => {
                                        const checkValue:boolean = e.target.checked
                                        setCreateANNOUNCEMENT((prevState:any)=> {
                                            return (
                                                {
                                                    ...prevState,
                                                    is_pinned: checkValue
                                                }
                                            )
                                        })
                                    }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <Typography>Yes</Typography>
                            </Stack>
                        </div>
                        {/* <FormControl fullWidth>
                            <InputLabel id="prority-level-label">Priority Level</InputLabel>
                            <Select
                                labelId="prority-level-label"
                                id="prority-level"
                                label="Priority Level"
                                required
                                onChange={(event: any) => {
                                    const value = +(event.target.value);
                                    setCreateANNOUNCEMENT((prevState)=> {
                                        return (
                                            {
                                                ...prevState,
                                                order_by_no: value
                                            }
                                        )
                                    })
                                }}
                            >
                                <MenuItem value={1}>1 - Most Priority</MenuItem>
                                <MenuItem value={2}>2 - Middle Priority</MenuItem>
                                <MenuItem value={3}>3 - Least Priority</MenuItem>
                            </Select>
                        </FormControl> */}
                        {/* <TextField 
                            sx={{width: '100%'}} 
                            label='Display Priority (1, 2, or 3):'
                            variant='outlined' 
                            type="number"
                            value={createANNOUNCEMENT?.order_by_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = +(event.target.value);
                                setCreateANNOUNCEMENT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            order_by_no: value
                                        }
                                    )
                                })
                            }}
                        /> */}
                    </div>
                    <FormControl className='w-full justify-center items-center'>
                        <FormLabel id="target-audience-create">Target Audience</FormLabel>
                        <RadioGroup
                            className='flex w-full justify-around'
                            row
                            aria-labelledby="target-audience-create w-full"
                            name="name-target-audience-create"
                            // value={`${createANNOUNCEMENT._value_}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = (event.target.value=== 'true' ? [1] : []);
                                setRadioState(!(JSON.parse(event.target.value)))
                                setCreateANNOUNCEMENT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            for_departments_code: value,
                                            for_ranks_code: value
                                        }
                                    )
                                })
                            }}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="All Employees" />
                            <FormControlLabel value="false" control={<Radio />} label="Selected Employees" />
                        </RadioGroup>
                    </FormControl>

                    {radioState && <MultiRankAutoCompleteLeft createANNOUNCEMENT={createANNOUNCEMENT} setCreateANNOUNCEMENT={setCreateANNOUNCEMENT}/>}                
                    {radioState && <MultiDepartmentAutoCompleteLeft createANNOUNCEMENT={createANNOUNCEMENT} setCreateANNOUNCEMENT={setCreateANNOUNCEMENT}/>}                
                    
                    <div className='flex justify-center mt-6 mb-6' container-name='leave_buttons_container'>
                        <div className='flex justify-center ' style={{width:'100%'}} container-name='leave_buttons'>
                            <Button variant='contained' type="submit">Create ANNOUNCEMENT</Button>
                        </div>
                    </div>
            </form>
        </React.Fragment>
    );
}

export default AAANNOUNCEMENTCreate;

