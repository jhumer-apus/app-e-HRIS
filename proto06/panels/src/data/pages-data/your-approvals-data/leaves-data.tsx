import { globalDate, globalDateTime } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams, GridCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

//HELPERS
import { getNumberOfSickLeaves } from '@/helpers/SickLeavesRemarks';

export const ApprovalLEAVEPageDescriptions = [
  "Once you have successfully approved/rejected a request, the item will no longer be shown, go to procedurals for list instead",
];


export const ApprovalLEAVEPageColumns: GridColDef[] = 
[
  {
    field: 'leave_date_filed',
    headerName: 'Date Filed',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.leave_date_filed);
      return dayjs(date).format(`${globalDateTime}`);
    }
  },
  { field: 'emp_no', headerName: 'Filed By:', width: 120 },
  { 
    field: 'emp_name', 
    headerName: 'Employee Name', 
    width: 250,
  },
  { field: 'leave_approval_status', headerName: 'Status', width: 100,
    renderCell: (params: GridCellParams) => {
      const status = params.row?.leave_approval_status as string;

      let cellColor = '';
      
      if (status === 'P1' || status === 'P2') {

        cellColor = '#ff9100'; // Orange

        if(params.row?.leave_type == 2) {

          if(getNumberOfSickLeaves(params.row?.leave_remarks) >= 3) {
  
            cellColor = '#581845'; // Purple red
  
          }
        }

      } else if ( status==='DIS' ){

        cellColor = '#aa2e25'; // Red

      } else if ( status==='APD' ){

        cellColor = '#008000'; // Green

      }

      return(
        <div className='relative'>
          <div style={{ top:'', left: '26px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
          {status}
        </div>
      );
    }  
  },
  { field: 'leave_type_name', headerName: 'Leave Type:', width: 120 },
  { 
    field: 'leave_approver1_empno', 
    headerName: 'Approver #1', 
    width: 120,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.leave_approver1_empno){
        return params.row.leave_approver1_empno
      } else {
        return 'Any higher rank'
      }
    } 
  },
  { field: 'leave_approver2_empno', headerName: 'Approver #2', width: 120 },
  {
    field: 'leave_date_approved1',
    headerName: 'Date Approved #1',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.leave_date_approved1){
        const date = new Date(params.row.leave_date_approved1);
        return dayjs(date).format(`${globalDate}`);
      } else {
        return '-'
      }
    }
  },
  {
    field: 'leave_date_approved2',
    headerName: 'Date Approved #2',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.leave_date_approved2){
        const date = new Date(params.row.leave_date_approved2);
        return dayjs(date).format(`${globalDate}`);
      } else {
        return '-'
      }
    }
  },
  { field: 'leave_reason_disapproval', headerName: 'Disapproval Reason',  width: 300 },
];
  
export default {
  ApprovalLEAVEPageDescriptions,
  ApprovalLEAVEPageColumns
};
  