import { EmployeeContext } from "@/context/employee/EmployeeContext";
import { useOptionData } from "@/custom-hooks/use-option-data";
import axiosInstance from "@/helpers/axiosConfig";
import AutocompleteForm from "@/public-components/forms/AutoCompleteForm";
import InputField from "@/public-components/forms/InputField";
import { HandleAlertAction } from "@/store/actions/components";
import { RootState } from "@/store/configureStore";
import { Button, InputAdornment, Typography } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PayrollInfo() {

    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const employeeContext = useContext(EmployeeContext);
    const { employeeData, fetchEmployeeData} = employeeContext
    const dispatch = useDispatch()

    const isCurrUserHrStaff = currUser?.rank_code == 4
    const isViewedBaseEmployee = employeeData?.rank_code == 2

    console.log(employeeData)

    const { payrollGroup, fetchPayrollGroup } = useOptionData()
    const [payrollInfo, setPayrollInfo] = useState<any>(
        {
            payroll_group_code: employeeData?.payroll_group_code || "",
            accnt_no: employeeData?.accnt_no || "",
            insurance_life: employeeData?.insurance_life || "",
            ecola: employeeData?.ecola || "",
            tin: employeeData?.tax_data?.tin_no || "",
            pagibig_no: employeeData?.pagibig_data?.pagibig_no || "",
            sss_no: employeeData?.sss_data?.sss_no || "",
            ph_no: employeeData?.philhealth_data?.ph_no || "",
            hmo: employeeData?.hmo || ""
        }
    )

    useEffect(() => {
        fetchPayrollGroup()
    },[])

    useEffect(() => {
        resetPayrollInfo()
    },[employeeData])

    const resetPayrollInfo = () => {
        setPayrollInfo((curr:any) => (
            {
                payroll_group_code: employeeData?.payroll_group_code || "",
                accnt_no: employeeData?.accnt_no || "",
                insurance_life: employeeData?.insurance_life || "",
                ecola: employeeData?.ecola || "",
                tin: employeeData?.tax_data?.tin_no || "",
                pagibig_no: employeeData?.pagibig_data?.pagibig_no || "",
                sss_no: employeeData?.sss_data?.sss_no || "",
                philhealth_no: employeeData?.philhealth_data?.ph_no || "",
                hmo: employeeData?.hmo || ""
            }
        ))
    }

    const handleChangeAutoComplete = (e:any, newValue:any) => {
        console.log(newValue)
    }

                        
    const submit = (e:any) => {
        e.preventDefault()

        const payload = {
            ...employeeData,
            ...payrollInfo,
            added_by: currUser?.emp_no
        }

        const formData = new FormData()
        for(const key in payload) {
            formData.append(key, payload[key])
        }

        updatePayrollInfo(formData, payload?.emp_no)
    }

    const updatePayrollInfo = async (formData: FormData, emp_no:string | number) => {
        await axiosInstance.put(`employees/${emp_no}/`, formData)
            .then(res => {
                dispatch(HandleAlertAction({
                    open:true,
                    status: "success",
                    message:"Update Payroll Info Successfully"
                }))
                setIsEdit(curr => false)
                fetchEmployeeData(emp_no)
            })
            .catch(err => {
                console.error(err)
                dispatch(HandleAlertAction({
                    open:true,
                    status: "error",
                    message: err?.res?.message ?? "Failed to update payroll info"
                }))
            })
    }

    const handleValueChange = (e:any) => {
        const { name, value } = e.target

        console.log(name)
        console.log(value)
        setPayrollInfo((curr:any) => (
            {
                ...curr,
                [name]: value
            }
        ))
    }

    
    const monthlySalaryComputation = (value: number) => {
        return ((value?? 0)*313)/12
    }

    
    const hasAccessToSalaryField  =     (currUser?.emp_no == employeeData?.emp_no) || // CURRENT USER VIEW
                                        (isCurrUserHrStaff && isViewedBaseEmployee) || //HR STAFF CAN VIEW BASIC EMPLOYEE'S SALARY
                                        (currUser?.rank_code == 6) || // HR SUPER ADMIN
                                        !isViewedBaseEmployee
    
    const salaryField: JSX.Element = (

        <div className="flex md:flex-row flex-col gap-4">

            <InputField
                label="Daily Salary"
                type="number"
                step="0.01"
                name="emp_salary_basic"
                value={payrollInfo.emp_salary_basic}
                onChange={handleValueChange}
                readOnly={!isEdit}
            />
            <InputField
                label="Monthly Salary"
                type="number"
                step="0.01"
                value={monthlySalaryComputation(payrollInfo?.emp_salary_basic ?? 0)}
                readOnly
            />
        </div>
    )

    return (
        <div>
            <form onSubmit={submit} className="flex flex-col gap-8">
                <div id="employment-status-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Payroll Details</Typography><br></br>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-8">
                        <div id="payroll-group" className="w-full md:w-96">
                            <AutocompleteForm 
                                id="payroll-group" 
                                options={payrollGroup.data} 
                                label="Payroll Group" 
                                getOptionLabel={(option: any) => option? `${option?.id} - ${option?.name}`: ""} 
                                handleChange={handleChangeAutoComplete} 
                                optionTitle='name' 
                                defaultValueId={payrollInfo?.payroll_group_code} 
                                disabled={!isEdit} 
                            />
                        </div>
                        {hasAccessToSalaryField ? salaryField: <Fragment></Fragment>}
                        <InputField 
                            label="Account No:"
                            variant="outlined"
                            name="accnt_no"
                            value={payrollInfo?.accnt_no}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />
                        <InputField 
                            label="Insurance Life:"
                            variant="outlined"
                            name="insurance_life"
                            type="number"
                            step="0.01"
                            value={payrollInfo?.insurance_life}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                            startAdornment={(
                                <InputAdornment position="start">
                                    ₱
                                </InputAdornment>
                            )}
                            // readOnly
                        />
                        <InputField 
                            label="Ecola:"
                            variant="outlined"
                            name="ecola"
                            type="number"
                            step="0.01"
                            value={payrollInfo?.ecola}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                            startAdornment={(
                                <InputAdornment position="start">
                                    ₱
                                </InputAdornment>
                            )}
                            // readOnly
                        />
                    </div>
                </div>

                <div id="government-contribution-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Government Contributions</Typography><br></br>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-8">
                        <InputField 
                            label="TIN:"
                            variant="outlined"
                            name="tin"
                            value={payrollInfo.tin}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />
                        <InputField 
                            label="HDMF Pag-ibig:"
                            variant="outlined"
                            name="pagibig_no"
                            value={payrollInfo.pagibig_no}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />

                        <InputField 
                            label="SSS ID:"
                            variant="outlined"
                            name="sss_no"
                            value={payrollInfo.sss_no}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />

                        <InputField 
                            label="Philhealth No:"
                            variant="outlined"
                            name="philhealth_no"
                            value={payrollInfo.philhealth_no}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />

                        <InputField 
                            label="HMO No:"
                            name="hmo"
                            variant="outlined" 
                            value={payrollInfo.hmo}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />
                    </div>
                </div>
                {isEdit 
                    ?   <div className="w-full flex gap-4">
                            <Button 
                                onClick={() => {
                                    setIsEdit(curr => false)
                                    resetPayrollInfo()
                                }}
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    p: 2
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained" 
                                type="submit"
                                sx={{
                                    width: "100%",
                                    p: 2
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    
                    :   <div>
                            <Button 
                                onClick={() => setIsEdit(curr => true)}
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    p: 2
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                }
            </form>
        </div>
    )
}