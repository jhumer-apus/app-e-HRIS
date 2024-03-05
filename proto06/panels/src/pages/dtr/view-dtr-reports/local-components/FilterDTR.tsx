// REACT
import { Fragment, useEffect, useState } from 'react';

//LIBRARIES 
import { Select, Option, Input, Button } from "@material-tailwind/react";
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { render } from 'react-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

//HELPERS
import { fetchCutOffPeriods } from '@/helpers/ApiCalls'

interface Props { 
    viewType: "logs" | "merged" | "cutoff"
}

interface OptionInterface {
    name: string,
    value: string
}

export default function FilterDTR(props: Props) {
    
    //STATES
    const [filter, setFilter] = useState({
        year: dayjs().format("YYYY"),
        month: dayjs().format("MM")
    })

    const [cutoffPeriods, setCutOffPeriods] = useState<any[]>([]);
    const [isCutOffPeriodLoading, setIsCutOffPeriodLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { viewType } = props

    //USE EFFECTS
    useEffect(() => {
        debounceFetchCutOffPeriods()
    },[])

    // STATIC DATA
    const monthOptions= [
        {
            name: "January",
            value: "1"
        },
        {
            name: "February",
            value: "2"
        },
        {
            name: "March",
            value: "3"
        },
        {
            name: "April",
            value: "4"
        },
        {
            name: "May",
            value: "5"
        },
        {
            name: "June",
            value: "6"
        },
        {
            name: "July",
            value: "7"
        },
        {
            name: "August",
            value: "8"
        },
        {
            name: "September",
            value: "9"
        },
        {
            name: "October",
            value: "10"
        },
        {
            name: "November",
            value: "11"
        },
        {
            name: "December",
            value: "12"
        }
    ]
    const readableFormatDate = (date:string) => {
        const parsedDate = dayjs(date);
        return parsedDate.format('MMM DD, YYYY');
    }

    const debounceFetchCutOffPeriods = debounce(() => {
        fetchCutOffPeriods(filter.year).then(res => {
            const cleanCutOffs = res.data.map((cutoff:any) => {
                return {
                    ...cutoff,
                    cleanDateFrom: readableFormatDate(cutoff.co_date_from),
                    cleanDateTo: readableFormatDate(cutoff.co_date_to)
                }
            })

            setCutOffPeriods(curr => cleanCutOffs)
            setIsCutOffPeriodLoading(false)

        }).catch(err => {

            setIsCutOffPeriodLoading(false)
        });
    }, 1500);

    const currentMonth = monthOptions.find(month => month.value == dayjs().format("MM"));
    console.log(dayjs().format("MM"))
    let renderElement: JSX.Element | null;

    switch(viewType) {
        case 'logs':
            renderElement = (
                <div className='flex space-x-4 w-fit my-2'>
                    <TextField
                        defaultValue={dayjs().format("YYYY")}
                        label="Year"
                        variant="outlined"
                        placeholder="Enter A Year"
                        onChange={(e) => 
                                {
                                    setFilter( curr => (
                                        {
                                            ...curr,
                                            year: e.target.value
                                        }
                                    ))
                                }
                            }
                        disabled={isLoading}
                    />
                    <Autocomplete
                        disablePortal
                        id="months"
                        options={monthOptions}
                        defaultValue={currentMonth}
                        getOptionLabel={(option:any) => `${option.name}`}
                        // onChange={handleChangeFilter}
                        className='md:w-80'
                        // disabled={isLoading || isCutOffPeriodLoading}
                        renderInput={(params) => <TextField {...params} label="Month" />}
                    />
                </div>
            )
            break;
        case 'merged':
            renderElement = (
                <div>
                    <Input label="Year"/>
                    <Autocomplete
                        disablePortal
                        id="cutoff"
                        options={cutoffPeriods}
                        getOptionLabel={(option:any) => `${option.cleanDateFrom} - ${option.cleanDateTo}` }
                        onChange={handleChangeFilter}
                        className='md:w-80'
                        disabled={isLoading || isCutOffPeriodLoading}
                        renderInput={(params) => <TextField {...params} label="Cutoff Periods" />}
                    />

                </div>
            )
            break
        default:
            renderElement = null
            break

    }



    return (
        <div className='flex gap-4 items-center'>
            {renderElement}
            <Button className='w-20 h-fit py-4'>View</Button>
        </div>
    )
}