import { Fragment, useState, CSSProperties, useEffect } from 'react';
import HighlightedCalendar from './local-components/highlighted-calendar/highlighted-calendar';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@material-tailwind/react';
import { ScheduleDailyColor } from '@/types/index';
import dayjs from 'dayjs';
import ProceduralSCHEDULEDAILYPageHistory from './right-side/schedule-daily-history';
import EmployeeAutoCompleteRight from './local-components/employee-autocomplete/employee-autocomplete-right';
import CreateSCHEDULEDAILYMultipleModal from './local-components/assign-multiple-shift/create-schedule-daily-multiple-modal';
import { All_Schedule_Filter_Interface } from '@/types/types-employee-and-applicants';
import ExportToCsv from '@/public-components/ExportToCSVButton';
import { ALLSCHEDULEViewSpecificAction } from '@/store/actions/employee-and-applicants';
import { HolidayColor } from '../holidays/local-components/list-of-holidays/list-of-holidays';
import EmployeeListField from '@/public-components/EmployeeListField';


const PaperStyle: CSSProperties = {
  padding: "20px",
  // height: "800px",
  // overflowY: 'auto'
}

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  height: "100%",
  margin: 0,
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
  columnGap: '15px',
}));

export default function ProceduralSCHEDULEDAILYpage() {
  const dispatch = useDispatch();
  const allScheduleState = useSelector((state: RootState) => state.employeeAndApplicants.ALLSCHEDULEViewSpecific);
  const theme = useTheme();
  const curr_emp = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  const matches = useMediaQuery(theme.breakpoints.down('xl'));
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const curr_emp_no = curr_emp.employee_detail?.emp_no;
  const [currEmployee, setCurrEmployee] = useState<number>((curr_emp_no) || 0);
  const [ forCSVExtract, setForCSVExtract ] = useState<unknown>(null);

  const [ filterState, setFilterState ] = useState<All_Schedule_Filter_Interface>({
    month: +(dayjs(new Date()).format('MM')),
    year: +(dayjs(new Date()).format('YYYY'))
  });



  useEffect(()=>{
    dispatch(ALLSCHEDULEViewSpecificAction(filterState))
    // const data = allScheduleState.data.map((data)=> {
    //   return ({
    //     id: data.id,
    //     F: `${data.last_name}, ${data.first_name} ${data.middle_name !== null ? data.middle_name : ''} ${data.suffix !== null? data.suffix : ''}`,
    //     October_01_2023: `${data.schedule !== null ? data.schedule : ''}`, 
    //     October_02_2024: `${data.division_code !== null ? data.division_code : ''}`,
    //     October_03_2024: `${data.position_code !== null ? data.position_code : ''}`,
    //     October_04_2024: `${data.payroll_group_code !== null ? data.payroll_group_code : ''}`,
    //   })
    // })
    // setForCSVExtract(data) 
  }, [])

  const handleChangeEmpField = (e:any, newValue:any) => {
      if(newValue) {
          setCurrEmployee((prevState:any)=> newValue.emp_no)
      }
  }

  return (
    <Fragment>
      {/* <div style={{border: '1px solid red'}}><ExportToCsv/></div> */}
      <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
        <Grid item xs className='!pl-0'>
          <Paper elevation={3} style={PaperStyle}>
            <div className='flex flex-wrap justify-between'>
              <div className='flex flex-col'>
                <Typography variant={'h6'}>
                  Daily Schedule of an Employee
                </Typography>
                <Typography variant={'small'} className='italic text-left'>
                  Some Restdays have schedules', make sure to be guided accordingly.
                </Typography>
                <Typography variant={'small'} className='italic text-left'>
                  Hover date to check details. And make sure this is intended.
                </Typography>
              </div>
              <div>
                <Typography className='flex my-2'><p style={{background: ScheduleDailyColor._restday, borderRadius: '100px', width: '25px'}}></p>&nbsp;&nbsp;Restday</Typography>
                <Typography className='flex mb-2'><p style={{background: ScheduleDailyColor._workday, borderRadius: '100px', width: '25px'}}></p>&nbsp;&nbsp;Workday</Typography>  
                <Typography className='flex mb-2'><p style={{background: HolidayColor._special_hex, borderRadius: '100px', width: '25px'}}></p>&nbsp;&nbsp;Special Non-working Holiday</Typography>
                <Typography className='flex mb-2'><p style={{background: HolidayColor._legal_hex, borderRadius: '100px', width: '25px'}}></p>&nbsp;&nbsp;Regular Holiday</Typography>  
              </div>
            </div>
            <div className='flex justify-center align-center'>
              <HighlightedCalendar value={value} setValue={setValue} currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
            </div>
            <div className='flex justify-around items-center flex-col sm:flex-row'>
            <Typography variant={'paragraph'} className='mb-5 sm:mb-0'>
              <p>Click the list to view date</p>
              <p>or + Assign Shift to add</p>
            </Typography>
            <Typography>
              <div className='flex flex-col gap-4'>
                <Button variant='outlined' onClick={handleOpen2}>
                  + Assign Shift
                </Button>
              </div>
              <CreateSCHEDULEDAILYMultipleModal open2={open2} setOpen2={setOpen2} handleOpen2={handleOpen2} handleClose2={handleClose2}/>
            </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs className='!pl-0'>
          <Paper elevation={3} style={PaperStyle}>
            <div className='flex justify-between'>
            <Typography variant={'h6'} style={{alignItems: 'center', display: 'flex'}}>Choose Employee to view Daily Schedule</Typography>
            <div className='w-96'>
              <EmployeeListField 
                  label="Employee No.:" 
                  handleChange={handleChangeEmpField} 
                  currentValue={currEmployee}
              />
            </div>
            {/* <EmployeeAutoCompleteRight currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/> */}
            </div>
            <ProceduralSCHEDULEDAILYPageHistory currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}