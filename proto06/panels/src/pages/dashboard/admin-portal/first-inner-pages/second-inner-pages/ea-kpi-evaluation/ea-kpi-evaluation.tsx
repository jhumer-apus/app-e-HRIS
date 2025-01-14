import { Fragment }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import EAKPICOREPageHistory from './local-component/right-side/ea-kpi-evaluation-history';
import EAKPIEVALCreate from './local-component/left-side/ea-create-kpi-evaluation';



const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    height: "100%",
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
}));

export default function EAKPIEVAL() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xl'));
    const PaperStyle = {
        padding: "20px",
        height: "700px",
        width: `${matches? '100%' : '630px'}`,
        overflow: 'auto'
    }
    
  return (
    <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs>
                <Paper elevation={3} style={PaperStyle}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <EAKPIEVALCreate/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper elevation={3} style={PaperStyle}>
                    <EAKPICOREPageHistory/>
                </Paper>
            </Grid>
        </Grid>
    </Fragment>
  );
}