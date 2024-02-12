import { GridColDef, GridValueGetterParams, GridCellParams } from "@mui/x-data-grid";
import axios from 'axios';
import dayjs from "dayjs";

//STORES
import { APILink } from '@/store/configureStore';
import { globalDate, globalDateTime } from "@/store/configureStore";



export const ProceduralLEAVEPageDescriptions = [
  "P1 - Pending Approver1 | P2 - Pending Approver2 | APD - Approved | DIS - Disapproved",
];


export const ProceduralLEAVEPageColumns: GridColDef[] = 
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
  { field: 'leave_approval_status', headerName: 'Status', width: 100,
    renderCell: (params: GridCellParams) => {

      const status = params.row?.leave_approval_status as string;

      //Functions
      const getFiveAmDate = (date: Date): Date => {

        // Create a new Date object to avoid modifying the original one
        const newDate = new Date(date);
    
        // Set hours to 5
        newDate.setHours(5);
    
        // Set minutes and seconds to 0 to ensure it's exactly 5:00 AM
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
    
        return newDate;
    }
    // const getEmployeeLeaves = async (employeeNumber: Number) => {
    //   return await axios.get(`${APILink}leave/${employeeNumber}/`).then(response => response.data)
    // }

      const leaveDateFiled: Date = new Date(params.row?.leave_date_filed);
      const fiveAmLeaveDateFiled: Date = getFiveAmDate(params.row?.leave_date_from);

      const leaveTimestamp: number = leaveDateFiled.getTime();
      const fiveAmLeaveTimestamp: number = fiveAmLeaveDateFiled.getTime();


      let cellColor = '';

      if (leaveTimestamp > fiveAmLeaveTimestamp && status != 'APD' ) { //Invalid leave

        cellColor = '#aa2e25'; // Red

      } else if (status === 'P1' || status === 'P2') { //Pending

        cellColor = '#ff9100'; // Orange DEFAULT

        // const employeeNumber: number = params.row?.emp_no;

        // getEmployeeLeaves(employeeNumber).then(leaves => {

        //   const numberOfSickLeavesApproved: number = leaves.filter((leave:any) => leave.leave_type == 1 && leave.leave_approval_status == 'APD').length;

        //   if(numberOfSickLeavesApproved >= 3) {

        //     cellColor = '#ADD8E6'; // light blue
            
        //   }

        // })

      } else if ( status ==='DIS' ) { //Disapprove

        cellColor = '#aa2e25'; // Red

      } else if ( status === 'APD' ) { //Approve

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
  { field: 'leave_approver1_empno', headerName: 'Approver #1', width: 120 },
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
  { field: 'leave_approver2_empno', headerName: 'Approver #2', width: 120 },
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
  ProceduralLEAVEPageDescriptions,
  ProceduralLEAVEPageColumns
};
  