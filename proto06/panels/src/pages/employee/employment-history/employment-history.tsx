import { Fragment, useState, CSSProperties, useEffect } from 'react';
import HighlightedCalendar from './local-components/highlighted-calendar/highlighted-calendar';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@material-tailwind/react';
import { ScheduleDailyColor } from '@/types/index';
import dayjs from 'dayjs';
import EmploymentHistoryTable from './right-side/employment-history-table';
import EmployeeAutoCompleteRight from './local-components/employee-autocomplete/employee-autocomplete-right';
import CreateSCHEDULEDAILYMultipleModal from './local-components/assign-multiple-shift/create-schedule-daily-multiple-modal';
import { All_Schedule_Filter_Interface } from '@/types/types-employee-and-applicants';
import { ALLSCHEDULEViewSpecificAction } from '@/store/actions/employee-and-applicants';
import EMPHISTORYCreate from './left-side/create-emp-history';


const PaperStyle: CSSProperties = {
  padding: "20px",
  height: "auto",
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

export default function EmploymentHistoryPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const curr_emp = useSelector((state: RootState) => state.auth);
  const matches = useMediaQuery(theme.breakpoints.down('xl'));
  const curr_emp_no = curr_emp.employee_detail?.emp_no;
  const [currEmployee, setCurrEmployee] = useState<number>((curr_emp_no) || 1);

  const [ filterState, setFilterState ] = useState<All_Schedule_Filter_Interface>({
    month: +(dayjs(new Date()).format('MM')),
    year: +(dayjs(new Date()).format('YYYY'))
  });

  useEffect(()=>{
    dispatch(ALLSCHEDULEViewSpecificAction(filterState))
  }, [])

  return (
    <Fragment>
      {/* <div style={{border: '1px solid red'}}><ExportToCsv/></div> */}
      <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
        <Grid item xs={5.8} className='!pl-0'>
          <Paper elevation={3} style={PaperStyle}>
            <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
              <EMPHISTORYCreate currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} className='!pl-0'>
          <Paper elevation={3} style={PaperStyle}>
            <div className='flex justify-between'>
            <Typography variant={'h6'} style={{alignItems: 'center', display: 'flex'}}>Employment History of Emp # </Typography>
            <EmployeeAutoCompleteRight currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
            </div>
            <EmploymentHistoryTable currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}