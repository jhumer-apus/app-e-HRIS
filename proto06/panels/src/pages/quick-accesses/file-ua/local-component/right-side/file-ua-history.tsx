import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { QuickAccessUAPageDescriptions, QuickAccessUAPageColumns } from '@/data/pages-data/quick-accesses-data/ua-data';
import ViewUASingleModal from './local-components/main-modals/view-ua-single-modal';
import { UAViewInterface } from '@/types/types-pages';
import { UAViewFilterEmployeeAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function QuickAccessUAPageHistory() {
  const [singleUAOpenModal, setSingleUAOpenModal] = useState<boolean>(false);
  const [singleUADetailsData, setSingleUADetailsData] = useState<UAViewInterface>({
    id: NaN,
    emp_no: NaN,
    ua_description: null,
    ua_date_from: null,
    ua_date_to: null,
    ua_reason_disapproval: null,
    ua_date_approved1: null, 
    ua_date_approved2: null,
    ua_approver1_empno: null,
    ua_approver2_empno: null,
    ua_date_filed: '',
    cutoff_code: NaN,
    applicant_rank: NaN,
    ua_approval_status: '',
    ua_total_hours: NaN,
  });
  const dispatch = useDispatch();
  const { UAViewFilterEmployee } = useSelector((state: RootState) => state.procedurals);
  const { data, status,error } = UAViewFilterEmployee;
  const UAViewData = data as UAViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((UAViewData?.length <= 0 || UAViewData === null || UAViewData === undefined ) && curr_user){
      dispatch(UAViewFilterEmployeeAction({emp_no: curr_user}))
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewUASingleModal setSingleUADetailsData={setSingleUADetailsData} singleUADetailsData={singleUADetailsData} singleUAOpenModal={singleUAOpenModal} setSingleUAOpenModal={setSingleUAOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{QuickAccessUAPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={UAViewData? UAViewData as UAViewInterface[]:[]}
          columns={QuickAccessUAPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleUADetailsData(e.row);
            setSingleUAOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
