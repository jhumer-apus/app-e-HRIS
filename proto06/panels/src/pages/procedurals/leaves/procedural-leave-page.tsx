import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ProceduralLEAVEPageDescriptions, ProceduralLEAVEPageColumns } from '@/data/pages-data/procedural-data/leaves-data';
import ViewLEAVESingleModal from './local-components/main-modals/view-leaves-single-modal';
import { LEAVEViewInterface } from '@/types/types-pages';
import { LEAVEViewAction, LEAVEViewAllFilterApproverAction, LEAVEViewFilterApproverAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';
import useFetchFileApplicationByApprover from '@/custom-hooks/use-fetch-file-application-by-approver';
import { HandleModalAction } from '@/store/actions/components';
import axios from 'axios';
import axiosInstance from '@/helpers/axiosConfig';

export default function ProceduralLEAVEPage() {
  const currUser = useSelector((state: RootState) => state.auth.employee_detail);
  const [printing, setIsPrinting] = useState(false);
  const [singleLEAVEOpenModal, setSingleLEAVEOpenModal] = useState<boolean>(false);
  const [singleLEAVEDetailsData, setSingleLEAVEDetailsData] = useState<LEAVEViewInterface>({
      leave_type: 1,
      leave_remarks: '',
      leave_date_from: '',
      leave_date_to: '',
      emp_no: NaN,
      id: NaN,
      leave_reason_disapproval: null,
      leave_date_approved1: null,
      leave_date_approved2: null,
      leave_date_filed: '',
      leave_approval_status: '',
      leave_total_hours: NaN,
      leave_approver1_empno: null,
      leave_approver2_empno: null,
      leave_number_days: 0,
      cutoff_code: NaN,
      applicant_rank: NaN,
  });

  const dispatch = useDispatch();
  const isDepartmentManagerRole = currUser?.user?.role == 2
  const { LEAVEView, LEAVEViewAllFilterApprover } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = isDepartmentManagerRole? LEAVEViewAllFilterApprover: LEAVEView;
  const LEAVEViewData = data as LEAVEViewInterface[];

  const fetchLeavesByApprover = async() => {
    await axiosInstance.get(`leave/`,{
      params:{
        approver: currUser?.emp_no
      }
    }).then(res => {
      dispatch(LEAVEViewAllFilterApproverAction({data: res.data}))
    })
  }


  useEffect(()=> {
    isDepartmentManagerRole
      ? fetchLeavesByApprover()
      : dispatch(LEAVEViewAction())
  }, []);


  // const getEndDayOfTheWeekDays = (dateString: Date | string) => {

  //   let originalDate = convertDateStringtoDate(dateString);

  //   let currentWeekDay = originalDate.getDay();
    
  //   let difference = 5 - currentWeekDay //Friday minus the weekday

  //   originalDate.setDate(originalDate.getDate() + difference);

  //   return originalDate;
  // }

  // const getStartDayOfTheWeekDays = (dateString: Date | string) => {

  //   let originalDate = convertDateStringtoDate(dateString);

  //   let currentWeekDay = originalDate.getDay();
    
  //   let difference = currentWeekDay - 1 //Weekday minus the Monday

  //   originalDate.setDate(originalDate.getDate() - difference);

  //   return originalDate;
  // }

  // const convertDateStringtoDate = (dateString: Date | string) => {
  //   return new Date(dateString);
  // }

  // let employeeLeaveData = LEAVEViewData?.map(empData => {

  //   if(["P1", "P2"].includes(empData.leave_approval_status) && empData.leave_type == 1) {
  //     const filteredLeaves  = LEAVEViewData?.filter((leave: any) => 
  //         leave.leave_type === 1 
  //         && leave.leave_approval_status === 'APD' 
  //         && getStartDayOfTheWeekDays(leave.leave_date_filed) <= convertDateStringtoDate(leave.leave_date_filed) 
  //         && getEndDayOfTheWeekDays(leave.leave_date_filed) >= convertDateStringtoDate(leave.leave_date_filed)
  //         && empData.emp_no == leave.emp_no

  //       );
  //       const numberOfSickLeavesApproved = filteredLeaves.length
        
  //       if (numberOfSickLeavesApproved >= 3) {

  //           const data = {
  //             ...empData,
  //             additional_status: "OSL" //Over Sick Leaves Approved
  //           }
  //           return data

  //       }
  //       return empData
  //   }
  //   return empData
  // })

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(LEAVEViewData?.length && LEAVEViewData?.length >= 11){
      return LEAVEViewData?.length / 25 * 1400
    } else {
      return 600
    }
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewLEAVESingleModal setSingleLEAVEDetailsData={setSingleLEAVEDetailsData} singleLEAVEDetailsData={singleLEAVEDetailsData} singleLEAVEOpenModal={singleLEAVEOpenModal} setSingleLEAVEOpenModal={setSingleLEAVEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ProceduralLEAVEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          // rows={LEAVEViewData? LEAVEViewData as LEAVEViewInterface[]:[]}
          rows={LEAVEViewData ? LEAVEViewData : []}
          columns={ProceduralLEAVEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleLEAVEDetailsData(e.row);
            dispatch(HandleModalAction({
              name: "viewLeaveModal",
              value: true
            }))
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
        {/* <GeneratePDFButton data={LEAVEViewData} columns={ProceduralLEAVEPageColumns} /> */}
      </div>
    </Fragment>
  );
}
