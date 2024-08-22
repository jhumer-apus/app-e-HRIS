import { HandleAlertAction, HandleModalAction } from "@/store/actions/components";
import { APILink, RootState } from "@/store/configureStore";
import { Button, FormControl, FormControlLabel, FormGroup, FormHelperText, Modal, Switch, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AutocompleteForm from "../forms/AutoCompleteForm";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import EmployeeListField from "../EmployeeListField";

export default function EditBulkEmployeeSched() {

    const dispatch = useDispatch()
    const { editBulkEmployeeSchedModal } = useSelector((state:RootState) => state.component)
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const [scheduleShifts, setScheduleShifts] = useState<any[]>([])
    const [error, setError] = useState<any>({
        emp_no: false,
        emp_schedule_daily:false,
        schedule_shift_code: false,
        is_restday: false,
    })

    const [shiftData, setShiftData] = useState<any>({
        emp_no: null,
        emp_schedule_daily:[],
        schedule_shift_code: null,
        is_restday: true,
        added_by: currUser?.emp_no
    })

    const handleClose = () => {
        dispatch(HandleModalAction({
            name: "editBulkEmployeeSchedModal",
            value: false
        }))
        setError((curr:any) => null)
        setShiftData((curr:any) => null)
    }

    useEffect(() => {
        if(editBulkEmployeeSchedModal) fetchScheduleShifts()
    },[editBulkEmployeeSchedModal])

    const fetchScheduleShifts = async () => {
        await axios
            .get(`${APILink}schedule_shift/`)
            .then(res => setScheduleShifts(curr => Array.isArray(res.data) ? res.data: []))
    }

    const fetchEmployeeSchedule = async (emp_no: number) => {
        await axios
            .get(`${APILink}schedule_daily/${emp_no}/`)
            .then(res => {
                setShiftData((curr:any)=> (
                    {
                        ...curr,
                        emp_schedule_daily: Array.isArray(res.data) ? res.data.map(shift => shift.id): []
                    }
                ))
            })
    }

    const handleChangeShift = (e:any, newValue:any) => {
        setShiftData((curr:any) => ({
            ...curr,
            schedule_shift_code: newValue?.id
        }))
    }

    const handleChangeEmployee = (e:any, newValue:any) => {
        if(newValue) {
            setShiftData((curr:any) => ({
                ...curr,
                emp_no: newValue?.emp_no
            }))
        }
        fetchEmployeeSchedule(newValue?.emp_no)
    }
    const handleChange = (e: any) => {
        setShiftData((curr:any) => ({
            ...curr,
            [e.target.name]: e.target.checked
        }))
    }

    const updateEmployeesSchedule = async (payload:any) => {
        await axios.put(`${APILink}update_schedules/${shiftData?.emp_no}/`, payload)
            .then(res => {
                dispatch(HandleAlertAction({
                    open:true,
                    status:"success",
                    message:"Update Employee Schedule Successfully"
                }))

                handleClose()
            })
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()

        const payload = {
            ...shiftData,
            is_restday: shiftData?.is_restday?? false,
            added_by: currUser?.emp_no
        }

        if(!payload.schedule_shift_code)  setError((curr:any) => ({...curr, schedule_shift_code:true}))
        if(!payload.emp_no)  setError((curr:any) => ({...curr, emp_no:true}))
        if(!payload.is_restday)  setError((curr:any) => ({...curr, is_restday:true}))

            Object.keys(error).length > 0 && Object.keys(error).forEach(key=> {
            if(error[key]) {
                return
            }
        })

        updateEmployeesSchedule(payload)
    }
    return (
        <Fragment>
            <Modal
                open={editBulkEmployeeSchedModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // className='overflow-auto'
            >
                <form onSubmit={handleSubmit} className='modal-content flex flex-col gap-4 w-[300px] h-full'>
                    <Typography variant="h5" className="bg-blue-50 p-2 mb-4">Bulk Update Employees Schedule</Typography>

                    <FormControl required error={error?.emp_no}>
                        <EmployeeListField 
                            label="Select Employee"
                            handleChange={handleChangeEmployee} 
                            currentValue={shiftData?.emp_no}
                        />
                        {error?.emp_no && <FormHelperText id="emp_no">Please select an employee</FormHelperText>}
                    </FormControl>

                    <FormControl required error={error?.schedule_shift_code}>
                        <AutocompleteForm 
                            id="sched_shifts"
                            options={scheduleShifts} 
                            label="Schedule Shifts"
                            getOptionLabel={(option:any) => option?.name?? ""} 
                            handleChange={handleChangeShift} 
                            optionTitle={"name"} 
                            defaultValueId={shiftData?.schedule_shift_code} 
                        />
                        {error?.schedule_shift_code && <FormHelperText id="sched-shift">Sched Shifts is required</FormHelperText>}
                    </FormControl>
                    <FormGroup>
                        <FormControlLabel 
                            name="is_restday"
                            control={<Switch />} 
                            label="Rest Day"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <div>
                        <Button onClick={() => handleClose()}>Cancel</Button>
                        <Button type="submit">Update</Button>
                    </div>
                </form>
            </Modal>
        </Fragment>
    )
}