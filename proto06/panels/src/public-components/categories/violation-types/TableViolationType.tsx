import { ViolationType } from "@/types/types-pages";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditViolationType from "./EditViolationType";
import { useState } from "react";
import axiosInstance from "@/helpers/axiosConfig";
import { HandleAlertAction } from "@/store/actions/components";
import { useDispatch } from "react-redux";

interface Props {
    rows: ViolationType[] | []
    loading:boolean,
    refreshTable: () => void
}
export default function TableViolationType(props: Props) {

    const {rows, loading, refreshTable} = props
    const dispatch = useDispatch()

    const [modal, setModal] = useState({
        showEdit: false,
    })

    const [loadingViolationType, setLoadingViolationType] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<any>({
        loading:false,
        data:{
            id: null,
            name: "",
            description: ""
        }
    })

    const columns:GridColDef[] = [
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
                    label="Edit"
                    sx={{
                      color: 'primary.main',
                    }}
                    onClick={(e:any) => handleEdit(Number(id))}
                  />,
                ];
            
            },
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1
        },
        {
            field: "description",
            headerName: "Description", 
            flex: 1
        }
    ]

    const handleEdit = (id:number) => {
        fetchViolationType(id)
        setModal(curr => ({showEdit: true}))
    }

    const handleClose = () => {
        setModal(curr => ({showEdit: false}))
    }

    const fetchViolationType = async (id:number) => {
        setLoadingViolationType(curr => true)
        await axiosInstance
            .get(`violation_type/${id}/`)
            .then(res => {
                setLoadingViolationType(curr => false)
                setSelectedRow((curr:any) => (
                    {
                        id: res?.data?.id ?? "",
                        name: res?.data?.name ?? "",
                        description: res?.data?.description ?? ""
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setLoadingViolationType(curr => false)
                dispatch(HandleAlertAction({
                    open: true,
                    status: "error",
                    message: "Failed to retrieve data"
                }))
            })
    }

    return (
        <div className="mt-4 h-[500px]">
            <DataGrid 
                columns={columns} 
                rows={rows}
                loading={loading}
            />
            <EditViolationType 
                open={modal.showEdit} 
                handleClose={handleClose} 
                refreshTable={refreshTable} 
                loadingData={loadingViolationType}
                data={selectedRow}
            />
        </div>
    )
}
