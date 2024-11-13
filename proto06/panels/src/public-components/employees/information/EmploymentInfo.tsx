import { EmployeeContext } from "@/context/employee/EmployeeContext";
import { useOptionData } from "@/custom-hooks/use-option-data";
import axiosInstance from "@/helpers/axiosConfig";
import { getLast3Char } from "@/helpers/utils";
import AutocompleteField from "@/public-components/forms/AutoCompleteField";
import AutocompleteForm from "@/public-components/forms/AutoCompleteForm";
import DatePickerField from "@/public-components/forms/DatePickerField";
import InputField from "@/public-components/forms/InputField";
import SelectField from "@/public-components/forms/SelectField";
import { HandleAlertAction } from "@/store/actions/components";
import { RootState } from "@/store/configureStore";
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EmploymentInfo() {

    const employeeContext = useContext(EmployeeContext);
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const dispatch = useDispatch()
    const { employeeData, fetchEmployeeData} = employeeContext

    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [employmentInfo, setEmploymentInfo] = useState<any>(
        {
            id: null,
            emp_no: "",
            date_hired: null,
            date_separation: null,
            separation_type: "",
            employment_duration: "",
            department_code: "",
            position_code: "",
            branch_code: "",
            rank_code: "",
            employment_status: "",
            employee_type: "",
            approver1: "",
            approver2: "",
            other_duties_responsibilities: ""
        }
    )
    
    const { 
        positions, 
        branches,
        departments,
        ranks,
        employmentStatus,
        separationType,
        employeeType,
        approvers,
        fetchDepartments,  
        fetchPositions, 
        fetchBranches,
        fetchRanks,
        fetchEmploymentStatus,
        fetchApprovers,
    } = useOptionData()

    useEffect(() => {
        fetchPositions()
        fetchBranches()
        fetchDepartments()
        fetchRanks()
        fetchEmploymentStatus()
        fetchApprovers()
    },[])

    useEffect(() => {
        resetEmploymentInfo()
    },[employeeData])

    const resetEmploymentInfo = () => {
        setEmploymentInfo((curr:any) => (
            {
                id: employeeData?.id,
                emp_no: getLast3Char(employeeData?.emp_no),
                date_hired: employeeData?.date_hired ? dayjs(employeeData.date_hired): null,
                date_separation: employeeData?.date_separation? dayjs(employeeData.date_separation): null,
                separation_type: employeeData?.separation_type,
                employment_duration: employeeData?.employment_duration,
                department_code: employeeData?.department_code,
                position_code: employeeData?.position_code,
                branch_code: employeeData?.branch_code,
                rank_code: employeeData?.rank_code,
                employment_status: employeeData?.employment_status,
                employee_type: employeeData?.employee_type,
                approver1: employeeData?.approver1,
                approver2: employeeData?.approver2,
                other_duties_responsibilities: employeeData?.other_duties_responsibilities
            }
        ))
    }

    const handleChangeAutoComplete = (name:string, newValue:any) => {
        setEmploymentInfo((curr:any) => (
            {
                ...curr,
                [name]: newValue?.id ?? ""
            }
        ))
    }

    const handleDateChange = (name:string, newValue: Dayjs | null) => {

        switch(name) {
            case "date_separation":
                if(!newValue)
                    setEmploymentInfo((prevState:any) => ({
                        ...prevState,
                        separation_type: "",
                    }));
        }

        setEmploymentInfo((curr:any) => (
            {
                ...curr,
                [name]: newValue
            }
        ))

    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setEmploymentInfo((prevState:any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submit = (e:any) => {
        e.preventDefault()

        const { date_hired, date_separation, ...rest} = employmentInfo

        const payload = {
            ...employeeData,
            ...rest,
            date_hired: date_hired? dayjs(date_hired).format('YYYY-MM-DDThh:mm:ss'): "",
            date_separation: date_separation? dayjs(date_separation).format('YYYY-MM-DDThh:mm:ss'): "",
            added_by: currUser?.emp_no
        }

        const formData = new FormData()
        for(const key in payload) {
            formData.append(key, payload[key])
        }

        updateEmploymentInfo(formData, payload)
    }

    const updateEmploymentInfo = async (formData: FormData, payload:any) => {

        const { id, emp_no } = payload

        console.log(id)

        await axiosInstance.put(`employees/${id}/`, formData)
            .then(res => {
                dispatch(HandleAlertAction({
                    open:true,
                    status: "success",
                    message:"Update Employment Information Successfully"
                }))
                setIsEdit(curr => false)
                fetchEmployeeData(id)
            })
            .catch(err => {
                console.log(err)
                dispatch(HandleAlertAction({
                    open:true,
                    status: "error",
                    message: err?.response?.data?.["Error Message"] ?? "Failed to update employment information"
                }))
            })
    }

    const initialEmployeeNumber = `${branches.data.find(branch => branch.value == employmentInfo.branch_code)?.start ?? "0"}-${employmentInfo?.department_code?? "0"}00${dayjs(employmentInfo?.date_hired)?.format("YY")??"00"}`

    return (
        <div>
            <form onSubmit={submit} className="flex flex-col gap-8">
                <div id="employment-status-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Employment Details</Typography><br></br>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-8">
                        <DatePickerField 
                            label="Date Hired"
                            value={employmentInfo?.date_hired? dayjs(employmentInfo?.date_hired): null}
                            onChange={(newValue: Dayjs | null) => handleDateChange("date_hired", newValue)}
                            disabled={!isEdit}
                        />
                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="company"
                            id="company"
                            label="Company"
                            name="branch_code"
                            loading={branches.loading}
                            inputProps={{ readOnly: false }} 
                            options={branches.data}
                            value={employmentInfo?.branch_code}
                            onChange={handleValueChange}
                            disabled={!isEdit}
                        />

                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="department"
                            id="department"
                            label="Department"
                            name="department_code"
                            loading={departments.loading}
                            inputProps={{ readOnly: false }} 
                            options={departments.data}
                            value={employmentInfo?.department_code}
                            onChange={handleValueChange}
                            disabled={!isEdit}
                        />

                        <InputField
                            required
                            label="Employee No:" 
                            variant="outlined"
                            value={employmentInfo?.emp_no || ""}
                            startAdornment={(
                                <InputAdornment position="start">
                                    {initialEmployeeNumber}
                                </InputAdornment>
                            )}
                            onChange={handleValueChange}
                            inputProps={{
                                maxLength: 3
                            }} 
                            name="emp_no"
                            readOnly={!isEdit}
                        />
                        <DatePickerField 
                            label="Date Separated"
                            value={employmentInfo?.date_separation? dayjs(employmentInfo?.date_separation): null}
                            onChange={(newValue: Dayjs | null) => handleDateChange("date_separation", newValue)}
                            disabled={!isEdit}
                            slotProps={{
                                actionBar: {
                                  actions: ['clear', 'accept']
                                }
                            }}
                        />
                        <SelectField 
                            className="w-full md:w-52"
                            labelId="separation-type"
                            id="separation-type"
                            label="Separation Type"
                            inputProps={{ readOnly: false }} 
                            options={separationType} 
                            value={employmentInfo?.separation_type}
                            name="separation_type"
                            onChange={handleValueChange}
                            disabled={!isEdit || !employmentInfo?.date_separation}
                        />

                        <InputField 
                            label="Employment Duration:" 
                            variant="outlined"
                            name="employment_duration"
                            value={employmentInfo?.employment_duration}
                            onChange={handleValueChange}
                            readOnly
                        />   

                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="position"
                            id="position"
                            label="Position"
                            name="position_code"
                            loading={positions.loading}
                            inputProps={{ readOnly: false }} 
                            options={positions.data}
                            value={employmentInfo?.position_code}
                            onChange={handleValueChange}
                            disabled={!isEdit}
                        />

                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="ranks"
                            id="ranks"
                            label="Rank"
                            name="rank_code"
                            loading={ranks.loading}
                            inputProps={{ readOnly: false }} 
                            options={ranks.data}
                            value={employmentInfo?.rank_code}
                            onChange={handleValueChange}
                            disabled={!isEdit}
                        />          
                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="employment_status"
                            id="employment_status"
                            label="Employment Status"
                            name="employment_status"
                            loading={employmentStatus.loading}
                            inputProps={{ readOnly: false }} 
                            options={employmentStatus.data}
                            value={employmentInfo?.employment_status}
                            onChange={handleValueChange}
                            disabled={!isEdit}
                        />
                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="employee_type"
                            id="employee_type"
                            label="Employee Type"
                            name="employee_type"
                            inputProps={{ readOnly: false }} 
                            options={employeeType}
                            value={employmentInfo?.employee_type}
                            onChange={handleValueChange}
                            disabled={!isEdit}
                        />

                        <div id="approver1-wrapper" className="w-full md:w-96">
                            <AutocompleteField
                                id="approver1"
                                options={approvers.data}
                                label="Approver 1"
                                getOptionLabel={(option:any) => option?.id? `${option.id} - ${option.name}`: ""}
                                handleChange={handleChangeAutoComplete}
                                value={employmentInfo?.approver1}
                                optionNameKey="name"
                                disabled={!isEdit}
                                loading={approvers.loading}
                                stateKey="approver1"
                                disableClearable
                            />
                        </div>

                        <div id="approver2-wrapper" className="w-full md:w-96">
                            <AutocompleteField
                                id="approver2"
                                options={approvers.data}
                                label="Approver 2"
                                getOptionLabel={(option: any) => option?.id? `${option.id} - ${option.name}`: ""}
                                handleChange={handleChangeAutoComplete}
                                value={employmentInfo?.approver2}
                                optionNameKey="name"
                                disabled={!employmentInfo.approver1 || !isEdit}
                                loading={approvers.loading} 
                                stateKey="approver2"                        
                            />
                        </div>

                        <InputField 
                            label="Other Duty And Responsibilities:" 
                            variant="outlined"
                            className="w-full"
                            name="other_duties_responsibilities"
                            value={employmentInfo?.other_duties_responsibilities}
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
                                    resetEmploymentInfo()
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