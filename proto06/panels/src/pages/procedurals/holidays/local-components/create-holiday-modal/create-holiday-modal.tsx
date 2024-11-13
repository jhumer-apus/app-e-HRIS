import React, { ReactElement, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { HolidayGetType } from '@/types/types-pages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalAPIDate } from '@/store/configureStore';
import dayjs from 'dayjs';
import { HolidayCreate } from '@/store/actions/procedurals';

//LIBRARIES
import FormControl, { useFormControl } from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

//COMPONENTS
import Province from '@/public-components/forms/address/Province';
import AllCityMunicipality from '@/public-components/forms/address/AllCityMunicipality';

//HELPERS
import { beautifyJSON } from '@/helpers/utils';
import CityMunicipality from '@/public-components/forms/address/CityMunicipality';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';


// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   "max-width": "400px",
//   bgcolor: 'background.paper',
//   borderRadius: '15px',
// //   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   display: 'flex',
//   flexDirection: 'column',
//   gap: 3,
// };

interface CreateHolidayModalInterface {
    open?: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleOpen: () => void,
    handleClose: () => void,
}
const holiday_location = ['City', 'Province', 'National'];

export default function CreateHolidayModal(props: CreateHolidayModalInterface) {
    //REDUX
    const dispatch = useDispatch();
    const user = useSelector((state:RootState) => state.auth.employee_detail)
    const {open, handleClose} = props;
    const createHoliday = useSelector((state: RootState)=> state.procedurals?.HolidayCreate);
    const [createHolidayForm, setCreateHolidayForm] = useState<any>({
        holiday_date: null,
        holiday_description: '',
        holiday_type: '',
        holiday_location: '',
        province_ref: null,
        city_ref: null,
        province: {
            id: '',
            name: '',
            code: ''
        },
        city: {
            id: '',
            name: '',
            code: ''
        },
    });

    const reseter = () => {
        setCreateHolidayForm(() => ({
            holiday_date: null,
            holiday_description: '',
            holiday_type: '',
            holiday_location: '',
            province_ref: null,
            city_ref: null,
            province: {
                id: '',
                name: '',
                code: ''
            },
            city: {
                id: '',
                name: '',
                code: ''
            },
        }));
    };

    const updateAddress = (name:string, newValue:any) => {

        setCreateHolidayForm((curr:any) => ({
            ...curr,
            [name]: newValue
        }))
      
    }

    const validateHoliday = (data:HolidayGetType) => {

        let errors:any = {}

        !data.holiday_date && (errors["Holiday Date"] = "Holiday Date should be required")
        !data.holiday_description && (errors["Holiday Description"] = "Holiday Description should be required")
        !data.holiday_type && (errors["Holiday Type"] = "Holiday Type should be required")
        !data.holiday_location && (errors["Holiday Location"] = "Holiday Location should be required")

        switch (data.holiday_location) {

            case "Province":
                if(!data.province_ref) {
                    errors["Province"] = "Province should be required if the selected location is Province"
                }
                break

            case "City":
                if(!data.city_ref) {
                    errors["City"] = "City should be required if the selected location is City"
                }
                break
        }

        if(Object.keys(errors).length > 0) {
            window.alert(beautifyJSON(errors))
            return true
        }
        return false
    }
    const submitNewHoliday = () => {

        const holidayData: HolidayGetType = {
            holiday_date: createHolidayForm.holiday_date,
            holiday_description: createHolidayForm.holiday_description,
            holiday_type: createHolidayForm.holiday_type,
            holiday_location: createHolidayForm.holiday_location,
            province_ref: null,
            city_ref: null,
            added_by: user?.emp_no as number
            // province_ref: (createHolidayForm.holiday_location=="Province" && createHolidayForm.province.id) ||
            //             (createHolidayForm.holiday_location=="City" && createHolidayForm.city.id) ||
            //             (createHolidayForm.holiday_location=="" && createHolidayForm.province.id),
            // city_ref: createHolidayForm.city.id
        }

        switch(createHolidayForm.holiday_location) {

            case "Province":
                holidayData.province_ref = createHolidayForm.province.id
                break

            case "City":
                holidayData.province_ref = createHolidayForm.province.id
                holidayData.city_ref = createHolidayForm.city.id
                break

            case "National":
                holidayData.province_ref = null
                holidayData.city_ref = null
                break

            default:
                holidayData.province_ref = null
                holidayData.city_ref = null
                break
        }

        const isError = validateHoliday(holidayData);

        if(isError) {
            return
        }

        dispatch(HolidayCreate(holidayData));

    };

    useEffect(()=>{
        if(createHoliday.status && createHoliday.status === 'succeeded'){
            window.alert("Holiday has been successfully created");
            setTimeout(()=> {
                window.location.reload();
            }, 1000)
        } else if (createHoliday.error){
            window.alert(`${createHoliday.error}`)
        } else {
            return;
        }
    }, [createHoliday.status])

    const addressElement = (): ReactElement | null => {

        
        if (createHolidayForm.holiday_location == "Province") {

            return (
                <Province 
                    updateAddress={updateAddress}
                    name="province"
                />
            )
        } else if (createHolidayForm.holiday_location == "City") {

            return (
                <>
                    <Province 
                        updateAddress={updateAddress}
                        name="province"
                    />
                    <CityMunicipality
                        updateAddress={updateAddress}
                        currentProvinceCode={createHolidayForm.province.code}
                        name='city'
                    />
                </>
            )
        }
        return null
    }

    // const modalContent = "bg-white mt-20 p-4 max-w-[500px] flex flex-col gap-8 m-auto relative"
    const modalContent = "flex items-center flex-col gap-4 bg-white relative h-auto w-[90%] xs:max-sm:w-[70%] sm:w-[40%] p-4 rounded-lg";
    return (
        <Modal
            open={open ?? false}
            onClose={() => {
                handleClose();
                reseter();
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex justify-center items-center'
        >
            <div className={modalContent}>
                <div className='absolute top-1 right-1'>
                    <IconButton  
                        aria-label="close"
                        onClick={() => {
                            handleClose();
                            reseter();
                        }}
                    >
                        <XMarkIcon className="w-8 text-black"/>
                    </IconButton>
                </div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create an HRIS Holiday
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Make sure to double check all the fields and entry.
                </Typography>
                <FormControl className='w-full'>
                    <InputLabel htmlFor="holiday_type">Holiday Type:*</InputLabel>
                    <Select
                        onChange={(e:any) => setCreateHolidayForm((curr:any) => ({
                        ...curr,
                        holiday_type: e.target.value
                        }))}
                        placeholder="Holiday Type*"
                        name="holiday_type"
                        variant="outlined"
                        label="Holiday Type*"
                    >
                        <MenuItem value="SH">Special Non-working Holiday</MenuItem>
                        <MenuItem value="LH">Regular Holiday</MenuItem>
                    </Select>
                </FormControl>
            <Autocomplete
                noOptionsText={'Loading... Please Wait.'}
                inputValue={createHolidayForm['holiday_location']}
                onInputChange={(event, newInputValue) => {
                        setCreateHolidayForm((prevState:any)=> ({
                        ...prevState,
                        holiday_location: newInputValue
                    }))
                }}
                disablePortal
                id="holiday_location"
                options={holiday_location}
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} required label="Holiday Location" />}
            />
            {addressElement()}
            {/* {createHolidayForm.holiday_location == "Province" && 
                <Province 
                    updateAddress={updateAddress}
                    name="province"
                />
            }
            {createHolidayForm.holiday_location == "City" && 
                <AllCityMunicipality
                    state={createHolidayForm}
                    setState={setCreateHolidayForm}
                />
            } */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={dayjs(createHolidayForm['holiday_date'])}
                        onChange={(newValue) => {
                            setCreateHolidayForm((prevState:any)=> ({
                                ...prevState,
                                holiday_date: dayjs(newValue).format(`${globalAPIDate}`)
                            }))
                        }}
                        label="Choose Which Date"
                        slotProps={{
                        textField: {
                            helperText: 'MM/DD/YYYY',
                        },
                        }}
                        sx={{ width: '100%'}} 
                    />
                </LocalizationProvider>
                <TextField
                    // value={createHolidayForm['holiday_description']}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        // To do: Debounce this Input
                        setCreateHolidayForm((prevState:any)=> ({
                            ...prevState,
                            holiday_description: event.target.value
                        }))
                    }}
                    id="holiday_description" 
                    required 
                    label="Holiday Description" 
                    variant="filled"
                    sx={{ width: '100%'}} 
                />
                <div className='flex justify-end'>
                    <Button variant="contained" onClick={submitNewHoliday}> Submit Holiday </Button>
                </div>
            </div>
        </Modal>
    );
}