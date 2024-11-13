import { EmployeeContext } from "@/context/employee/EmployeeContext";
import { useOptionData } from "@/custom-hooks/use-option-data";
import axiosInstance from "@/helpers/axiosConfig";
import { getLast3Char, mobileNoFormat } from "@/helpers/utils";
import { validateImage } from "@/helpers/validator/employee_information";
import CityField from "@/public-components/forms/address/CityField";
import ProvinceField from "@/public-components/forms/address/ProvinceField";
import DatePickerField from "@/public-components/forms/DatePickerField";
import InputField from "@/public-components/forms/InputField";
import SelectField from "@/public-components/forms/SelectField";
import { HandleAlertAction } from "@/store/actions/components";
import { APILink, RootState } from "@/store/configureStore";
import { CloudArrowUpIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { AccountCircle } from "@mui/icons-material";
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function PersonalInfo() {


    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const employeeContext = useContext(EmployeeContext);
    const { employeeData, fetchEmployeeData} = employeeContext
    const dispatch = useDispatch()
    const [personalInfo, setPersonalInfo] = useState<any>(
        {
            id: null,
            emp_no: '',
            employee_image: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            suffix: "",
            birthday: "",
            birth_place: "",
            civil_status: "",
            gender: "",
            mobile_phone: "",
            blood_type: "",
            graduated_school: "",
            profession: "",
            license_no: "",
            emergency_contact_person: "",
            emergency_contact_number: "",
            other_duties_responsibilities: "",
            date_hired: "",
            date_separation: "",
            separation_type: "",
            approver1: "",
            approver2: "",
            permanent_address: "",
            current_address: "",
            branch_code: "",
            department_code: "",
            position_code: "",
            rank_code: "",
            employment_status: "",
            url_google_map: "",
            employee_type: "",
            added_by: currUser?.emp_no,
            permanentProvince: {
                id: "",
                name: "",
                code: ""
            },
            currentProvince: {
                id: "",
                name: "",
                code: ""
            },
            permanentCity: {
                id: "",
                name: "",
                code: ""
            },
            currentCity: {
                id: "",
                name: "",
                code: ""
            }
        }
    )
    const [isEdit, setIsEdit] = useState<boolean>(false)
    
    const {civilStatus, sex, bloodTypes} = useOptionData()

    useEffect(()=> {
        resetPersonalInfo()
    },[employeeData])

    const resetPersonalInfo = () => {
        setPersonalInfo((curr:any) => (
            {
                id: employeeData?.id,
                emp_no: getLast3Char(employeeData?.emp_no),
                employee_image: employeeData?.employee_image || "",
                first_name: employeeData?.first_name || "",
                middle_name: employeeData?.middle_name || "",
                last_name: employeeData?.last_name || "",
                suffix: employeeData?.suffix || "",
                birthday: employeeData?.birthday? dayjs(employeeData?.birthday).format('YYYY-MM-DDThh:mm:ss') : "",
                birth_place: employeeData?.birth_place || "",
                civil_status: employeeData?.civil_status || "",
                gender: employeeData?.gender || "",
                mobile_phone: employeeData?.mobile_phone? mobileNoFormat(employeeData?.mobile_phone) : "",
                blood_type: employeeData?.blood_type || "",
                graduated_school: employeeData?.graduated_school || "",
                profession: employeeData?.profession || "",
                license_no: employeeData?.license_no || "",
                emergency_contact_person: employeeData?.emergency_contact_person || "",
                emergency_contact_number: employeeData?.emergency_contact_number? mobileNoFormat(employeeData?.emergency_contact_number): "",
                other_duties_responsibilities: employeeData?.other_duties_responsibilities || "",
                date_hired: employeeData?.date_hired ? dayjs(employeeData?.date_hired).format('YYYY-MM-DDThh:mm:ss'): "",
                date_separation: employeeData?.date_separation ? dayjs(employeeData?.date_separation).format('YYYY-MM-DDThh:mm:ss'): "",
                separation_type: employeeData?.separation_type || "",
                approver1: employeeData?.approver1 || "",
                approver2: employeeData?.approver2 || "",
                permanent_address: employeeData?.permanent_address || "",
                current_address: employeeData?.current_address || "",
                branch_code: employeeData?.branch_code || "",
                department_code: employeeData?.department_code || "",
                position_code: employeeData?.position_code || "",
                rank_code: employeeData?.rank_code || "",
                employment_status: employeeData?.employment_status || "",
                url_google_map: employeeData?.url_google_map || "",
                employee_type: employeeData?.employee_type || "",
                added_by: currUser?.emp_no,
                permanentProvince: {
                    id: employeeData.permanent_province_code,
                    name: "",
                    code: ""
                },
                currentProvince: {
                    id: employeeData.current_province_code,
                    name: "",
                    code: ""
                },
                permanentCity: {
                    id: employeeData.permanent_city_code,
                    name: "",
                    code: ""
                },
                currentCity: {
                    id: employeeData.current_city_code,
                    name: "",
                    code: ""
                }
            }
        ))
    }

    const validateProfilePic = (file:File) => {
        const MAX_FILE_SIZE_MB = 3;
        if (file) {
            if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {

                setPersonalInfo((curr:any) => ({...curr, employee_image:file}))

                const reader = new FileReader();
                reader.onload = () => {
                    setPersonalInfo((curr:any) => (
                        {
                            ...curr,
                            previewProfilePic: reader.result
                        }
                    ));
                };
                reader.readAsDataURL(file);
        
            } else {
                
                setPersonalInfo((curr:any) => (
                    {
                        ...curr,
                        previewProfilePic: null
                    }
                ));

                dispatch(HandleAlertAction({
                    open:true,
                    status: "error",
                    message: "Image should be not more than 3MB"
                }))

        
            }
        }
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value, files } = e.target;

        let formatValue = '';
        switch (name) {
            case "employee_image":
                if(!files) {
                    return
                }
                validateProfilePic(files[0])
                return
            
            case "mobile_phone":
                formatValue = mobileNoFormat(value)
                break

            case "emergency_contact_number":
                formatValue = mobileNoFormat(value)
                break

            default: 
                formatValue = value
                break;
        }

        setPersonalInfo((prevState:any) => ({
            ...prevState,
            [name]: formatValue,
        }));
    };

    const handleDateChange = (name:string, newValue: Dayjs | null) => {

        setPersonalInfo((curr:any) => (
            {
                ...curr,
                [name]: newValue
            }
        ))

    };

    const handleChangeAddress = (name:string, newValue:any) => {
        setPersonalInfo((curr:any) => (
            {
                ...curr,
                [name]: newValue,
            }
        ))
    }
    
    const submit = (e:any) => {
        e.preventDefault()

        const {
            permanentProvince, 
            currentProvince, 
            permanentCity, 
            currentCity, 
            mobile_phone, 
            emergency_contact_number,
            birthday, 
            ...restPersonalInfo
        } = personalInfo

        const isFile = validateImage(personalInfo?.employee_image);

        if(!restPersonalInfo.employee_image) {
            dispatch(HandleAlertAction(
                {
                    open:true,
                    status:"error",
                    message: "Profile Picture is required"
                }
            ))
            return
        }
        else if(!isFile && !restPersonalInfo?.employee_image) {
            dispatch(HandleAlertAction(
                {
                    open:true,
                    status:"error",
                    message: "Profile Picture should be image"
                }
            ))
            return
        }
        
        const payload = {
            ...employeeData,
            ...restPersonalInfo,
            birthday: dayjs(birthday).format('YYYY-MM-DDThh:mm:ss'),
            mobile_phone: `0${mobile_phone}`,
            emergency_contact_number: `0${emergency_contact_number}`,
            permanent_province_code: permanentProvince.id,
            permanent_city_code: permanentCity.id,
            current_province_code: currentProvince.id,
            current_city_code: currentCity.id
        }

        const formData = new FormData()
        for(const key in payload) {
            formData.append(key, payload[key])
        }

        updatePersonalInfo(formData, payload)
    }

    const updatePersonalInfo = async (formData: FormData, payload:any) => {
        const { id, emp_no } = payload

        console.log(typeof id)
        await axiosInstance.put(`employees/${id}/`, formData)
            .then(res => {
                dispatch(HandleAlertAction({
                    open:true,
                    status: "success",
                    message:"Update Personal Information Successfully"
                }))
                setIsEdit(curr => false)
                fetchEmployeeData(id)
            })
            .catch(err => {
                console.error(err)
                dispatch(HandleAlertAction({
                    open:true,
                    status: "error",
                    message: err?.response?.data?.["Error Message"] ?? "Failed to update personal information"
                }))
            })
    }

    
    return (
        <div>
            <form onSubmit={submit} className="flex flex-col gap-8">
                <div id="personal-details-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Personal Details</Typography><br></br>
                    <div id='profile-pic-wrapper' className="w-fit">
                        <img 
                            src={personalInfo?.previewProfilePic? personalInfo?.previewProfilePic: `${APILink}${employeeData?.employee_image}`} 
                            className="border-gray-200 border-2 w-28 h-28 rounded-full m-auto object-cover" 
                            alt="profile picture"
                        /><br></br>
                        <label className="bg-indigo-900 text-white cursor-pointer">
                            <input onChange={handleValueChange} name="employee_image" type="file" className="hidden" disabled={!isEdit}/>
                            <div className={`${isEdit? "bg-indigo-900":"bg-gray-400"} bg-black flex gap-2 p-2 w-fit rounded-lg`}>Update Profile Picture <CloudArrowUpIcon className="h-6 w-6" /></div>
                        </label>
                    </div><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <InputField 
                            label="First Name:"
                            name="first_name"
                            variant="outlined"
                            value={personalInfo.first_name}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                            required
                        />
                        <InputField 
                            label="Middle Name:"
                            name="middle_name"
                            variant="outlined"
                            value={personalInfo.middle_name}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />
                        <InputField 
                            label="Last Name:" 
                            variant="outlined"
                            name="last_name" 
                            value={personalInfo.last_name}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                            required
                        />
                        <InputField 
                            label="Suffix:" 
                            variant="outlined"
                            name="suffix"
                            value={personalInfo.suffix}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />

                        <SelectField 
                            className="w-full md:w-52"
                            labelId="Civil Status"
                            id="civil-status"
                            label="Civil Status" 
                            options={civilStatus} 
                            name="civil_status"
                            value={personalInfo.civil_status}
                            onChange={handleValueChange}
                            disabled={!isEdit}
                        />


                        <SelectField 
                            className="w-full md:w-52"
                            labelId="sex"
                            id="sex"
                            label="Sex"
                            options={sex} 
                            name="gender"
                            value={personalInfo.gender}
                            disabled={!isEdit}
                            onChange={handleValueChange}
                        />

                        <SelectField
                            className="w-full md:w-52"
                            labelId="blood-type"
                            id="blood-type"
                            label="Blood Type"
                            options={bloodTypes}
                            name="blood_type"
                            value={personalInfo.blood_type}
                            disabled={!isEdit}
                            onChange={handleValueChange}                        
                        />

                        <DatePickerField 
                            label="Birthdate"
                            name="birthday"
                            onChange={(newValue: Dayjs | null) => handleDateChange("birthday", newValue)}
                            value={personalInfo.birthday? dayjs(personalInfo.birthday): null}
                            disabled={!isEdit}
                        />

                        <InputField 
                            id='mobile-no'
                            label="Mobile No:"
                            startAdornment={(
                                <InputAdornment position="start">
                                    +63
                                </InputAdornment>
                            )}
                            inputProps={{
                                maxLength:10,
                                minLength:10
                            }}
                            pattern='^[0-9]+$'
                            name="mobile_phone"
                            value={personalInfo.mobile_phone}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                            required            
                        />

                        <InputField 
                            id='emergency-contact-no'
                            label="Emergency Contact No:"
                            startAdornment={(
                                <InputAdornment position="start">
                                    +63
                                </InputAdornment>
                            )}
                            inputProps={{
                                maxLength:10,
                                minLength:10
                            }}
                            pattern='^[0-9]+$'
                            name="emergency_contact_number"
                            value={personalInfo.emergency_contact_number}
                            onChange={handleValueChange}          
                            readOnly={!isEdit}
                            required       
                        />

                        <InputField 
                            id='emergency-contact-person'
                            label="Emergency Contact Person:"
                            name="emergency_contact_person"
                            value={personalInfo.emergency_contact_person}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                            required         
                        />

                        <InputField 
                            id='licensed-no'
                            label="License No:"
                            name="license_no"
                            value={personalInfo.license_no}             
                            onChange={handleValueChange}
                            readOnly={!isEdit}            
                        />

                        <InputField 
                            label="Birthplace:" 
                            variant="outlined"
                            className="w-full"
                            name="birth_place"
                            value={personalInfo.birth_place}             
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                            required
                        />

                        <div className="w-full">
                            <Typography variant="subtitle1" className="font-bold">Permanent Address</Typography><br></br>
                            <div id="permanent-address-wrapper" className="flex gap-8 flex-col md:flex-row w-full">
                                <div className="w-full md:w-80">
                                    <ProvinceField 
                                        valueId={personalInfo?.permanentProvince?.id} 
                                        label="Province" 
                                        name="permanentProvince"
                                        handleChange={handleChangeAddress} 
                                    />
                                </div>
                                <div className="w-full md:w-80">
                                    <CityField 
                                        valueId={personalInfo?.permanentCity?.id} 
                                        provinceCode={personalInfo?.permanentProvince?.code} 
                                        label="City/Municipality" 
                                        name="permanentCity" 
                                        disabled={!personalInfo?.permanentProvince?.code} 
                                        handleChange={handleChangeAddress}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputField 
                                        label="Street Address:" 
                                        variant="outlined"
                                        className="w-full"
                                        value={personalInfo.permanent_address}
                                        name="permanent_address"
                                        onChange={handleValueChange}
                                        readOnly={!isEdit}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <Typography variant="subtitle1" className="font-bold">Current Address</Typography><br></br>
                            <div id="permanent-address-wrapper" className="flex gap-8 flex-col md:flex-row w-full">
                                <div className="w-full md:w-80">
                                    <ProvinceField 
                                        valueId={personalInfo?.currentProvince?.id} 
                                        label="Province"
                                        name="currentProvince"
                                        handleChange={handleChangeAddress} 
                                    />
                                </div>
                                <div className="w-full md:w-80">
                                    <CityField 
                                        valueId={personalInfo?.currentCity?.id} 
                                        provinceCode={personalInfo?.currentProvince?.code} 
                                        label="City/Municipality" 
                                        name="currentCity" 
                                        disabled={!personalInfo?.currentProvince?.code} 
                                        handleChange={handleChangeAddress}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputField 
                                        label="Street Address:" 
                                        variant="outlined"
                                        className="w-full"
                                        name="current_address"
                                        value={personalInfo.current_address}
                                        onChange={handleValueChange}
                                        readOnly={!isEdit}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <InputField 
                            label="URL Google Map:" 
                            variant="outlined"
                            className="w-full"
                            name="url_google_map"
                            value={personalInfo.url_google_map}
                            endAdornment={(
                                <InputAdornment position="end">
                                    {personalInfo?.url_google_map && (
                                    <a 
                                        href={personalInfo.url_google_map} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <MapPinIcon className="text-gray-500 w-10 cursor-pointer hover:text-indigo-900" />
                                    </a>
                                    )}
                                </InputAdornment>
                            )}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                            required
                        />
                    </div>
                </div>

                <div id="other-details">
                    <Typography variant="h6" component="h6" className="font-bold">Other Details</Typography><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <InputField 
                            label="Profession:" 
                            variant="outlined"
                            className="w-full"
                            name="profession"
                            onChange={handleValueChange}
                            value={personalInfo.profession}
                            readOnly={!isEdit}
                            required
                        /> 
                        <InputField 
                            label="School Graduated:" 
                            variant="outlined"
                            className="w-full"
                            name="graduated_school"
                            onChange={handleValueChange}
                            value={personalInfo.graduated_school}
                            readOnly={!isEdit}
                            required
                        /> 
                    </div>
                </div>

                {isEdit 
                    ?   <div className="w-full flex gap-4">
                            <Button 
                                onClick={() => {
                                    setIsEdit(curr => false)
                                    resetPersonalInfo()
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