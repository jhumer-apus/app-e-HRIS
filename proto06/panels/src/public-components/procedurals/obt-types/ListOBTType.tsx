import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Fragment, useEffect, useState } from "react";
import EditOBTType from "./EditOBTType";
import ConfirmationModal from "@/public-components/modals/ConfirmationModal";
import { APILink, RootState } from "@/store/configureStore";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { HandleAlertAction } from "@/store/actions/components";
import axiosInstance from "@/helpers/axiosConfig";
import { globalServerErrorMsg } from '@/store/configureStore';


interface Props {
    rows: any[],
    refreshTable: () => void,
    isLoadingg: boolean,
}
export default function ListOBTType(props: Props) {

    const { rows = [], refreshTable, isLoadingg } = props
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const dispatch = useDispatch()

    const [selectedRow, setSelectedRow] = useState<any>(
        {
            id: "",
            type: ""
        }
    )

    const handleClick = (id:number|string, type: "edit" | "delete") => {
        setSelectedRow((curr:any) => (
            {
                id: id,
                type: type
            }
        ))
    }

    const columns: GridColDef[] = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width:90
        },
        {
            field: 'obt_type_name',
            headerName: 'OBT Type',
            editable: true,
            width:400
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                
                return [
                  <GridActionsCellItem
                    icon={<PencilSquareIcon className="h-6 w-6 text-gray-700 hover:text-blue-500" />}
                    label="Save"
                    sx={{
                      color: 'primary.main',
                    }}
                    onClick={(e:any) => handleClick(id, "edit")}
                  />,
                  <GridActionsCellItem
                    icon={<TrashIcon className="h-6 w-6 text-red-500 hover:text-blue-300" />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={(e:any) => handleClick(id, "delete")}
                    color="inherit"
                  />,
                ];
            
            },
        },
    ];

    const closeModal = () => {
        setSelectedRow((curr:any) => (
            {
                id: "",
                type: ""
            }
        ))
    }

    const deleteObtType = async () => {

        await axiosInstance.delete(`obt_type/${selectedRow.id}/`, {
            params : {
                added_by: currUser?.emp_no
            }
        })
        .then(res => {
            refreshTable()
            dispatch(HandleAlertAction(
                {
                    open:true,
                    status:"success",
                    message:"Delete OBT Type Successfully"
                }
            ))
            closeModal()
        })
        .catch(err => {
            dispatch(HandleAlertAction(
                {
                    open:true,
                    status:"error",
                    message:"Fail to Delete OBT Type"
                }
            ))
            closeModal()
        })
    }

    return (
        <Fragment>
            <div className="my-2 flex flex-wrap justify-between items-start gap-6">
                <div>
                    <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
                        <p></p>
                    </Typography>
                    <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
                    <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
                    </Typography>
                </div>
            </div>
            <EditOBTType 
                setSelectedRow={setSelectedRow} 
                selectedRow={selectedRow}
                refreshTable={refreshTable}
            />
            <ConfirmationModal 
                onYes={() => deleteObtType()} 
                message="Are you sure you want to delete this OBT Type?" 
                handleClose={closeModal} 
                open={selectedRow?.type == "delete"} 
            />
            <div className="h-[500px]">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 100 },
                        },
                    }}
                    pageSizeOptions={[25, 50, 75, 100]}
                    // onRowClick={(e) => {
                    //     setSingleLEAVECREDITDetailsData(e.row);
                    //     setSingleLEAVECREDITOpenModal(true);
                    // }}
                    disableRowSelectionOnClick 
                    loading={isLoadingg}
                    localeText={{noRowsLabel: `${isLoadingg == false && rows.length == 0 ? 'No results found' : 'Loading...'}`}}
                />
            </div>
        </Fragment>
    )
}