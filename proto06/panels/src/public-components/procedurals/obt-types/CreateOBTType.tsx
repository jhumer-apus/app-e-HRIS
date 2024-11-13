import axiosInstance from "@/helpers/axiosConfig";
import { beautifyJSON } from "@/helpers/utils";
import { HandleAlertAction } from "@/store/actions/components";
import { APILink, RootState } from "@/store/configureStore";
import { Typography } from "@material-tailwind/react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface OBTTypeData {
    obt_type_name: string
    added_by: string | number
}

interface Props {
    refreshOBTList: () => void
}

export default function CreateOBTType(props:Props) {

    const { refreshOBTList } = props

    const dispatch = useDispatch()
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)

    const [data, setData] = useState<OBTTypeData>(
        {
            obt_type_name: "",
            added_by: ""
        }
    )

    const createOBTType = (e:any) => {
        e.preventDefault()

        const payload = {
            obt_type_name: data?.obt_type_name,
            added_by: currUser?.emp_no
        }

        postObtType(payload)
    }

    const clearForms = () => {
        setData(curr => ({
            ...curr,
            obt_type_name: ""
        }))
    }

    const postObtType = async(payload: any) => {
        await axiosInstance.post(`obt_type/`, payload)
            .then(res => {
                    dispatch(HandleAlertAction(
                        {
                            open: true,
                            status: "success",
                            message: "Create OBT Type Successfully"
                        }
                    ))
                    clearForms()
                    refreshOBTList()
                }
                
            )
            .catch(err => {

                try {
                    dispatch(HandleAlertAction(
                        {
                            open: true,
                            status: "error",
                            message: beautifyJSON(err?.response?.data)
                        }
                    ))

                } catch (err) {
                    dispatch(HandleAlertAction(
                        {
                            open: true,
                            status: "error",
                            message: "Something went wrong"
                        }
                    ))
                }

                clearForms()
            }
        )
    }

    const handleChange = (e:any) => {
        setData((curr:any) => (
            {
                ...curr,
                [e.target.name]: e.target.value
            }
        ))
    }
    
    return (
        <div className="p-8 h-auto">
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a OBT Types</Typography>
            <form className="my-4 grid grid-cols gap-4 content-center h-full" onSubmit={createOBTType}>
                <TextField
                    name="obt_type_name"
                    required
                    label="OBT Type Name"
                    onChange={handleChange}
                    value={data?.obt_type_name || ""}

                />
                <Button variant="contained" type="submit">Create</Button>
            </form>
        </div>
        
    )
}