import { useState, useEffect } from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';
import { Button, InputAdornment } from '@mui/material';
import { Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import { APILink, RootState, app_status } from '@/store/configureStore';
import { beautifyJSON, cleanTextNumber } from '@/helpers/utils';
import InputLabel from '@mui/material/InputLabel';

//LIBRARIES
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Icons
import {
  PlusIcon,
} from "@heroicons/react/24/solid";

// COMPONENTS
import Province from '@/public-components/forms/address/Province'
import CityMunicipality from '@/public-components/forms/address/CityMunicipality'
import { useSelector } from 'react-redux';
import { update } from 'lodash';
import useFetchQuery from '@/custom-hooks/use-fetch-query';
import axiosInstance from '@/helpers/axiosConfig';
import { useOptionData } from '@/custom-hooks/use-option-data';
// import SelectForm from '@/public-components/forms/SelectForm'


//INTERFACE
interface DropDownData {
  // branches: any[],
  // departments: any[],
  payrollGroups: any[],
  employmentStatuses: any[],
  positions: any[],
  approvers: any[],
  divisions: any[],
  ranks: any[]
}

export const UserProfile = () => {

    // const { register, handleSubmit, formState: { errors } } = useForm<EMPLOYEESViewInterface>();
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const [editMode, setEditMode] = useState(true);
    const [keyMonthlySalary, setKeyMonthlySalary] = useState<number>(0)
    const [employeeData, setEmployeeData] = useState<any>({
      civil_status: null,
      division_code:null,
      gender: null,
      payroll_group_code:null,
      employee_image: null,
      branch_code: null,
      position_code: null,
      daily_salary: null,
      monthly_salary: null,
      department_code: null,
      rank_code: null,
      approver1: null,
      permanent_province: {
        id: null,
        name: null,
        code: null
      },
      permanent_city: {
        id: null,
        name: null,
        code: null
      },
      current_province: {
        id: null,
        name: null,
        code: null
      },
      current_city: {
        id: null,
        name: null,
        code: null
      }
    })
    const [profileImage, setProfileImage] = useState<any>(null);
    const {
      sex,
      civilStatus,
      bloodTypes,
      separationType,
      roles,
      fetchPositions,
      fetchBranches,
      fetchDepartments,
      fetchRanks,
      fetchEmploymentStatus,
      fetchApprovers,
      fetchPayrollGroup,
      positions,
      branches,
      departments,
      ranks,
      employmentStatus,
      employeeType,
      approvers,
      payrollGroup

    } = useOptionData();

    // const [dropDownData, setDropDownData] = useState<DropDownData>({
    //   branches:[],
    //   departments:[],
    //   payrollGroups:[],
    //   employmentStatuses:[],
    //   positions:[],
    //   approvers:[],
    //   divisions:[],
    //   ranks:[]
    // })

    // USE EFFECTS
    useEffect(() => {
      fetchBranches()
      fetchPayrollGroup()
      fetchEmploymentStatus()
      fetchPositions()
      fetchDepartments()
      fetchRanks()
      // fetchDivision()
      // fetchUniqueEmployeeNumber()
      fetchApprovers()
    }, [])

    useEffect(() => {
      setKeyMonthlySalary(curr => curr + 1)
    },[employeeData.daily_salary])

    // useEffect(() =>  {
    //   console.log(employeeData.department_code)
    //   if(employeeData.department_code) {
    //     fetchApprovers(employeeData.department_code)
    //   }
    // },[employeeData.department_code])

    // FETCH SELECTS INFORMATION
    // const {data: ranks, status, error} = useFetchQuery(`rank/`, null)
    
    // const fetchPayrollGroups = () => {
    //   axiosInstance.get(`payrollgroup`).then((response:any) => {
    //     const responsePayrollGroups = response.data.map((payroll:any) => {
    //       return {
    //         id: payroll.id,
    //         name: payroll.name
    //       }
    //     })
    //     setDropDownData((curr:any) => ({...curr, payrollGroups: responsePayrollGroups}));
    //   })
    // }

    // const fetchBranches = () => {
    //   axiosInstance.get(`branch`).then((response:any) => {
    //     const responseBranches = response.data.map((branch:any) => {
    //       return {
    //         id: branch.id,
    //         name: branch.branch_name
    //       }
    //     })
    //     setDropDownData((curr:any) => ({...curr, branches: responseBranches}));
    //   })
    // }

    // const fetchDepartments = () => {

    //   axiosInstance.get(`department/`).then((response:any) => {
        
    //     const responseDepartments = response.data.map((department:any) => {
    //       return {
    //         id: department.id,
    //         name: department.dept_name
    //       }
    //     })
    //     setDropDownData((curr:any) => ({...curr, departments: responseDepartments}));
    //   })
    // }

    // // const fetchDepartments = (id:number) => {

    // //   axiosInstance.get(`department/`).then((response:any) => {
        
    // //     const responseDepartments = response.data
    // //     .filter((department:any) => department.dept_branch_code == id)
    // //     .map((department:any) => {
    // //       return {
    // //         id: department.id,
    // //         name: department.dept_name
    // //       }
    // //     })
    // //     setDropDownData((curr:any) => ({...curr, departments: responseDepartments}));
    // //   })
    // // }

    // const fetchEmploymentStatus = () => {
    //   axiosInstance.get(`emp_status_type/`).then((response:any) => {
    //     const responseEmploymentStatuses = response.data.map((employmentStatus:any) => {
    //       return {
    //         id: employmentStatus.id,
    //         name: employmentStatus.name
    //       }
    //     })
    //     setDropDownData((curr:any) => ({...curr, employmentStatuses: responseEmploymentStatuses}));
    //   })
    // }

    // const fetchPositions = () => {
    //   axiosInstance.get(`position/`).then((response:any) => {
    //     const responsePositions = response.data.map((position:any) => {
    //       return {
    //         id: position.id,
    //         name: position.pos_name
    //       }
    //     })

    //     setDropDownData((curr:any) => ({...curr, positions: responsePositions}));
    //   })
    // }

    // const fetchDivisions = () => {
    //   axiosInstance.get(`division/`).then((response:any) => {
    //     const responseDivisions = response.data.map((division:any) => {
    //       return {
    //         id: division.id,
    //         name: division. div_name
    //       }
    //     })
    //     setDropDownData((curr:any) => ({...curr, divisions: responseDivisions}));

    //   })
    // }

    // const fetchApprovers = () => {

    //   setDropDownData((curr:any) => ({...curr, approvers: []}));

    //   axiosInstance.get(`approvers/`).then((response:any) => {

    //     const responseApprovers = response.data.map((approver:any) => {
    //       return {
    //         emp_no: approver.emp_no,
    //         full_name: approver.full_name
    //       }
    //     })

    //     console.log(responseApprovers)

    //     setDropDownData((curr:any) => ({...curr, approvers: responseApprovers}));

    //   })
    // }

    // // const fetchApprovers = (department: number) => {
    // //   setDropDownData((curr:any) => ({...curr, approvers: []}));

    // //   axiosInstance.get(`approvers/`,{
    // //     params:{
    // //       department: department
    // //     }
    // //   }).then((response:any) => {

    // //     const responseApprovers = response.data.map((approver:any) => {
    // //       return {
    // //         emp_no: approver.emp_no,
    // //         full_name: approver.full_name
    // //       }
    // //     })

    // //     setDropDownData((curr:any) => ({...curr, approvers: responseApprovers}));

    // //   })
    // // }

  //   const fetchUniqueEmployeeNumber = async() => {
  //     await axiosInstance.get(`new_emp_no`).then((res:AxiosResponse) => {
  //             setEmployeeData((curr:any) => ({
  //                 ...curr,
  //                 emp_no: res.data.new_emp_no,
  //                 bio_id: res.data.new_emp_no
  //             }))
  //         }
  //     ).catch((err:any) => {
  //         console.log(err)
  //         window.alert(beautifyJSON(err))
  //     })
  // }

    // const fetchApprovers = () => {
    //   axiosInstance.get(`position/`).then((response:any) => {
    //     const responsePositions = response.data.map((position:any) => {
    //       return {
    //         id: position.id,
    //         name: position.pos_name
    //       }
    //     })

    //     setPositions(curr => responsePositions);
    //   })
    // }

    // const handleProfilePic = (e:any) => {
    //   const file = e.target.files[0];
    //   setEmployeeData((curr:any) => ({...curr, employee_image:file}))
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       setProfileImage(reader.result);
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // }

    const handleProfilePic = (e:any) => {

      const file = e.target.files[0];
      const MAX_FILE_SIZE_MB = 3;
  
      if (file) {
  
        if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
  
            setEmployeeData((curr:any) => ({...curr, employee_image:file}))
  
            const reader = new FileReader();
            reader.onload = () => {
              setProfileImage(reader.result);
            };
      
            reader.readAsDataURL(file);
  
        } else {
  
          window.alert('Image should be not more than 3MB');
  
        }
      }
    }

  const handleChangeUserData = (e:any) => {

    let { name, value } = e.target
    
    if(["tin", "pagibig_no", "pagibig_mp2_no", "sss_no", "philhealth_no"].includes(name)) {
      value = cleanTextNumber(value)
    }
    
    setEmployeeData((curr:any) => (
      {
        ...curr,
        [name]: value
      }
    ))
  }


  const updateAddress = (name:string, newValue:any) => {

      setEmployeeData((curr:any) => ({
          ...curr,
          [name]: newValue
      }))
    
  }

  const validateImage = (file:any) => {

      if (file instanceof File) {
          // Check the MIME type of the file
          return file.type.startsWith('image/');
      }

      // Check if the file is a string representing a data URL
      if (typeof file === 'string' && file.startsWith('data:image/')) {
        return true;
      }
      
      // Check if the file is a blob object
      if (file instanceof Blob) {
          return file.type.startsWith('image/');
      }
      
      // If none of the above conditions are met, it's not an image
      return false;

  }
  const monthlySalaryComputation = (value: number) => {
    return ((value?? 0)*313) / 12
  }

  const validateEmployeeInformation = (data:EMPLOYEESViewInterface): boolean => {

    console.log(typeof(data.approver2))
    let errors:any = {}

    !data.employee_image && (errors["Employee Image"] = "Profile picture is required")
    !data.emp_no && (errors["Employee Number"] = "Employee Number is required")
    // tax_data:
    // pagibig_data:
    // sss_data:
    // philhealth_data:

    !data.first_name && (errors["First Name"] = "First Name is required")
    // !data.middle_name && (errors["Middle Name"] = "Middle Name is required")
    !data.last_name && (errors["Last Name"] = "Last Name is required")
    !data.birthday && (errors["Birthday"] = "Birthday is required")
    !data.civil_status && (errors["Civil Status"] = "Civil Status is required")
    !data.gender && (errors["Gender"] = "Gender is required")
    !data.current_address && (errors["Current Street Address"] = "Current Street Address is required")
    !data.permanent_address && (errors["Permanent Street Address"] = "Permanent Street Address is required")
    // !data.mobile_phone && (errors["Mobile Phone"] = "Mobile Phone is required")
    !data.email_address && (errors["Email Address"] = "Email Address is required")
    !data.bio_id && (errors["Bio ID"] = "Bio ID is required")
    // !data.emergency_contact_person && (errors["Emergency Conact Person"] = "Emergency Contact Person is required")
    // !data.emergency_contact_number && (errors["Emergency Contact Number"] = "Emergency Contact Number is required")
    // !data.hmo && (errors["HMO"] = "Employee Number is required")
    !data.payroll_no && (errors["Payroll Number"] = "Payroll Number is required")
    !data.date_hired && (errors["Date Hired"] = "Date Hired is required")
    // !data.accnt_no && (errors["Account Number"] = "Account Number is required")
    !data.emp_salary_basic && (errors["Daily Salary"] = "Daily Salary is required")
    // !data.emp_salary_type && (errors["Daily Salary"] = "Employee Number is required")
    !data.approver1 && (errors["Approver 1"] = "Approver 1 is required")
    !data.current_province_code && (errors["Current Province"] = "Current Province is required")
    !data.current_city_code && (errors["Current City"] = "Current City is required")
    !data.permanent_province_code && (errors["Permanent Province"] = "Permanent Province is required")
    !data.permanent_city_code && (errors["Permanent City"] = "Permanent City is required")
    !data.branch_code && (errors["Branch"] = "Branch is required")
    !data.department_code && (errors["Department"] = "Department is required")
    // !data.division_code && (errors["Division"] = "Division is required")
    !data.position_code && (errors["Position"] = "Position is required")
    !data.rank_code && (errors["Rank"] = "Rank is required")
    !data.payroll_group_code && (errors["Payroll Group"] = "Payroll Group is required")
    !data.employment_status && (errors["Employment Status"] = "Employment Status is required")
    !data.employee_type && (errors["Employee Type"] = "Employee Type is required")

    if(Object.keys(errors).length > 0) {
      window.alert(beautifyJSON(errors))
      return true
    }
    return false
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    // Validate image if its file
    const isFile = validateImage(employeeData.employee_image)

    if(!employeeData?.employee_image) {

      window.alert("Profile Picture is required")
      return

    } else if(!isFile) {

      window.alert("Profile Picture should be image")
      return
    }

    const formData = new FormData();

    const finalData: any = {
      // user: USERViewInterface | null
      employee_image: employeeData.employee_image,
      age: employeeData.age,
      // tax_data:
      // pagibig_data:
      // sss_data:
      // philhealth_data:
      emp_no: employeeData.emp_no ?? "",
      first_name: employeeData.first_name ?? "",
      middle_name: employeeData.middle_name ?? "",
      last_name: employeeData.last_name ?? "",
      suffix: employeeData.suffix?? "",
      birthday: employeeData.birthday,
      birth_place: employeeData.birth_place ?? "",
      civil_status: employeeData.civil_status ?? "",
      gender: employeeData.gender ?? "",
      address: employeeData.address ?? "",
      mobile_phone: employeeData.mobile_phone ? `0${employeeData.mobile_phone}`: "",
      email_address: employeeData.email_address ?? "",
      bio_id: employeeData.bio_id ?? "",
      telephone: employeeData.telephone ?? "",
      blood_type: employeeData.blood_type ?? "",
      graduated_school: employeeData.graduated_school ?? "",
      profession: employeeData.profession ?? "",
      license_no: employeeData.license_no ?? "",
      emergency_contact_person: employeeData.emergency_contact_person ?? "",
      emergency_contact_number: employeeData.emergency_contact_number ? `0${employeeData.emergency_contact_number}`: "",
      hmo: employeeData.hmo ?? "",
      other_duties_responsibilities: employeeData.other_duties_responsibilities ?? "",
      payroll_no: employeeData.payroll_no ?? "",
      date_hired: employeeData.date_hired ?? "",
      // date_separation: employeeData.date_separation,
      accnt_no: employeeData.accnt_no ?? "",
      emp_salary_basic: employeeData.emp_salary_basic ?? "",
      emp_salary_type: "5",
      insurance_life: employeeData.insurance_life ?? 0,
      other_deductible: employeeData.other_deductible?? 0,
      ecola: employeeData.ecola ?? 0,
      approver1: employeeData.approver1,
      approver2: employeeData.approver2?? null,
      current_province_code: employeeData.current_province?.id?? "",
      current_city_code: employeeData.current_city?.id ?? "",
      permanent_province_code: employeeData.permanent_province?.id?? "",
      permanent_city_code: employeeData.permanent_city?.id ?? "",
      branch_code: employeeData.branch_code ?? "",
      department_code: employeeData.department_code ?? "",
      division_code: employeeData.division_code ?? "",
      position_code: employeeData.position_code ?? "",
      rank_code: employeeData.rank_code ?? "",
      payroll_group_code: employeeData.payroll_group_code ?? "",
      employment_status: employeeData.employment_status ?? "",
      employee_type: employeeData.employee_type ?? "",
      url_google_map: employeeData.url_google_map ?? "",
      tin: employeeData?.tin ?? "",
      pagibig_no: employeeData?.pagibig_no ?? "",
      sss_no: employeeData?.sss_no ?? "",
      philhealth_no: employeeData?.philhealth_no ?? "",
      pagibig_mp2_no: employeeData?.pagibig_mp2_no ?? "",
      pagibig_mp2_amount: employeeData?.pagibig_mp2_amount ?? "",
      added_by: currUser?.emp_no,
      // rank_hierarchy: 0,
      // user: null,
      // tax_data: null,
      // pagibig_data: null,
      // sss_data: null,
      // philhealth_data: null,
      permanent_address: employeeData.permanent_address,
      current_address: employeeData.current_address,
      // date_separation: null,
      // date_added: '',
      // tax_code: null,
      // pagibig_code: null,
      // sssid_code: '',
      // philhealth_code: null
    }
    // data = {
    //   ...data,
    //   ...employeeData
    // }


    if(validateEmployeeInformation(finalData)) { //Validate requirements
      return
    }

    console.log(finalData)

    for (const key in finalData) {
        
        formData.append(key, finalData[key as keyof EMPLOYEESViewInterface]);
    }
      const response = await axiosInstance.post(
        `employees/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }

      ).then(response => {

        window.alert(`${response.status >= 200 && response.status < 300 && 'Request Successful'}`)
        setTimeout(()=>{
            location.reload();
        }, 800)

      }).catch(err => {

        console.error(err);
        window.alert(`${beautifyJSON(err.response?.data)}`)
        setEditMode(true);

      });
  };

  const initialEmployeeNumber = `${branches.data.find(branch => branch.value == employeeData.branch_code)?.start ?? "0"}-${employeeData?.department_code?? "0"}00${dayjs(employeeData?.date_hired)?.format("YY")??"00"}`

  console.log(employeeData?.emp_no)
  //STATIC
  const appStatus = app_status?? "production"

  return (
    <form onSubmit={handleSubmit}>

        <Typography
            variant="h4"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Personal Information
        </Typography>   
        {/* <Typography
            variant="small"
            color="black"
            className="mb-4 font-medium italic"
        >
            Required Information
        </Typography> */}
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <div>
            <label 
              htmlFor="fileInput" 
              className="w-24 h-24 m-auto rounded-full border border-4 border-slate-900 cursor-pointer flex items-center justify-center"
              style={{ backgroundImage: `url(${profileImage})`, backgroundSize: 'cover' }}
            >
              <div className='w-fit h-fit rounded-full p-2'>
                {!profileImage && <PlusIcon className="h-12 text-gray-500" />}
              </div>
            </label>
            <input 
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleProfilePic}
              accept="image/jpeg, image/jpg, image/png, image/webp"
              name="employee_image"
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-4 font-medium"
            >
            Upload Profile Picture (required)
        </Typography>  
          </div>
        </div>

        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
            <InputLabel htmlFor="firstname">First Name: (required)</InputLabel>
            <OutlinedInput
              id="firstname"
              label="First Name: (required)"
              onChange={handleChangeUserData}
              name="first_name"
              required
                          
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="middlename">Middle Name: (optional)</InputLabel>
            <OutlinedInput
              id="middlename"
              onChange={handleChangeUserData}
              name="middle_name"
              label="Middle Name: (optional)"      
            />
          </FormControl>

          <FormControl className='w-full'>

            <InputLabel htmlFor="lastname">Last Name: (required)</InputLabel>
            <OutlinedInput
              id="lastname"
              className='w-full'
              onChange={handleChangeUserData}
              name="last_name"
              label="Last Name: (required)"               
              required
            />
          </FormControl>

          <FormControl className='w-full'>
            <InputLabel htmlFor="suffix">Suffix: (optional)</InputLabel>
            <OutlinedInput
              id="suffix"
              className='w-full'  
              onChange={handleChangeUserData}
              name="suffix"
              label="Suffix: (optional)"
                     
            />
          </FormControl>

          <FormControl className='w-full'>
            <InputLabel htmlFor="sex">Sex: (required)</InputLabel>
            <Select
              onChange={(e:any) => setEmployeeData((curr:any) => ({
                ...curr,
                gender: e.target.value
              }))}
              placeholder="Select Sex"
              name="gender"
              variant="outlined"
              label="Sex: (required)"
              aria-required
              required
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </Select>
          </FormControl>
        </div>
        <hr className='h-8'></hr>
        <div>
          <Typography variant="p" color="gray" className="font-bold text-base">
            Permanent Address:
          </Typography>
          <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <Province 
              updateAddress={updateAddress}
              name='permanent_province'
            />
            <CityMunicipality
              updateAddress={updateAddress}
              currentProvinceCode={employeeData.permanent_province.code}
              name='permanent_city'
            />
            <FormControl className='w-full'>
              <InputLabel htmlFor="permanent_address">Permanent Street Address: (required)</InputLabel>
              <OutlinedInput
                id="permanent_address"
                className='w-full'
                onChange={handleChangeUserData}
                name="permanent_address"
                label="Permanent Street Address: (required)"
                    
                required            
              />
            </FormControl>
          </div>
        </div>
        <div>
          <div>
            <Typography variant="p" color="gray" className="font-bold text-base">
              Current Address:
            </Typography>
          </div>
          <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <Province 
              updateAddress={updateAddress}
              name='current_province'
            />
            <CityMunicipality
              updateAddress={updateAddress}
              currentProvinceCode={employeeData.current_province.code}
              name='current_city'
            />
            <FormControl className='w-full'>
              <InputLabel htmlFor="current_address">Current Street Address: (required)</InputLabel>
              <OutlinedInput
                id="current_address"
                className='w-full'
                onChange={handleChangeUserData}
                name="current_address"
                label="Current Street Address: (required)"
                    
                required            
              />
            </FormControl>
          </div>
        </div>
        <hr className='h-8'></hr>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          {/* <Province 
            setState={setEmployeeData}
          />
          <CityMunicipality
            state={employeeData}
            setState={setEmployeeData}
          /> */}

          {/* <FormControl className='w-full'>
              <InputLabel htmlFor="address">Street Address: (required)</InputLabel>
              <OutlinedInput
                id="address"
                className='w-full'
                onChange={handleChangeUserData}
                name="address"
                label="Street Address: (required)"
                    
                required            
              />
          </FormControl> */}

          <FormControl className='w-full'>
              <InputLabel htmlFor="email_address">Email Address: (required)</InputLabel>
              <OutlinedInput
                id="email_address"
                onChange={handleChangeUserData}
                className='w-full'
                inputProps={{
                
                }}
                name="email_address"
                label="Email Address: (required"
                required     
              />
          </FormControl>
          <FormControl className='w-full'>
              <InputLabel htmlFor="url_google_map">URL Google Map: (optional)</InputLabel>
              <OutlinedInput
                id="url_google_map"
                className='w-full'
                onChange={handleChangeUserData}
                name="url_google_map"
                label="URL Google Map: (optional)"
                             
              />

          </FormControl>
        </div>

        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
              <InputLabel htmlFor="mobile_phone">Mobile Phone #:* (required, 9123456789)</InputLabel>
              <OutlinedInput
                id="mobile_phone"
                className='w-full'
                onChange={handleChangeUserData}
                name="mobile_phone"
                label="Mobile Phone #:* (required, 09123456789)"
                startAdornment={(
                  <InputAdornment position="start">
                      +63
                  </InputAdornment>
              )}
                inputProps={{
                  maxLength:10,
                  minLength:10
                }}        
              />
          </FormControl>
          <FormControl className='w-full'>
              <InputLabel htmlFor="telephone">Telephone #: (optional)</InputLabel>
              <OutlinedInput
                id="telephone"
                className='w-full'
                onChange={handleChangeUserData}
                name="telephone"
                label="Telephone #: (optional)"
                inputProps={{
                  maxLength:15,
                  minLength:11,
                  pattern: '^[0-9]+$'
                }}
                type='text'
                        
   
              />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="emergency_contact_person">Emergency Contact Person: (optional)</InputLabel>
            <OutlinedInput
              id="emergency_contact_person"
              className='w-full'
              onChange={handleChangeUserData}
              name="emergency_contact_person"
              label="Emergency Contact Person: (optional)"
              type='text'         
            />
          </FormControl>
          <FormControl className='w-full'>
              <InputLabel htmlFor="emergency_contact_number">Emergency Contact #: (optional)</InputLabel>
              <OutlinedInput
                id="emergency_contact_number"
                className='w-full'
                onChange={handleChangeUserData}
                name="emergency_contact_number"
                label="Emergency Contact #: (optional)"
                inputProps={{
                  maxLength:10,
                  minLength:10,
                  pattern: '^[0-9]+$'
                }}
                startAdornment={(
                  <InputAdornment position="start">
                      +63
                  </InputAdornment>
                )}
                type='tel'                               
              />
          </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
              <InputLabel htmlFor="civil_status">Civil Status: (required)</InputLabel>
              <Select
                  onChange={(e:any) => setEmployeeData((curr:any) => ({...curr, civil_status: e.target.value}))}
                  placeholder="Select Civil Status"
                  name="civil_status"
                  variant="outlined"
                  label="Civil Status: (required)"
                  required
                >
                  <MenuItem value="S">Single</MenuItem>
                  <MenuItem value="M">Married</MenuItem>
                  <MenuItem value="A">Annulled</MenuItem>
                  <MenuItem value="W">Widowed</MenuItem>
              </Select>
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="blood_type">Blood Type: (optional)</InputLabel>
            <Select
              onChange={(e:any) => setEmployeeData((curr:any) => ({
                ...curr,
                blood_type: e.target.value
              }))}
              placeholder="Select Blood Type"
              name="blood_type"
              variant="outlined"
              label="Blood Type: (optional)"
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl className='w-full'>
            <InputLabel htmlFor="blood_type">Blood Type: (optional)</InputLabel>
            <OutlinedInput
              id="blood_type"
              className='w-full'
              onChange={handleChangeUserData}
              name="blood_type"
              label="Blood Type: (optional)"
              type='string'
                       
            />
          </FormControl> */}
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birthday: (required)"
                name="birthday"
                onChange={(newValue) => setEmployeeData((curr:any) => ({
                  ...curr,
                  birthday: dayjs(newValue as Date).format('YYYY-MM-DD')
                }))}
              />
            </LocalizationProvider>
            {/* <OutlinedInput 
              id="birthday"
              className='w-full'
              onChange={handleChangeUserData}
              name="birthday"
              label="Birthday: (required)"
              type='date'
                  
              required          
            /> */}
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="birth_place">Birth Place: (optional)</InputLabel>
            <OutlinedInput
              id="birth_place"
              className='w-full'
              onChange={handleChangeUserData}
              name="birth_place"
              label="Birth Place: (optional)"
              type='text'
          />
          </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
            <InputLabel htmlFor="graduated_school">School Graduated: (optional)</InputLabel>
            <OutlinedInput
              id="graduated_school"
              className='w-full'
              onChange={handleChangeUserData}
              name="graduated_school"
              label="School Graduated: (optional)"
              type='text'
                        
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="profession">Profession: (optional)</InputLabel>
            <OutlinedInput
              id="profession"
              className='w-full'
              onChange={handleChangeUserData}
              name="profession"
              label="Profession: (optional)"
              type='text'           
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="license_no">License #: (optional)</InputLabel>
            <OutlinedInput
              id="license_no"
              className='w-full'
              onChange={handleChangeUserData}
              name="license_no"
              label="License #: (optional)"
              type='text'
                        
            />
          </FormControl>
        </div>

        {/* sss,pagibig, tax, philhealth */}
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <div style={{position: 'relative', width: '100%'}}>
            <FormControl className='w-full'>
              <InputLabel htmlFor="tin">TIN:</InputLabel>
              <OutlinedInput
                id="tin"
                label="TIN:"
                type='text'
                name="tin"
                onChange={handleChangeUserData}
                inputProps={{
                  minLength:9,
                  maxLength:12
                }}
              />
            </FormControl>

            {/* {errors.tin && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Tax # is required.</sub>} */}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <FormControl className='w-full'>
              <InputLabel htmlFor="pagibig_no">Pagibig No:</InputLabel>
              <OutlinedInput
                label="Pagibig No:"
                type='text'
                name="pagibig_no"
                onChange={handleChangeUserData}
                inputProps={{
                  minLength:12,
                  maxLength:12
                }}
              />
            </FormControl>
            {/* {errors.pagibig_no && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Pagibig ID is required.</sub>} */}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <FormControl className='w-full'>
              <InputLabel htmlFor="pagibig_mp2_no">Pagibig MP2 No:</InputLabel>
              <OutlinedInput
                label="Pagibig MP2 No:"
                type='text'
                name="pagibig_mp2_no"
                onChange={handleChangeUserData}
                inputProps={{
                  minLength:12,
                  maxLength:12
                }}
              />
            </FormControl>
            {/* {errors.pagibig_no && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Pagibig ID is required.</sub>} */}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <FormControl className='w-full'>
              <InputLabel htmlFor="pagibig_mp2_amount">Pagibig MP2 Amount:</InputLabel>
              <OutlinedInput
                label="Pagibig MP2 Amount:"
                type='number'
                name="pagibig_mp2_amount"
                onChange={handleChangeUserData}
                inputProps={{
                  steps:"0.01",
                  min:500
                }}
                startAdornment={(
                  <InputAdornment position="start">
                      ₱
                  </InputAdornment>
              )}
              />
            </FormControl>
            {/* {errors.pagibig_no && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Pagibig ID is required.</sub>} */}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <FormControl className='w-full'>
              <InputLabel htmlFor="sss_no">SSS No:</InputLabel>
              <OutlinedInput
                label="SSS No:"
                type='text'
                name="sss_no"
                onChange={handleChangeUserData}
                inputProps={{
                  minLength:10,
                  maxLength:10
                }}
              />
            </FormControl>
            {/* {errors.sssid_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>SSS ID is required.</sub>} */}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <FormControl className='w-full'>
              <InputLabel htmlFor="philhealth_no">Philhealth No:</InputLabel>
              <OutlinedInput
                label="Philhealth No:"
                type='text'
                name="philhealth_no"
                onChange={handleChangeUserData}
                inputProps={{
                  minLength:12,
                  maxLength:12
                }}
              />
            </FormControl>
            {/* {errors.philhealth_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Philhealth ID is required.</sub>} */}
          </div>
        </div>




        <Typography
            variant="h4"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Employee Information
        </Typography>   
        {/* <Typography
            variant="small"
            color="black"
            className="mb-4 font-medium italic"
        >
            Required Information
        </Typography> */}


        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <FormControl className='w-full'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Hired: (required)"
                  className='md:w-56'
                  name="date_hired"
                  onChange={(newValue) => setEmployeeData((curr:any) => ({
                    ...curr,
                    date_hired: dayjs(newValue as Date).format('YYYY-MM-DD')
                  }))}
                />
              </LocalizationProvider>
            </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            {/* {employeeData.emp_no && (
              <div className='w-full flex md:flex-row flex-col gap-4'>
                <FormControl className='w-full'>
                  <InputLabel htmlFor="emp_no">Assigned employee No:* (max 7 digits)</InputLabel>
                  <OutlinedInput
                    id="emp_no"
                    className='w-full'
                    onChange={handleChangeUserData}
                    name="emp_no"
                    label="Assigned Employee No:* (max 7 digits)"
                    value={employeeData.emp_no}
                    // defaultValue={employeeData.emp_no}
                    inputProps={{
                      maxLength: 7
                    }}      
                    required
                  />
                </FormControl>
                <FormControl className='w-full'>
                  <InputLabel htmlFor="bio_id">Biometrics ID:* (can be same as emp_no)</InputLabel>
                  <OutlinedInput
                    id="bio_id"
                    className='w-full'
                    defaultValue={employeeData.emp_no}
                    onChange={handleChangeUserData}
                    name="bio_id"
                    label="Biometrics ID:* (can be same as emp_no)"  
                    inputProps={{
                      maxLength: 7
                    }}            
                    required           
                  />
                </FormControl>
              </div> 
            )} */}
              <FormControl className='w-full'>
                  <InputLabel htmlFor="company">Company: (required)</InputLabel>
                  <Select
                    onChange={(e:any) => setEmployeeData((curr:any) => ({
                      ...curr,
                      branch_code: e.target.value
                    }))}
                    placeholder="Select Company"
                    name="branch_code"
                    variant="outlined"
                    label="Company: (required)"
                    required
                  >
                    {branches.data.map((branch:any)=> (
                      <MenuItem value={branch?.value}>{branch?.label}</MenuItem>
                    ))}
                  </Select>
              </FormControl>
              <FormControl className='w-full'>
                  <InputLabel htmlFor="department">Department: (required)</InputLabel>
                  <Select
                    onChange={(e:any) => setEmployeeData((curr:any) => ({
                      ...curr,
                      department_code: e.target.value
                    }))}
                    placeholder="Select Department"
                    name="department_code"
                    variant="outlined"
                    label="Department: (required)"
                    required
                  >
                    {departments.data.map((department:any)=> (
                      <MenuItem value={department?.value}>{department?.label}</MenuItem>
                    ))}
                  </Select>
              </FormControl>
              <FormControl className='w-full'>
                <InputLabel htmlFor="emp_no">Assigned employee No:* (max 3 digits)</InputLabel>
                <OutlinedInput
                  id="emp_no"
                  className='w-full'
                  onChange={handleChangeUserData}
                  name="emp_no"
                  label="Assigned Employee No:* (max 3 digits)"
                  startAdornment={(
                    <InputAdornment position="start">
                        {initialEmployeeNumber}
                    </InputAdornment>
                  )}
                  // value={employeeData.emp_no?? ""}
                  disabled={!employeeData?.branch_code || !employeeData.department_code}
                  // defaultValue={employeeData.emp_no}
                  inputProps={{
                    maxLength: 3
                  }}      
                  required
                />
              </FormControl>
              <FormControl className='w-full'>
                  <InputLabel htmlFor="bio_id">Biometrics ID:* (can be same as emp_no)</InputLabel>
                  <OutlinedInput
                    id="bio_id"
                    className='w-full'
                    value={employeeData.bio_id?? ""}
                    // defaultValue={employeeData.emp_no}
                    onChange={handleChangeUserData}
                    name="bio_id"
                    label="Biometrics ID:* (can be same as emp_no)"  
                    inputProps={{
                      maxLength: 7
                    }}            
                    required           
                  />
                </FormControl>
              <FormControl className='w-full'>
              <InputLabel htmlFor="rank">Rank: (required)</InputLabel>
              <Select
                key={ranks && ranks.data.length> 0? "ranks": "noRanks"}
                onChange={(e:any) => setEmployeeData((curr:any) => ({
                  ...curr,
                  rank_code: e.target.value
                }))}
                placeholder="Rank: (required)"
                name="rank_code"
                variant="outlined"
                label="Rank: (required)"
                required
            >   
              {ranks && ranks.data.map((rank:any) => (
                <MenuItem value={rank.value}>{rank.label}</MenuItem>
              ))}
                {/* <MenuItem value="1">Announcer</MenuItem> */}
                {/* {appStatus == "development" && <MenuItem value="7">Development</MenuItem>} */}
              </Select>
            </FormControl>
        </div>    
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <FormControl className='w-full'>
              <InputLabel htmlFor="accnt_no">Account number: (optional, Bank acct / Gcash acct)</InputLabel>
              <OutlinedInput
                id="accnt_no"
                className='w-full'
                onChange={handleChangeUserData}
                name="accnt_no"
                label="Account number: (optional, Bank acct / Gcash acct)"   
              />
            </FormControl>
            {/* <FormControl className='w-full'>
              <InputLabel htmlFor="emp_salary_basic">Basic Salary Amount:</InputLabel>
              <OutlinedInput
                id="emp_salary_basic"
                className='w-full'
                onChange={handleChangeUserData}
                name="emp_salary_basic"
                label="Basic Salary Amount:"
                inputProps={{
                  min:0,
                  type:"number"
                }}
                     
                required           
              />
            </FormControl> */}
            <FormControl className='w-full'>
              <InputLabel htmlFor="daily_salary">Daily Salary: (required)</InputLabel>
              <OutlinedInput
                id="daily_salary"
                className='w-full'
                onChange={handleChangeUserData}
                name="emp_salary_basic"
                label="Daily Salary: (required)"
                inputProps={{
                  min:0,
                  type:"number",
                  steps:"0.01"
                }}
                startAdornment={(
                  <InputAdornment position="start">
                      
                    ₱
                  </InputAdornment>
                )}
                     
                required           
              />
            </FormControl>
            <FormControl className='w-full'>
              <InputLabel htmlFor="monthly_salary">Monthly Salary: (For Viewing Only)</InputLabel>
              <OutlinedInput
                // key={keyMonthlySalary}
                id="monthly_salary"
                className='w-full'
                onChange={handleChangeUserData}
                name="monthly_salary"
                label="Monthly Salary: (For Viewing Only)"
                inputProps={{
                  min:0,
                  type:"number",
                  readOnly: true,
                  // step:"0.01"
                }}
                startAdornment={(
                  <InputAdornment position="start">
                      
                    ₱
                  </InputAdornment>
                )}
                value={monthlySalaryComputation(employeeData.emp_salary_basic ?? 0)}          
              />
            </FormControl>
            {/* <FormControl className='w-full'>
              <InputLabel htmlFor="salary_type">Salary Type:</InputLabel>
              <Select
                  onChange={(e:any) => setEmployeeData(curr => ({
                    ...curr,
                    emp_salary_type: e.target.value
                  }))}
                  placeholder="Select Salary Type"
                  name="emp_salary_type"
                  variant="outlined"
                  label="Salary Type:"
              >
                  <MenuItem value="1">Monthly</MenuItem>
                  <MenuItem value="2">Semi-Monthly</MenuItem>
                  <MenuItem value="3">Project-Based</MenuItem>
                  <MenuItem value="4">Weekly</MenuItem>
              </Select>
            </FormControl> */}
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <FormControl className='w-full'>
              <InputLabel htmlFor="payroll_group">Payroll Group: (required)</InputLabel>
              <Select
                  onChange={(e:any) => setEmployeeData((curr:any) => ({...curr, payroll_group_code: e.target.value}))}
                  placeholder="Select Payroll Group"
                  name="payroll_group_code"
                  variant="outlined"
                  label="Payroll Group: (required)"
                  required
                >
                  {
                    payrollGroup.data.length > 0 ? payrollGroup.data.map((payroll:any) => (
                      <MenuItem value={payroll.id}>{payroll.name}</MenuItem>
                    ))
                    : <MenuItem disabled>No payrolls available</MenuItem>
                  }
              </Select>
            </FormControl>
            {/* <FormControl className='w-full'>
                <InputLabel htmlFor="branch">Branch: (required)</InputLabel>
                <Select
                  onChange={(e:any) => setEmployeeData((curr:any) => ({
                    ...curr,
                    branch_code: e.target.value
                  }))}
                  placeholder="Select Branch"
                  name="branch_code"
                  variant="outlined"
                  label="Branch: (required)"
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {branches.data.length > 0 ? branches.data.map((branch:any)=> (
                    <MenuItem value={branch.value}>{branch.label}</MenuItem>
                  )): (
                    <MenuItem disabled>No branch available</MenuItem>
                  )}
                </Select>
            </FormControl> */}
            {/* <FormControl className='w-full'>
              <InputLabel htmlFor="department">Department: (required)</InputLabel>
              <Select
                onChange={(e:any) => 
                  {
                    
                    // fetchApprovers(e.target.value)
                    setEmployeeData((curr:any) => 
                    (
                      {
                        ...curr,
                        department_code: e.target.value
                      }
                    )
                  )}
                }
                placeholder="Select Department"
                name="department_code"
                variant="outlined"
                label="Department: (required)"
                required
              >
                {departments.data.length > 0 ? departments.data.map((department:any)=> (
                  <MenuItem value={department.value}>{department.label}</MenuItem>
                )): (
                  <MenuItem disabled>No department available</MenuItem>
                )}
              </Select>
            </FormControl> */}
            {/* <FormControl className='w-full'>
              <InputLabel htmlFor="division">Division:</InputLabel>
              <Select
                onChange={(e:any) => 
                  {
                    setEmployeeData(curr => 
                    (
                      {
                        ...curr,
                        division_code: e.target.value
                      }
                    )
                  )}
                }
                placeholder="Select Division"
                name="division_code"
                variant="outlined"
                label="Division:"
              >
                {dropDownData.divisions.length > 0 ? dropDownData.divisions.map((division:any)=> (
                  <MenuItem value={division.id}>{division.name}</MenuItem>
                )): (
                  <MenuItem disabled>No division available</MenuItem>
                )}
              </Select>
            </FormControl> */}
        </div>

        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
            <InputLabel htmlFor="hmo">HMO Account #: (optional)</InputLabel>
            <OutlinedInput
              id="hmo"
              className='w-full'
              onChange={handleChangeUserData}
              name="hmo"
              label="HMO Account #: (optional)"
              type='text'           
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="payroll_no">Payroll #: (required)</InputLabel>
            <OutlinedInput
              id="payroll_no"
              className='w-full'
              onChange={handleChangeUserData}
              name="payroll_no"
              label="Payroll #: (required)"
              
              type='text'         
              required       
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="employee_type">Employee Type: (required)</InputLabel>
            <Select
                onChange={(e:any) => setEmployeeData((curr:any) => ({...curr, employee_type: e.target.value}))}
                placeholder="Select Employee Type"
                name="employee_type"
                variant="outlined"
                label="Employee Type: (required)"
                required
              >
                <MenuItem value="Compressed">Compressed</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Field-Auto">Field-Auto</MenuItem>
                <MenuItem value="Field">Field</MenuItem>
            </Select>
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="employment_status">Employment Status: (required)</InputLabel>
            <Select
                onChange={(e:any) => setEmployeeData((curr:any) => ({...curr, employment_status: e.target.value}))}
                placeholder="Select Employment Status"
                name="employment_status"
                variant="outlined"
                label="Employment status: (required)"
                required
              >
                {employmentStatus.data.map((empStat:any) => (
                  <MenuItem value={empStat.value}>{empStat.label}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
            <InputLabel htmlFor="odr">Other Duty and Responsibilities: (optional)</InputLabel>
            <OutlinedInput
              id="odr"
              className='w-full'
              onChange={handleChangeUserData}
              name="other_duties_responsibilities"
              label="Other Duty and Responsibilities: (optional)"
              type='text'              
            />
            {/* {errors.other_duties_responsibilities && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Other Duty and Responsibilities is required.</sub>} */}
          </FormControl>

          <FormControl className='w-full'>
              <InputLabel htmlFor="od">Other Deductible (optional):</InputLabel>
              <OutlinedInput
                id="od"
                className='w-full'
                onChange={handleChangeUserData}
                name="other_deductible"
                label="Other Deductible (optional):"
                
                inputProps={{
                  min:"0",
                  step:"0.01" ,
                  type:'number'
                }}

                startAdornment={(
                  <InputAdornment position="start">
                    ₱
                  </InputAdornment>
                )}
              />
            </FormControl>
        </div>
        <Typography
            variant="small"
            color="gray"
            className="mb-4 font-medium italic"
        >
        </Typography>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <FormControl className='w-full'>
              <InputLabel htmlFor="approver1">Approver #1 (required, employee number)</InputLabel>
              <Select
                onChange={(e:any) => setEmployeeData((curr:any) => ({
                  ...curr,
                  approver1: e.target.value
                }))}
                placeholder="Select Approver 1"
                name="approver1"
                variant="outlined"
                label="Approver #1 (required, employee number)"
                required
              >
                {approvers.data.length > 0 ? approvers.data.map((approver:any)=> (
                  <MenuItem value={approver.id}>{approver.name}</MenuItem>
                  )): (
                  <MenuItem disabled>No Approvers available on the selected department</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl className='w-full'>
              <InputLabel htmlFor="approver2">Approver #2 (optional, employee number)</InputLabel>
              <Select
                onChange={(e:any) => setEmployeeData((curr:any) => ({
                  ...curr,
                  approver2: e.target.value
                }))}
                placeholder="Select Approver 2"
                name="approver2"
                variant="outlined"
                label="Approver #2 (optional, employee number)"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {approvers.data.length > 0 ? approvers.data.map((approver:any)=> 
                  (
                    // ![employeeData.approver1, employeeData.approver2].includes(approver.emp_no) && <MenuItem value={approver.emp_no}>{approver.full_name}</MenuItem>
                    <MenuItem value={approver.id}>{approver.name}</MenuItem>
                  )): (
                  <MenuItem disabled>No Approvers available on the selected department</MenuItem>
                  )
                }
              </Select>
            </FormControl>
        </div> 
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
              <InputLabel htmlFor="position">Position: (required)</InputLabel>
              <Select
                onChange={(e:any) => setEmployeeData((curr:any) => ({
                  ...curr,
                  position_code: e.target.value
                }))}
                placeholder="Select Position"
                name="position_code"
                variant="outlined"
                label="Position: (required)"
                required
              >
                {positions.data.length > 0 ? positions.data.map((pos:any)=> (
                  <MenuItem value={pos.value}>{pos.label}</MenuItem>
                )): (
                  <MenuItem disabled>No positions available</MenuItem>
                )}
            </Select>
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="insurance_life">Insurance Life: (optional)</InputLabel>
            <OutlinedInput
              id="insurance_life"
              className='w-full'
              onChange={handleChangeUserData}
              name="insurance_life"
              inputProps={{
                step:"0.01",
                min:"0",
              }}
              label="Insurance Life: (optional)"
              type="number"
              startAdornment={(
                <InputAdornment position="start">
                  ₱
                </InputAdornment>
              )}
                           
            />
          </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
              <InputLabel htmlFor="ecola">Ecola: (optional)</InputLabel>
              <OutlinedInput
                id="ecola"
                className='w-full'
                onChange={handleChangeUserData}
                name="ecola"
                label="Ecola: (optional)"
                type="number"
                inputProps={{
                  step:"0.01",
                  min:"0"
                }}
                startAdornment={(
                  <InputAdornment position="start"> 
                    ₱
                  </InputAdornment>
                )}
                              
              />
          </FormControl>
        </div> 
        
        <Button variant="contained" color="primary" type="submit">
            Submit
        </Button>
    </form>
  );
};