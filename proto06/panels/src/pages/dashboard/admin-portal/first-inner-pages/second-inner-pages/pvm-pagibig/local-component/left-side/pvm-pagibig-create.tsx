import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalReducerFailed, globalReducerSuccess } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { PAGIBIGCreateInterface } from '@/types/types-payroll-variables';
import { PAGIBIGCreateAction, PAGIBIGCreateActionFailureCleanup, PAGIBIGViewAction } from '@/store/actions/payroll-variables';
import DeductionsPAGIBIGCreateModal from './local-components/main-modals/pvm-pagibig-create-modal-left';
import { cleanTextNumber } from '@/helpers/utils';
import EmployeeListField from '@/public-components/EmployeeListField';



interface CreatePAGIBIGModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function PVMPAGIBIGCreate(props: CreatePAGIBIGModalInterface) {
    const [createPAGIBIGOpenModal, setCreatePAGIBIGOpenModal] = useState<boolean>(false);
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const PAGIBIGCreatestate = useSelector((state: RootState)=> state.payrollVariables.PAGIBIGCreate);
    const [createPAGIBIG, setCreatePAGIBIG] = useState<PAGIBIGCreateInterface>({
        pagibig_no: '',
        pagibig_mp2_deduction_amount: 0,
        pagibig_contribution_month: NaN,
        pagibig_with_cloan_amount: null,
        pagibig_rem_cloan_amount: null,
        pagibig_with_hloan_amount: null,
        pagibig_rem_hloan_amount: null,
        pagibig_with_calloan_amount: null,
        pagibig_rem_calloan_amount: null,
        emp_no: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(PAGIBIGCreateAction(createPAGIBIG))
    };

    useEffect(()=> {
        if(curr_user){
            setCreatePAGIBIG((prevState) => {
                return (
                    {
                        ...prevState,
                        added_by: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    useEffect(()=>{
        if(PAGIBIGCreatestate.status === `${globalReducerSuccess}`){
            window.alert('Request Successful');
            // window.location.reload();
            setTimeout(()=>{
                dispatch(PAGIBIGViewAction())
            }, 200)
        }else if(PAGIBIGCreatestate.status === `${globalReducerFailed}`){
            window.alert(`Request Failed, ${PAGIBIGCreatestate.error}`)
            setTimeout(()=> {
                dispatch(PAGIBIGCreateActionFailureCleanup());
            }, 1000)
        }
    }, [PAGIBIGCreatestate.status])

    const handleChangeEmpField = (e:any, newValue:any) => {
        if(newValue) {
            setCreatePAGIBIG((prevState)=> 
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
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create a 'Pagibig' Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-full sm:w-3/4'>
                    <div className='flex flex-col gap-6 pt-4 mt-6'>
                        <EmployeeListField 
                            label="For Employee No.:" 
                            handleChange={handleChangeEmpField} 
                            currentValue={createPAGIBIG.emp_no} 
                        />
                        {/* <EmployeeAutoComplete createPAGIBIG={createPAGIBIG} setCreatePAGIBIG={setCreatePAGIBIG}/> */}
                    </div>
                    <div className='flex flex-col gap-6'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Pagibig Number: (PHDMF)'
                            placeholder='Input 12 digit number'
                            aria-required  
                            variant='outlined' 
                            inputProps={{
                                maxLength:"12",
                                type:"text",
                                pattern: "\\d*"
                            }}
                            value={createPAGIBIG?.pagibig_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {

                                let value:string | number = event.target.value;

                                // Filter out non-numeric characters and enforce maximum length
                                value = cleanTextNumber(value)

                                setCreatePAGIBIG((prevState:any)=> {
                                    return (
                                        {
                                            ...prevState,
                                            pagibig_no: String(value)
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Contribution Monthly (Amount)'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createPAGIBIG?.pagibig_contribution_month}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreatePAGIBIG((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            pagibig_contribution_month: value
                                        }
                                    )
                                })
                            }}
                        />
                        <DeductionsPAGIBIGCreateModal setCreatePAGIBIGDetailsData={setCreatePAGIBIG} createPAGIBIGDetailsData={createPAGIBIG} createPAGIBIGOpenModal={createPAGIBIGOpenModal} setCreatePAGIBIGOpenModal={setCreatePAGIBIGOpenModal}/>
                    </div>
                <div className='flex justify-center mt-6 mb-5' container-name='leave_buttons_container'>
                    <div className='flex flex-wrap justify-between gap-4'  container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create PAGIBIG</Button>
                        <Button variant='outlined' color='warning' onClick={()=> setCreatePAGIBIGOpenModal(true)}>Apply Monthly Loan Deduction</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PVMPAGIBIGCreate;

