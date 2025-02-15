import { Dispatch, MutableRefObject, SetStateAction, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getEmployeesList } from '@/store/actions/employees';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { DEPARTMENTCreateInterface, DEPARTMENTViewInterface } from '@/types/types-pages';


interface EmployeeAutoCompleteInterface{
    createDEPARTMENT: DEPARTMENTViewInterface;
    setCreateDEPARTMENT: Dispatch<SetStateAction<DEPARTMENTViewInterface>>;
}


export default function EmployeeAutoCompleteRight(props: EmployeeAutoCompleteInterface) {
    const {setCreateDEPARTMENT, createDEPARTMENT} = props;
    const state = useSelector((state:RootState)=> state.employees);
    const [employeesList, setEmployeesList] = useState<{employee: string, emp_no: number}[]>([])
    // const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

    // useEffect(()=> {
    //     if(selectedEmployeeId){
    //         setCreateDEPARTMENT((prevState)=> {
    //             return(
    //                 {
    //                     ...prevState,
    //                     dept_lead: selectedEmployeeId
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
            }, 500);
        }
    }, [state.employees_list]);

    const options = employeesList?.map((option) => {
        const firstLetter = option.employee[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });

    const defaultOption = options?.find((option) => option.emp_no === createDEPARTMENT.dept_lead) ?? null
    
    // const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
    //     const matchingEmployee = employeesList.find(
    //     (employeeItems) => employeeItems.employee.toLowerCase().includes(newInputValue.toLowerCase())
    //     );
    //     if (matchingEmployee) {
    //         setSelectedEmployeeId(matchingEmployee.emp_no);
    //     } else {
    //       setSelectedEmployeeId(null);
    //     // window.alert('No Matched Employee in the list is found. Create an employee entry first')
    //     }
    // };
    const handleChange = (e:any, value:any) => {
        if(value) {
            updateDeptLead(value?.emp_no)
        } else {
            updateDeptLead(null)
        }
    }

    const updateDeptLead = (emp_no: number | null) => {
        setCreateDEPARTMENT((prevState:any)=> {
                return(
                    {
                        ...prevState,
                        dept_lead: emp_no
                    }
                )
            })
    }
    

    const isOptionEqualToValue = (option: { employee: string; emp_no: number }, value: { employee: string; emp_no: number }) => {
        return option.emp_no === value.emp_no;
    };
    
    return (
        <>
            <Autocomplete
                // disableCloseOnSelect
                // key={createDEPARTMENT.dept_lead}
                noOptionsText={'Loading... Please Wait.'}
                options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option:any) => option.firstLetter}
                getOptionLabel={(option) => option.employee}
                value={defaultOption}
                onChange={handleChange}
                sx={{ width: "90%" }}
                isOptionEqualToValue={isOptionEqualToValue}
                renderInput={(params) => 
                    {   
                        return(
                            <TextField {...params} label="Department Lead" />
                        )

                    }

                }
                clearIcon={null}
            />
        
        </>
    );
}