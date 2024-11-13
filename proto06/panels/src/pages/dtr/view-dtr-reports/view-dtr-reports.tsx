import { Fragment, useEffect, useState } from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store/reducers';
import { RootState } from '@/store/configureStore';
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { Modal, Box, Select, MenuItem, FormControlLabel, Checkbox, } from '@mui/material';

import {
  Typography,
} from "@material-tailwind/react";

import { SpecificEmployee } from './forms/SpecificEmployee';
import SplitButton from '@/widgets/split-button/split-button';
import { viewDTROptions, viewDTRDescriptions } from '@/data/pages-data/dtr-data/view-dtr-reports';
import useDtrState from '@/custom-hooks/use-dtr-state';
import { dynamicDTRColumns } from '@/data/pages-data/dtr-data/view-dtr-reports';
import { viewAllDtrLogs, viewFilterDtrLogs, viewCutoffDtrSummary, viewMergedDtrLogs, viewFilterMergedDtrLogs } from '@/store/actions/dtr';
import PrintTableButton from './local-components/print-table-button';
import ExportToCsvButton from './local-components/export-to-csv-button';

//LIBRARIES 
import { Option, Input } from "@material-tailwind/react";
import dayjs from 'dayjs';

//COMPONENTS
import FilterDTR from './local-components/FilterDTR';
import axiosInstance from '@/helpers/axiosConfig';
import { useFetchDTRData } from '@/custom-hooks/use-fetch-dtr-data';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type DTRType = "logs" | "merged" | "cutoff"


