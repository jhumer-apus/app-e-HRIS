
import { APILink, RootState, globalAPIDate } from "@/store/configureStore";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios, { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { ReactElement, useEffect, useState } from "react";

//COMPONENTS
import CityMunicipality from "@/public-components/forms/address/CityMunicipality";
import Province from "@/public-components/forms/address/Province";
import AllCityMunicipality from "@/public-components/forms/address/AllCityMunicipality";
import { beautifyJSON } from "@/helpers/utils";
import { useSelector } from "react-redux";
import axiosInstance from "@/helpers/axiosConfig";
interface Props {
    holidayId:any
    isOpenModal: boolean
    setIsOpenModal: any
}

export default function EditHolidayModal(props:Props) {

    //REDUX
    const currUser =  useSelector((state:RootState) => state.auth.employee_detail)

    //STATES
    const { isOpenModal,setIsOpenModal,  holidayId } = props
    const [holidayDetails, setHolidayDetails ] = useState<any>(null)
    const [address, setAddress] = useState<any>({
        province:{
            id:'',
            name:'',
            code:'',
        },
        city:{
            id:'',
            name:'',
            code:''
        }
    })
    
    //USEEFFECT
    useEffect(() => {
        if(isOpenModal) {
            fetchHolidayDetails()
        }
    },[isOpenModal])


    //STYLE
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
    };

    //FUNCTIONS
    const fetchHolidayDetails = async() => {
        
        if(holidayId) {

            await axiosInstance.get(`holiday/${holidayId}/`).then((res:AxiosResponse) => {

                console.log(res.data)
                setHolidayDetails((curr:any) => res.data)
                setAddress((curr:any) => ({
                    province:{
                        id: res.data.province_ref,
                        name:'',
                        code:'',
                    },
                    city:{
                        id: res.data.city_ref,
                        name:'',
                        code:''
                    }
                }))
    
            }).catch((err:AxiosError) => {
    
                console.log(err)
                window.alert(err.response.data)
            })
        }
    }

    // const fetchProvince = async() => {
    //     await axiosInstance.get(`province/${holidayDetails.province_ref}/`).then((res:AxiosResponse) => {
    //         setAddress((curr:any) => ({
    //             ...curr,
    //             province:{
    //                 id:res.data.id,
    //                 name:res.data.name,
    //                 code:res.data.code
    //             }
    //         }))
    //     })
    // }

    // const fetchCity = async() => {
    //     await axiosInstance.get(`city_municipality/${holidayDetails.city_ref}/`).then((res:AxiosResponse) => {
    //         setAddress((curr:any) => ({
    //             ...curr,
    //             city:{
    //                 id:res.data.id,
    //                 name:res.data.name,
    //                 code:res.data.code
    //             }
    //         }))
    //     })
    // }
    const handleSubmit = (e:any) => {
        e.preventDefault()

        switch(holidayDetails.location) {
            case 'National':

        }
        const payload = {
            holiday_date: holidayDetails.holiday_date,
            holiday_description: holidayDetails.holiday_description,
            holiday_type: holidayDetails.holiday_type,
            holiday_location: holidayDetails.holiday_location,
            city_ref: address.city?.id,
            province_ref: address.province?.id,
            added_by: currUser?.emp_no
        }

        switch(payload.holiday_location) {

            case 'National':
                payload.province_ref = null
                payload.city_ref = null
                break

            case 'Province':
                payload.city_ref = null
                break

            default:
                break 
        }

        console.log(payload)
        if(validateHoliday(payload)){
            return
        }

        updateHoliday(payload)

    }
    const updateHoliday = async(payload:any) => {

        await axiosInstance.put(`holiday/${holidayDetails.id}/`, payload).then((res:AxiosResponse) => {

            window.alert('Update Holiday Detail Successful')
            setIsOpenModal((curr:boolean) => false)

        }).catch((err:AxiosError) => {
            console.log(err)
            window.alert(beautifyJSON(err.response.data))
            setIsOpenModal((curr:boolean) => false)
        })
    }

    const updateAddress = (name:string, newValue:any) => {

        setAddress((curr:any) => ({
            ...curr,
            [name]: newValue
        }))
      
    }

    const validateHoliday = (data:any) => {

        let errors:any = {}

        !data.holiday_date && (errors["Holiday Date"] = "Holiday Date should be required")
        !data.holiday_description && (errors["Holiday Description"] = "Holiday Description should be required")
        !data.holiday_type && (errors["Holiday Type"] = "Holiday Type should be required")
        !data.holiday_location && (errors["Holiday Location"] = "Holiday Location should be required")

        switch (data.holiday_location) {

            case "Province":
                !data.province_ref && (errors["Province"] = "Province should be required if the selected location is Province")
                break

            case "City":
                !data.province_ref && (errors["Province"] = "Province should be required if the selected location is City")
                !data.city_ref && (errors["City"] = "City should be required if the selected location is City")    
                break
        }

        if(Object.keys(errors).length > 0) {
            window.alert(beautifyJSON(errors))
            return true
        }
        return false
             

    }

    const addressElement = (): ReactElement | null => {

        
        if (holidayDetails?.holiday_location == "Province") {

            return (
                <Province 
                    updateAddress={updateAddress}
                    defaultProvinceId={holidayDetails.province_ref}
                    name="province"
                />
            )
        } else if (holidayDetails?.holiday_location == "City") {

            return (
                <>
                    <Province 
                        updateAddress={updateAddress}
                        defaultProvinceId={holidayDetails.province_ref}
                        name="province"
                    />
                    <CityMunicipality
                        updateAddress={updateAddress}
                        currentProvinceCode={address.province.code}
                        defaultCityId={holidayDetails.city_ref}
                        name='city'
                    />
                </>
            )
        }
        return null
    }

    return (
        <Modal
            open={isOpenModal}
            onClose={() => {
                setIsOpenModal((curr:boolean) => false)
            }}
            className="flex justify-center items-center"
        >
            <Box className="flex items-center bg-white flex-col p-4 h-auto w-[90%] sm:w-auto rounded-lg overflow-auto editHoliday">
                <div className="m-auto w-fit">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Holiday
                    </Typography>
                </div>
                <form className="flex md: flex-row flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                    <FormControl className='w-full'>
                        <InputLabel htmlFor="holiday_type">Holiday Type:*</InputLabel>
                        <Select
                            onChange={(e:any) => setHolidayDetails((curr:any) => ({
                            ...curr,
                            holiday_type: e.target.value
                            }))}
                            placeholder="Holiday Type*"
                            name="holiday_type"
                            variant="outlined"
                            label="Holiday Type*"
                            value={holidayDetails?.holiday_type??""}
                            required
                        >
                            <MenuItem value="SH">Special Non-working Holiday</MenuItem>
                            <MenuItem value="LH">Regular Holiday</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={holidayDetails?.holiday_date? dayjs(holidayDetails.holiday_date): null}
                            onChange={(newValue) => {
                                setHolidayDetails((prevState:any)=> ({
                                    ...prevState,
                                    holiday_date: dayjs(newValue).format(`${globalAPIDate}`)
                                }))
                            }}
                            label="Choose Which Date"
                            slotProps={{
                                textField: {
                                    helperText: 'MM/DD/YYYY',
                                }
                            }}
                        />
                    </LocalizationProvider>
                    {holidayDetails?.holiday_location &&
                        <FormControl className='w-full'>
                            <InputLabel htmlFor="holiday_location">Holiday Location:*</InputLabel>
                            <Select
                                onChange={(e:any) => setHolidayDetails((curr:any) => ({
                                ...curr,
                                holiday_location: e.target.value
                                }))}
                                placeholder="Holiday Location*"
                                name="holiday_location"
                                variant="outlined"
                                label="Holiday Location*"
                                value={holidayDetails?.holiday_location}
                                required
                            >
                                <MenuItem value="Province">Province</MenuItem>
                                <MenuItem value="City">City</MenuItem>
                                <MenuItem value="National">National</MenuItem>
                            </Select>
                        </FormControl>
                    }

                    {!holidayDetails?.holiday_location &&
                        <FormControl className='w-full'>
                            <InputLabel htmlFor="holiday_location">Holiday Location:*</InputLabel>
                            <Select
                                onChange={(e:any) => setHolidayDetails((curr:any) => ({
                                ...curr,
                                holiday_location: e.target.value
                                }))}
                                placeholder="Holiday Location*"
                                name="holiday_location"
                                variant="outlined"
                                label="Holiday Location*"
                                required
                                // value={holidayDetails?.holiday_location}
                            >
                                <MenuItem value="Province">Province</MenuItem>
                                <MenuItem value="City">City</MenuItem>
                                <MenuItem value="National">National</MenuItem>
                            </Select>
                        </FormControl>
                    }

                    {addressElement()}
                    {/* {holidayDetails?.holiday_location == "Province" && 
                        <Province 
                            updateAddress={updateAddress}
                            name="province_ref"
                            defaultProvinceId={holidayDetails.province_ref}
                        />
                    }

                    {holidayDetails?.holiday_location == "City" && 
                        <AllCityMunicipality
                            state={address} 
                            setState={setAddress} 
                            city_id={holidayDetails?.city_ref}
                        />
                    } */}

                    <TextField
                        value={holidayDetails?.holiday_description?? ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setHolidayDetails((prevState:any)=> ({
                                ...prevState,
                                holiday_description: event.target.value
                            }))
                        }}
                        id="holiday_description" 
                        required 
                        label="Holiday Description" 
                        variant="filled" 
                    />
                    <div className="flex flex-row gap-4">
                        <Button onClick={() => setIsOpenModal((curr:any)=> false)}>Cancel</Button>
                        <Button type="submit">Update</Button>
                    </div>

                </form>
            </Box>
        </Modal>
    )
}