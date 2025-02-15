import { globalDate, globalDateTime } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams, GridCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const viewPayrollOptions = [
  "View Payroll Per Employee",
  "No Other Payroll View Options",
];

export const ApprovalOBTPageDescriptions = [
  "Once you have successfully approved/rejected a request, the item will no longer be shown, go to procedurals for list instead",
];


export const ApprovalOBTPageColumns: GridColDef[] = 
[
  {
    field: 'obt_date_filed',
    headerName: 'Date Filed',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.obt_date_filed);
      return dayjs(date).format(`${globalDateTime}`);
    }
  },
  { field: 'emp_no', headerName: 'Filed By:', width: 120 },
  { field: 'obt_approval_status', headerName: 'Status', width: 100,
    renderCell: (params: GridCellParams) => {
      const status = params.row?.obt_approval_status as string;

      let cellColor = '';
      if (status === 'P1' || status === 'P2') {
        cellColor = '#ff9100'; // Orange
      } else if ( status==='DIS' ){
        cellColor = '#aa2e25'; // Red
      }

      return(
        <div className='relative'>
          <div style={{ top:'', left: '26px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
          {status}
        </div>
      );
    }  
  },
  { 
    field: 'emp_name', 
    headerName: 'Employee Name', 
    width: 250,
  },
  { 
    field: 'obt_approver1_empno', 
    headerName: 'Approver #1', 
    width: 120,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.obt_approver1_empno){
        return params.row.obt_approver1_empno
      } else {
        return 'Any higher rank'
      }
    } 
  },
  { field: 'obt_approver2_empno', headerName: 'Approver #2', width: 120 },
  {
    field: 'obt_date_approved1',
    headerName: 'Date Approved #1',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.obt_date_approved1){
        const date = new Date(params.row.obt_date_approved1);
        return dayjs(date).format(`${globalDate}`);
      } else {
        return '-'
      }
    }
  },
  {
    field: 'obt_date_approved2',
    headerName: 'Date Approved #2',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.obt_date_approved2){
        const date = new Date(params.row.obt_date_approved2);
        return dayjs(date).format(`${globalDate}`);
      } else {
        return '-'
      }
    }
  },
  { field: 'obt_reason_disapproval', headerName: 'Disapproval Reason',  width: 300 },
];
  
export default {
  ApprovalOBTPageDescriptions,
  ApprovalOBTPageColumns
};
  