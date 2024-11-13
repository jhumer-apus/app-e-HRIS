import { Fragment, useEffect, useState } from 'react';

//LIBRARIES
import { DataGrid, GridRowsProp, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';
import { Button } from "@material-tailwind/react";
import axios, { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';

//STORES
import { APILink } from '@/store/configureStore';
import { globalServerErrorMsg } from '@/store/configureStore';

//COMPONENTS
import ExportToCsvButton from '../../../public-components/ExportToCSVButton';
import SelectForm from '../../../public-components/forms/SelectForm';
import InputForm from '../../../public-components/forms/InputForm';
import axiosInstance from '@/helpers/axiosConfig';

interface Rows {
    emp_name: string,
    department_name: string,
    division_name: string,
    position_name: string,
}

export default function ViewImperfectAttendance() {

    //STATES
    const [dataRows, setDataRows] = useState<Rows[]>([]);
    const [month, setMonth] = useState<number | string>(new Date().getMonth() + 1);
    const [year, setYear] = useState<number | string>(new Date().getFullYear());
    const [isFetchReportError, setIsFetchReportError] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //USE EFFECTS
    useEffect(() => {
        fetchImperfectAttendanceRecords()
    }, [])


    //API CALLS
    const fetchImperfectAttendanceRecords = async() => {
    
        setIsLoading(true)
        setDataRows((curr:Rows[]) => [])

        await axiosInstance.get(`imperfect/`, {
            params: {
                month: month,
                year: year
            }
        }).then((res:AxiosResponse) => {
            
            const data:Rows[] = Array.isArray(res.data) ? res.data.map((emp:any, index:number) => {
                return {
                    id: index,
                    emp_image: emp.employee.employee_image,
                    emp_no: emp.employee.emp_no,
                    emp_name: `${emp?.employee?.emp_full_name}`,
                    department_name: emp.employee.department_data?.dept_name?? "Unknown",
                    division_name: emp.employee.division_data?.div_name?? "Unknown",
                    position_name: emp.employee.position_data?.pos_name?? "Unknown",
                    late: emp.lates?? "",
                    undertime: emp.undertime?? "",
                    absent: emp.absent??  "",
                    counter: emp.counter?? ""
                }
            }): []

            setDataRows((curr:Rows[]) => data)
            setIsLoading(false)

        }).catch((err:AxiosError) => {

            console.log(err)
            setIsFetchReportError(true)
            setIsLoading(false)
        })
    } 


    //COLUMNS
    const columns: GridColDef[] = [
        {
            field: 'emp_image',
            headerName: 'Profile Picture',
            width: 150,
            renderCell: (params: GridCellParams) => {
                if (params.row.employee_image){
                    return( 
                        <img src={`${APILink.replace('/api/v1/', '')}${params.row.employee_image as string}`} alt="" width="50" height="50" style={{borderRadius: "10px", height: "40px", width: "40px", objectFit: "cover", border: "1px solid white", boxShadow: "1px 1px 10px gray"}}/>
                    )
                } else {
                    return null 
                }
            },
        },
        { field: 'emp_no', headerName: 'Employee No:', width: 120},
        { field: 'emp_name', headerName: 'Employee Name:', width: 200},
        { field: 'department_name', headerName: 'Department', width: 120},
        // { field: 'division_name', headerName: 'Division', width: 120},
        { field: 'position_name', headerName: 'Position', width: 120},
        { field: 'late', headerName: 'Lates', width: 120},
        { field: 'undertime', headerName: 'Undertime', width: 120},
        { field: 'counter', headerName: 'Total of Tardiness', width: 200},
        { field: 'absent', headerName: 'Absences', width: 120},
        // {
        //   field: 'datetime_bio_time',
        //   headerName: 'Time',
        //   width: 150,
        //   description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
        //   sortable: true,

        // },
    ];

    const options= [
        {
            name: "January",
            value: "1"
        },
        {
            name: "February",
            value: "2"
        },
        {
            name: "March",
            value: "3"
        },
        {
            name: "April",
            value: "4"
        },
        {
            name: "May",
            value: "5"
        },
        {
            name: "June",
            value: "6"
        },
        {
            name: "July",
            value: "7"
        },
        {
            name: "August",
            value: "8"
        },
        {
            name: "September",
            value: "9"
        },
        {
            name: "October",
            value: "10"
        },
        {
            name: "November",
            value: "11"
        },
        {
            name: "December",
            value: "12"
        }
    ]

    const exportCsvData = dataRows? dataRows.map((obj:any) => {
        return {
            "Employee Name": obj.emp_name,
            "Employee No": obj.emp_no,
            "Department": obj.department_name,
            "Division": obj.division_name,
            "Position": obj.position_name,
            "Lates": obj.late,
            "Undertime": obj.undertime,
            "Total of Tardiness": obj.counter,
            "Absences": obj.absent,
        }
    }): []

    return (
        <Fragment>
            <div className="my-10">

                <ExportToCsvButton 
                    data={exportCsvData} 
                    isDisable={!dataRows || dataRows.length == 0}
                    defaultName={`Employee Imperfect Attendance ${dayjs().month(month as number - 1).format('MMMM')} ${year}`}
                />

                <div className="md:flex md:space-x-4 md:items-center">
                    <SelectForm         
                        label="Select Month"
                        variant="standard"
                        placeholder="Select A Month"
                        currValue={month?.toString()}
                        setState={setMonth}
                        options={options}
                        isDisable={isLoading}
                    />
                    <InputForm 
                        currVal={year?.toString()}
                        label="Year"
                        variant="standard"
                        placeholder="Enter A Year"
                        setState={setYear}
                        isDisable={isLoading}
                    />
                    <Button 
                        variant="filled"
                        size="lg"
                        color='indigo'
                        onClick={() => fetchImperfectAttendanceRecords()}
                        disabled={isLoading}
                    >
                        View
                    </Button>


                </div>

                <div className="my-6 h-[500PX] w-full">
                    {/* add a loading interface here to indicate that the report needed is loading */}
                    <DataGrid
                    rows={dataRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 100 },
                        },
                    }}
                    pageSizeOptions={[25, 50, 75, 100]}
                    // onRowClick={(e) => {
                    //     setSingleUSERDetailsData(e.row);
                    //     setSingleUSEROpenModal(true);
                    // }}
                    // disableRowSelectionOnClick 
                    localeText={{ noRowsLabel: isFetchReportError? 'Something Went Wrong': isLoading? 'Loading Data...': 'No Data'}}
                    />


                </div>
            </div>
        </Fragment>
    )
    
}