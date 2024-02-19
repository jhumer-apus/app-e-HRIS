import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LEAVECreateInterface } from '@/types/types-pages';

interface DateFromToLEAVECreateInterface{
    createLEAVE: LEAVECreateInterface;
    setCreateLEAVE: Dispatch<SetStateAction<LEAVECreateInterface>>;
}


export default function DateFromToLEAVECreate(props: DateFromToLEAVECreateInterface) {
    const { createLEAVE, setCreateLEAVE } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div title="Make sure this field is logical. (i.e, `Date From` should come first and not the `Date To`)">
            <DateTimePicker
            label="Date & Time Froms"
            value={createLEAVE?.leave_date_from}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateLEAVE((prevState)=>{
                        return(
                            {
                                ...prevState,
                                leave_date_from: formattedDate
                            }
                        )
                    })
                )
            }}
            sx={{ width: '100%' }}
            />
            </div>
            <div title="Make sure this field is logical. (i.e, `Date From` should come first and not the `Date To`)">
            <DateTimePicker
            label="Date & Time To"
            value={createLEAVE?.leave_date_to}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return(
                    setCreateLEAVE((prevState)=>{
                        return(
                            {
                                ...prevState,
                                leave_date_to: formattedDate
                            }
                        )
                    })
                )
            }}
            sx={{ width: '100%' }}
            />
            </div>
        </LocalizationProvider>
    );
}