import { globalDate, globalDateTime } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams, GridCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

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

      // const getFiveAmNextDate = (date: Date) => {

      //     // Get next date
      //     date.setDate(date.getDate() + 1)

      //     // Set hours to 5
      //     date.setHours(5);

      //     // Set minutes and seconds to 0 to ensure it's exactly 5:00 AM
      //     date.setMinutes(0);
      //     date.setSeconds(0);
      //     date.setMilliseconds(0);

      //     return date;

      // }

      const getFiveAmDate = (date: Date) => {

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

      const leaveDateFiled: Date = new Date(params.row?.leave_date_filed);
      const fiveAmLeaveDateFiled: Date = getFiveAmDate(leaveDateFiled);

      console.log(leaveDateFiled);
      console.log(fiveAmLeaveDateFiled);

      const leaveTimestamp = leaveDateFiled.getTime();
      const fiveAmLeaveTimestamp = fiveAmLeaveDateFiled.getTime();

      console.log(leaveTimestamp);
      console.log(fiveAmLeaveTimestamp);


      let cellColor = '';

      if (status === 'P1' || status === 'P2') { //Pending

        cellColor = '#ff9100'; // Orange

      } else if (leaveDateFiled > fiveAmLeaveDateFiled) { //Invalid leave: File leave should not be after 5 am of tomorrow's start date of leave

        cellColor = '#aa2e25'; // Red

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
  