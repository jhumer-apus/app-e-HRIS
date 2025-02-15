import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getEmployeesList } from '@/store/actions/employees';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { BRANCHCreateInterface } from '@/types/types-pages';


interface EmployeeAutoCompleteInterface{
    createBRANCH: BRANCHCreateInterface;
    setCreateBRANCH: Dispatch<SetStateAction<BRANCHCreateInterface>>;
    currentEmpNo: number | null
}


export default function EmployeeAutoComplete(props: EmployeeAutoCompleteInterface) {
    const {setCreateBRANCH, createBRANCH, currentEmpNo} = props;
    const state = useSelector((state:RootState)=> state.employees);
    const [employeesList, setEmployeesList] = useState<{employee: string, emp_no: number}[]>([])
    // const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

    // useEffect(()=> {
    //     if(selectedEmployeeId){
    //         setCreateBRANCH((prevState)=> {
    //             return(
    //                 {
    //                     ...prevState,
    //                     branch_oic: selectedEmployeeId
    //                 }
    //             )
    //         })
    //     }
    // }, [selectedEmployeeId])

    useEffect(() => {
        if (state.employees_list) {
            setTimeout(() => {
                const updatedEmployeesList = 
                state.employees_list?.map(({ emp_no, last_name, first_name }) => {
                    return {
                        employee: `${last_name}, ${first_name} - #${emp_no}`,
                        emp_no: emp_no,
                    };
                }) || [];
                setEmployeesList(updatedEmployeesList);
            }, 1000);
        }
    }, [state.employees_list]);

    const options = employeesList?.map((option) => {
        const firstLetter = option.employee[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    const handleChange = (e:any, value:any) => {

        if(value) {

            updateCreateBranch(value?.emp_no)

        } else {

            updateCreateBranch(null)
            
        }
    }

    const updateCreateBranch = (empNo: number | null) => {
        setCreateBRANCH((prevState:any)=> {
            return(
                {
                    ...prevState,
                    branch_oic: empNo
                }
            )
        })
    }
    // const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
    //     const matchingEmployee = employeesList.find(
    //     //   (employeeItems) => employeeItems.employee === newInputValue
    //     (employeeItems) => employeeItems.employee.toLowerCase().includes(newInputValue.toLowerCase())
    //     );
    //     if (matchingEmployee) {
    //         setSelectedEmployeeId(matchingEmployee.emp_no);
    //     } else {
    //       setSelectedEmployeeId(null);
    //     // window.alert('No Matched Employee in the list is found. Create an employee entry first')
    //     }
    // };

    const findValue = employeesList.find(emp => currentEmpNo == emp.emp_no) ?? null

    const isOptionEqualToValue = (option: { employee: string; emp_no: number }, value: { employee: string; emp_no: number }) => {
        return option.emp_no === value.emp_no;
    };
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        value={findValue}
        noOptionsText={'Loading... Please Wait.'}
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option:any) => option.firstLetter}
        getOptionLabel={(option) => option.employee}
        // onInputChange={handleInputChange}
        onChange={handleChange}
        sx={{ width: 300 }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Branch OIC" />
                )

            }

        }
        />
    );
}