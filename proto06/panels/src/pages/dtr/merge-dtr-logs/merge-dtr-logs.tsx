import { Fragment, useEffect, useState }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getCutoffListEmployee } from '@/store/actions/dtr';
import CutOffListTable from './local-components/cutoff-list-table';
import CutOffListEmployees from './local-components/cutoff-list-employees';
import { CutoffListMergeSelectionState } from '@/types/types-pages';
import { RootState } from '@/store/configureStore';


const PaperStyle = {
    padding: "20px",
    height: "700px",
    overflow: 'hidden'
}

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    height: "100%",
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
}));

export default function MergeDtrLogs() {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState<CutoffListMergeSelectionState>({
    emp_no: [],
    cutoff_code: NaN
  });
  const {status: cutOffStatus, employees, error} = useSelector((state: RootState) => state.dtr.getCutoffListEmployees);

  useEffect(()=> {
      dispatch(getCutoffListEmployee({cutoff_period:selectedRows?.cutoff_code}));
  }, [selectedRows?.cutoff_code])
  
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Fragment>
        <form>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <CutOffListTable selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <CutOffListEmployees status={cutOffStatus} employees={employees} error={error} selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
                </Paper>
            </Grid>
        </Grid>
        </form>
    </Fragment>
  );
}