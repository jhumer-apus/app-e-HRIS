import { Fragment }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import ProceduralCUTOFFPERIODPageHistory from './local-component/right-side/cutoff-period-history';
import ProceduralCUTOFFPERIODCreate from './local-component/left-side/procedural-cutoff-period-create';


const PaperStyle = {
    padding: "20px",
    height: "auto",
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

export default function ProceduralCUTOFFPERIODPage() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <ProceduralCUTOFFPERIODCreate/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle}>
                    <ProceduralCUTOFFPERIODPageHistory/>
                </Paper>
            </Grid>
        </Grid>
    </Fragment>
  );
}