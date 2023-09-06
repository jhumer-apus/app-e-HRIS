import { Fragment }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import ManagePAYROLLGROUPPageHistory from './local-component/right-side/manage-payrollgroup-history';
import ManagePAYROLLGROUPCreate from './local-component/left-side/manage-payrollgroup-create';


const PaperStyle = {
    padding: "20px",
    height: "700px",
    overflow: 'auto'
}

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    height: "100%",
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
}));

export default function ManagePAYROLLGROUP() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs>
                <Paper elevation={3} style={PaperStyle}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <ManagePAYROLLGROUPCreate/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper elevation={3} style={PaperStyle}>
                    <ManagePAYROLLGROUPPageHistory/>
                </Paper>
            </Grid>
        </Grid>
    </Fragment>
  );
}