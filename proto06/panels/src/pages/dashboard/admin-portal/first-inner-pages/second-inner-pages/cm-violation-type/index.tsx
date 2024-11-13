import axiosInstance from "@/helpers/axiosConfig";
import CreateViolationType from "@/public-components/categories/violation-types/CreateViolationType";
import TableViolationType from "@/public-components/categories/violation-types/TableViolationType";
import { ViolationType } from "@/types/types-pages";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function ManageViolationType() {

    const [modal, setModal] = useState({
        showCreate: false,
    })

    const [rows, setRows] = useState<ViolationType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchViolationTypes()
    },[])

    const fetchViolationTypes = async () => {
        setLoading(curr => true)
        await axiosInstance
                .get(`violation_type/`)
                .then(res => {
                    setRows(curr => Array.isArray(res?.data)? res?.data: [])
                    setLoading(curr => false)
                })
                .catch(err => {
                    console.error(err)
                    setRows(curr => [])
                    setLoading(curr => false)
                })
    }

    return (
        <div className="mt-8">
            <Button variant="contained" onClick={() => setModal(curr => ({...curr, showCreate: true}))}>Add Type</Button>
            <TableViolationType 
                rows={rows}
                loading={loading}
                refreshTable={fetchViolationTypes}           
            />
            <CreateViolationType 
                open={modal.showCreate}
                handleClose={() => setModal(curr => ({...curr, showCreate: false}))}
                refreshTable={fetchViolationTypes}
            />
        </div>
    )
}