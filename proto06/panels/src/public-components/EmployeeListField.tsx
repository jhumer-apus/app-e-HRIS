import { APILink } from "@/store/configureStore";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect } from "react";
import { useQuery } from "react-query";

interface Props {
    label: string
    handleChange: (e:any, value:any) => void,
    currentValue: number | null
}
export default function EmployeeListField(props:Props) {

    const { label, currentValue, handleChange } = props

    const { data, isLoading, error, status } = useQuery('employees', async () => {
        const res = await axios.get(`${APILink}employees/`)
        return res.data
    });

    const equalityTest = (option:any, value:any) => {
        return option.id == value.id
    }

    const options = data?.map((option:any) => {
        const firstLetter = option.emp_full_name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    }) ?? [];

    const filterValue = data?.find((employee:any) => employee.emp_no == currentValue) ?? null
    console.log(filterValue)

    return (
        <Autocomplete
            groupBy={(option) => option.firstLetter}
            onChange={handleChange}
            loading={isLoading}
            value={filterValue}
            disablePortal
            id="employees"
            options={options}
            getOptionLabel={option => `${option.emp_full_name} - ${option.emp_no}`}
            isOptionEqualToValue={equalityTest}
            sx={{ width: '100%' }}
            renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label={`${label ?? "Employees"}`}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <Fragment>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </Fragment>
                            ),
                          }}
                    />
                )
            }
            
        />
    )
}