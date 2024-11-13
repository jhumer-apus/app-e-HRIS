import { Fragment }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import ProceduralLEAVETYPEPageHistory from './local-component/right-side/leave-type-history';
import ProceduralLEAVETYPECreate from './local-component/left-side/procedural-leave-type-create';


const PaperStyle = {
    padding: "20px",
    height: "auto",
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

export default function ProceduralLEAVETYPEPage() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs>
                <Paper elevation={3} style={PaperStyle}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', gap: '15px' }}>
                        <ProceduralLEAVETYPECreate/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper elevation={3} style={PaperStyle}>
                    <ProceduralLEAVETYPEPageHistory/>
                </Paper>
            </Grid>
        </Grid>
    </Fragment>
  );
}