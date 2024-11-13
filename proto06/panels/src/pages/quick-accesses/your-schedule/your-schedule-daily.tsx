import { Fragment, useState, CSSProperties } from 'react';
import HighlightedCalendar from './local-components/highlighted-calendar/highlighted-calendar';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@material-tailwind/react';
import { ScheduleDailyColor } from '@/types/index';
import dayjs from 'dayjs';
import ProceduralSCHEDULEDAILYPageHistory from './right-side/schedule-daily-history';
import EmployeeAutoCompleteRight from './local-components/employee-autocomplete/employee-autocomplete-right';
import { HolidayColor } from '@/pages/procedurals/holidays/local-components/list-of-holidays/list-of-holidays';

const PaperStyle: CSSProperties = {
  padding: "20px",
  height: "800px",
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


export default function YourSCHEDULEDAILYpage() {
  const theme = useTheme();
  const curr_emp = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  const matches = useMediaQuery(theme.breakpoints.down('xl'));
  const curr_emp_no = curr_emp.employee_detail?.emp_no;
  const [currEmployee, setCurrEmployee] = useState<number>((curr_emp_no) || 0);

    return (
        <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs className='!pl-0'>
                <Paper 
                  elevation={3} 
                  // style={PaperStyle}
                  className='h-fit p-4'
                >
                    <div className='flex flex-wrap justify-between'>
                        <div className='flex flex-col'>
                          <Typography variant={'h6'}>
                            Daily Schedule of an Employee
                          </Typography>
                          <Typography variant={'small'} className='italic'>
                            Some Restdays have schedules', make sure to be guided accordingly.
                          </Typography>
                          <Typography variant={'small'} className='italic'>
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
                </Paper>
            </Grid>
            <Grid item xs className='!pl-0'>
                {/* <Paper elevation={3} style={PaperStyle}> */}
                  <Paper className='p-4 h-fit'>
                    <div className='flex justify-between'>
                    <Typography variant={'h6'} style={{alignItems: 'center', display: 'flex'}}>Daily Schedule Table History</Typography>
                    {/* <EmployeeAutoCompleteRight currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/> */}
                    </div>
                    <ProceduralSCHEDULEDAILYPageHistory currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
                </Paper>
            </Grid>
        </Grid>
        </Fragment>
    );
}