export default function ViewDtrReports() {
  const [printing, setIsPrinting] = useState(false);
  const dispatch = useDispatch();
  const { specific_employee_info } = useSelector((state: RootState) => state.employees);
  const currUser = useSelector((state: RootState) => state.auth.employee_detail)
  // const { spButtonIndex, spButtonStr, spButtonError, dtrStatus, dtrError, dtrData } = useDtrState();
  const [type, setType] = useState("staticInfo");
  const [exportDtrData, setExportDtrData] = useState<any>([])


  // Specific Employee Modal Form 
  // States: 
  const [open, setOpen] = useState(false);
  const [modalEntranceDelay, setModalEntranceDelay] = useState(false);
  const [secondOptionModalEntranceDelay, setSecondOptionModalEntranceDelay] = useState(false);

  //STATES
  const [filter, setFilter] = useState({
      year: parseInt(dayjs().format("YYYY")),
      month: parseInt(dayjs().format("MM")),
      emp_no: currUser?.user?.role? (currUser?.user?.role < 3? currUser?.emp_no: null): null,
      cutoff_id: null
  })

  const { dtr, fetchDtrData } = useFetchDTRData(filter)
  const [dtrType, setDtrType] = useState<DTRType>("logs")

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
    setType("staticInfo");
  };


  useEffect(() => {
    fetchDtrData[dtrType]()
  }, [dtrType]);

  const viewDtr = (type: DTRType) => {
    fetchDtrData[type]()
  }

  useEffect(()=> {

    const exportDtrData = Array.isArray(dtr.data)? dtr.data.map(dtr => {

      //Filter columns for basic employee only using destructuring
      if((currUser?.rank_code??0) <= 3) {

        return {
          id: dtr.id,
          emp_no: dtr.emp_no,
          flag1_in_out: dtr.flag1_in_out,
          datetime_bio_date: dtr.datetime_bio_date,
          datetime_bio_time: dtr.datetime_bio_time,
          business_date: dtr.business_date,
          duty_in: dtr.duty_in,
          duty_out: dtr.duty_out,
          is_processed: dtr.is_processed
        }

      } 
      return dtr
    }) : []
    // console.log(exportDtrData)
    setExportDtrData((curr:any) => exportDtrData)

  },[dtr])

  function dispatchSpecificEmployeeInfo(employee_number: number){
    return dispatch(getSpecificEmployeeInfo({employee_id: employee_number}));   
  }

  // Side Effects
  const handleModalEntranceDelay = () => {
    setModalEntranceDelay(true);
    setSecondOptionModalEntranceDelay(true);
    setTimeout(() => {
      setModalEntranceDelay(false);
    }, 1000);
    setTimeout(() => {
      setSecondOptionModalEntranceDelay(false);
    }, 1200);
  };

  useEffect(()=>{
      setTimeout(() => {
        setModalEntranceDelay(false);
      }, 1000);
      setTimeout(() => {
        setSecondOptionModalEntranceDelay(false);
      }, 1200);
  }, [specific_employee_info])

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(dtr.data?.length && dtr.data?.length >= 11){
      return dtr.data?.length / 25 * 1400
    } else {
      return 700
    }
  };

  const gridRowClick = (e: GridRowParams) => {
    handleOpen()
    setModalEntranceDelay(true)
    setSecondOptionModalEntranceDelay(true)
    dispatchSpecificEmployeeInfo(e.row?.emp_no)
  };

  const handleSelectType = (e:any) => {
    setDtrType(curr => e.target.value)
  }

  const role = currUser?.user?.role;

  const isBasicEmployee = role && role == 1
  const isDepartmentManager = role && role == 2

  // const excludedColumn = [
  //   "nd_total_hours",
  //   "reg_ot_total_hours",
  //   "nd_ot_total_hours",
  //   "sp_holiday_nd_total_hours",
  //   "sp_holiday_reg_ot_hours",
  //   "sp_holiday_nd_ot_hours",
  //   "reg_holiday_nd_total_hours",
  //   "reg_holiday_reg_ot_hours",
  //   "reg_holiday_nd_ot_hours",
  //   "rd_nd_total_hours",
  //   "rd_reg_ot_total_hours",
  //   "rd_nd_ot_total_hours",
  //   "rd_sphol_nd_total_hours",
  //   "rd_sphol_reg_ot_total_hours",
  //   "rd_sphol_nd_ot_total_hours",
  //   "rd_reghol_nd_total_hours",
  //   "rd_reghol_reg_ot_total_hours",
  //   "rd_reghol_nd_ot_total_hours",
  // ]

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <Select
            value={dtrType}
            placeholder="DTR Types"
            onChange={handleSelectType}
            className='my-2'
          >
            <MenuItem value="logs">{viewDTROptions.logs}</MenuItem>
            <MenuItem value="merged">{viewDTROptions.merged}</MenuItem>
            <MenuItem value="cutoff">{viewDTROptions.cutoff}</MenuItem>
          </Select>
          <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
            <i>{viewDTRDescriptions[dtrType]}</i>
          </Typography>
        </div>
        {isBasicEmployee}
        {(!isBasicEmployee && !isDepartmentManager) &&
          <div className='flex justify-between gap-6'>
            <ExportToCsvButton 
              data={exportDtrData}
              excludedColumn={[]}
            />
            {(currUser?.rank_code??0) > 3 && 
              <PrintTableButton printing={printing} setIsPrinting={setIsPrinting}/>
            }
          </div>
        }
      </div>

      <FilterDTR 
        viewType={dtrType}
        filter={filter}
        setFilter={setFilter}
        onView={() => viewDtr(dtrType)}
      />

      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`}} id="printable-area">
        <DataGrid
          className='w-full'
          rows={dtr.data ?? []}
          columns={dynamicDTRColumns()[dtrType]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          // onRowClick={(e) => {
          //   spButtonIndex === 2 ? gridRowClick(e) : null
          // }}
          // style={{ cursor: spButtonIndex === 2 ? 'pointer': 'default'}}
          loading={dtr.loading}
          localeText={{ noRowsLabel: `Data Loaded - Showing 0 Results` }}
        />
        <Modal
          open={open}
          onClose={
            handleClose
          }
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width:"100%", maxHeight: "80%", overflowY: "auto",  background: "#e9bcb7", backgroundImage: "linear-gradient(315deg, #e9bcb7 0%, #29524a 74%)" }}>
            <SpecificEmployee modalEntranceDelay={modalEntranceDelay} secondOptionModalEntranceDelay={secondOptionModalEntranceDelay} loadingEffect={handleModalEntranceDelay}/>
          </Box>
        </Modal>
      </div>
    </Fragment>
  );
}
