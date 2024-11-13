import { Box, CircularProgress, Avatar } from '@mui/material';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
  Button as Button2,
} from "@material-tailwind/react";
import {
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import {
  UserIcon,
  FingerPrintIcon,
  AcademicCapIcon,
  UserGroupIcon,
  WindowIcon,
  LockClosedIcon as LockClosedOutline,
  XCircleIcon,
  CheckCircleIcon,
  LockOpenIcon,
  UserPlusIcon,
  XMarkIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { APILink, RootState } from '@/store/configureStore';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import FormData from 'form-data';
import { beautifyJSON } from '@/helpers/utils';
import dayjs from 'dayjs';
import axiosInstance from '@/helpers/axiosConfig';


type initialState = {
    secondOptionModalEntranceDelay?: Boolean;
    modalEntranceDelay?: Boolean;
    loadingEffect: () => void;
}

export const SpecificEmployee = (props: initialState) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    
        if (selectedFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          setPreviewUrl(null);
        }
    };
    const {modalEntranceDelay, secondOptionModalEntranceDelay, loadingEffect} = props;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<EMPLOYEESViewInterface>();
    const userData = useSelector((state: RootState) => state.employees.specific_employee_info);
    const [editMode, setEditMode] = useState(false);
    const [editMode2, setEditMode2] = useState(false);
    const [editMode3, setEditMode3] = useState(false);
    const [type, setType] = useState("staticInfo");

    useEffect(() => {
        if (userData) {
        for (const key in userData) {
            setValue(key, userData[key]);
        }
        }
    }, [userData, setValue]);

    const fetchData = async function (formData: FormData) {
        try {
            const response = await axiosInstance.put(
              `employees/${userData?.id}/`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            loadingEffect();
            window.alert(`${response.status >= 200 && response.status < 300 && 'Request Successful'}`)
            setTimeout(()=> {
                location.reload();
            }, 800)
          } catch (err: any) {
            window.alert(`Error: ${beautifyJSON(err?.response?.data)}`)
          }
    };
    const onSubmit = async (data: EMPLOYEESViewInterface, type: string) => {
        const formData = new FormData();
        const keyChecker = (key: string) => {
            const keyProcessed: { [key: string]: () => void } = {
                "type1": () => setEditMode(false),
                "type2": () => setEditMode2(false),
                "type3": () => setEditMode3(false),
                "default": () => {}
            }
            if (key in keyProcessed) {
                return keyProcessed[key]();
              } else {
                return keyProcessed['default'](); 
            }
        }
        
        keyChecker(type)

        for (const key in data) {
            const value = data[key];
            if (value !== null && value !== undefined && value !== "") {
                if(key === "employee_image" && file){
                    formData.append(key, file);
                }else if(key === "employee_image" && value.includes('image')){
                    formData.append("", "");
                }else {
                    formData.append(key, value);
                }
            }
        }
        await fetchData(formData);
    };

    return (
        <Fragment>
            
            <Card className="w-full max-w-[110rem] xl:max-w-[90rem] ml-auto mr-auto" style={{zoom: 0.95}}>
            <Tabs value={type}>
                    <CardHeader
                        color="teal"
                        variant="gradient"
                        floated={false}
                        shadow={true}
                        id="parent-modal-title"
                        className="m-0 flex justify-center flex-col rounded-b-none py-8 px-4 text-center"
                    >
                        <div className='flex justify-center'>
                            <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                            {!userData?.employee_image && !previewUrl ? 
                            
                            <UserIcon className="h-24 w-24" />
                            :
                            previewUrl ? 
                            <Avatar sx={{ width: 100, height: 100, objectFit: 'contain' }} src={`${previewUrl}`} alt="Preview"/>
                            :
                            <Avatar sx={{ width: 100, height: 100, objectFit: 'contain' }} src={`${APILink.replace('/api/v1', '')}${userData?.employee_image}`} alt="Avatar"/>
                            }
                            </div>
                        </div>
                        <Typography variant="h4" color="white">
                        Full Name: {userData?.first_name} {userData?.middle_name} {userData?.last_name}
                        </Typography>
                        <Typography variant="p" color="white">
                        Registered Employee #: {userData?.emp_no}
                        </Typography>
                        <TabsHeader className="relative z-0 w-full">
                            <Tab value="staticInfo" onClick={() => setType("staticInfo")}>
                            Static Info
                            </Tab>
                            <Tab value="personalInfo" onClick={() => setType("personalInfo")}>
                            Personal
                            </Tab>
                            <Tab value="employmentDetails" onClick={() => setType("employmentDetails")}>
                            Employment
                            </Tab>
                        </TabsHeader>
                    </CardHeader>
                    <CardBody id="parent-modal-description" className="p-4 sm:p-6 xl:p-15">
                        <TabsBody
                            className="!overflow-x-hidden"
                            animate={{
                            mount: {
                                x: 0,
                            },
                            unmount: {
                                x: 300,
                            },
                            }} 
                        >
                        <Box sx={{ display: secondOptionModalEntranceDelay? 'flex' : 'none', zIndex: "999", position: "absolute", top: "0", left: "0", background: "white", height: "100%", width: "100%", opacity: modalEntranceDelay? '1': '0', transition: 'opacity 1s ease'}}>
                            <span style={{marginLeft: "50%", marginTop: "20%"}}><CircularProgress /></span>
                        </Box>
                        <TabPanel value="staticInfo" className="p-0">
                            <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit((data) => onSubmit(data, "type1"))}>
                            <div className="my-4 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    HR System Details
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                    <Input 
                                                crossOrigin={undefined} {...register('id')}
                                                type="number"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Database ID: (readonly)"
                                                disabled={true}
                                                icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input 
                                                crossOrigin={undefined} {...register('bio_id')}
                                                type="number"
                                                max={99999}
                                                maxLength={5}
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Biometric ID: (max 5 dig)"
                                                disabled={!editMode}
                                                icon={<FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                    <div className="flex items-center gap-4">
                                    <Input 
                                                crossOrigin={undefined} {...register('is_superuser')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Account Superuser(?):"
                                                disabled={true}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input 
                                                crossOrigin={undefined} {...register('is_active')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Account Active(?):"
                                                disabled={true}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                </div>
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Technical Details
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                    <Input
                                                crossOrigin={undefined} {...register('emp_no')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                label="Emp #:"
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                disabled={!editMode}                                    />
                                    <Input
                                                crossOrigin={undefined} {...register('user.username')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Username:"
                                                disabled={true}
                                                icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                                crossOrigin={undefined} {...register('user.role')}
                                                type="number"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                label="Role #:"
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                disabled={true}
                                                icon={<UserGroupIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                    <Input
                                            crossOrigin={undefined} {...register('email_address')}
                                            type="email"
                                            className=""
                                            label="Email Address:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode}                                    />
                                </div>
                            </div>
                            <div className="my-6">
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-4 font-medium"
                                >
                                Static Info Details
                                </Typography>
                                <div className="my-4 flex flex-wrap xl:flex-nowrap items-center gap-4">
                                <Input
                                            crossOrigin={undefined} {...register('user.is_locked')}
                                            label="Account Lock Status:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={true}
                                            icon={<LockClosedOutline className="h-5 w-5 text-blue-gray-300" />}                                />
                                <Input
                                            crossOrigin={undefined} {...register('user.last_login')}
                                            label="Last Login:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={true}
                                            icon={<CheckCircleIcon className="h-5 w-5 text-blue-gray-300" />}                                />
                                <Input
                                            crossOrigin={undefined} {...register('user.old_password')}
                                            type="password"
                                            label="Old Password:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={true}
                                            icon={<LockOpenIcon className="h-5 w-5 text-blue-gray-300" />}                                />
                                <Input
                                            crossOrigin={undefined} {...register('user.date_added')}
                                            label="Date Added:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={true}
                                            icon={<UserPlusIcon className="h-5 w-5 text-blue-gray-300" />}                                />
                                <Input
                                            crossOrigin={undefined} {...register('user.date_deleted')}
                                            label="Date Deactivated:"
                                            containerProps={{ className: "min-w-[72px]" }}
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={true}
                                            icon={<XMarkIcon className="h-5 w-5 text-blue-gray-300" />}                                />
                                </div>
                                <div className="my-4 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <Input
                                            crossOrigin={undefined} {...register('user.failed_login_attempts')}
                                            label="Failed Login Attempts:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={true}
                                            icon={<XCircleIcon className="h-5 w-5 text-blue-gray-300" />}                                />
                                <Input
                                            crossOrigin={undefined} {...register('user.date_password_changed')}
                                            label="Date Password Changed:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={true}
                                            icon={null
                                                // <CreditCardIcon className="h-5 w-5 text-blue-gray-300" />
                                            }                                />
                                </div>
                            </div>
                            <div className="my-4 flex items-center gap-4">
                                <Button2 
                                    disabled={editMode}
                                    color={editMode? "gray" :"teal"} 
                                    variant={'outlined'} 
                                    size="lg" 
                                    className="w-full"
                                    onClick={()=> setEditMode(true)}
                                >
                                    Edit
                                </Button2>
                                {editMode && <Button2 
                                    type="submit"
                                    color={"teal"} 
                                    size="lg" 
                                    className="w-full"
                                >
                                    Save
                                </Button2>  }
  

                            </div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                            >
                                <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Information are
                                secure and encrypted
                            </Typography>
                            </form>
                        </TabPanel>
                        <TabPanel value="personalInfo" className="p-0">
                            <form 
                                className="mt-12 flex flex-col gap-4" 
                                onSubmit={handleSubmit((data)=> onSubmit(data, "type2"))}
                                // onSubmit={()=> window.alert("submitted")}
                            >
                            <div className="my-0 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Profile Details
                                    </Typography>
                                    <Typography variant="small" className="mb-1">
                                    Profile Picture *accepts PNG file only, max 100kb size
                                    </Typography>
                                    <input 
                                        {...register('employee_image')}
                                        disabled={!editMode2} 
                                        type="file" 
                                        accept=".png"  
                                        className="mb-3"
                                        onChange={e => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                const file = e.target.files[0];
                                                if (file && file.size < 100000 && (file.type).includes('png')) { // size in bytes
                                                    onFileChange(e);
                                                } else {
                                                    alert('File should be .png and less than 3MB');
                                                    e.target.value = ''; // clear the selected file
                                                } 
                                            }
                                        }} 
                                    />
                                    <div className="my-4 flex items-center gap-4">
                                    <Input
                                                crossOrigin={undefined} {...register('first_name')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="First Name:"
                                                disabled={!editMode2}
                                                icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input 
                                                crossOrigin={undefined} {...register('middle_name')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Middle Name:"
                                                disabled={!editMode2}
                                                icon={<FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                    <div className="flex items-center gap-4">
                                    <Input
                                                crossOrigin={undefined} {...register('last_name')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Last Name:"
                                                disabled={!editMode2}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                                crossOrigin={undefined} {...register('suffix')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Suffix:"
                                                disabled={!editMode2}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="my-0 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Personal Details
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                    <Input
                                                crossOrigin={undefined} {...register('birthday')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Birthday: YYYY-MM-DD"
                                                disabled={!editMode2}
                                                icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input 
                                                crossOrigin={undefined} {...register('birth_place')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Birthplace:"
                                                disabled={!editMode2}
                                                icon={<FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                    <div className="flex items-center gap-4">
                                    <Input
                                                crossOrigin={undefined} {...register('mobile_phone')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Mobile Phone:"
                                                disabled={!editMode2}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                                crossOrigin={undefined} {...register('approver')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Approver:"
                                                disabled={!editMode2}
                                                value={`${userData?.approver ? userData?.approver : ''}`}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                </div>
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Additional Details
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                    <Input
                                                crossOrigin={undefined} {...register('civil_status')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                label="Civil Status:"
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                disabled={!editMode2}                                    />
                                    <Input
                                                crossOrigin={undefined} {...register('gender')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Gender:"
                                                disabled={!editMode2}
                                                icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                    <Input
                                            crossOrigin={undefined} {...register('address')}
                                            type="text"
                                            className=""
                                            label="Present Address:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode2}                                    />
                                </div>
                            </div>
                            <div className="my-0">
                                <div className="my-0 flex flex-wrap xl:flex-nowrap items-center gap-4">
                                <Input
                                            crossOrigin={undefined} {...register('provincial_address')}
                                            label="Provincial Address:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode2}
                                            icon={<LockClosedOutline className="h-5 w-5 text-blue-gray-300" />}                                />
                                </div>
                            </div>
                            <div className="my-4 flex items-center gap-4">
                                <Button2 
                                    disabled={editMode2}
                                    color={editMode2? "gray" :"teal"} 
                                    variant={'outlined'} 
                                    size="lg" 
                                    className="w-full"
                                    onClick={()=> setEditMode2(true)}
                                >
                                    Edit
                                </Button2>
                                {true && <Button2 
                                    type="submit"
                                    color={"teal"} 
                                    size="lg" 
                                    className="w-full"
                                >
                                    Save
                                </Button2>  }
                            </div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                            >
                                <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Information are
                                secure and encrypted
                            </Typography>
                            </form>
                        </TabPanel>
                        <TabPanel value="employmentDetails" className="p-0">
                            <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit((data)=>onSubmit(data, "type3"))}>
                                <div className="my-4 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-4 font-medium"
                                    >
                                    Employment Info
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                        <Input
                                                crossOrigin={undefined} {...register('date_hired')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Date Hired:"
                                                disabled={!editMode3}
                                                // value={`${userData?.date_hired ? userData?.date_hired : ''}`}
                                                icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                        <Input
                                                crossOrigin={undefined} {...register('date_separation')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Date Separated:"
                                                disabled={!editMode3}
                                                icon={<FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Input
                                                crossOrigin={undefined} {...register('division_code')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Division Code:"
                                                disabled={!editMode3}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                        <Input
                                                crossOrigin={undefined} {...register('position_code')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Position Code:"
                                                disabled={!editMode3}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                        
                                    </div>
                                    <div className="mt-4 flex items-center gap-4">
                                        <Input
                                                crossOrigin={undefined} {...register('accnt_no')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Account Number:"
                                                disabled={!editMode3}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}                                        />       
                                    </div>

                                </div>
                                <div style={{width: "100%"}}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-4 font-medium"
                                    >
                                    Payroll Code
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                        <Input
                                                crossOrigin={undefined} {...register('city_code')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                label="City Code:"
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                disabled={!editMode3}                                        />
                                        <Input
                                                crossOrigin={undefined} {...register('branch_code')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                                label="Branch Code:"
                                                disabled={!editMode3}
                                                icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                        <Input
                                                crossOrigin={undefined} {...register('department_code')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                label="Department Code:"
                                                labelProps={{ style: { color: true ? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                                disabled={!editMode3}
                                                icon={<UserGroupIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                    </div>
                                    <div className="my-0 flex items-center gap-4">
                                        <Input
                                                crossOrigin={undefined} {...register('rank_code')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                label="Rank Code:"
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                disabled={!editMode3}                                        />
                                        <Input 
                                                crossOrigin={undefined} {...register('payroll_group_code')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                                label="Payroll Group Code:"
                                                disabled={!editMode3}
                                                icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                    </div>
                                    <div className="mt-4 flex items-center gap-4">
                                        <Input
                                                crossOrigin={undefined} {...register('emp_salary_basic')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Basic Salary Amount:"
                                                disabled={!editMode3}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                        <Input
                                                crossOrigin={undefined} {...register('emp_salary_type')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Salary Type:"
                                                disabled={!editMode3}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                        
                                    </div>
                                </div>
                                </div>
                                <div className="my-6">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                >
                                Static Info Details
                                </Typography>
                                <div className="my-4 flex flex-wrap xl:flex-nowrap items-center gap-4">
                                    <Input
                                            crossOrigin={undefined} {...register('tax_code')}
                                            label="Tax Identification #:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode3}
                                            icon={<LockClosedOutline className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                            crossOrigin={undefined} {...register('pagibig_code')}
                                            label="HDMF Pagibig:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode3}
                                            icon={<CheckCircleIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                            crossOrigin={undefined} {...register('sssid_code')}
                                            label="SSS ID:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode3}
                                            icon={<LockOpenIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                            crossOrigin={undefined} {...register('philhealth_code')}
                                            label="Philhealth #:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode3}
                                            icon={<UserPlusIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                </div>
                                </div>
                                <div className="my-4 flex items-center gap-4">
                                <Button2 
                                    disabled={editMode3}
                                    color={editMode3? "gray" :"teal"} 
                                    variant={'outlined'} 
                                    size="lg" 
                                    className="w-full"
                                    onClick={()=> setEditMode3(true)}
                                >
                                    Edit
                                </Button2>
                                {editMode3 && <Button2 
                                    type="submit"
                                    color={"teal"} 
                                    size="lg" 
                                    className="w-full"
                                >
                                    Save
                                </Button2>  }
                                </div>
                                <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                                >
                                <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Information are
                                secure and encrypted
                                </Typography>
                            </form>
                        </TabPanel>
                        </TabsBody>
                    </CardBody>
            </Tabs>
            </Card>
            
        </Fragment>

    );
};