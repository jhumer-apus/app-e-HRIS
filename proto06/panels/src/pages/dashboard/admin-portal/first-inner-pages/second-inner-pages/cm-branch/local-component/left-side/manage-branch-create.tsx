import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { BRANCHCreateInterface } from '@/types/types-pages';
import { BRANCHCreateAction, BRANCHCreateActionFailureCleanup, BRANCHViewAction } from '@/store/actions/categories';

//COMPONENTS
import Province from '@/public-components/forms/address/Province';
import CityMunicipality from '@/public-components/forms/address/CityMunicipality';

//HELPERS
import { beautifyJSON } from '@/helpers/utils';
import EmployeeListField from '@/public-components/EmployeeListField';

interface CreateBRANCHModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ManageBRANCHCreate(props: CreateBRANCHModalInterface) {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const BRANCHCreatestate = useSelector((state: RootState)=> state.categories.BRANCHCreate);
    const [formKey, setFormKey] = useState<number>(1)
    const [createBRANCH, setCreateBRANCH] = useState<any>({
        branch_name: "",
        branch_address: "",
        branch_email: "",
        branch_contact_number: "",
        branch_oic: NaN,
        province: {
            id: null,
            name: null,
            code: null
        },
        city: {
            id: null,
            name: null,
            code: null
        },
        added_by: curr_user,
    });

    const validateBranch = (data:any) => {

        const error:any = {}

        !data.branch_address && (error["Branch Address"] = "Branch Address is required!")
        // !data.branch_email && (error["Branch Email"] = "Branch Email is required!")
        // !data.branch_contact_number && (error["Branch Contact Number"] = "Branch Contact Number is required!")
        // !data.branch_oic && (error["Branch OIC"] = "Branch OIC is required!")
        !data.branch_name && (error["Branch Name"] = "Branch Name is required!")
        !data.branch_province && (error["Branch Province"] = "Branch Province is required!")
        !data.branch_city && (error["Branch City"]= "Branch City is required!")

        if (Object.keys(error).length > 0) {
            window.alert(beautifyJSON(error))
            return true
        } 

        return false
    }

    const resetForm = () => {
        setCreateBRANCH({
            branch_name: "",
            branch_address: "",
            branch_email: "",
            branch_contact_number: "",
            branch_oic: NaN,
            province: {
                id: null,
                name: null,
                code: null
            },
            city: {
                id: null,
                name: null,
                code: null
            },
            added_by: curr_user,
        });
        setFormKey(prevKey => prevKey + 1); // To force re-render of dependent components
    }

    const onClickSubmit = (e:any) => {
        e.preventDefault()

        const branchData: BRANCHCreateInterface  = {
            branch_name: createBRANCH.branch_name,
            branch_address: createBRANCH.branch_address,
            branch_email: createBRANCH.branch_email,
            branch_contact_number: createBRANCH.branch_contact_number,
            branch_oic: createBRANCH?.branch_oic,
            branch_province: createBRANCH.province?.id,
            branch_city: createBRANCH.city?.id,
            added_by: curr_user,
        }

        if(validateBranch(branchData)) { //If has errors
            return
        }

        dispatch(BRANCHCreateAction(branchData))
    };

    const updateAddress = (name:string, newValue:any) => {

        setCreateBRANCH((curr:any) => ({
            ...curr,
            [name]: newValue
        }))
      
    }

    useEffect(()=> {
        if(curr_user){
            setCreateBRANCH((prevState:any) => {
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
        if(BRANCHCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            dispatch(BRANCHViewAction())
            resetForm()
            setTimeout(()=>{
                dispatch(BRANCHCreateActionFailureCleanup());
                
            }, 200)
            // window.location.reload();
        }else if(BRANCHCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${BRANCHCreatestate.error}`)
            setTimeout(()=> {
                dispatch(BRANCHCreateActionFailureCleanup());
            }, 200)
        }
    }, [BRANCHCreatestate.status])

    const handleChangeEmpField = (e:any, newValue:any) => {
        if(newValue) {
            setCreateBRANCH((prevState:any)=> 
                (
                    {
                        ...prevState,
                        branch_oic: newValue.emp_no
                    }
                )
            )
        }
    }


    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Branch Data</Typography>
            <form onSubmit={onClickSubmit} className='flex flex-col gap-3 overflow-auto relative md:w-[400px] w-full'>
                {/* <div className='flex gap-3 pt-4'> */}
                    <div className='flex flex-col gap-3 pt-4'>
                        <EmployeeListField 
                            label="For Employee No.:" 
                            handleChange={handleChangeEmpField} 
                            currentValue={createBRANCH.branch_oic} 
                        />
                        {/* <EmployeeAutoComplete 
                            currentEmpNo={createBRANCH.branch_oic} 
                            createBRANCH={createBRANCH} 
                            setCreateBRANCH={setCreateBRANCH}
                        /> */}
                        {/* <LEAVETYPEFetchAutoCompleteOnBRANCHPage createBRANCH={createBRANCH} setCreateBRANCH={setCreateBRANCH}/> */}
                    </div>
                    <div className='flex flex-col gap-3'>
                        {/* <ExpiryDateBRANCHCreate createBRANCH={createBRANCH} setCreateBRANCH={setCreateBRANCH}/> */}
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Branch Name'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createBRANCH?.branch_name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateBRANCH((prevState:any)=> {
                                    return (
                                        {
                                            ...prevState,
                                            branch_name: value
                                        }
                                    )
                                })
                            }}
                            
                        />
                        <Province
                            key={formKey}
                            updateAddress={updateAddress}
                            defaultProvinceId={createBRANCH.branch_province}
                            name="province"
                            label="Province *"
                        />
                        <CityMunicipality 
                            currentProvinceCode={createBRANCH?.province?.code}
                            updateAddress={updateAddress}
                            name="city"
                            label="City(Select a province first) *"
                        />
                        <TextField
                            required
                            sx={{width: '100%'}} 
                            label='Branch Street Address'  
                            variant='outlined' 
                            type="text"
                            value={createBRANCH?.branch_address}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateBRANCH((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            branch_address: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            sx={{width: '100%'}} 
                            label='Branch Email'  
                            placeholder='abc@gmail.com'
                            variant='outlined' 
                            type="text"
                            value={createBRANCH?.branch_email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateBRANCH((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            branch_email: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            sx={{width: '100%'}} 
                            label='Branch Contact Number'  
                            placeholder='091234567890 or +639876543210'
                            variant='outlined' 
                            type="text"
                            value={createBRANCH?.branch_contact_number}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateBRANCH((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            branch_contact_number: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                {/* </div> */}
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' type="submit">Create BRANCH</Button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default ManageBRANCHCreate;

