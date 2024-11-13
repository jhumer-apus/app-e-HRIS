import axiosInstance from '@/helpers/axiosConfig';
import { HandleAlertAction } from '@/store/actions/components';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface EmployeeContextType {
  employeeData: any;
  fetchEmployeeData: (id: number) =>  Promise<void>;
}

interface EmployeeProviderProps {
    children: ReactNode;
}

export const EmployeeContext = createContext<EmployeeContextType>({
    employeeData: null,
    fetchEmployeeData: async (emp_no: string | number): Promise<void> =>  {},
});

const EmployeeProvider: React.FC<EmployeeProviderProps> = ({children}) => {

    const [employeeData, setEmployeeData] = useState<any>(null)
    const dispatch = useDispatch()

    const test = () => console.log("helloooo")
    const fetchEmployeeData = async (id: number): Promise<void> => {
        // console.log("clicked fetch employee data")
        await axiosInstance.get(`employees/${id}/`)
            .then(res => {
                setEmployeeData((curr:any) => res.data)
            })
            .catch(err => {
                console.error(err)
                dispatch(HandleAlertAction({
                    open: true,
                    status: "error",
                    message: "Something Went Wrong"
                }))
            })
    }

    return (
        <EmployeeContext.Provider value={{employeeData, fetchEmployeeData}}>
            {children}
        </EmployeeContext.Provider>
    )
}

export { EmployeeProvider };