import axiosInstance from "@/helpers/axiosConfig";
import ButtonElement from "@/public-components/forms/ButtonElement";
import DatePickerForm from "@/public-components/forms/DatePickerForm";
import { EMPLOYMENTSSTATUSViewAction } from "@/store/actions/categories";
import { HandleModalAction } from "@/store/actions/components";
import { APILink, RootState } from "@/store/configureStore";
import { Typography } from "@material-tailwind/react";
import { Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/joy";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
    selectedRow: any
}

export default function ViewEmploymentStatusType(props: Props) {

    const {selectedRow} = props

    const [details, setDetails] = useState(selectedRow)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const dispatch = useDispatch()
    const viewEmploymentStatusTypeModal = useSelector((state:RootState) => state.component.viewEmploymentStatusTypeModal)
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)

    useEffect(() => {
        setDetails((curr:any) => ({...selectedRow}))
    },[selectedRow])

    const handleClose = () => {
        setIsEdit(curr => false)
        dispatch(HandleModalAction({
            name: "viewEmploymentStatusTypeModal",
            value: false
        }))
    }

    const onCancel = () => {
        setIsEdit(curr => false)
        setDetails((curr:any) => ({
            ...selectedRow
        }))
    }

    const onSave = async (e:any) => {
        e.preventDefault()
        const payload = {
            ...details,
            added_by: currUser?.emp_no
        }
        await axiosInstance.put(`emp_status_type/${details.id}/`, payload)
            .then(res => {
                fetchAllEmploymentStatus()
                handleClose()
            })
    }

    const fetchAllEmploymentStatus = async () => {
        await axiosInstance.get(`emp_status_type/`).then(res => {
          const data = Array.isArray(res.data) ? res.data: []
          dispatch(EMPLOYMENTSSTATUSViewAction(data))
        })
      }

    const handleChange = (e:any) => {
        setDetails((curr:any) => ({
            ...curr,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Modal
            open={viewEmploymentStatusTypeModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            // className='overflow-auto'
        >
            <div className="bg-white text-black p-4 flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form onSubmit={onSave} className="flex flex-col gap-4 p-4">
                    <div className="flex justify-between items-center bg-gray-100 px-2">
                        <Typography variant="h5">Employment Status Type Details</Typography>
                        <IconButton  
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <XMarkIcon className="w-8 text-black"/>
                        </IconButton>
                    </div>
                    <TextField
                        focused={isEdit}
                        name="name"
                        sx={{width: '100%'}} 
                        label='Name'
                        aria-required  
                        variant='outlined' 
                        type="text"
                        value={details?.name}
                        inputProps={
                            {
                                readOnly: !isEdit
                            }
                        }
                        onChange={handleChange}
                    />
                    <DatePickerForm 
                        label="Date Added"
                        defaultValue={details?.date_added}
                        setState={null}
                        customKey="date_added"
                        disabled={true}
                    />
                    <ButtonElement 
                        onEdit={() => setIsEdit(curr => true)} 
                        onCancel={() => onCancel()} 
                        onSave={null} 
                        onDelete={null} 
                        isEdit={isEdit} />
                </form>
            </div>
        </Modal>
    )
}