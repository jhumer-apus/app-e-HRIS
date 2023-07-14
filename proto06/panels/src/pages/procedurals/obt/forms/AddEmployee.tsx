import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { Input, Typography } from '@material-tailwind/react';
// import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
// import { fetchUserData, updateUserData } from './userDataActions'; // import your actions
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { RootState } from '@/store/configureStore';
import { GetEmployeesListsType } from '@/types/types-store';


type FormData = {
  firstName: string;
  lastName: string;
  middleName: string;
  age: number;
  email: string;
  password: string;
};

export const UserProfile = () => {
    const [file, setFile] = useState<File | null>(null);
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files ? event.target.files[0] : null);
    };
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<GetEmployeesListsType>();
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.employees.specific_employee_info);
    const [editMode, setEditMode] = useState(true);
    console.log(userData, "maasd")

    // useEffect(() => {
    //     dispatch(getSpecificEmployeeInfo({employee_id: 33333}));
    // }, [dispatch]);

//   useEffect(() => {
//     // update form values when userData changes
//     for (const key in userData) {
//       setValue(key as keyof FormData, userData.employees.specific_employee_info[key]  );
//     }
//   }, [userData, setValue]);

useEffect(() => {
    // update form values when userData changes
    // if (userData) {
    //   for (const key in userData) {
    //     setValue(key as keyof FormData, userData[key]);
    //   }
    // }
  }, [userData, setValue]);

  const onSubmit = async (data: GetEmployeesListsType) => {
    const formData = new FormData();
    for (const key in data) {
        // console.log(key, "mamamiya")
        formData.append(key, data[key as keyof GetEmployeesListsType]);
    }

    // console.log("formDatazzz: ", formData);
    try {
        const response = await axios.post(
          'http://172.16.168.155:8000/api/employees/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
    
        console.log(response.data);
        setTimeout(()=>{
            location.reload();
        }, 1000)
      } catch (err) {
        console.error(err);
      }
    
      setEditMode(false);
    // dispatch(updateUserData(data));
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Add New Employee
        </Typography>   
        <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Required Information
        </Typography>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '30%'}}>
                <Input
                    {...register('date_hired', { required: true })}
                    label="Date Hired: YYYYMMDD *"
                    disabled={!editMode}
                />
                {errors.date_hired && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Date Hired is required.</sub>}
            </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                    {...register('emp_no', { required: true })}
                    label="Assigned Employee No:*"
                    disabled={!editMode}
                />
                {errors.emp_no && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Emp # is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                    {...register('approver', { required: true })}
                    label="Approver: *"
                    disabled={!editMode}
                />
                {errors.approver && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Approver # is required.</sub>}
            </div>
        </div>    
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
            <Input
                {...register('first_name', { required: true })}
                label="First Name: *"
                disabled={!editMode}
            />
            {errors.first_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>First name is required.</sub>}
            </div>

            <Input
            {...register('middle_name')}
            label="Middle Name:"
            disabled={!editMode}
            />
            <div style={{position: 'relative', width: '100%'}}>
            <Input
                {...register('last_name', { required: true })}
                label="Last Name: *"
                disabled={!editMode}
            />
            {errors.last_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Last name is required.</sub>}
            </div>
            <Input
            {...register('suffix')}
            label="Suffix:"
            disabled={!editMode}
            />
            <Input
            {...register('gender')}
            label="Gender: M/F *"
            containerProps={{ className: "min-w-[20px]" }} 
            disabled={!editMode}
            />
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                    {...register('address', { required: true })}
                    label="Address: *"
                    disabled={!editMode}
                />
                {errors.address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Address is required.</sub>}
            </div>
            <Input
            {...register('provincial_address')}
            label="Provincial Address:"
            disabled={!editMode}
            />
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                {...register('email_address', { required: true })}
                label="Email Address: *"
                disabled={!editMode}
                />
                {errors.email_address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Email is required.</sub>}
            </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                    {...register('mobile_phone', { required: true })}
                    label="Mobile Phone #: *"
                    disabled={!editMode}
                />
                {errors.email_address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Phone # is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                {...register('birthday', { required: true })}
                label="Birthday: YYYYMMDD *"
                disabled={!editMode}
                />
                {errors.email_address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Birthday is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                {...register('civil_status', { required: true })}
                label="Civil Status: S/M/W/D *"
                disabled={!editMode}
                />
                {errors.civil_status && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Civil Status is required.</sub>}
            </div>
        </div>
        <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Optional Information
        </Typography>
    {editMode ? (
        <Button variant="contained" color="primary" type="submit">
            Submit
        </Button>
        ) : (
        <Button
            variant="outlined"
            color="primary"
            onClick={() => setEditMode(true)}
        >
            Edit
        </Button>
        )}

    </form>
  );
};