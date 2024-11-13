import React, { Fragment, useState, useEffect, CSSProperties } from 'react';
import HighlightedCalendar from './local-components/highlighted-calendar/highlighted-calendar';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery, Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getCutoffListEmployee } from '@/store/actions/dtr';

import { CutoffListMergeSelectionState, ProcessPayroll } from '@/types/types-pages';
import { RootState } from '@/store/configureStore';
import { Typography } from '@material-tailwind/react';
import ListOfHolidaysComponent from './local-components/list-of-holidays/list-of-holidays';
import { HolidayColor } from './local-components/list-of-holidays/list-of-holidays';
import dayjs from 'dayjs';
import CreateHolidayModal from './local-components/create-holiday-modal/create-holiday-modal';


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

export default function HolidaysPage() {
  const theme = useTheme();
  const [value, setValue] = React.useState<dayjs.Dayjs | null>(dayjs());
  const matches = useMediaQuery(theme.breakpoints.down('xl'));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    return (
        <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle} className='holidaySectionOneContainer'>
                    <Typography variant={'h6'}>
                      HRIS Calendar of Holidays
                    </Typography>
                    <div className='flex justify-center align-center'>
                      <HighlightedCalendar value={value} setValue={setValue}/>
                    </div>
                    <div className='flex justify-around items-center flex-col sm:flex-row'>
                      <Typography variant={'paragraph'} className='mb-5 sm:mb-0'>
                        <p>Click the list to view date</p>
                        <p>or + Create Holiday to add</p>
                      </Typography>
                      <Typography>
                        <Button variant='contained' onClick={handleOpen}>
                          + Create Holiday
                        </Button>
                        <CreateHolidayModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose}/>
                      </Typography>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle} className='pb-24'>
                    <div className='flex justify-between flex-col sm:flex-row pl-2'>
                      <Typography variant={'h6'} style={{alignItems: 'center', display: 'flex', paddingLeft: '10px'}}>List of Holidays</Typography>
                      <div className='pr-5'>
                        <Typography className='flex my-2 pl-2'><p style={{background: HolidayColor._legal_hex, borderRadius: '100px', width: '25px'}}></p>&nbsp;&nbsp;Regular Holiday</Typography>
                        <Typography className='flex mb-2 pl-2'><p style={{background: HolidayColor._special_hex, borderRadius: '100px', width: '25px'}}></p>&nbsp;&nbsp;Special Holiday</Typography>  
                      </div>
                    </div>
                    <ListOfHolidaysComponent value={value} setValue={setValue}/>
                </Paper>
            </Grid>
        </Grid>
        </Fragment>
    );
}