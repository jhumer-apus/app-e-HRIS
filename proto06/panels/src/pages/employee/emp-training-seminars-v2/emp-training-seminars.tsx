import { Fragment, useState, CSSProperties, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@material-tailwind/react';
import EMPSEMINARSTable from './right-side/emp-training-seminars-table';
import EmployeeAutoCompleteRight from './local-components/employee-autocomplete/employee-autocomplete-right';
import EMPSEMINARSCreate from './left-side/create-emp-training-seminars';


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
  columnGap: '15px'
}));

export default function EMPSEMINARSPageV2() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const curr_emp = useSelector((state: RootState) => state.auth);
  const matches = useMediaQuery(theme.breakpoints.down('xl'));
  const curr_emp_no = curr_emp.employee_detail?.emp_no;
  const [currEmployee, setCurrEmployee] = useState<number>((curr_emp_no) || 1);

  return (
    <Fragment>
      {/* <div style={{border: '1px solid red'}}><ExportToCsv/></div> */}
      <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
        <Grid item xs={5.8} className='!pl-0'>
          <Paper elevation={3} style={PaperStyle}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
              <EMPSEMINARSCreate currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} className='!pl-0'>
          <Paper elevation={3} style={PaperStyle}>
            <div className='flex justify-between'>
            <Typography variant={'h6'} style={{alignItems: 'center', display: 'flex'}}>Training/Seminars of Emp # </Typography>
            <EmployeeAutoCompleteRight currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
            </div>
            <EMPSEMINARSTable currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}