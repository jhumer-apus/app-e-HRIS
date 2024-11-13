import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { BRANCHViewInterface, USERViewInterface } from '@/types/types-pages';
import { BRANCHViewAction } from '@/store/actions/categories';
import { INTERNAL_USER_ROLE, Internal_User_Role } from '@/types/types-store';


interface RoleAutoCompleteInterface{
    createUSER: USERViewInterface;
    setCreateUSER: Dispatch<SetStateAction<USERViewInterface>>;
}


export default function RoleAutoCompleteRight(props: RoleAutoCompleteInterface) {
    const {setCreateUSER, createUSER} = props;
    const dispatch = useDispatch();
    // const [state, setState] = useState({data: [
    //     // {
    //     //     id: INTERNAL_USER_ROLE.Developer,
    //     //     role_name: "Developer"
    //     // },
    //     {
    //         id: INTERNAL_USER_ROLE.HR_Super_Admin,
    //         role_name: "HR Super Admin"
    //     },
    //     {
    //         id: INTERNAL_USER_ROLE.HR_Director_Manager,
    //         role_name: "HR Director / Manager"
    //     },
    //     {
    //         id: INTERNAL_USER_ROLE.HR_Staff,
    //         role_name: "HR Staff"
    //     },
    //     {
    //         id: INTERNAL_USER_ROLE.Manager,
    //         role_name: "Manager"
    //     },
    //     {
    //         id: INTERNAL_USER_ROLE.Employee,
    //         role_name: "Employee"
    //     },
    // ]
    // })

    const roles = [
        {
            id: INTERNAL_USER_ROLE.HR_Super_Admin,
            role_name: "HR Super Admin"
        },
        {
            id: INTERNAL_USER_ROLE.HR_Director_Manager,
            role_name: "HR Director / Manager"
        },
        {
            id: INTERNAL_USER_ROLE.HR_Staff,
            role_name: "HR Staff"
        },
        {
            id: INTERNAL_USER_ROLE.Manager,
            role_name: "Department Manager / Director"
        },
        {
            id: INTERNAL_USER_ROLE.Employee,
            role_name: "Employee"
        },
    ]
    // const state = useSelector((state:RootState)=> state.categories.BRANCHView);
    // const [roleList, setRoleList] = useState<{role_name: string, role_id: Internal_User_Role}[]>([])
    // const [selectedRoleID, setSelectedRoleID] = useState<Internal_User_Role | null>(null);
    // useEffect(()=> {
    //     if(selectedRoleID){
    //         setCreateUSER((prevState)=> {
    //             return(
    //                 {
    //                     ...prevState,
    //                     role: selectedRoleID
    //                 }
    //             )
    //         })
    //     }
    // }, [selectedRoleID])

    // useEffect(() => {
    //     if (state.data.length > 0) {
    //         setTimeout(() => {
    //             const updatedRoleList = 
    //             state.data?.map(({ role_name, id }) => {
    //                 return {
    //                     role_name: `${role_name} - #${id}`,
    //                     role_id: id,
    //                 };
    //             }) || [];
    //             setRoleList(updatedRoleList);
    //         }, 1000);
    //     }
    // }, [state.data]);

    // const options = roleList?.map((option) => {
    //     const firstLetter = option.role_name[0].toUpperCase();
    //     return {
    //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    //     ...option,
    //     };
    // });

    // const defaultOption = options?.find((option) => option.role_id === createUSER.role)

    // const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
    //     const matchingRole = roleList.find(
    //     (roleItems) => roleItems.role_name.toLowerCase().includes(newInputValue.toLowerCase())
    //     );
    //     if (matchingRole) {
    //         setSelectedRoleID(matchingRole.role_id);
    //     } else {
    //       setSelectedRoleID(null);
    //     }
    // };

    const handleChange = (e:any, newValue:any) => {

        setCreateUSER((curr:any) => ({
            ...curr,
            role: newValue?.id
        }))
    }

    // const isOptionEqualToValue = (option: { role_name: string; role_id: number }, value: { role_name: string; role_id: number }) => {
    //     return option.role_id === value.role_id;
    // };

    const defaultValue = roles.find(role => role.id == createUSER.role);
    
    return (
        <>
        <Autocomplete
            disablePortal
            id="access-roles"
            value={defaultValue}
            options={roles.reverse()}
            getOptionLabel={(option: any) => `Role Level ${option.id} - ${option.role_name}`}
            onChange={handleChange}
            sx={{ width: '90%' }}
            renderInput={(params) => <TextField {...params} label="Access Roles" />}
        />
        {/* {defaultOption &&
            <Autocomplete
            // disableCloseOnSelect
            disableClearable
            noOptionsText={'Loading... Please Wait.'}
            defaultValue={defaultOption}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.role_name}
            onInputChange={handleInputChange}
            sx={{ width: "90%" }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="Access Role" />
                    )
    
                }
    
            }
            />
        }
        {!defaultOption &&
            <Autocomplete
            // disableCloseOnSelect
            noOptionsText={'Loading... Please Wait.'}
            // defaultValue={defaultOption}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.role_name}
            onInputChange={handleInputChange}
            sx={{ width: "90%" }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="Loading Values..." />
                    )
    
                }
    
            }
            />
        } */}
        </>
    );
}