import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import { APILink, RootState } from '@/store/configureStore';
import axios from 'axios';
import { getDefaultLibFileName } from 'typescript';
import styles from '@/pages/dashboard/custom-styles/home.module.scss';

//LIBRARIES
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import ShowAnnouncementModal from '../announcement-tabs/ShowAnnouncementModal';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import axiosInstance from '@/helpers/axiosConfig';

interface Props {

}
export default function BirthdayAnniversary(props: Props) {

    //REDUX
    const user = useSelector((state:RootState) => state.auth.employee_detail)

    //ANNOUNCMENT STATES
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [showCurrentAnnouncementDetails, setShowCurrentAnnouncementDetails] = useState<any>(null)
    

    //TAB STATES
    const [activeTab, setActiveTab] = useState<string>('birthday');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [columns, setColumns] = useState<GridColDef[]>([
        {
            field: 'emp_no',
            headerName: 'Employee No.',
            flex: 1
        },
        {
            field: 'full_name',
            headerName: 'Employee Name',
            flex: 1
        },
    ])
    const [data, setData] = useState<any>([
        {
            label: "Birthday",
            value: "birthday",
            data: []
        },
        {
            label: "Anniversary",
            value: "anniversary",
            data: []
        },
        {
            label: "Announcements",
            value: "announcements",
            data: []
        }
    ])

    useEffect(() => {
        let newColumns: GridColDef[]= [        
            {
                field: 'emp_no',
                headerName: 'Employee No.',
                flex: 1
            },
            {
                field: 'full_name',
                headerName: 'Employee Name',
                flex: 1
            }
        ]
        switch(activeTab) {
            case 'birthday':
                newColumns[2] = {
                    field: 'birthday',
                    headerName: 'Birth Date',
                    valueGetter: (params:any) => dayjs(params.row.birthday).format('MMMM DD, YYYY'),
                    flex: 1
                }
                setColumns((curr:any) => newColumns);
                fetchEmployeeBirthday()
                break;

            case 'anniversary':
                newColumns[2] = {
                    field: 'date_hired',
                    headerName: 'Date Hired',
                    valueGetter: (params:any) => dayjs(params.row.date_hired).format('MMMM DD, YYYY'),
                    flex: 1
                }
                setColumns((curr:any) => newColumns);
                fetchEmployeeAnniversary()
                break;

            case 'announcements':
                newColumns = [
                    {
                        field: 'message',
                        headerName: 'Announcements:',
                        flex: 1,
                        renderCell: (params:GridCellParams) => {
                            return (
                                <div className='flex items-center gap-4'>
                                    <MegaphoneIcon className='h-6 w-6'/>
                                    <p>{params.row.message}</p>
                                </div>
                            )
                        }
                    },
                    // {
                    //     field: 'posted_by',
                    //     headerName: 'Posted By:',
                    //     flex: 1
                    // },
                    // {
                    //     field: 'date',
                    //     headerName: 'Date Posted:',
                    //     flex: 1
                    // },
                ]
                setColumns((curr:any) => newColumns);
                fetchAnnouncements()
            default:
                break;
        }

    }, [activeTab])

    const fetchEmployeeBirthday = async() => {

        setIsLoading(true)

        await axiosInstance.get(`birthdays`).then(res => {

            const resData = Array.isArray(res.data)? res.data: []

            let newData = [...data]
            newData[0].data = resData.map((emp,index) => {
                return {
                    id:index,
                    ...emp
                }
            })

            setData((curr:any) => newData)
            setIsLoading(false)

        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }

    const fetchEmployeeAnniversary = async() => {

        setIsLoading(true)

        await axiosInstance.get(`anniversary`).then(res => {

            const resData = Array.isArray(res.data)? res.data: []

            let newData = [...data]
            newData[1].data = resData.map((emp,index) => {
                return {
                    id:index,
                    ...emp
                }
            })

            setData((curr:any) => newData)
            setIsLoading(false)

        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }

    const fetchAnnouncements = async () => {

        await axiosInstance.get(`act_announcement/`, {
            params: {
                pin: false,
                department: user?.department_code ?? 1,
                rank: user?.rank_code ?? 1
            }
        }).then(res => {

            let newData = [...data]
            newData[2].data = Array.isArray(res.data) ? res?.data?.map((item, index)=> {
                return {
                    id: index,
                    imageUrl: item.emp_image,
                    date: dayjs(item.date_posted).format("MMM DD, YYYY"),
                    altText: `profile-image${index}`,
                    message: item.message,
                    posted_by: item.emp_name
                        
                }
            }) : [];

            setData((curr:any) => newData)
        })
    }

    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setActiveTab(newValue);
    // };

    // const data = [
    //     {
    //         label: "Birthday",
    //         value: "birthday",
    //         data: [
    //             {
    //                 name: "Juan"
    //             },
    //             {
    //                 name: "Justine"
    //             }
    //         ]
    //     },
    //     {
    //         label: "Anniversary",
    //         value: "anniversary",
    //         data: [
    //             {
    //                 name: "Rolok"
    //             },
    //             {
    //                 name: "Rastine"
    //             }
    //         ]
    //     }
    // ]


    return (
        <Tabs className={styles.announcementBar} value={activeTab}>
            <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
            >
                {data.map(({ label, value}:{label:any, value:any}) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={activeTab === value ? "text-gray-900" : ""}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, data }:any) => (
                    <TabPanel key={value} value={value}>
                        <div className='overflow-auto h-[800px]'>
                            <ShowAnnouncementModal 
                                isOpenModal={isOpenModal}
                                setIsOpenModal={setIsOpenModal}
                                details={showCurrentAnnouncementDetails}
                            />
                            <DataGrid
                                rows={data}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                        pageSize: 25,
                                        },
                                    },
                                }}
                                getRowHeight={(params) => 50}
                                loading={isLoading}
                                localeText={{ noRowsLabel: activeTab=='announcements'? `No Announcements For Today`: `No employees celebrated today` }}
                                pageSizeOptions={[5,10,25]}
                                onRowClick={(e) => {
                                    if(activeTab == 'announcements') {
                                        setIsOpenModal(true);
                                        setShowCurrentAnnouncementDetails(e.row)
                                    }
                                }}
                            />
                        </div>
                        
                        {/* {data.length > 0? 
                            <ul className='overflow-auto h-[800px]'>
                                {data.map((emp:any) => (
                                    <li className='border-b border-black p-2'>{emp.full_name}</li>
                                ))}
                            </ul>:
                            <p>{isLoading?'Loading Data...': 'No Employees'}</p>
                        } */}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    )
    // return (
    //     <TabContext value={currentTab}>
    //         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //             <TabList onChange={handleChange} aria-label="lab API tabs example">
    //             <Tab label="Item One" value={1} />
    //             <Tab label="Item Two" value={2} />
    //             <Tab label="Item Three" value={3} />
    //             </TabList>
    //         </Box>
    //         <TabPanel value="1">Item One</TabPanel>
    //         <TabPanel value="2">Item Two</TabPanel>
    //         <TabPanel value="3">Item Three</TabPanel>
    //     </TabContext>
    // )
}