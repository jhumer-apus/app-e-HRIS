import { Fragment }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import QuickAccessOBTPageHistory from './local-component/right-side/file-obt-history';
import QuickAccessOBTCreate from './local-component/left-side/file-obt-create';


const PaperStyle = {
    padding: "20px",
    height: "700px",
    overflow: 'auto'
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

export default function FileOBTPage() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xl'));
  return (
    <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <QuickAccessOBTCreate/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle}>
                    <QuickAccessOBTPageHistory/>
                </Paper>
            </Grid>
        </Grid>
    </Fragment>
  );
}