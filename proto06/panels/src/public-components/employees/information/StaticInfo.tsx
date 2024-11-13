import { EmployeeContext } from "@/context/employee/EmployeeContext";
import { useOptionData } from "@/custom-hooks/use-option-data";
import axiosInstance from "@/helpers/axiosConfig";
import { getLast3Char } from "@/helpers/utils";
import InputField from "@/public-components/forms/InputField";
import SelectField from "@/public-components/forms/SelectField";
import { HandleAlertAction } from "@/store/actions/components";
import { RootState } from "@/store/configureStore";
import { Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useContext, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function StaticInfo() {

    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const employeeContext = useContext(EmployeeContext);
    const dispatchRedux = useDispatch()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const { employeeData, fetchEmployeeData} = employeeContext
    const { roles } = useOptionData()
    
    const reducer = (state:any, action:any) => {
        switch (action.type) {
            case "UPDATE":
                return {
                    ...state,
                    [action.key]: action.value
                }
            case "RESET":
                return {
                    ...action.data
                }
                
            default:
                return state;
        }
    };

    const [stateEmployee, dispatchEmployee] = useReducer(reducer, {});
    const [stateUser, dispatchUser] = useReducer(reducer, {});

    useEffect(() => {
        if (employeeData) {
            const { user, ...employeeInfo } = employeeData;
            dispatchEmployee({ type: "RESET", data: employeeInfo });
            dispatchUser({ type: "RESET", data: user });
        }
      }, [employeeData]);

    const handleChange = (e:any, type: "EMPLOYMENT" | "USER") => {

        const { name, value } = e.target

        switch (type) {
            case 'EMPLOYMENT':
                dispatchEmployee(
                    { 
                        type: "UPDATE", 
                        key: name, 
                        value: value 
                    }
                );
                break

            case 'USER':
                dispatchUser(
                    { 
                        type: "UPDATE", 
                        key: name, 
                        value: value 
                    }
                );
                break

            default:
                break
        }
    }
    
    const submit = (e:any) => {
        e.preventDefault() 

        const payloadEmployment = {
            ...stateEmployee,
            emp_no: getLast3Char(employeeData?.emp_no),
            added_by: currUser?.emp_no
        }

        const payloadUser = {
            ...stateUser,
            emp_no: getLast3Char(employeeData?.emp_no),
            added_by: currUser?.emp_no
        }

        const formDataEmployment = new FormData()
        // const formDataUser = new FormData()

        for(const key in payloadEmployment) {
            formDataEmployment.append(key, payloadEmployment[key])
        }


        updateEmploymentInfo(formDataEmployment, payloadEmployment)
        // updateUserInfo(payloadUser)

    }

    const updateEmploymentInfo = async (formData: FormData, payload:any) => {

        const { id, emp_no } = payload
        await axiosInstance.put(`employees/${id}/`, formData)
            .then(res => {
                dispatchRedux(HandleAlertAction({
                    open:true,
                    status: "success",
                    message:"Update Acount Details Successfully"
                }))
                setIsEdit(curr => false)
                fetchEmployeeData(id)
            })
            .catch(err => {
                console.error(err)
                dispatchRedux(HandleAlertAction({
                    open:true,
                    status: "error",
                    message: err?.response?.data?.["Error Message"] ?? "Failed to update account details"
                }))
            })
    }

    // const updateUserInfo = async (payload:any) => {
    //     console.log(employeeData)
    //     const { id } = payload

    //     await axiosInstance.put(`user/${id}/`, payload)
    //         .then(res => {
    //             dispatchRedux(HandleAlertAction({
    //                 open:true,
    //                 status: "success",
    //                 message:"Update User Details Successfully"
    //             }))
    //             setIsEdit(curr => false)
    //             fetchEmployeeData(payload?.emp_no)
    //         })
    //         .catch(err => {
    //             console.error(err)
    //             dispatchRedux(HandleAlertAction({
    //                 open:true,
    //                 status: "error",
    //                 message: err?.res?.message ?? "Failed to update user details"
    //             }))
    //         })
    // }
    return (
        <div className="">
            <form onSubmit={submit} className="flex flex-col gap-8">
                <div id="account-logs-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Account Logs</Typography><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <InputField
                            label="Biomentric ID:" 
                            variant="outlined"
                            value={stateEmployee?.bio_id}
                            onChange={(e:any) => handleChange(e, "EMPLOYMENT")}
                            name="bio_id"
                            shrink
                            readOnly={!isEdit}
                        />
                        <InputField 
                            label="Account Active Status:"
                            variant="outlined"
                            value={stateUser?.is_active? "Active": "In-Active"}
                            readOnly
                        />
                        <InputField 
                            label="Active Lock Status:" 
                            variant="outlined"
                            value={stateUser?.is_lock? "Locked": "Not Locked"}
                            readOnly
                        />  
                        <InputField 
                            label="Last Login:" 
                            variant="outlined"
                            value={stateUser?.last_login? dayjs(stateUser?.last_login).format("MMM DD, YYYY"): ""}
                            readOnly
                        /> 
                        <InputField 
                            label="Date Added:" 
                            variant="outlined"
                            value={stateUser?.date_added? dayjs(stateUser?.date_added).format("MMM DD, YYYY"): ""}
                            readOnly
                        />
                        <InputField 
                            label="Date Password Changed:" 
                            variant="outlined"
                            value={stateUser?.date_password_changed? dayjs(stateUser?.date_password_changed).format("MMM DD, YYYY"): ""}
                            readOnly
                        />
                    </div>
                </div>
                <div id="Account Details">
                    <Typography variant="h6" component="h6" className="font-bold">Account Details</Typography><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <InputField 
                            label="Employee No:" 
                            variant="outlined"
                            value={stateEmployee?.emp_no || ""}
                            onChange={(e:any) => handleChange(e, "EMPLOYMENT")}
                            name="emp_no"
                            readOnly
                        /> 
                        <InputField 
                            label="Username:" 
                            variant="outlined"
                            value={stateUser?.username || ""}
                            onChange={(e:any) => handleChange(e, "USER")}
                            name="username"
                            readOnly
                        /> 

                        <SelectField
                            className="w-full md:w-52"
                            labelId="role"
                            id="role"
                            label="Role"
                            options={roles}
                            name="role"
                            value={stateUser?.role?.toString() || ""}
                            disabled={true}
                            // onChange={(e:any) => handleChange(e, "USER")}                     
                        />
                        <InputField 
                            type="email"
                            label="Account Email:" 
                            variant="outlined"
                            value={stateEmployee?.email_address || ""}
                            onChange={(e:any) => handleChange(e, "EMPLOYMENT")}
                            name="email_address"
                            readOnly={!isEdit}
                            
                        /> 
                    </div>
                </div>

                {isEdit 
                    ?   <div className="w-full flex gap-4">
                            <Button 
                                onClick={() => {
                                    setIsEdit(curr => false)
                                    // resetPersonalInfo()
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